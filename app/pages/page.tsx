import { MainLayout } from "@/src/presentation/components/layouts/MainLayout";
import { PagesView } from "@/src/presentation/components/pages/PagesView";
import { PagesPresenterFactory } from "@/src/presentation/presenters/pages/PagesPresenter";
import type { Metadata } from "next";

/**
 * Generate metadata for the page
 */
export async function generateMetadata(): Promise<Metadata> {
  const presenter = await PagesPresenterFactory.createServer();

  try {
    return presenter.generateMetadata();
  } catch (error) {
    console.error("Error generating metadata:", error);

    // Fallback metadata
    return {
      title: "Pages - Next Link",
      description: "เพจ",
    };
  }
}

/**
 * Pages Page - Server Component for SEO optimization
 * เพจและธุรกิจ
 */
export default async function PagesPage() {
  const presenter = await PagesPresenterFactory.createServer();

  try {
    // Get view model from presenter
    const viewModel = await presenter.getViewModel();

    return (
      <MainLayout>
        <PagesView initialViewModel={viewModel} />
      </MainLayout>
    );
  } catch (error) {
    console.error("Error fetching pages data:", error);

    // Fallback UI - still show the page but with empty data
    return (
      <MainLayout>
        <PagesView />
      </MainLayout>
    );
  }
}
