"use client";

import { MarketplaceViewModel } from "@/src/presentation/presenters/marketplace/MarketplacePresenter";
import { useMarketplacePresenter } from "@/src/presentation/presenters/marketplace/useMarketplacePresenter";
import { useAuthStore } from "@/src/presentation/stores/authStore";
import { formatDistanceToNow } from "@/src/utils/date-helpers";
import { formatNumber } from "@/src/utils/text-helpers";
import {
  Eye,
  Heart,
  MapPin,
  MessageCircle,
  Search,
  Star,
  X,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface MarketplaceViewProps {
  initialViewModel?: MarketplaceViewModel;
}

/**
 * Marketplace View Component
 * ตลาดซื้อขายออนไลน์
 */
export function MarketplaceView({ initialViewModel }: MarketplaceViewProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [state, actions] = useMarketplacePresenter(initialViewModel);
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

  const getConditionLabel = (condition: string) => {
    const labels = {
      new: "ใหม่",
      used: "มือสอง",
      like_new: "ใหม่เหมือนมือหนึ่ง",
    };
    return labels[condition as keyof typeof labels] || condition;
  };

  const getConditionColor = (condition: string) => {
    const colors = {
      new: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      used: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
      like_new:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    };
    return colors[condition as keyof typeof colors] || "";
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header with Search */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="ค้นหาสินค้า..."
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
        {/* Featured Items */}
        {state.viewModel?.featuredItems &&
          state.selectedCategory === "all" &&
          !state.searchQuery && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                ⭐ สินค้าแนะนำ
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {state.viewModel.featuredItems.map((item) => (
                  <div
                    key={item.id}
                    className="group cursor-pointer bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
                    onClick={() => actions.selectItem(item)}
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={item.images[0]}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                        แนะนำ
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                        ฿{formatNumber(item.price)}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Items Grid */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {state.searchQuery
              ? `ผลการค้นหา "${state.searchQuery}"`
              : state.selectedCategory === "all"
              ? "สินค้าทั้งหมด"
              : `${
                  state.viewModel?.categories.find(
                    (c) => c.id === state.selectedCategory
                  )?.name || ""
                }`}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {state.filteredItems.length} รายการ
          </p>
        </div>

        {state.loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-xl aspect-square mb-3" />
                <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded mb-2" />
                <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : state.filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🛍️</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              ไม่พบสินค้า
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              ลองค้นหาด้วยคำอื่นหรือเลือกหมวดหมู่อื่น
            </p>
            <button
              onClick={actions.resetFilters}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              รีเซ็ตการค้นหา
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {state.filteredItems.map((item) => (
              <div
                key={item.id}
                className="group cursor-pointer bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
                onClick={() => actions.selectItem(item)}
              >
                <div className="relative aspect-square">
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div
                    className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(
                      item.condition
                    )}`}
                  >
                    {getConditionLabel(item.condition)}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    ฿{formatNumber(item.price)}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{formatNumber(item.views)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        <span>{item.likes}</span>
                      </div>
                    </div>
                    <span>{formatDistanceToNow(item.createdAt)}</span>
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
            {/* Close Button */}
            <button
              onClick={actions.closeItemModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image Gallery */}
              <div className="relative aspect-square bg-black">
                <Image
                  src={state.selectedItem.images[0]}
                  alt={state.selectedItem.title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Item Details */}
              <div className="p-6">
                <div
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${getConditionColor(
                    state.selectedItem.condition
                  )}`}
                >
                  {getConditionLabel(state.selectedItem.condition)}
                </div>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {state.selectedItem.title}
                </h2>

                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6">
                  ฿{formatNumber(state.selectedItem.price)}
                </p>

                {/* Seller Info */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Image
                      src={state.selectedItem.seller.avatar}
                      alt={state.selectedItem.seller.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {state.selectedItem.seller.name}
                      </p>
                      <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span>{state.selectedItem.seller.rating}</span>
                        <span>
                          ({state.selectedItem.seller.totalReviews} รีวิว)
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span>ติดต่อผู้ขาย</span>
                  </button>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    รายละเอียด
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                    {state.selectedItem.description}
                  </p>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
                  <MapPin className="w-5 h-5" />
                  <span>{state.selectedItem.location}</span>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500 mb-6">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{formatNumber(state.selectedItem.views)} ครั้ง</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>{state.selectedItem.likes} คน</span>
                  </div>
                  <span>•</span>
                  <span>{formatDistanceToNow(state.selectedItem.createdAt)}</span>
                </div>

                {/* Tags */}
                {state.selectedItem.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {state.selectedItem.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
