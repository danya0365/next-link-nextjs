import { MainLayout } from "@/src/presentation/components/layouts/MainLayout";
import { TrendingView } from "@/src/presentation/components/trending/TrendingView";
import { TrendingPresenterFactory } from "@/src/presentation/presenters/trending/TrendingPresenter";
import type { Metadata } from "next";

/**
 * Generate metadata for the page
 */
export async function generateMetadata(): Promise<Metadata> {
  const presenter = await TrendingPresenterFactory.createServer();

  try {
    return presenter.generateMetadata();
  } catch (error) {
    console.error("Error generating metadata:", error);

    // Fallback metadata
    return {
      title: "Trending - Next Link",
      description: "หัวข้อที่กำลังมาแรง",
    };
  }
}

/**
 * Trending Page - Server Component for SEO optimization
 * หัวข้อที่กำลังมาแรง
 */
export default async function TrendingPage() {
  const presenter = await TrendingPresenterFactory.createServer();

  try {
    // Get view model from presenter
    const viewModel = await presenter.getViewModel();

    return (
      <MainLayout>
        <TrendingView initialViewModel={viewModel} />
      </MainLayout>
    );
  } catch (error) {
    console.error("Error fetching trending data:", error);

    // Fallback UI - still show the page but with empty data
    return (
      <MainLayout>
        <TrendingView />
      </MainLayout>
    );
  }
}
