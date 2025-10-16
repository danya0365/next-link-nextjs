import { HTMLAttributes } from "react";
import { cn } from "@/src/utils/cn";

/**
 * Badge Variants
 */
export type BadgeVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info";

/**
 * Badge Sizes
 */
export type BadgeSize = "sm" | "md" | "lg";

/**
 * Badge Props
 */
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  rounded?: boolean;
}

/**
 * Badge Component
 * Small status indicator or label
 */
export function Badge({
  className,
  variant = "default",
  size = "md",
  dot = false,
  rounded = false,
  children,
  ...props
}: BadgeProps) {
  // Base styles
  const baseStyles =
    "inline-flex items-center justify-center font-medium whitespace-nowrap";

  // Variant styles
  const variantStyles: Record<BadgeVariant, string> = {
    default:
      "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    primary:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    success:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    warning:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    danger:
      "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    info: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  };

  // Size styles
  const sizeStyles: Record<BadgeSize, string> = {
    sm: dot ? "w-2 h-2" : "px-2 py-0.5 text-xs",
    md: dot ? "w-2.5 h-2.5" : "px-2.5 py-0.5 text-sm",
    lg: dot ? "w-3 h-3" : "px-3 py-1 text-base",
  };

  // Shape styles
  const shapeStyles = rounded || dot ? "rounded-full" : "rounded";

  return (
    <span
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        shapeStyles,
        className
      )}
      {...props}
    >
      {!dot && children}
    </span>
  );
}
