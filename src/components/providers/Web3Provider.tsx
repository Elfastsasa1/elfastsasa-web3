"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { ethers } from "ethers";
import type { WalletState } from "@/types/web3";
import { getBrowserProvider, formatEther } from "@/lib/ethers";

interface Web3ContextValue {
  wallet: WalletState;
  provider: ethers.BrowserProvider | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const INITIAL_STATE: WalletState = {
  address: null,
  balance: null,
  chainId: null,
  isConnecting: false,
  isConnected: false,
  error: null,
};

const Web3Context = createContext<Web3ContextValue>({
  wallet: INITIAL_STATE,
  provider: null,
  connect: async () => {},
  disconnect: () => {},
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [wallet, setWallet] = useState<WalletState>(INITIAL_STATE);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);

  // ── Helper: fetch and set wallet data ──────────────────────────
  const loadWalletData = useCallback(
    async (bProvider: ethers.BrowserProvider, address: string) => {
      const [balanceWei, network] = await Promise.all([
        bProvider.getBalance(address),
        bProvider.getNetwork(),
      ]);
      setWallet({
        address,
        balance: formatEther(balanceWei),
        chainId: Number(network.chainId),
        isConnecting: false,
        isConnected: true,
        error: null,
      });
    },
    []
  );

  // ── Connect wallet ─────────────────────────────────────────────
  const connect = useCallback(async () => {
    setWallet((prev) => ({ ...prev, isConnecting: true, error: null }));
    try {
      const bProvider = getBrowserProvider();
      // Request accounts — opens MetaMask popup
      const accounts: string[] = await bProvider.send("eth_requestAccounts", []);
      if (!accounts.length) throw new Error("No accounts found");
      setProvider(bProvider);
      await loadWalletData(bProvider, accounts[0]);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Connection failed";
      setWallet((prev) => ({
        ...prev,
        isConnecting: false,
        error: message,
      }));
    }
  }, [loadWalletData]);

  // ── Disconnect wallet ──────────────────────────────────────────
  const disconnect = useCallback(() => {
    setWallet(INITIAL_STATE);
    setProvider(null);
  }, []);

  // ── Handle MetaMask events ─────────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined" || !window.ethereum) return;

    const handleAccountsChanged = async (accounts: string[]) => {
      if (!accounts.length) {
        // User disconnected in MetaMask
        disconnect();
        return;
      }
      // Account switched — reload data
      if (provider && accounts[0] !== wallet.address) {
        await loadWalletData(provider, accounts[0]);
      }
    };

    const handleChainChanged = () => {
      // Reload on chain change (MetaMask recommendation)
      window.location.reload();
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);
    window.ethereum.on("chainChanged", handleChainChanged);

    // Cleanup listeners on unmount
    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountsChanged);
      window.ethereum?.removeListener("chainChanged", handleChainChanged);
    };
  }, [provider, wallet.address, disconnect, loadWalletData]);

  // ── Auto-reconnect if previously connected ────────────────────
  useEffect(() => {
    const tryAutoConnect = async () => {
      if (typeof window === "undefined" || !window.ethereum) return;
      try {
        const bProvider = getBrowserProvider();
        // eth_accounts does NOT prompt — only returns if already authorized
        const accounts: string[] = await bProvider.send("eth_accounts", []);
        if (accounts.length) {
          setProvider(bProvider);
          await loadWalletData(bProvider, accounts[0]);
        }
      } catch {
        // Silent fail — user not previously connected
      }
    };
    tryAutoConnect();
  }, [loadWalletData]);

  return (
    <Web3Context.Provider value={{ wallet, provider, connect, disconnect }}>
      {children}
    </Web3Context.Provider>
  );
}

export const useWeb3 = () => useContext(Web3Context);
