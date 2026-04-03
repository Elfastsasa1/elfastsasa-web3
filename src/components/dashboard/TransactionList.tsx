"use client";

import React, { useState } from "react";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Code2,
  ExternalLink,
  RefreshCw,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";
import { useWeb3 } from "@/components/providers/Web3Provider";
import { getMockTransactions } from "@/lib/mockData";
import { shortAddress, formatTimestamp } from "@/lib/ethers";
import { getNetwork } from "@/lib/networks";
import { cn } from "@/lib/utils";
import type { Transaction } from "@/types/web3";

export function TransactionList() {
  const { wallet } = useWeb3();
  const [filter, setFilter] = useState<"all" | "sent" | "received" | "contract">("all");

  const network = getNetwork(wallet.chainId);

  // Use mock transactions if connected
  const allTxs = wallet.address ? getMockTransactions(wallet.address) : [];
  const filtered =
    filter === "all" ? allTxs : allTxs.filter((tx) => tx.type === filter);

  const FILTERS = [
    { key: "all", label: "All" },
    { key: "sent", label: "Sent" },
    { key: "received", label: "Received" },
    { key: "contract", label: "Contract" },
  ] as const;

  return (
    <div className="card flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-border">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-text-secondary" />
          <h2 className="font-display font-semibold text-base text-text-primary">
            Recent Transactions
          </h2>
          {allTxs.length > 0 && (
            <span className="badge bg-border text-text-secondary">
              {allTxs.length}
            </span>
          )}
        </div>
        <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider">
          Mock Data
        </span>
      </div>

      {/* Filter tabs */}
      {wallet.isConnected && (
        <div className="flex items-center gap-1 px-5 py-3 border-b border-border">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                "px-3 py-1.5 rounded-lg font-mono text-xs transition-all duration-150",
                filter === f.key
                  ? "bg-acid/10 text-acid border border-acid/30"
                  : "text-text-muted hover:text-text-secondary hover:bg-border"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      {/* List */}
      <div className="flex-1 overflow-y-auto divide-y divide-border">
        {!wallet.isConnected ? (
          <EmptyState message="Connect your wallet to see transactions" />
        ) : filtered.length === 0 ? (
          <EmptyState message="No transactions found" />
        ) : (
          filtered.map((tx) => (
            <TxRow
              key={tx.hash}
              tx={tx}
              walletAddress={wallet.address!}
              explorerBase={network?.explorer ?? ""}
            />
          ))
        )}
      </div>
    </div>
  );
}

// ─── Transaction Row ─────────────────────────────────────────────

function TxRow({
  tx,
  walletAddress,
  explorerBase,
}: {
  tx: Transaction;
  walletAddress: string;
  explorerBase: string;
}) {
  const isSent = tx.type === "sent";
  const isReceived = tx.type === "received";
  const isContract = tx.type === "contract";

  const iconBg = isSent
    ? "bg-danger/10 text-danger border-danger/20"
    : isReceived
    ? "bg-acid/10 text-acid border-acid/20"
    : "bg-plasma/10 text-plasma-light border-plasma/20";

  const amountColor = isSent
    ? "text-danger"
    : isReceived
    ? "text-acid"
    : "text-plasma-light";

  const StatusIcon =
    tx.status === "success"
      ? CheckCircle2
      : tx.status === "pending"
      ? Loader2
      : XCircle;

  const statusColor =
    tx.status === "success"
      ? "text-acid"
      : tx.status === "pending"
      ? "text-ember animate-spin"
      : "text-danger";

  const counterpart = isSent
    ? tx.to
    : isReceived
    ? tx.from
    : tx.to ?? tx.from;

  return (
    <div className="flex items-center gap-3 px-5 py-4 hover:bg-surface/50 transition-colors duration-150 group">
      {/* Type icon */}
      <div
        className={cn(
          "shrink-0 w-9 h-9 rounded-xl border flex items-center justify-center",
          iconBg
        )}
      >
        {isSent ? (
          <ArrowUpRight size={15} />
        ) : isReceived ? (
          <ArrowDownLeft size={15} />
        ) : (
          <Code2 size={15} />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p className="font-mono text-xs text-text-primary truncate">
            {shortAddress(tx.hash, 4)}
          </p>
          <StatusIcon size={12} className={cn("shrink-0", statusColor)} />
        </div>
        <p className="font-mono text-[11px] text-text-muted truncate">
          {isSent ? "→ " : "← "}
          {counterpart ? shortAddress(counterpart, 4) : "Unknown"}
        </p>
      </div>

      {/* Amount + time */}
      <div className="text-right shrink-0">
        <p className={cn("font-mono text-sm font-semibold", amountColor)}>
          {isSent ? "-" : "+"}{tx.value} ETH
        </p>
        <p className="font-mono text-[10px] text-text-muted mt-0.5">
          {formatTimestamp(tx.timestamp)}
        </p>
      </div>

      {/* Explorer link */}
      {explorerBase && (
        <a
          href={`${explorerBase}/tx/${tx.hash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-text-muted hover:text-text-secondary"
          aria-label="View on explorer"
        >
          <ExternalLink size={13} />
        </a>
      )}
    </div>
  );
}

// ─── Empty State ─────────────────────────────────────────────────

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <RefreshCw size={32} className="text-text-muted mb-3 opacity-40" />
      <p className="font-mono text-sm text-text-muted">{message}</p>
    </div>
  );
}
