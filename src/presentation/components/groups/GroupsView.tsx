"use client";

import { GroupsViewModel } from "@/src/presentation/presenters/groups/GroupsPresenter";
import { useGroupsPresenter } from "@/src/presentation/presenters/groups/useGroupsPresenter";
import { useAuthStore } from "@/src/presentation/stores/authStore";
import { formatDistanceToNow } from "@/src/utils/date-helpers";
import { formatNumber } from "@/src/utils/text-helpers";
import {
  Clock,
  Globe,
  Lock,
  Search,
  UserPlus,
  Users,
  X,
  Check,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface GroupsViewProps {
  initialViewModel?: GroupsViewModel;
}

/**
 * Groups View Component
 * กลุ่มและชุมชน
 */
export function GroupsView({ initialViewModel }: GroupsViewProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [state, actions] = useGroupsPresenter(initialViewModel);
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

  const getPrivacyIcon = (privacy: string) => {
    const icons = {
      public: <Globe className="w-4 h-4" />,
      private: <Lock className="w-4 h-4" />,
      secret: <Lock className="w-4 h-4" />,
    };
    return icons[privacy as keyof typeof icons] || null;
  };

  const getPrivacyLabel = (privacy: string) => {
    const labels = {
      public: "สาธารณะ",
      private: "ส่วนตัว",
      secret: "ลับ",
    };
    return labels[privacy as keyof typeof labels] || privacy;
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
                placeholder="ค้นหากลุ่ม..."
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
        {/* Your Groups */}
        {state.viewModel?.yourGroups &&
          state.viewModel.yourGroups.length > 0 &&
          state.selectedCategory === "all" &&
          !state.searchQuery && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                ⭐ กลุ่มของคุณ
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {state.viewModel.yourGroups.slice(0, 6).map((group) => (
                  <div
                    key={group.id}
                    className="group cursor-pointer bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
                    onClick={() => actions.selectGroup(group)}
                  >
                    <div className="relative h-32">
                      <Image
                        src={group.coverImage}
                        alt={group.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {group.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{formatNumber(group.members)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{group.postsToday} โพสต์วันนี้</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Suggested Groups */}
        {state.viewModel?.suggestedGroups &&
          state.viewModel.suggestedGroups.length > 0 &&
          state.selectedCategory === "all" &&
          !state.searchQuery && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                💡 กลุ่มแนะนำสำหรับคุณ
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {state.viewModel.suggestedGroups.map((group) => (
                  <div
                    key={group.id}
                    className="group cursor-pointer bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
                    onClick={() => actions.selectGroup(group)}
                  >
                    <div className="relative h-32">
                      <Image
                        src={group.coverImage}
                        alt={group.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mb-2">
                        {getPrivacyIcon(group.privacy)}
                        <span>{getPrivacyLabel(group.privacy)}</span>
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {group.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{formatNumber(group.members)}</span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          actions.joinGroup(group.id);
                        }}
                        className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                      >
                        เข้าร่วมกลุ่ม
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* All Groups */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {state.searchQuery
              ? `ผลการค้นหา "${state.searchQuery}"`
              : state.selectedCategory === "all"
              ? "กลุ่มทั้งหมด"
              : state.selectedCategory === "your-groups"
              ? "กลุ่มของคุณ"
              : state.selectedCategory === "discover"
              ? "ค้นพบกลุ่มใหม่"
              : `${
                  state.viewModel?.categories.find(
                    (c) => c.id === state.selectedCategory
                  )?.name || ""
                }`}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {state.filteredGroups.length} กลุ่ม
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
        ) : state.filteredGroups.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              ไม่พบกลุ่ม
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              ลองค้นหาด้วยคำอื่นหรือเลือกหมวดหมู่อื่น
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {state.filteredGroups.map((group) => (
              <div
                key={group.id}
                className="group cursor-pointer bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
                onClick={() => actions.selectGroup(group)}
              >
                <div className="relative h-32">
                  <Image
                    src={group.coverImage}
                    alt={group.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mb-2">
                    {getPrivacyIcon(group.privacy)}
                    <span>{getPrivacyLabel(group.privacy)}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {group.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                    {group.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{formatNumber(group.members)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{group.postsToday} โพสต์/วัน</span>
                    </div>
                  </div>
                  {group.isMember ? (
                    <div className="flex items-center justify-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-lg text-sm font-medium">
                      <Check className="w-4 h-4" />
                      <span>เข้าร่วมแล้ว</span>
                    </div>
                  ) : group.isPending ? (
                    <div className="flex items-center justify-center gap-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-lg text-sm font-medium">
                      <Clock className="w-4 h-4" />
                      <span>รอการอนุมัติ</span>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        actions.joinGroup(group.id);
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>เข้าร่วม</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Group Detail Modal */}
      {state.showGroupModal && state.selectedGroup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
          onClick={actions.closeGroupModal}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={actions.closeGroupModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Cover Image */}
            <div className="relative h-64">
              <Image
                src={state.selectedGroup.coverImage}
                alt={state.selectedGroup.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {state.selectedGroup.name}
                </h2>
                <div className="flex items-center gap-2 text-white/90">
                  {getPrivacyIcon(state.selectedGroup.privacy)}
                  <span>{getPrivacyLabel(state.selectedGroup.privacy)} • {formatNumber(state.selectedGroup.members)} สมาชิก</span>
                </div>
              </div>
            </div>

            {/* Group Details */}
            <div className="p-6">
              {/* Description */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  เกี่ยวกับกลุ่ม
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {state.selectedGroup.description}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {formatNumber(state.selectedGroup.members)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    สมาชิก
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {state.selectedGroup.postsToday}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    โพสต์วันนี้
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {formatDistanceToNow(state.selectedGroup.createdAt)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    อายุกลุ่ม
                  </p>
                </div>
              </div>

              {/* Admins */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  ผู้ดูแลกลุ่ม
                </h3>
                <div className="flex flex-wrap gap-3">
                  {state.selectedGroup.admins.map((admin) => (
                    <div
                      key={admin.id}
                      className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-2"
                    >
                      <Image
                        src={admin.avatar}
                        alt={admin.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {admin.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              {state.selectedGroup.tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    หัวข้อ
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {state.selectedGroup.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                {state.selectedGroup.isMember ? (
                  <>
                    <button className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium">
                      ดูกลุ่ม
                    </button>
                    <button
                      onClick={() => actions.leaveGroup(state.selectedGroup!.id)}
                      className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors font-medium"
                    >
                      ออกจากกลุ่ม
                    </button>
                  </>
                ) : state.selectedGroup.isPending ? (
                  <button
                    disabled
                    className="flex-1 px-6 py-3 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-lg font-medium cursor-not-allowed"
                  >
                    รอการอนุมัติ
                  </button>
                ) : (
                  <button
                    onClick={() => actions.joinGroup(state.selectedGroup!.id)}
                    className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                  >
                    เข้าร่วมกลุ่ม
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
