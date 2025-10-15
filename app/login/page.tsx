import { LoginView } from "@/src/presentation/components/auth/LoginView";
import { AuthPresenterFactory } from "@/src/presentation/presenters/auth/AuthPresenter";
import type { Metadata } from "next";

/**
 * Generate metadata for the page
 */
export async function generateMetadata(): Promise<Metadata> {
  const presenter = await AuthPresenterFactory.createServer();

  try {
    return presenter.generateLoginMetadata();
  } catch (error) {
    console.error("Error generating metadata:", error);

    // Fallback metadata
    return {
      title: "เข้าสู่ระบบ | Next Link",
      description: "เข้าสู่ระบบ Next Link เพื่อเชื่อมต่อกับเพื่อนและครอบครัว",
    };
  }
}

/**
 * Login Page - Server Component
 * Auth logic is handled by authStore in client component
 */
export default function LoginPage() {
  return <LoginView />;
}
