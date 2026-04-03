"use client";

import React, { useState } from "react";
import { Copy, Check, Wallet, RefreshCw, ExternalLink } from "lucide-react";
import { useWeb3 } from "@/components/providers/Web3Provider";
import { useToast } from "@/components/providers/ToastProvider";
import { shortAddress, formatEther } from "@/lib/ethers";
import { getNetwork } from "@/lib/networks";
import { cn } from "@/lib/utils";
import { ConnectPrompt } from "@/components/ui/ConnectPrompt";

export function WalletCard() {
  const { wallet, provider, connect } = useWeb3();
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const network = getNetwork(wallet.chainId);

  // ── Copy address to clipboard ──────────────────────────────────
  const handleCopy = async () => {
    if (!wallet.address) return;
    await navigator.clipboard.writeText(wallet.address);
    setCopied(true);
    showToast("Address copied to clipboard!", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  // ── Refresh balance ────────────────────────────────────────────
  const handleRefresh = async () => {
    if (!provider || !wallet.address) return;
    setRefreshing(true);
    try {
      const balanceWei = await provider.getBalance(wallet.address);
      // Wallet state is managed in Web3Provider; here we just show toast
      showToast(`Balance refreshed: ${formatEther(balanceWei)} ETH`, "success");
    } catch {
      showToast("Failed to refresh balance", "error");
    } finally {
      setRefreshing(false);
    }
  };

  // ── Not connected state ────────────────────────────────────────
  if (!wallet.isConnected) {
    return (
      <ConnectPrompt onConnect={connect} isConnecting={wallet.isConnecting} />
    );
  }

  const explorerUrl = network?.explorer
    ? `${network.explorer}/address/${wallet.address}`
    : null;

  return (
    <div className={cn("card p-6 relative overflow-hidden animate-slide-in")}>
      {/* Background decoration */}
      <div
        className="absolute inset-0 opacity-[0.03] grid-bg pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: network?.color ?? "#00FF94" }}
        aria-hidden
      />

      {/* Header row */}
      <div className="relative flex items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-acid/10 border border-acid/20">
            <Wallet size={20} className="text-acid" />
          </div>
          <div>
            <p className="font-mono text-xs text-text-muted uppercase tracking-wider mb-0.5">
              Connected Wallet
            </p>
            <div className="flex items-center gap-2">
              <span className="dot-green" />
              <span className="font-mono text-xs text-acid">Active</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="btn-ghost"
          title="Refresh balance"
        >
          <RefreshCw
            size={14}
            className={cn("text-text-muted", refreshing && "animate-spin")}
          />
        </button>
      </div>

      {/* Address row */}
      <div className="relative mb-6">
        <p className="font-mono text-xs text-text-muted mb-2 uppercase tracking-wider">
          Address
        </p>
        <div className="flex items-center gap-3 flex-wrap">
          {/* Full address — truncated on mobile */}
          <p className="font-mono text-lg sm:text-xl font-semibold text-text-primary break-all">
            <span className="hidden sm:inline">{wallet.address}</span>
            <span className="sm:hidden">
              {shortAddress(wallet.address ?? "", 6)}
            </span>
          </p>
          {/* Copy button */}
          <button
            onClick={handleCopy}
            className={cn(
              "shrink-0 p-2 rounded-lg border transition-all duration-200",
              copied
                ? "border-acid/40 bg-acid/10 text-acid"
                : "border-border text-text-muted hover:text-text-primary hover:border-text-muted"
            )}
            aria-label="Copy address"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
          {/* View on explorer */}
          {explorerUrl && (
            <a
              href={explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-border text-text-muted hover:text-text-primary hover:border-text-muted transition-all duration-200"
              aria-label="View on explorer"
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>

      {/* Balance + Network row */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* ETH Balance */}
        <div className="p-4 rounded-xl bg-surface border border-border">
          <p className="font-mono text-xs text-text-muted uppercase tracking-wider mb-2">
            Balance
          </p>
          <p className="font-display text-3xl font-bold text-text-primary">
            {wallet.balance ?? "0.0000"}
            <span className="text-sm font-mono text-text-secondary ml-2">
              {network?.symbol ?? "ETH"}
            </span>
          </p>
        </div>

        {/* Network */}
        <div className="p-4 rounded-xl bg-surface border border-border">
          <p className="font-mono text-xs text-text-muted uppercase tracking-wider mb-2">
            Network
          </p>
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-surface"
              style={{
                backgroundColor: network?.color ?? "#8B949E",
                boxShadow: `0 0 8px ${network?.color ?? "#8B949E"}60`,
              }}
            />
            <p className="font-display text-xl font-bold text-text-primary">
              {network?.name ?? "Unknown"}
            </p>
            <span className="badge bg-border text-text-secondary ml-auto">
              #{wallet.chainId}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
