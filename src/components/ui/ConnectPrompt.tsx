"use client";

import React from "react";
import { Wallet, Shield, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConnectPromptProps {
  onConnect: () => void;
  isConnecting: boolean;
}

const FEATURES = [
  { icon: <Wallet size={14} />, label: "View wallet balance & address" },
  { icon: <Zap size={14} />, label: "Track recent transactions" },
  { icon: <Shield size={14} />, label: "Inspect ERC-20 tokens" },
];

export function ConnectPrompt({ onConnect, isConnecting }: ConnectPromptProps) {
  return (
    <div className="card p-8 flex flex-col items-center text-center relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute inset-0 opacity-[0.03] grid-bg pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 blur-3xl opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #00FF94, transparent 70%)" }}
        aria-hidden
      />

      {/* Icon */}
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-2xl bg-acid/5 border border-acid/20 flex items-center justify-center">
          <Wallet size={36} className="text-acid" strokeWidth={1.5} />
        </div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-plasma/20 border border-plasma/30 flex items-center justify-center">
          <span className="text-[8px] font-mono font-bold text-plasma-light">W3</span>
        </div>
      </div>

      {/* Text */}
      <h2 className="font-display text-xl font-bold text-text-primary mb-2">
        Connect Your Wallet
      </h2>
      <p className="font-mono text-sm text-text-secondary mb-8 max-w-xs leading-relaxed">
        Connect MetaMask to explore your on-chain data, transactions, and token balances.
      </p>

      {/* Features */}
      <div className="flex flex-col gap-2.5 mb-8 w-full max-w-xs">
        {FEATURES.map((f) => (
          <div
            key={f.label}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-surface border border-border"
          >
            <span className="text-acid">{f.icon}</span>
            <span className="font-mono text-xs text-text-secondary">{f.label}</span>
          </div>
        ))}
      </div>

      {/* Connect button */}
      <button
        onClick={onConnect}
        disabled={isConnecting}
        className={cn(
          "btn-primary px-8 py-3 text-base",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        {isConnecting ? (
          <>
            <span className="w-4 h-4 border-2 border-void/40 border-t-void rounded-full animate-spin" />
            Connecting…
          </>
        ) : (
          <>
            <Wallet size={16} />
            Connect MetaMask
          </>
        )}
      </button>

      <p className="font-mono text-[11px] text-text-muted mt-4">
        No MetaMask? {" "}
        <a
          href="https://metamask.io"
          target="_blank"
          rel="noopener noreferrer"
          className="text-acid hover:underline"
        >
          Download it here →
        </a>
      </p>
    </div>
  );
}
