"use client";

import React from "react";
import { TrendingUp, Activity, Layers, Zap } from "lucide-react";
import { useWeb3 } from "@/components/providers/Web3Provider";
import { getMockTransactions } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface StatCard {
  label: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  color: string;
  glowColor: string;
}

export function StatsGrid() {
  const { wallet } = useWeb3();

  // Build stats from wallet + mock tx data
  const txs = wallet.address ? getMockTransactions(wallet.address) : [];
  const totalSent = txs
    .filter((t) => t.type === "sent" && t.status === "success")
    .reduce((acc, t) => acc + parseFloat(t.value), 0);
  const totalReceived = txs
    .filter((t) => t.type === "received" && t.status === "success")
    .reduce((acc, t) => acc + parseFloat(t.value), 0);

  const stats: StatCard[] = [
    {
      label: "ETH Balance",
      value: wallet.isConnected ? `${wallet.balance ?? "0.0000"}` : "—",
      sub: "Current balance",
      icon: <Zap size={18} />,
      color: "text-acid",
      glowColor: "rgba(0,255,148,0.15)",
    },
    {
      label: "Total Sent",
      value: wallet.isConnected ? `${totalSent.toFixed(4)}` : "—",
      sub: `${txs.filter((t) => t.type === "sent").length} transactions`,
      icon: <TrendingUp size={18} />,
      color: "text-danger",
      glowColor: "rgba(239,68,68,0.15)",
    },
    {
      label: "Total Received",
      value: wallet.isConnected ? `${totalReceived.toFixed(4)}` : "—",
      sub: `${txs.filter((t) => t.type === "received").length} transactions`,
      icon: <Activity size={18} />,
      color: "text-plasma-light",
      glowColor: "rgba(167,139,250,0.15)",
    },
    {
      label: "Transactions",
      value: wallet.isConnected ? `${txs.length}` : "—",
      sub: `${txs.filter((t) => t.status === "pending").length} pending`,
      icon: <Layers size={18} />,
      color: "text-ember",
      glowColor: "rgba(245,158,11,0.15)",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} stat={stat} connected={wallet.isConnected} />
      ))}
    </div>
  );
}

function StatCard({
  stat,
  connected,
}: {
  stat: StatCard;
  connected: boolean;
}) {
  return (
    <div
      className={cn(
        "card p-4 flex flex-col gap-3 relative overflow-hidden",
        "hover:border-border/80 transition-colors duration-200"
      )}
    >
      {/* Subtle glow bg */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"
        style={{ background: `radial-gradient(circle at 0% 0%, ${stat.glowColor}, transparent 70%)` }}
        aria-hidden
      />

      {/* Icon */}
      <div
        className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center",
          "bg-border/50",
          stat.color
        )}
      >
        {stat.icon}
      </div>

      {/* Value */}
      <div>
        <p className={cn("font-display text-2xl font-bold", connected ? stat.color : "text-text-muted")}>
          {stat.value}
          {connected && stat.label !== "Transactions" && (
            <span className="text-xs font-mono text-text-muted ml-1">ETH</span>
          )}
        </p>
        <p className="font-mono text-[11px] text-text-muted mt-0.5">{stat.sub}</p>
      </div>

      {/* Label */}
      <p className="font-mono text-xs text-text-secondary uppercase tracking-wider">
        {stat.label}
      </p>
    </div>
  );
}
