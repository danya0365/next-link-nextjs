import { create } from "zustand";
import { ToastProps, ToastVariant } from "../components/ui/Toast";

interface ToastState {
  toasts: ToastProps[];
  addToast: (
    message: string,
    options?: {
      variant?: ToastVariant;
      title?: string;
      duration?: number;
    }
  ) => void;
  removeToast: (id: string) => void;
  success: (message: string, title?: string) => void;
  error: (message: string, title?: string) => void;
  warning: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
  clearAll: () => void;
}

/**
 * Toast Store
 * Zustand store for managing toasts/notifications
 */
export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],

  addToast: (message, options = {}) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newToast: ToastProps = {
      id,
      message,
      variant: options.variant || "info",
      title: options.title,
      duration: options.duration ?? 5000,
      onClose: get().removeToast,
    };

    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },

  success: (message, title) => {
    get().addToast(message, { variant: "success", title });
  },

  error: (message, title) => {
    get().addToast(message, { variant: "error", title });
  },

  warning: (message, title) => {
    get().addToast(message, { variant: "warning", title });
  },

  info: (message, title) => {
    get().addToast(message, { variant: "info", title });
  },

  clearAll: () => {
    set({ toasts: [] });
  },
}));
