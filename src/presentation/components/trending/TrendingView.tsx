"use client";

import { TrendingViewModel } from "@/src/presentation/presenters/trending/TrendingPresenter";
import { useTrendingPresenter } from "@/src/presentation/presenters/trending/useTrendingPresenter";
import { useAuthStore } from "@/src/presentation/stores/authStore";
import { formatDistanceToNow } from "@/src/utils/date-helpers";
import { formatNumber } from "@/src/utils/text-helpers";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Search,
  X,
  Eye,
  MessageCircle,
  Heart,
  Share2,
  Hash,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface TrendingViewProps {
  initialViewModel?: TrendingViewModel;
}

/**
 * Trending View Component
 * หัวข้อที่กำลังมาแรง
 */
export function TrendingView({ initialViewModel }: TrendingViewProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [state, actions] = useTrendingPresenter(initialViewModel);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    actions.search(searchInput);
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "up")
      return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (trend === "down")
      return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const getTrendColor = (trend: string) => {
    if (trend === "up") return "text-green-500";
    if (trend === "down") return "text-red-500";
    return "text-gray-500";
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header with Search */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-6 h-6" />
              Trending - กำลังมาแรง
            </h1>
          </div>
          <form onSubmit={handleSearch} className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="ค้นหาหัวข้อที่กำลังฮิต..."
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
                onClick={() => actions.filterByCategory(category.id)}
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
        {/* Top Trending Posts */}
        {state.viewModel?.posts &&
          state.viewModel.posts.length > 0 &&
          state.selectedCategory === "all" &&
          !state.searchQuery && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                🔥 โพสต์ยอดนิยม
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {state.viewModel.posts.slice(0, 4).map((post) => (
                  <div
                    key={post.id}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {post.author.name}
                          </p>
                          {post.author.verified && (
                            <span className="text-blue-500">✓</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDistanceToNow(post.timestamp)}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-900 dark:text-white mb-3">
                      {post.content}
                    </p>
                    {post.image && (
                      <div className="relative h-64 rounded-lg overflow-hidden mb-3">
                        <Image
                          src={post.image}
                          alt="Post image"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span>{formatNumber(post.likes)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{formatNumber(post.comments)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Share2 className="w-4 h-4" />
                        <span>{formatNumber(post.shares)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Trending Topics */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {state.searchQuery
              ? `ผลการค้นหา "${state.searchQuery}"`
              : state.selectedCategory === "all"
              ? "หัวข้อทั้งหมด"
              : `${
                  state.viewModel?.categories.find(
                    (c) => c.id === state.selectedCategory
                  )?.name || ""
                }`}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {state.filteredTopics.length} หัวข้อ
          </p>
        </div>

        {state.loading ? (
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-32"
              />
            ))}
          </div>
        ) : state.filteredTopics.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              ไม่พบหัวข้อที่กำลังฮิต
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              ลองค้นหาด้วยคำอื่นหรือเลือกหมวดหมู่อื่น
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {state.filteredTopics.map((topic) => (
              <div
                key={topic.id}
                onClick={() => actions.selectTopic(topic)}
                className="group cursor-pointer bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center gap-4 p-6">
                  {/* Rank */}
                  <div className="flex-shrink-0">
                    <div className="text-3xl font-bold text-gray-400 dark:text-gray-600">
                      #{topic.position}
                    </div>
                    {topic.previousPosition && (
                      <div
                        className={`flex items-center justify-center gap-1 text-xs ${getTrendColor(
                          topic.trend
                        )}`}
                      >
                        {getTrendIcon(topic.trend)}
                        <span>
                          {Math.abs(topic.position - topic.previousPosition)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Image */}
                  {topic.image && (
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={topic.image}
                        alt={topic.hashtag}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {topic.hashtag}
                    </h3>
                    {topic.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                        {topic.description}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                      <div className="flex items-center gap-1">
                        <Hash className="w-4 h-4" />
                        <span>{formatNumber(topic.postsCount)} โพสต์</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{formatNumber(topic.views)} ครั้ง</span>
                      </div>
                    </div>
                  </div>

                  {/* Trend Badge */}
                  <div className="flex-shrink-0">
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        topic.trend === "up"
                          ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                          : topic.trend === "down"
                          ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                      }`}
                    >
                      {topic.trend === "up"
                        ? "🔥 Hot"
                        : topic.trend === "down"
                        ? "📉 Cooling"
                        : "━ Stable"}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Topic Detail Modal */}
      {state.showTopicModal && state.selectedTopic && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
          onClick={actions.closeTopicModal}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={actions.closeTopicModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {state.selectedTopic.image && (
              <div className="relative h-64">
                <Image
                  src={state.selectedTopic.image}
                  alt={state.selectedTopic.hashtag}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h2 className="text-4xl font-bold text-white mb-2">
                    {state.selectedTopic.hashtag}
                  </h2>
                  {state.selectedTopic.description && (
                    <p className="text-white/90">
                      {state.selectedTopic.description}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="p-6">
              {!state.selectedTopic.image && (
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {state.selectedTopic.hashtag}
                </h2>
              )}

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    #{state.selectedTopic.position}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    อันดับ
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {formatNumber(state.selectedTopic.postsCount)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    โพสต์
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {formatNumber(state.selectedTopic.views)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    ยอดดู
                  </p>
                </div>
              </div>

              {/* Related Posts */}
              {state.selectedTopicPosts.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                    โพสต์ที่เกี่ยวข้อง
                  </h3>
                  <div className="space-y-4">
                    {state.selectedTopicPosts.map((post) => (
                      <div
                        key={post.id}
                        className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-gray-900 dark:text-white">
                                {post.author.name}
                              </p>
                              {post.author.verified && (
                                <span className="text-blue-500 text-sm">✓</span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {formatDistanceToNow(post.timestamp)}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-900 dark:text-white mb-3">
                          {post.content}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            <span>{formatNumber(post.likes)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{formatNumber(post.comments)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Share2 className="w-4 h-4" />
                            <span>{formatNumber(post.shares)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
