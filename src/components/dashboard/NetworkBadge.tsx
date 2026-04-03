"use client";

import React from "react";
import { useWeb3 } from "@/components/providers/Web3Provider";
import { getNetwork } from "@/lib/networks";

export function NetworkBadge() {
  const { wallet } = useWeb3();
  const network = getNetwork(wallet.chainId);

  if (!wallet.isConnected || !network) return null;

  return (
    <div
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-mono font-medium"
      style={{
        borderColor: `${network.color}40`,
        backgroundColor: `${network.color}10`,
        color: network.color,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{
          backgroundColor: network.color,
          boxShadow: `0 0 5px ${network.color}`,
        }}
      />
      {network.name}
    </div>
  );
}
