import { MainLayout } from "@/src/presentation/components/layouts/MainLayout";
import { ProfileView } from "@/src/presentation/components/profile/ProfileView";
import { ProfilePresenterFactory } from "@/src/presentation/presenters/profile/ProfilePresenter";
import type { Metadata } from "next";
import Link from "next/link";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

interface ProfilePageProps {
  params: Promise<{ userId: string }>;
}

/**
 * Generate metadata for the page
 */
export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const presenter = await ProfilePresenterFactory.createServer();

  try {
    return presenter.generateMetadata(resolvedParams.userId);
  } catch (error) {
    console.error("Error generating metadata:", error);

    // Fallback metadata
    return {
      title: "โปรไฟล์ | Next Link",
      description: "ดูโปรไฟล์ผู้ใช้",
    };
  }
}

/**
 * Profile Page - Server Component for SEO optimization
 * Uses presenter pattern following Clean Architecture
 */
export default async function ProfilePage({ params }: ProfilePageProps) {
  const resolvedParams = await params;
  const presenter = await ProfilePresenterFactory.createServer();

  try {
    // Get view model from presenter
    const viewModel = await presenter.getViewModel(resolvedParams.userId);

    return (
      <MainLayout>
        <ProfileView userId={resolvedParams.userId} initialViewModel={viewModel} />
      </MainLayout>
    );
  } catch (error) {
    console.error("Error fetching profile data:", error);

    // Fallback UI
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              เกิดข้อผิดพลาด
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              ไม่สามารถโหลดข้อมูลโปรไฟล์ได้
            </p>
            <Link
              href="/"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              กลับหน้าแรก
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }
}
