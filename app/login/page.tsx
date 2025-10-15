import { LoginView } from "@/src/presentation/components/auth/LoginView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "เข้าสู่ระบบ | Next Link",
  description: "เข้าสู่ระบบ Next Link เพื่อเชื่อมต่อกับเพื่อนและครอบครัว",
};

/**
 * Login Page - Server Component
 */
export default function LoginPage() {
  return <LoginView />;
}
