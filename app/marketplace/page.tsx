import { MainLayout } from "@/src/presentation/components/layouts/MainLayout";
import { MarketplaceView } from "@/src/presentation/components/marketplace/MarketplaceView";
import { MarketplacePresenterFactory } from "@/src/presentation/presenters/marketplace/MarketplacePresenter";
import type { Metadata } from "next";

/**
 * Generate metadata for the page
 */
export async function generateMetadata(): Promise<Metadata> {
  const presenter = await MarketplacePresenterFactory.createServer();

  try {
    return presenter.generateMetadata();
  } catch (error) {
    console.error("Error generating metadata:", error);

    // Fallback metadata
    return {
      title: "Marketplace - Next Link",
      description: "ตลาดซื้อขายออนไลน์",
    };
  }
}

/**
 * Marketplace Page - Server Component for SEO optimization
 * ตลาดซื้อขายออนไลน์
 */
export default async function MarketplacePage() {
  const presenter = await MarketplacePresenterFactory.createServer();

  try {
    // Get view model from presenter
    const viewModel = await presenter.getViewModel();

    return (
      <MainLayout>
        <MarketplaceView initialViewModel={viewModel} />
      </MainLayout>
    );
  } catch (error) {
    console.error("Error fetching marketplace data:", error);

    // Fallback UI - still show the page but with empty data
    return (
      <MainLayout>
        <MarketplaceView />
      </MainLayout>
    );
  }
}
