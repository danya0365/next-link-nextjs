import { mockConversations, mockMessages } from "@/src/data/mock-messages";
import { MainLayout } from "@/src/presentation/components/layouts/MainLayout";
import { MessageDetailView } from "@/src/presentation/components/messages/MessageDetailView";
import type { Metadata } from "next";

interface MessageDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: MessageDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const conversation = mockConversations.find((c) => c.id === id);

  if (!conversation) {
    return {
      title: "ไม่พบการสนทนา | Next Link",
    };
  }

  return {
    title: `แชทกับ ${conversation.participantName} | Next Link`,
    description: `การสนทนากับ ${conversation.participantName}`,
  };
}

export default async function MessageDetailPage({
  params,
}: MessageDetailPageProps) {
  const { id } = await params;
  const conversation = mockConversations.find((c) => c.id === id);

  if (!conversation) {
    return (
      <MainLayout>
        <div className="text-center py-12">ไม่พบการสนทนา</div>
      </MainLayout>
    );
  }

  const messages = mockMessages[id] || [];
  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <MainLayout>
      <MessageDetailView
        conversation={conversation}
        initialMessages={sortedMessages}
      />
    </MainLayout>
  );
}
