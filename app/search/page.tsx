import { MainLayout } from "@/src/presentation/components/layouts/MainLayout";
import { SearchView } from "@/src/presentation/components/search/SearchView";
import { SearchPresenterFactory } from "@/src/presentation/presenters/search/SearchPresenter";
import type { Metadata } from "next";
import Link from "next/link";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

/**
 * Generate metadata for the page
 */
export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const presenter = await SearchPresenterFactory.createServer();
  const resolvedParams = await searchParams;

  try {
    return presenter.generateMetadata(resolvedParams.q);
  } catch (error) {
    console.error("Error generating metadata:", error);

    // Fallback metadata
    return {
      title: "ค้นหา | Next Link",
      description: "ค้นหาผู้ใช้และโพสต์บน Next Link",
    };
  }
}

/**
 * Search Page - Server Component for SEO optimization
 * Uses presenter pattern following Clean Architecture
 */
export default async function SearchPage({ searchParams }: SearchPageProps) {
  const presenter = await SearchPresenterFactory.createServer();
  const resolvedParams = await searchParams;

  try {
    // Get view model from presenter
    const viewModel = resolvedParams.q
      ? await presenter.search(resolvedParams.q)
      : await presenter.getViewModel();

    return (
      <MainLayout>
        <SearchView initialViewModel={viewModel} />
      </MainLayout>
    );
  } catch (error) {
    console.error("Error fetching search data:", error);

    // Fallback UI
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              เกิดข้อผิดพลาด
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              ไม่สามารถค้นหาได้
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
