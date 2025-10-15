import { RegisterView } from "@/src/presentation/components/auth/RegisterView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "สมัครสมาชิก | Next Link",
  description: "สมัครสมาชิก Next Link ฟรี เพื่อเชื่อมต่อกับเพื่อนและครอบครัว",
};

/**
 * Register Page - Server Component
 */
export default function RegisterPage() {
  return <RegisterView />;
}
