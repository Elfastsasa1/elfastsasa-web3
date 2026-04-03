import type { NetworkInfo } from "@/types/web3";

// Supported networks map: chainId → NetworkInfo
export const NETWORKS: Record<number, NetworkInfo> = {
  1: {
    chainId: 1,
    name: "Ethereum",
    symbol: "ETH",
    explorer: "https://etherscan.io",
    color: "#627EEA",
  },
  5: {
    chainId: 5,
    name: "Goerli",
    symbol: "ETH",
    explorer: "https://goerli.etherscan.io",
    color: "#7C3AED",
  },
  11155111: {
    chainId: 11155111,
    name: "Sepolia",
    symbol: "ETH",
    explorer: "https://sepolia.etherscan.io",
    color: "#A78BFA",
  },
  137: {
    chainId: 137,
    name: "Polygon",
    symbol: "MATIC",
    explorer: "https://polygonscan.com",
    color: "#8247E5",
  },
  56: {
    chainId: 56,
    name: "BNB Chain",
    symbol: "BNB",
    explorer: "https://bscscan.com",
    color: "#F0B90B",
  },
  42161: {
    chainId: 42161,
    name: "Arbitrum",
    symbol: "ETH",
    explorer: "https://arbiscan.io",
    color: "#28A0F0",
  },
  10: {
    chainId: 10,
    name: "Optimism",
    symbol: "ETH",
    explorer: "https://optimistic.etherscan.io",
    color: "#FF0420",
  },
  8453: {
    chainId: 8453,
    name: "Base",
    symbol: "ETH",
    explorer: "https://basescan.org",
    color: "#0052FF",
  },
};

// Returns network info or a generic fallback
export function getNetwork(chainId: number | null): NetworkInfo | null {
  if (!chainId) return null;
  return NETWORKS[chainId] ?? {
    chainId,
    name: `Chain ${chainId}`,
    symbol: "ETH",
    explorer: "",
    color: "#8B949E",
  };
}
