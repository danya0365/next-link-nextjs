import { MainLayout } from "@/src/presentation/components/layouts/MainLayout";
import { ProfileView } from "@/src/presentation/components/profile/ProfileView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "โปรไฟล์ | Next Link",
  description: "ดูโปรไฟล์ผู้ใช้",
};

interface ProfilePageProps {
  params: {
    userId: string;
  };
}

/**
 * Profile Page - Server Component
 */
export default function ProfilePage({ params }: ProfilePageProps) {
  return (
    <MainLayout>
      <ProfileView userId={params.userId} />
    </MainLayout>
  );
}
