import { MainLayout } from "@/src/presentation/components/layouts/MainLayout";
import { LandingView } from "@/src/presentation/components/landing/LandingView";
import { LandingPresenterFactory } from "@/src/presentation/presenters/landing/LandingPresenter";
import type { Metadata } from "next";

/**
 * Generate metadata for the page
 */
export async function generateMetadata(): Promise<Metadata> {
  const presenter = await LandingPresenterFactory.createServer();

  try {
    return presenter.generateMetadata();
  } catch (error) {
    console.error("Error generating metadata:", error);

    // Fallback metadata
    return {
      title: "Next Link - เชื่อมต่อกับคนที่คุณรัก",
      description: "แพลตฟอร์มโซเชียลมีเดียที่ทันสมัย",
    };
  }
}

/**
 * Landing Page - Server Component for SEO optimization
 * Uses presenter pattern following Clean Architecture
 */
export default async function Home() {
  const presenter = await LandingPresenterFactory.createServer();

  try {
    // Get view model from presenter
    const viewModel = await presenter.getViewModel();

    return (
      <MainLayout>
        <LandingView initialViewModel={viewModel} />
      </MainLayout>
    );
  } catch (error) {
    console.error("Error fetching landing data:", error);

    // Fallback UI - still show the page but with empty data
    return (
      <MainLayout>
        <LandingView />
      </MainLayout>
    );
  }
}
