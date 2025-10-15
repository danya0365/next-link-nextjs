"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PostComposer } from "./PostComposer";
import { PostCard } from "./PostCard";
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
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {/* Welcome Message */}
        {user && (
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-md p-6 text-white">
            <h1 className="text-2xl font-bold mb-2">
              สวัสดี, {user.name.split(" ")[0]}! 👋
            </h1>
            <p className="text-blue-100">
              มีอะไรน่าสนใจเกิดขึ้นวันนี้บ้าง?
            </p>
          </div>
        )}

        {/* Post Composer */}
        <PostComposer />

        {/* Filter Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-2">
          <div className="flex space-x-2">
            <button className="flex-1 py-2 px-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg font-medium">
              📰 โพสต์ทั้งหมด
            </button>
            <button className="flex-1 py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg font-medium transition-colors">
              👥 เพื่อน
            </button>
            <button className="flex-1 py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg font-medium transition-colors">
              📄 เพจ
            </button>
          </div>
        </div>

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
  );
}
