import { MainLayout } from "@/src/presentation/components/layouts/MainLayout";
import { FeedView } from "@/src/presentation/components/feed/FeedView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ฟีดข่าว | Next Link",
  description: "ดูโพสต์จากเพื่อนและเพจที่คุณติดตาม",
};

/**
 * Feed Page - Server Component
 */
export default function FeedPage() {
  return (
    <MainLayout>
      <FeedView />
    </MainLayout>
  );
}
