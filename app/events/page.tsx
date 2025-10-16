import { MainLayout } from "@/src/presentation/components/layouts/MainLayout";
import { EventsView } from "@/src/presentation/components/events/EventsView";
import { EventsPresenterFactory } from "@/src/presentation/presenters/events/EventsPresenter";
import type { Metadata } from "next";

/**
 * Generate metadata for the page
 */
export async function generateMetadata(): Promise<Metadata> {
  const presenter = await EventsPresenterFactory.createServer();

  try {
    return presenter.generateMetadata();
  } catch (error) {
    console.error("Error generating metadata:", error);

    // Fallback metadata
    return {
      title: "Events - Next Link",
      description: "อีเว้นท์และกิจกรรม",
    };
  }
}

/**
 * Events Page - Server Component for SEO optimization
 * อีเว้นท์และกิจกรรม
 */
export default async function EventsPage() {
  const presenter = await EventsPresenterFactory.createServer();

  try {
    // Get view model from presenter
    const viewModel = await presenter.getViewModel();

    return (
      <MainLayout>
        <EventsView initialViewModel={viewModel} />
      </MainLayout>
    );
  } catch (error) {
    console.error("Error fetching events data:", error);

    // Fallback UI - still show the page but with empty data
    return (
      <MainLayout>
        <EventsView />
      </MainLayout>
    );
  }
}
