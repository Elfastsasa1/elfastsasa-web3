"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook for syncing state with localStorage.
 * SSR-safe: defaults to initialValue on server.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const next =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(next);
      if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(next));
      }
    } catch (error) {
      console.warn(`useLocalStorage: error setting key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}
