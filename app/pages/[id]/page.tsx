import { MainLayout } from "@/src/presentation/components/layouts/MainLayout";
import { PageDetailView } from "@/src/presentation/components/pages/PageDetailView";
import { mockPages } from "@/src/data/pages-mock-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageDetailPageProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: PageDetailPageProps): Promise<Metadata> {
  const page = mockPages.find((p) => p.id === params.id);

  if (!page) {
    return {
      title: "ไม่พบเพจ | Next Link",
    };
  }

  return {
    title: `${page.name} | Next Link`,
    description: page.description,
  };
}

export default function PageDetailPage({ params }: PageDetailPageProps) {
  const page = mockPages.find((p) => p.id === params.id);

  if (!page) {
    notFound();
  }

  return (
    <MainLayout>
      <PageDetailView page={page} />
    </MainLayout>
  );
}
