import { TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/src/utils/cn";

/**
 * Textarea Variants
 */
export type TextareaVariant = "default" | "error" | "success";

/**
 * Textarea Sizes
 */
export type TextareaSize = "sm" | "md" | "lg";

/**
 * Textarea Props
 */
export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: TextareaVariant;
  textareaSize?: TextareaSize;
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  showCount?: boolean;
  maxLength?: number;
}

/**
 * Textarea Component
 * Reusable textarea with variants, sizes, validation states
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant = "default",
      textareaSize = "md",
      label,
      error,
      helperText,
      fullWidth = false,
      showCount = false,
      maxLength,
      disabled,
      value,
      ...props
    },
    ref
  ) => {
    // Determine variant based on error
    const effectiveVariant = error ? "error" : variant;

    // Base styles
    const baseStyles =
      "border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed resize-vertical dark:bg-gray-800 dark:text-white";

    // Variant styles
    const variantStyles: Record<TextareaVariant, string> = {
      default:
        "border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600",
      error:
        "border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-500",
      success:
        "border-green-500 focus:border-green-500 focus:ring-green-500 dark:border-green-500",
    };

    // Size styles
    const sizeStyles: Record<TextareaSize, string> = {
      sm: "px-3 py-1.5 text-sm min-h-[80px]",
      md: "px-4 py-2 text-base min-h-[100px]",
      lg: "px-5 py-3 text-lg min-h-[120px]",
    };

    // Width styles
    const widthStyles = fullWidth ? "w-full" : "";

    // Character count
    const currentLength = typeof value === "string" ? value.length : 0;

    return (
      <div className={cn(widthStyles, "relative")}>
        {/* Label */}
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Textarea */}
        <textarea
          ref={ref}
          disabled={disabled}
          maxLength={maxLength}
          value={value}
          className={cn(
            baseStyles,
            variantStyles[effectiveVariant],
            sizeStyles[textareaSize],
            widthStyles,
            className
          )}
          {...props}
        />

        {/* Error Message */}
        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}

        {/* Helper Text and Character Count */}
        <div className="mt-1 flex items-center justify-between">
          {!error && helperText && (
            <p className="text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
          )}
          {showCount && maxLength && (
            <p
              className={cn(
                "text-sm ml-auto",
                currentLength > maxLength * 0.9
                  ? "text-red-600 dark:text-red-400"
                  : "text-gray-500 dark:text-gray-400"
              )}
            >
              {currentLength}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
