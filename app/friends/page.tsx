import { MainLayout } from "@/src/presentation/components/layouts/MainLayout";
import { FriendsView } from "@/src/presentation/components/friends/FriendsView";
import { FriendsPresenterFactory } from "@/src/presentation/presenters/friends/FriendsPresenter";
import type { Metadata } from "next";
import Link from "next/link";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

/**
 * Generate metadata for the page
 */
export async function generateMetadata(): Promise<Metadata> {
  const presenter = await FriendsPresenterFactory.createServer();

  try {
    const viewModel = await presenter.getViewModel();
    return presenter.generateMetadata(viewModel.totalFriends);
  } catch (error) {
    console.error("Error generating metadata:", error);

    // Fallback metadata
    return {
      title: "เพื่อน | Next Link",
      description: "จัดการเพื่อนและคำขอเป็นเพื่อน",
    };
  }
}

/**
 * Friends Page - Server Component for SEO optimization
 * Uses presenter pattern following Clean Architecture
 */
export default async function FriendsPage() {
  const presenter = await FriendsPresenterFactory.createServer();

  try {
    // Get view model from presenter
    const viewModel = await presenter.getViewModel();

    return (
      <MainLayout>
        <FriendsView initialViewModel={viewModel} />
      </MainLayout>
    );
  } catch (error) {
    console.error("Error fetching friends data:", error);

    // Fallback UI
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              เกิดข้อผิดพลาด
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              ไม่สามารถโหลดข้อมูลเพื่อนได้
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
