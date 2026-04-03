"use client";

import { useState, useCallback } from "react";
import { ethers } from "ethers";
import { fetchTokenInfo } from "@/lib/ethers";
import type { TokenInfo } from "@/types/web3";

interface UseTokenCheckerReturn {
  tokenInfo: TokenInfo | null;
  loading: boolean;
  error: string | null;
  check: (address: string, provider: ethers.Provider) => Promise<void>;
  reset: () => void;
}

/**
 * Hook that encapsulates ERC-20 token checking logic.
 * Separates data-fetching concern from the UI component.
 */
export function useTokenChecker(): UseTokenCheckerReturn {
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const check = useCallback(
    async (address: string, provider: ethers.Provider) => {
      setLoading(true);
      setError(null);
      setTokenInfo(null);
      try {
        const info = await fetchTokenInfo(address, provider);
        setTokenInfo(info);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        setError(msg);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setTokenInfo(null);
    setError(null);
    setLoading(false);
  }, []);

  return { tokenInfo, loading, error, check, reset };
}
