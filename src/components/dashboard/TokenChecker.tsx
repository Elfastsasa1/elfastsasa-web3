"use client";

import React, { useState } from "react";
import { Search, Coins, AlertCircle, Copy, Check, ExternalLink } from "lucide-react";
import { useWeb3 } from "@/components/providers/Web3Provider";
import { useToast } from "@/components/providers/ToastProvider";
import { fetchTokenInfo } from "@/lib/ethers";
import { getNetwork } from "@/lib/networks";
import type { TokenInfo } from "@/types/web3";
import { cn } from "@/lib/utils";

// Well-known tokens for quick search
const QUICK_TOKENS = [
  { label: "USDC", address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" },
  { label: "USDT", address: "0xdAC17F958D2ee523a2206206994597C13D831ec7" },
  { label: "DAI",  address: "0x6B175474E89094C44Da98b954EedeAC495271d0F" },
  { label: "WETH", address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" },
];

export function TokenChecker() {
  const { wallet, provider } = useWeb3();
  const { showToast } = useToast();

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const network = getNetwork(wallet.chainId);

  const handleCheck = async (address?: string) => {
    const target = address ?? input.trim();
    if (!target) return;

    if (!provider) {
      showToast("Connect your wallet first", "warning");
      return;
    }

    setLoading(true);
    setError(null);
    setTokenInfo(null);

    try {
      const info = await fetchTokenInfo(target, provider);
      setTokenInfo(info);
      showToast(`Token found: ${info.symbol}`, "success");
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to fetch token info";
      setError(msg);
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyAddress = async () => {
    if (!tokenInfo?.address) return;
    await navigator.clipboard.writeText(tokenInfo.address);
    setCopied(true);
    showToast("Contract address copied!", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="card flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 p-5 border-b border-border">
        <Coins size={16} className="text-ember" />
        <h2 className="font-display font-semibold text-base text-text-primary">
          Token Checker
        </h2>
      </div>

      <div className="p-5 flex flex-col gap-5 flex-1">
        {/* Input */}
        <div className="space-y-2">
          <label className="font-mono text-xs text-text-muted uppercase tracking-wider">
            Contract Address
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCheck()}
              placeholder="0x..."
              className="input-field flex-1"
              disabled={loading}
            />
            <button
              onClick={() => handleCheck()}
              disabled={loading || !input.trim()}
              className={cn(
                "shrink-0 px-4 py-2.5 rounded-lg border transition-all duration-200",
                "flex items-center gap-2 font-mono text-sm font-medium",
                loading || !input.trim()
                  ? "border-border text-text-muted cursor-not-allowed"
                  : "border-ember/40 bg-ember/10 text-ember hover:bg-ember/20"
              )}
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-ember/30 border-t-ember rounded-full animate-spin" />
              ) : (
                <Search size={14} />
              )}
            </button>
          </div>
        </div>

        {/* Quick tokens */}
        <div className="space-y-2">
          <p className="font-mono text-xs text-text-muted uppercase tracking-wider">
            Quick Check (Mainnet)
          </p>
          <div className="flex flex-wrap gap-2">
            {QUICK_TOKENS.map((qt) => (
              <button
                key={qt.label}
                onClick={() => {
                  setInput(qt.address);
                  handleCheck(qt.address);
                }}
                disabled={loading}
                className={cn(
                  "px-3 py-1.5 rounded-lg font-mono text-xs border transition-all duration-150",
                  "border-border text-text-secondary hover:border-ember/40 hover:text-ember hover:bg-ember/5",
                  "disabled:opacity-40 disabled:cursor-not-allowed"
                )}
              >
                {qt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Not connected hint */}
        {!wallet.isConnected && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-ember/5 border border-ember/20">
            <AlertCircle size={14} className="text-ember shrink-0" />
            <p className="font-mono text-xs text-ember">
              Connect wallet to query on-chain token data
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-danger/5 border border-danger/20 animate-slide-in">
            <AlertCircle size={14} className="text-danger shrink-0 mt-0.5" />
            <p className="font-mono text-xs text-danger">{error}</p>
          </div>
        )}

        {/* Token Result Card */}
        {tokenInfo && (
          <div className="flex-1 p-4 rounded-xl bg-surface border border-acid/20 space-y-4 animate-slide-in">
            {/* Token header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-acid/10 border border-acid/30 flex items-center justify-center">
                  <span className="font-display font-bold text-xs text-acid">
                    {tokenInfo.symbol.slice(0, 3)}
                  </span>
                </div>
                <div>
                  <p className="font-display font-bold text-text-primary">
                    {tokenInfo.name}
                  </p>
                  <p className="font-mono text-xs text-acid">{tokenInfo.symbol}</p>
                </div>
              </div>

              {/* Explorer link */}
              {network?.explorer && (
                <a
                  href={`${network.explorer}/token/${tokenInfo.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost text-text-muted"
                  aria-label="View on explorer"
                >
                  <ExternalLink size={14} />
                </a>
              )}
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-2 gap-3">
              <InfoRow label="Decimals" value={tokenInfo.decimals.toString()} />
              <InfoRow label="Total Supply" value={tokenInfo.totalSupply} />
            </div>

            {/* Contract address */}
            <div>
              <p className="font-mono text-[10px] text-text-muted uppercase tracking-wider mb-1.5">
                Contract
              </p>
              <div className="flex items-center gap-2">
                <p className="font-mono text-xs text-text-secondary truncate flex-1">
                  {tokenInfo.address}
                </p>
                <button
                  onClick={handleCopyAddress}
                  className={cn(
                    "shrink-0 p-1.5 rounded-lg border transition-all duration-150",
                    copied
                      ? "border-acid/40 text-acid bg-acid/5"
                      : "border-border text-text-muted hover:text-text-primary"
                  )}
                  aria-label="Copy contract address"
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Empty placeholder when no result yet */}
        {!tokenInfo && !error && !loading && (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-8 opacity-40">
            <Coins size={36} className="text-text-muted mb-3" />
            <p className="font-mono text-xs text-text-muted">
              Enter a contract address to inspect a token
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Small info row ──────────────────────────────────────────────

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-lg bg-panel border border-border">
      <p className="font-mono text-[10px] text-text-muted uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="font-mono text-sm font-semibold text-text-primary">{value}</p>
    </div>
  );
}
