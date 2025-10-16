import { MainLayout } from "@/src/presentation/components/layouts/MainLayout";
import { GroupDetailView } from "@/src/presentation/components/groups/GroupDetailView";
import { mockGroups } from "@/src/data/groups-mock-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface GroupPageProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: GroupPageProps): Promise<Metadata> {
  const group = mockGroups.find((g) => g.id === params.id);

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

export default function GroupPage({ params }: GroupPageProps) {
  const group = mockGroups.find((g) => g.id === params.id);

  if (!group) {
    notFound();
  }

  return (
    <MainLayout>
      <GroupDetailView group={group} />
    </MainLayout>
  );
}
