import { HTMLAttributes } from "react";
import { cn } from "@/src/utils/cn";
import { Loader2 } from "lucide-react";

/**
 * Spinner Sizes
 */
export type SpinnerSize = "sm" | "md" | "lg" | "xl";

/**
 * Spinner Props
 */
export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize;
  label?: string;
  centered?: boolean;
}

/**
 * Spinner Component
 * Loading spinner indicator
 */
export function Spinner({
  className,
  size = "md",
  label,
  centered = false,
  ...props
}: SpinnerProps) {
  // Size styles
  const sizeStyles: Record<SpinnerSize, string> = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  const spinner = (
    <div
      className={cn(
        "inline-flex flex-col items-center justify-center gap-2",
        className
      )}
      role="status"
      aria-live="polite"
      {...props}
    >
      <Loader2
        className={cn("animate-spin text-blue-600 dark:text-blue-400", sizeStyles[size])}
        aria-label={label || "กำลังโหลด"}
      />
      {label && (
        <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
      )}
    </div>
  );

  if (centered) {
    return (
      <div className="flex items-center justify-center w-full h-full min-h-[200px]">
        {spinner}
      </div>
    );
  }

  return spinner;
}

/**
 * Full Page Spinner
 */
export function FullPageSpinner({ label }: { label?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <Spinner size="xl" label={label || "กำลังโหลด..."} />
    </div>
  );
}
