import { MainLayout } from "@/src/presentation/components/layouts/MainLayout";
import { PostDetailView } from "@/src/presentation/components/post/PostDetailView";
import { mockPosts } from "@/src/data/mock-posts";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = mockPosts.find((p) => p.id === id);

  if (!post) {
    return {
      title: "ไม่พบโพสต์ | Next Link",
    };
  }

  return {
    title: `${post.userName} - โพสต์ | Next Link`,
    description: post.content.substring(0, 160),
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const post = mockPosts.find((p) => p.id === id);

  if (!post) {
    notFound();
  }

  return (
    <MainLayout>
      <PostDetailView post={post} />
    </MainLayout>
  );
}
