import { HTMLAttributes } from "react";
import Image from "next/image";
import { cn } from "@/src/utils/cn";
import { User } from "lucide-react";

/**
 * Avatar Sizes
 */
export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

/**
 * Avatar Props
 */
export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  online?: boolean;
  shape?: "circle" | "square";
  fallbackColor?: string;
}

/**
 * Avatar Component
 * User avatar with fallback and online indicator
 */
export function Avatar({
  className,
  src,
  alt,
  name,
  size = "md",
  online,
  shape = "circle",
  fallbackColor,
  ...props
}: AvatarProps) {
  // Size styles
  const sizeStyles: Record<AvatarSize, { container: string; text: string; indicator: string }> = {
    xs: { container: "w-6 h-6", text: "text-xs", indicator: "w-1.5 h-1.5" },
    sm: { container: "w-8 h-8", text: "text-sm", indicator: "w-2 h-2" },
    md: { container: "w-10 h-10", text: "text-base", indicator: "w-2.5 h-2.5" },
    lg: { container: "w-12 h-12", text: "text-lg", indicator: "w-3 h-3" },
    xl: { container: "w-16 h-16", text: "text-xl", indicator: "w-4 h-4" },
    "2xl": { container: "w-20 h-20", text: "text-2xl", indicator: "w-5 h-5" },
  };

  // Shape styles
  const shapeStyles = shape === "circle" ? "rounded-full" : "rounded-lg";

  // Get initials from name
  const getInitials = (name: string): string => {
    const words = name.trim().split(" ");
    if (words.length >= 2) {
      return `${words[0].charAt(0)}${words[1].charAt(0)}`.toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  // Generate color from name
  const getColorFromName = (name: string): string => {
    if (fallbackColor) return fallbackColor;

    const colors = [
      "from-blue-500 to-purple-600",
      "from-green-500 to-teal-600",
      "from-pink-500 to-rose-600",
      "from-orange-500 to-red-600",
      "from-indigo-500 to-blue-600",
      "from-purple-500 to-pink-600",
    ];

    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className={cn("relative inline-block", className)} {...props}>
      {/* Avatar Container */}
      <div
        className={cn(
          "relative overflow-hidden",
          sizeStyles[size].container,
          shapeStyles
        )}
      >
        {src ? (
          // Avatar with image
          <Image
            src={src}
            alt={alt || name || "Avatar"}
            fill
            sizes={sizeStyles[size].container}
            className="object-cover"
          />
        ) : name ? (
          // Fallback with initials
          <div
            className={cn(
              "w-full h-full flex items-center justify-center text-white font-semibold bg-gradient-to-br",
              getColorFromName(name),
              sizeStyles[size].text
            )}
          >
            {getInitials(name)}
          </div>
        ) : (
          // Default fallback icon
          <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
            <User className="w-1/2 h-1/2" />
          </div>
        )}
      </div>

      {/* Online Indicator */}
      {online !== undefined && (
        <span
          className={cn(
            "absolute bottom-0 right-0 border-2 border-white dark:border-gray-800 rounded-full",
            sizeStyles[size].indicator,
            online ? "bg-green-500" : "bg-gray-400"
          )}
          aria-label={online ? "ออนไลน์" : "ออฟไลน์"}
        />
      )}
    </div>
  );
}
