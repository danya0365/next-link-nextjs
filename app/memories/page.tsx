import { MainLayout } from "@/src/presentation/components/layouts/MainLayout";
import { MemoriesView } from "@/src/presentation/components/memories/MemoriesView";
import { MemoriesPresenterFactory } from "@/src/presentation/presenters/memories/MemoriesPresenter";
import type { Metadata } from "next";

/**
 * Generate metadata for the page
 */
export async function generateMetadata(): Promise<Metadata> {
  const presenter = await MemoriesPresenterFactory.createServer();

  try {
    return presenter.generateMetadata();
  } catch (error) {
    console.error("Error generating metadata:", error);

    // Fallback metadata
    return {
      title: "Memories - Next Link",
      description: "ความทรงจำ",
    };
  }
}

/**
 * Memories Page - Server Component for SEO optimization
 * ความทรงจำ
 */
export default async function MemoriesPage() {
  const presenter = await MemoriesPresenterFactory.createServer();

  try {
    // Get view model from presenter
    const viewModel = await presenter.getViewModel();

    return (
      <MainLayout>
        <MemoriesView initialViewModel={viewModel} />
      </MainLayout>
    );
  } catch (error) {
    console.error("Error fetching memories data:", error);

    // Fallback UI - still show the page but with empty data
    return (
      <MainLayout>
        <MemoriesView />
      </MainLayout>
    );
  }
}
