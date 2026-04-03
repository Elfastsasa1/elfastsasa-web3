"use client";

import React from "react";
import { Moon, Sun, Hexagon, ExternalLink, Power } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useWeb3 } from "@/components/providers/Web3Provider";
import { useToast } from "@/components/providers/ToastProvider";
import { shortAddress } from "@/lib/ethers";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { wallet, connect, disconnect } = useWeb3();
  const { showToast } = useToast();

  const handleConnect = async () => {
    await connect();
    if (wallet.error) {
      showToast(wallet.error, "error");
    }
  };

  const handleDisconnect = () => {
    disconnect();
    showToast("Wallet disconnected", "info");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-void/80 backdrop-blur-md">
      <div className="container mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Hexagon className="text-acid" size={28} strokeWidth={1.5} />
            <span className="absolute inset-0 flex items-center justify-center text-[8px] font-mono font-bold text-acid">
              W3
            </span>
          </div>
          <div className="leading-none">
            <p className="font-display font-bold text-sm text-text-primary tracking-wide">
              Elfastsasa
            </p>
            <p className="font-mono text-[10px] text-text-muted">WEB3 DASHBOARD</p>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2">

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="btn-ghost"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun size={16} className="text-ember" />
            ) : (
              <Moon size={16} className="text-plasma-light" />
            )}
          </button>

          {/* Wallet button */}
          {wallet.isConnected && wallet.address ? (
            <div className="flex items-center gap-2">
              {/* Address pill */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-acid/30 bg-acid/5">
                <span className="dot-green" />
                <span className="font-mono text-xs text-acid">
                  {shortAddress(wallet.address)}
                </span>
              </div>
              {/* Disconnect */}
              <button
                onClick={handleDisconnect}
                className={cn(
                  "btn-ghost text-danger hover:text-danger hover:bg-danger/10"
                )}
                title="Disconnect wallet"
              >
                <Power size={15} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleConnect}
              disabled={wallet.isConnecting}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {wallet.isConnecting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-void/40 border-t-void rounded-full animate-spin" />
                  Connecting…
                </>
              ) : (
                <>
                  <ExternalLink size={14} />
                  Connect Wallet
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
