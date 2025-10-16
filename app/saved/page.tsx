import { MainLayout } from "@/src/presentation/components/layouts/MainLayout";
import { SavedView } from "@/src/presentation/components/saved/SavedView";
import { SavedPresenterFactory } from "@/src/presentation/presenters/saved/SavedPresenter";
import type { Metadata } from "next";

/**
 * Generate metadata for the page
 */
export async function generateMetadata(): Promise<Metadata> {
  const presenter = await SavedPresenterFactory.createServer();

  try {
    return presenter.generateMetadata();
  } catch (error) {
    console.error("Error generating metadata:", error);

    // Fallback metadata
    return {
      title: "Saved - Next Link",
      description: "รายการที่บันทึก",
    };
  }
}

/**
 * Saved Page - Server Component for SEO optimization
 * รายการที่บันทึก
 */
export default async function SavedPage() {
  const presenter = await SavedPresenterFactory.createServer();

  try {
    // Get view model from presenter
    const viewModel = await presenter.getViewModel();

    return (
      <MainLayout>
        <SavedView initialViewModel={viewModel} />
      </MainLayout>
    );
  } catch (error) {
    console.error("Error fetching saved data:", error);

    // Fallback UI - still show the page but with empty data
    return (
      <MainLayout>
        <SavedView />
      </MainLayout>
    );
  }
}
