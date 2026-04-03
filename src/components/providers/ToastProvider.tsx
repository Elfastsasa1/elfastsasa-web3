"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-react";
import type { Toast, ToastType } from "@/types/web3";
import { cn } from "@/lib/utils";

interface ToastContextValue {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextValue>({
  showToast: () => {},
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<(Toast & { exiting?: boolean })[]>([]);

  const removeToast = useCallback((id: string) => {
    // Trigger exit animation first
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 300);
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = "info", duration = 4000) => {
      const id = `toast-${Date.now()}-${Math.random()}`;
      setToasts((prev) => [...prev, { id, message, type, duration }]);
      if (duration > 0) {
        setTimeout(() => removeToast(id), duration);
      }
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container — fixed bottom-right */}
      <div
        className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none"
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// ─── Individual Toast Item ───────────────────────────────────────

const TOAST_STYLES: Record<ToastType, { icon: React.ReactNode; classes: string }> = {
  success: {
    icon: <CheckCircle size={16} />,
    classes: "border-acid/30 bg-acid/10 text-acid",
  },
  error: {
    icon: <XCircle size={16} />,
    classes: "border-danger/30 bg-danger/10 text-danger",
  },
  warning: {
    icon: <AlertTriangle size={16} />,
    classes: "border-ember/30 bg-ember/10 text-ember",
  },
  info: {
    icon: <Info size={16} />,
    classes: "border-plasma-light/30 bg-plasma/10 text-plasma-light",
  },
};

function ToastItem({
  toast,
  onClose,
}: {
  toast: Toast & { exiting?: boolean };
  onClose: () => void;
}) {
  const style = TOAST_STYLES[toast.type];

  return (
    <div
      className={cn(
        "pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-xl",
        "border backdrop-blur-sm shadow-panel",
        "min-w-[260px] max-w-[340px]",
        style.classes,
        toast.exiting ? "toast-exit" : "toast-enter"
      )}
    >
      <span className="mt-0.5 shrink-0">{style.icon}</span>
      <p className="text-sm font-body flex-1 leading-snug">{toast.message}</p>
      <button
        onClick={onClose}
        className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  );
}

export const useToast = () => useContext(ToastContext);
