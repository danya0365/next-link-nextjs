"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PostComposer } from "./PostComposer";
import { PostCard } from "./PostCard";
import { Stories } from "./Stories";
import { LeftSidebar } from "./LeftSidebar";
import { RightSidebar } from "./RightSidebar";
import { useFeedStore } from "@/src/presentation/stores/feedStore";
import { useAuthStore } from "@/src/presentation/stores/authStore";

/**
 * Feed View Component
 * หน้า News Feed หลัก
 */
export function FeedView() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const { posts, isLoading, error, loadPosts } = useFeedStore();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    // Load posts on mount
    if (posts.length === 0) {
      loadPosts();
    }
  }, [isAuthenticated, router, loadPosts, posts.length]);

  // Loading state
  if (isLoading && posts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">กำลังโหลดโพสต์...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-600 dark:text-red-400 font-medium mb-2">
            เกิดข้อผิดพลาด
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={loadPosts}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            ลองใหม่อีกครั้ง
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Left Sidebar */}
      <LeftSidebar />

      {/* Main Content */}
      <div className="lg:ml-64 xl:ml-72 xl:mr-80">
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
          {/* Stories */}
          <Stories />

          {/* Post Composer */}
          <PostComposer />

          {/* Posts Feed */}
          <div className="space-y-4">
            {posts.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-12 text-center">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  ยังไม่มีโพสต์
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  เริ่มต้นโพสต์อะไรสักอย่างเพื่อแชร์กับเพื่อนๆ
                </p>
              </div>
            ) : (
              posts.map((post) => <PostCard key={post.id} post={post} />)
            )}
          </div>

          {/* Load More */}
          {posts.length > 0 && (
            <div className="text-center py-4">
              <button className="px-6 py-3 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg font-medium transition-colors">
                โหลดโพสต์เพิ่มเติม
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      <RightSidebar />
    </div>
  );
}
