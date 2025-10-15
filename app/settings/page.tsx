import { MainLayout } from "@/src/presentation/components/layouts/MainLayout";
import { SettingsView } from "@/src/presentation/components/settings/SettingsView";
import { SettingsPresenterFactory } from "@/src/presentation/presenters/settings/SettingsPresenter";
import type { Metadata } from "next";
import Link from "next/link";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

/**
 * Generate metadata for the page
 */
export async function generateMetadata(): Promise<Metadata> {
  const presenter = await SettingsPresenterFactory.createServer();

  try {
    return presenter.generateMetadata();
  } catch (error) {
    console.error("Error generating metadata:", error);

    // Fallback metadata
    return {
      title: "ตั้งค่า | Next Link",
      description: "จัดการการตั้งค่าบัญชีและความเป็นส่วนตัวของคุณ",
    };
  }
}

/**
 * Settings Page - Server Component for SEO optimization
 * Uses presenter pattern following Clean Architecture
 */
export default async function SettingsPage() {
  const presenter = await SettingsPresenterFactory.createServer();

  try {
    // Get view model from presenter
    const viewModel = await presenter.getViewModel();

    return (
      <MainLayout>
        <SettingsView initialViewModel={viewModel} />
      </MainLayout>
    );
  } catch (error) {
    console.error("Error fetching settings data:", error);

    // Fallback UI
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              เกิดข้อผิดพลาด
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              ไม่สามารถโหลดการตั้งค่าได้
            </p>
            <Link
              href="/feed"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              กลับไปฟีด
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }
}
