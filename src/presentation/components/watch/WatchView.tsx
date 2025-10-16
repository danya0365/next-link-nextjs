"use client";

import { WatchViewModel } from "@/src/presentation/presenters/watch/WatchPresenter";
import { useWatchPresenter } from "@/src/presentation/presenters/watch/useWatchPresenter";
import { useAuthStore } from "@/src/presentation/stores/authStore";
import { formatDistanceToNow } from "@/src/utils/date-helpers";
import { formatNumber } from "@/src/utils/text-helpers";
import {
  Clock,
  Eye,
  Play,
  Search,
  ThumbsDown,
  ThumbsUp,
  X,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface WatchViewProps {
  initialViewModel?: WatchViewModel;
}

/**
 * Watch View Component
 * Video platform page
 */
export function WatchView({ initialViewModel }: WatchViewProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [state, actions] = useWatchPresenter(initialViewModel);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    actions.search(searchInput);
  };

  const handleCategoryClick = (categoryId: string) => {
    actions.filterByCategory(categoryId);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Play className="w-6 h-6" />
              วิดีโอ
            </h1>
          </div>
          <form onSubmit={handleSearch} className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="ค้นหาวิดีโอ..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </form>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {state.viewModel?.categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  state.selectedCategory === category.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                <span>{category.icon}</span>
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Video */}
        {state.viewModel?.featuredVideo &&
          state.selectedCategory === "all" &&
          !state.searchQuery && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                🔥 วิดีโอแนะนำ
              </h2>
              <div
                className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-xl"
                onClick={() =>
                  actions.selectVideo(state.viewModel!.featuredVideo!)
                }
              >
                <div className="relative aspect-video">
                  <Image
                    src={state.viewModel.featuredVideo.thumbnail}
                    alt={state.viewModel.featuredVideo.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                      <Play
                        className="w-10 h-10 text-white ml-1"
                        fill="currentColor"
                      />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {state.viewModel.featuredVideo.title}
                    </h3>
                    <div className="flex items-center gap-4 text-white/90 text-sm">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>
                          {formatNumber(state.viewModel.featuredVideo.views)}{" "}
                          ครั้ง
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{state.viewModel.featuredVideo.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        {/* Videos Grid */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {state.searchQuery
              ? `ผลการค้นหา "${state.searchQuery}"`
              : state.selectedCategory === "all"
              ? "วิดีโอทั้งหมด"
              : `${
                  state.viewModel?.categories.find(
                    (c) => c.id === state.selectedCategory
                  )?.name || ""
                }`}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {state.filteredVideos.length} วิดีโอ
          </p>
        </div>

        {state.loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-xl aspect-video mb-3" />
                <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded mb-2" />
                <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : state.filteredVideos.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              ไม่พบวิดีโอ
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              ลองค้นหาด้วยคำอื่นหรือเลือกหมวดหมู่อื่น
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {state.filteredVideos.map((video) => (
              <div
                key={video.id}
                className="group cursor-pointer"
                onClick={() => actions.selectVideo(video)}
              >
                <div className="relative rounded-xl overflow-hidden mb-3 shadow-md">
                  <div className="relative aspect-video">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                        <Play
                          className="w-6 h-6 text-white ml-0.5"
                          fill="currentColor"
                        />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-white text-xs font-medium">
                      {video.duration}
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Image
                    src={video.author.avatar}
                    alt={video.author.name}
                    width={36}
                    height={36}
                    className="w-9 h-9 rounded-full flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 flex items-center gap-1">
                      {video.author.name}
                      {video.author.verified && (
                        <span className="text-blue-500">✓</span>
                      )}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                      <span>{formatNumber(video.views)} ครั้ง</span>
                      <span>•</span>
                      <span>{formatDistanceToNow(video.uploadDate)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Video Modal */}
      {state.showVideoModal && state.selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
          onClick={actions.closeVideoModal}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={actions.closeVideoModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Video Player Placeholder */}
            <div className="relative aspect-video bg-black">
              <Image
                src={state.selectedVideo.thumbnail}
                alt={state.selectedVideo.title}
                fill
                className="object-contain"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                  <Play
                    className="w-10 h-10 text-white ml-1"
                    fill="currentColor"
                  />
                </div>
              </div>
            </div>

            {/* Video Info */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {state.selectedVideo.title}
              </h2>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Image
                    src={state.selectedVideo.author.avatar}
                    alt={state.selectedVideo.author.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white flex items-center gap-1">
                      {state.selectedVideo.author.name}
                      {state.selectedVideo.author.verified && (
                        <span className="text-blue-500">✓</span>
                      )}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {formatNumber(state.selectedVideo.views)} ครั้ง •{" "}
                      {formatDistanceToNow(state.selectedVideo.uploadDate)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors">
                    <ThumbsUp className="w-5 h-5" />
                    <span className="font-medium">
                      {formatNumber(state.selectedVideo.likes)}
                    </span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors">
                    <ThumbsDown className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 mb-4">
                <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                  {state.selectedVideo.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {state.selectedVideo.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
