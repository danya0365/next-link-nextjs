"use client";

import { Post } from "@/src/data/mock-posts";
import { PostCard } from "@/src/presentation/components/feed/PostCard";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface PostDetailViewProps {
  post: Post;
}

/**
 * Post Detail View Component
 * แสดงรายละเอียดโพสต์
 */
export function PostDetailView({ post }: PostDetailViewProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">กลับ</span>
        </button>

        {/* Post Card */}
        <PostCard post={post} />

        {/* Related Posts or Suggestions could go here */}
      </div>
    </div>
  );
}
