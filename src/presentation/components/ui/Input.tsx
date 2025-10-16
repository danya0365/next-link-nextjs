import { InputHTMLAttributes, forwardRef, useState } from "react";
import { cn } from "@/src/utils/cn";
import { Eye, EyeOff } from "lucide-react";

/**
 * Input Variants
 */
export type InputVariant = "default" | "error" | "success";

/**
 * Input Sizes
 */
export type InputSize = "sm" | "md" | "lg";

/**
 * Input Props
 */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
  inputSize?: InputSize;
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

/**
 * Input Component
 * Reusable input with variants, sizes, validation states
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      variant = "default",
      inputSize = "md",
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    // Determine variant based on error
    const effectiveVariant = error ? "error" : variant;

    // Base styles
    const baseStyles =
      "border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:text-white";

    // Variant styles
    const variantStyles: Record<InputVariant, string> = {
      default:
        "border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600",
      error:
        "border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-500",
      success:
        "border-green-500 focus:border-green-500 focus:ring-green-500 dark:border-green-500",
    };

    // Size styles
    const sizeStyles: Record<InputSize, string> = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-5 py-3 text-lg",
    };

    // Icon padding
    const iconPadding = leftIcon ? "pl-10" : rightIcon || isPassword ? "pr-10" : "";

    // Width styles
    const widthStyles = fullWidth ? "w-full" : "";

    return (
      <div className={cn(widthStyles, "relative")}>
        {/* Label */}
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
              {leftIcon}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            type={inputType}
            disabled={disabled}
            className={cn(
              baseStyles,
              variantStyles[effectiveVariant],
              sizeStyles[inputSize],
              iconPadding,
              widthStyles,
              className
            )}
            {...props}
          />

          {/* Right Icon or Password Toggle */}
          {(rightIcon || isPassword) && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {isPassword ? (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
                  aria-label={showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              ) : (
                <div className="text-gray-400 pointer-events-none">{rightIcon}</div>
              )}
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}

        {/* Helper Text */}
        {!error && helperText && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
