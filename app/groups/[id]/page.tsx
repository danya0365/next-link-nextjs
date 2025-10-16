import { mockGroups } from "@/src/data/groups-mock-data";
import { GroupDetailView } from "@/src/presentation/components/groups/GroupDetailView";
import { MainLayout } from "@/src/presentation/components/layouts/MainLayout";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface GroupPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: GroupPageProps): Promise<Metadata> {
  const { id } = await params;
  const group = mockGroups.find((g) => g.id === id);

  if (!group) {
    return {
      title: "ไม่พบกลุ่ม | Next Link",
    };
  }

  return {
    title: `${group.name} | Next Link`,
    description: group.description,
  };
}

export default async function GroupPage({ params }: GroupPageProps) {
  const { id } = await params;
  const group = mockGroups.find((g) => g.id === id);

  if (!group) {
    notFound();
  }

  return (
    <MainLayout>
      <GroupDetailView group={group} />
    </MainLayout>
  );
}
