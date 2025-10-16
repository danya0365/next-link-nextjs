"use client";

import { PagesViewModel } from "@/src/presentation/presenters/pages/PagesPresenter";
import { usePagesPresenter } from "@/src/presentation/presenters/pages/usePagesPresenter";
import { useAuthStore } from "@/src/presentation/stores/authStore";
import { formatNumber } from "@/src/utils/text-helpers";
import {
  Check,
  FileText,
  Heart,
  Plus,
  Search,
  Star,
  ThumbsUp,
  UserPlus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface PagesViewProps {
  initialViewModel?: PagesViewModel;
}

/**
 * Pages View Component
 * เพจและธุรกิจ
 */
export function PagesView({ initialViewModel }: PagesViewProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [state, actions] = usePagesPresenter(initialViewModel);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <FileText className="w-8 h-8" />
                เพจ
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                ค้นพบและติดตามเพจที่คุณสนใจ
              </p>
            </div>
            <button className="hidden md:flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium">
              <Plus className="w-5 h-5" />
              <span>สร้างเพจ</span>
            </button>
          </div>

          {/* Search */}
          <div className="mt-6">
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={state.searchQuery}
                onChange={(e) => actions.setSearchQuery(e.target.value)}
                placeholder="ค้นหาเพจ..."
                className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="mt-6 flex items-center gap-3 overflow-x-auto pb-2">
            {state.viewModel?.categories.map((category) => (
              <button
                key={category.id}
                onClick={() => actions.setCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  state.selectedCategory === category.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                <span>{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Following Pages */}
        {state.viewModel?.followingPages &&
          state.viewModel.followingPages.length > 0 &&
          state.selectedCategory === "all" &&
          !state.searchQuery && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-500" />
                เพจที่คุณติดตาม
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {state.viewModel.followingPages.map((page) => (
                  <Link
                    key={page.id}
                    href={`/pages/${page.id}`}
                    className="group cursor-pointer bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
                  >
                    <div className="relative h-32">
                      <Image
                        src={page.coverImage}
                        alt={page.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {page.verified && (
                        <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-1">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {page.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                        {page.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{formatNumber(page.likes)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <UserPlus className="w-4 h-4" />
                          <span>{formatNumber(page.followers)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        {/* Suggested Pages */}
        {state.viewModel?.suggestedPages &&
          state.viewModel.suggestedPages.length > 0 &&
          state.selectedCategory === "all" &&
          !state.searchQuery && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                💡 เพจแนะนำสำหรับคุณ
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {state.viewModel.suggestedPages.map((page) => (
                  <div
                    key={page.id}
                    className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
                  >
                    <Link href={`/pages/${page.id}`}>
                      <div className="relative h-32 cursor-pointer">
                        <Image
                          src={page.coverImage}
                          alt={page.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {page.verified && (
                          <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-1">
                            <Check className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </Link>
                    <div className="p-4">
                      <Link href={`/pages/${page.id}`}>
                        <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1 mb-2 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          {page.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                        {page.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{formatNumber(page.likes)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <UserPlus className="w-4 h-4" />
                          <span>{formatNumber(page.followers)}</span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          actions.toggleFollowPage(page.id);
                        }}
                        className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2"
                      >
                        <UserPlus className="w-4 h-4" />
                        <span>ติดตาม</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* All Pages */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {state.searchQuery
              ? `ผลการค้นหา "${state.searchQuery}"`
              : state.selectedCategory === "all"
              ? "เพจทั้งหมด"
              : state.selectedCategory === "following"
              ? "กำลังติดตาม"
              : state.selectedCategory === "discover"
              ? "ค้นพบเพจใหม่"
              : `${
                  state.viewModel?.categories.find(
                    (c) => c.id === state.selectedCategory
                  )?.name || ""
                }`}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {state.filteredPages.length} เพจ
          </p>
        </div>

        {state.loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-xl h-32 mb-3" />
                <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded mb-2" />
                <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : state.filteredPages.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              ไม่พบเพจ
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              ลองค้นหาด้วยคำอื่นหรือเลือกหมวดหมู่อื่น
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {state.filteredPages.map((page) => (
              <div
                key={page.id}
                className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
              >
                <Link href={`/pages/${page.id}`}>
                  <div className="relative h-40 cursor-pointer">
                    <Image
                      src={page.coverImage}
                      alt={page.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {page.verified && (
                      <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-1">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </Link>

                <div className="p-4">
                  <Link href={`/pages/${page.id}`}>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-1 mb-2 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {page.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                    {page.description}
                  </p>

                  {page.rating && (
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(page.rating!)
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {page.rating} ({formatNumber(page.reviewsCount || 0)} รีวิว)
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Heart
                        className={`w-4 h-4 ${
                          page.isLiked ? "text-red-500 fill-red-500" : ""
                        }`}
                      />
                      <span>{formatNumber(page.likes)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <UserPlus className="w-4 h-4" />
                      <span>{formatNumber(page.followers)}</span>
                    </div>
                  </div>

                  {page.isFollowing ? (
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          actions.toggleLikePage(page.id);
                        }}
                        className={`flex-1 px-4 py-2 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2 ${
                          page.isLiked
                            ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            page.isLiked ? "fill-red-500" : ""
                          }`}
                        />
                        <span>{page.isLiked ? "ถูกใจแล้ว" : "ถูกใจ"}</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          actions.toggleFollowPage(page.id);
                        }}
                        className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        <span>กำลังติดตาม</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        actions.toggleFollowPage(page.id);
                      }}
                      className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>ติดตาม</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
