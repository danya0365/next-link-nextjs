"use client";

import { SavedViewModel } from "@/src/presentation/presenters/saved/SavedPresenter";
import { useSavedPresenter } from "@/src/presentation/presenters/saved/useSavedPresenter";
import { useAuthStore } from "@/src/presentation/stores/authStore";
import {
  formatDistanceToNow,
  formatShortDateTime,
} from "@/src/utils/date-helpers";
import { formatNumber } from "@/src/utils/text-helpers";
import {
  Bookmark,
  Calendar,
  ExternalLink,
  Eye,
  Heart,
  MessageCircle,
  Search,
  Trash2,
  X,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface SavedViewProps {
  initialViewModel?: SavedViewModel;
}

/**
 * Saved View Component
 * รายการที่บันทึก
 */
export function SavedView({ initialViewModel }: SavedViewProps) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const [state, actions] = useSavedPresenter(initialViewModel);
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

  const getTypeIcon = (type: string) => {
    const icons = {
      post: "📝",
      video: "🎬",
      event: "📅",
      marketplace: "🛍️",
      link: "🔗",
    };
    return icons[type as keyof typeof icons] || "📄";
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      post: "โพสต์",
      video: "วิดีโอ",
      event: "อีเว้นท์",
      marketplace: "ตลาด",
      link: "ลิงก์",
    };
    return labels[type as keyof typeof labels] || type;
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
              <Bookmark className="w-6 h-6" />
              รายการที่บันทึก
            </h1>
          </div>
          <form onSubmit={handleSearch} className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="ค้นหารายการที่บันทึก..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </form>
        </div>
      </div>

      {/* Collections */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {state.viewModel?.collections.map((collection) => (
              <button
                key={collection.id}
                onClick={() => actions.filterByCollection(collection.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  state.selectedCollection === collection.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                <span>{collection.icon}</span>
                <span className="text-sm font-medium">{collection.name}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    state.selectedCollection === collection.id
                      ? "bg-white/20"
                      : "bg-gray-200 dark:bg-gray-600"
                  }`}
                >
                  {collection.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {state.searchQuery
              ? `ผลการค้นหา "${state.searchQuery}"`
              : state.selectedCollection === "all"
              ? "ทั้งหมด"
              : `${
                  state.viewModel?.collections.find(
                    (c) => c.id === state.selectedCollection
                  )?.name || ""
                }`}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {state.filteredItems.length} รายการ
          </p>
        </div>

        {state.loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-xl h-48 mb-3" />
                <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded mb-2" />
                <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : state.filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔖</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              ไม่มีรายการที่บันทึก
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              เริ่มบันทึกโพสต์ วิดีโอ หรืออีเว้นท์ที่คุณสนใจ
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {state.filteredItems.map((item) => (
              <div
                key={item.id}
                className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
              >
                {item.image && (
                  <div
                    className="relative h-48 cursor-pointer"
                    onClick={() => actions.selectItem(item)}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 px-2 py-1 bg-black/70 text-white rounded-full text-xs font-medium">
                      {getTypeIcon(item.type)} {getTypeLabel(item.type)}
                    </div>
                  </div>
                )}
                <div className="p-4">
                  <h3
                    className="font-bold text-gray-900 dark:text-white line-clamp-2 mb-2 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    onClick={() => actions.selectItem(item)}
                  >
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                      {item.description}
                    </p>
                  )}

                  {item.author && (
                    <div className="flex items-center gap-2 mb-3">
                      <Image
                        src={item.author.avatar}
                        alt={item.author.name}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {item.author.name}
                      </span>
                    </div>
                  )}

                  {item.metadata && (
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500 mb-3">
                      {item.metadata.likes !== undefined && (
                        <div className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          <span>{formatNumber(item.metadata.likes)}</span>
                        </div>
                      )}
                      {item.metadata.comments !== undefined && (
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          <span>{item.metadata.comments}</span>
                        </div>
                      )}
                      {item.metadata.views !== undefined && (
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>{formatNumber(item.metadata.views)}</span>
                        </div>
                      )}
                      {item.metadata.price !== undefined && (
                        <span className="font-bold text-blue-600 dark:text-blue-400">
                          ฿{formatNumber(item.metadata.price)}
                        </span>
                      )}
                      {item.metadata.date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>
                            {isMounted
                              ? formatShortDateTime(item.metadata.date)
                              : ""}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      บันทึกเมื่อ {formatDistanceToNow(item.savedAt)}
                    </span>
                    <button
                      onClick={() => actions.removeSavedItem(item.id)}
                      className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg transition-colors"
                      title="ลบ"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Item Detail Modal */}
      {state.showItemModal && state.selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
          onClick={actions.closeItemModal}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={actions.closeItemModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {state.selectedItem.image && (
              <div className="relative h-96">
                <Image
                  src={state.selectedItem.image}
                  alt={state.selectedItem.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/70 text-white rounded-full text-sm font-medium">
                  {getTypeIcon(state.selectedItem.type)}{" "}
                  {getTypeLabel(state.selectedItem.type)}
                </div>
              </div>
            )}

            <div className="p-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {state.selectedItem.title}
              </h2>

              {state.selectedItem.description && (
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {state.selectedItem.description}
                </p>
              )}

              {state.selectedItem.author && (
                <div className="flex items-center gap-3 mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <Image
                    src={state.selectedItem.author.avatar}
                    alt={state.selectedItem.author.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {state.selectedItem.author.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      ผู้สร้าง
                    </p>
                  </div>
                </div>
              )}

              {state.selectedItem.metadata && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {state.selectedItem.metadata.likes !== undefined && (
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {formatNumber(state.selectedItem.metadata.likes)}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        ถูกใจ
                      </p>
                    </div>
                  )}
                  {state.selectedItem.metadata.comments !== undefined && (
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {state.selectedItem.metadata.comments}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        ความคิดเห็น
                      </p>
                    </div>
                  )}
                  {state.selectedItem.metadata.views !== undefined && (
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {formatNumber(state.selectedItem.metadata.views)}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        ครั้งดู
                      </p>
                    </div>
                  )}
                  {state.selectedItem.metadata.price !== undefined && (
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        ฿{formatNumber(state.selectedItem.metadata.price)}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        ราคา
                      </p>
                    </div>
                  )}
                </div>
              )}

              {state.selectedItem.url && (
                <div className="mb-6">
                  <a
                    href={state.selectedItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>{state.selectedItem.url}</span>
                  </a>
                </div>
              )}

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mb-6">
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  บันทึกเมื่อ {formatDistanceToNow(state.selectedItem.savedAt)}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() =>
                    actions.removeSavedItem(state.selectedItem!.id)
                  }
                  className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-5 h-5" />
                  <span>ลบออกจากรายการ</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
