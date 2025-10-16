import { MainLayout } from "@/src/presentation/components/layouts/MainLayout";
import { GroupsView } from "@/src/presentation/components/groups/GroupsView";
import { GroupsPresenterFactory } from "@/src/presentation/presenters/groups/GroupsPresenter";
import type { Metadata } from "next";

/**
 * Generate metadata for the page
 */
export async function generateMetadata(): Promise<Metadata> {
  const presenter = await GroupsPresenterFactory.createServer();

  try {
    return presenter.generateMetadata();
  } catch (error) {
    console.error("Error generating metadata:", error);

    // Fallback metadata
    return {
      title: "Groups - Next Link",
      description: "กลุ่มและชุมชน",
    };
  }
}

/**
 * Groups Page - Server Component for SEO optimization
 * กลุ่มและชุมชน
 */
export default async function GroupsPage() {
  const presenter = await GroupsPresenterFactory.createServer();

  try {
    // Get view model from presenter
    const viewModel = await presenter.getViewModel();

    return (
      <MainLayout>
        <GroupsView initialViewModel={viewModel} />
      </MainLayout>
    );
  } catch (error) {
    console.error("Error fetching groups data:", error);

    // Fallback UI - still show the page but with empty data
    return (
      <MainLayout>
        <GroupsView />
      </MainLayout>
    );
  }
}
