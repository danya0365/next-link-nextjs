/**
 * UI Components Library
 * Reusable components following Atomic Design and Clean Architecture
 */

// Form Components
export { Button } from "./Button";
export type { ButtonProps, ButtonVariant, ButtonSize } from "./Button";

export { Input } from "./Input";
export type { InputProps, InputVariant, InputSize } from "./Input";

export { Textarea } from "./Textarea";
export type { TextareaProps, TextareaVariant, TextareaSize } from "./Textarea";

// Feedback Components
export { Modal } from "./Modal";
export type { ModalProps, ModalSize } from "./Modal";

export { Toast, ToastContainer } from "./Toast";
export type {
  ToastProps,
  ToastVariant,
  ToastPosition,
  ToastContainerProps,
} from "./Toast";

export { Spinner, FullPageSpinner } from "./Spinner";
export type { SpinnerProps, SpinnerSize } from "./Spinner";

export {
  Skeleton,
  SkeletonText,
  SkeletonCard,
  SkeletonAvatar,
} from "./Skeleton";
export type { SkeletonProps } from "./Skeleton";

// Data Display Components
export { Badge } from "./Badge";
export type { BadgeProps, BadgeVariant, BadgeSize } from "./Badge";

export { Avatar } from "./Avatar";
export type { AvatarProps, AvatarSize } from "./Avatar";
