import { MainLayout } from "@/src/presentation/components/layouts/MainLayout";
import { WatchView } from "@/src/presentation/components/watch/WatchView";
import { WatchPresenterFactory } from "@/src/presentation/presenters/watch/WatchPresenter";
import type { Metadata } from "next";

/**
 * Generate metadata for the page
 */
export async function generateMetadata(): Promise<Metadata> {
  const presenter = await WatchPresenterFactory.createServer();

  try {
    return presenter.generateMetadata();
  } catch (error) {
    console.error("Error generating metadata:", error);

    // Fallback metadata
    return {
      title: "Watch - Next Link",
      description: "รับชมวิดีโอที่น่าสนใจ",
    };
  }
}

/**
 * Watch Page - Server Component for SEO optimization
 * Video platform page
 */
export default async function WatchPage() {
  const presenter = await WatchPresenterFactory.createServer();

  try {
    // Get view model from presenter
    const viewModel = await presenter.getViewModel();

    return (
      <MainLayout>
        <WatchView initialViewModel={viewModel} />
      </MainLayout>
    );
  } catch (error) {
    console.error("Error fetching watch data:", error);

    // Fallback UI - still show the page but with empty data
    return (
      <MainLayout>
        <WatchView />
      </MainLayout>
    );
  }
}
