"use client";

import { useEffect } from "react";
import { cn } from "@/src/utils/cn";
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";

/**
 * Toast Variants
 */
export type ToastVariant = "success" | "error" | "warning" | "info";

/**
 * Toast Position
 */
export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

/**
 * Toast Props
 */
export interface ToastProps {
  id: string;
  variant?: ToastVariant;
  title?: string;
  message: string;
  position?: ToastPosition;
  duration?: number;
  showCloseButton?: boolean;
  onClose: (id: string) => void;
}

/**
 * Toast Component
 * Notification toast with auto-dismiss
 */
export function Toast({
  id,
  variant = "info",
  title,
  message,
  position = "top-right",
  duration = 5000,
  showCloseButton = true,
  onClose,
}: ToastProps) {
  // Auto dismiss
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  // Icon mapping
  const icons: Record<ToastVariant, React.ReactNode> = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
  };

  // Variant styles
  const variantStyles: Record<ToastVariant, string> = {
    success:
      "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200",
    error:
      "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200",
    warning:
      "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200",
    info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200",
  };

  // Icon color styles
  const iconColorStyles: Record<ToastVariant, string> = {
    success: "text-green-600 dark:text-green-400",
    error: "text-red-600 dark:text-red-400",
    warning: "text-yellow-600 dark:text-yellow-400",
    info: "text-blue-600 dark:text-blue-400",
  };

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 rounded-lg border shadow-lg min-w-[300px] max-w-md animate-in slide-in-from-right-full duration-300",
        variantStyles[variant]
      )}
      role="alert"
      aria-live="polite"
    >
      {/* Icon */}
      <div className={cn("flex-shrink-0 mt-0.5", iconColorStyles[variant])}>
        {icons[variant]}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && <p className="font-semibold mb-1">{title}</p>}
        <p className="text-sm">{message}</p>
      </div>

      {/* Close Button */}
      {showCloseButton && (
        <button
          onClick={() => onClose(id)}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded"
          aria-label="ปิด"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

/**
 * Toast Container Props
 */
export interface ToastContainerProps {
  toasts: ToastProps[];
  position?: ToastPosition;
}

/**
 * Toast Container Component
 * Container for managing multiple toasts
 */
export function ToastContainer({
  toasts,
  position = "top-right",
}: ToastContainerProps) {
  // Position styles
  const positionStyles: Record<ToastPosition, string> = {
    "top-left": "top-4 left-4",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
    "bottom-right": "bottom-4 right-4",
  };

  if (toasts.length === 0) return null;

  return (
    <div
      className={cn("fixed z-50 flex flex-col gap-2", positionStyles[position])}
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} position={position} />
      ))}
    </div>
  );
}
