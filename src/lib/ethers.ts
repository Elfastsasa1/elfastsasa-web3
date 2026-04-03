import { ethers } from "ethers";

// ─── Provider ────────────────────────────────────────────────────

/**
 * Returns a BrowserProvider wrapping window.ethereum.
 * Throws if MetaMask is not installed.
 */
export function getBrowserProvider(): ethers.BrowserProvider {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("MetaMask not found. Please install MetaMask.");
  }
  return new ethers.BrowserProvider(window.ethereum);
}

// ─── Format helpers ──────────────────────────────────────────────

/** Format wei → ETH string with N decimals */
export function formatEther(wei: bigint, decimals = 4): string {
  const eth = ethers.formatEther(wei);
  return parseFloat(eth).toFixed(decimals);
}

/** Shorten address: 0x1234…5678 */
export function shortAddress(address: string, chars = 4): string {
  if (!address) return "";
  return `${address.slice(0, chars + 2)}…${address.slice(-chars)}`;
}

/** Format unix timestamp to readable date */
export function formatTimestamp(unix: number): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(unix * 1000));
}

/** Format large numbers (totalSupply etc.) */
export function formatTokenAmount(amount: bigint, decimals: number): string {
  const div = 10n ** BigInt(decimals);
  const whole = amount / div;
  if (whole > 1_000_000_000n) return `${(Number(whole) / 1e9).toFixed(2)}B`;
  if (whole > 1_000_000n) return `${(Number(whole) / 1e6).toFixed(2)}M`;
  if (whole > 1_000n) return `${(Number(whole) / 1e3).toFixed(2)}K`;
  return whole.toString();
}

// ─── ERC-20 ABI (minimal) ────────────────────────────────────────
export const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
];

// ─── Fetch token info ────────────────────────────────────────────
export async function fetchTokenInfo(
  contractAddress: string,
  provider: ethers.Provider
) {
  if (!ethers.isAddress(contractAddress)) {
    throw new Error("Invalid contract address");
  }
  const contract = new ethers.Contract(contractAddress, ERC20_ABI, provider);
  const [name, symbol, decimals, totalSupply] = await Promise.all([
    contract.name(),
    contract.symbol(),
    contract.decimals(),
    contract.totalSupply(),
  ]);
  return {
    name: name as string,
    symbol: symbol as string,
    decimals: Number(decimals),
    totalSupply: formatTokenAmount(totalSupply as bigint, Number(decimals)),
    address: contractAddress,
  };
}

// ─── Declare window.ethereum type ───────────────────────────────
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum?: any;
  }
}
