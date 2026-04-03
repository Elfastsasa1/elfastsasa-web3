// ─── Wallet State ───────────────────────────────────────────────
export interface WalletState {
  address: string | null;
  balance: string | null;   // formatted ETH string
  chainId: number | null;
  isConnecting: boolean;
  isConnected: boolean;
  error: string | null;
}

// ─── Network Info ────────────────────────────────────────────────
export interface NetworkInfo {
  chainId: number;
  name: string;
  symbol: string;
  explorer: string;
  color: string;
}

// ─── Transaction ─────────────────────────────────────────────────
export interface Transaction {
  hash: string;
  from: string;
  to: string | null;
  value: string;       // ETH value string
  timestamp: number;   // unix
  status: "success" | "pending" | "failed";
  type: "sent" | "received" | "contract";
}

// ─── Token Info ──────────────────────────────────────────────────
export interface TokenInfo {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
  address: string;
}

// ─── Toast ───────────────────────────────────────────────────────
export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}
