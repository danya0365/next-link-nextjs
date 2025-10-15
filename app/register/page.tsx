import { RegisterView } from "@/src/presentation/components/auth/RegisterView";
import { AuthPresenterFactory } from "@/src/presentation/presenters/auth/AuthPresenter";
import type { Metadata } from "next";

/**
 * Generate metadata for the page
 */
export async function generateMetadata(): Promise<Metadata> {
  const presenter = await AuthPresenterFactory.createServer();

  try {
    return presenter.generateRegisterMetadata();
  } catch (error) {
    console.error("Error generating metadata:", error);

    // Fallback metadata
    return {
      title: "สมัครสมาชิก | Next Link",
      description: "สมัครสมาชิก Next Link ฟรี เพื่อเชื่อมต่อกับเพื่อนและครอบครัว",
    };
  }
}

/**
 * Register Page - Server Component
 * Auth logic is handled by authStore in client component
 */
export default function RegisterPage() {
  return <RegisterView />;
}
