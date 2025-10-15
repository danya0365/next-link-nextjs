"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Users, UserPlus, UserCheck, X, Check } from "lucide-react";
import { useAuthStore } from "@/src/presentation/stores/authStore";
import { useFriendsPresenter } from "@/src/presentation/presenters/friends/useFriendsPresenter";
import { FriendsViewModel } from "@/src/presentation/presenters/friends/FriendsPresenter";

interface FriendsViewProps {
  initialViewModel?: FriendsViewModel;
}

type FriendsTab = "all" | "requests" | "suggestions";

/**
 * Friends View Component
 * หน้าจัดการเพื่อน
 */
export function FriendsView({ initialViewModel }: FriendsViewProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [state, actions] = useFriendsPresenter(initialViewModel);
  const [activeTab, setActiveTab] = useState<FriendsTab>("all");

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
  }, [isAuthenticated, router]);

  // Loading state
  if (state.loading && !state.viewModel) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">กำลังโหลดเพื่อน...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (state.error) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-600 dark:text-red-400 font-medium mb-2">
            เกิดข้อผิดพลาด
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{state.error}</p>
          <button
            onClick={actions.loadData}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            ลองใหม่อีกครั้ง
          </button>
        </div>
      </div>
    );
  }

  const friends = state.viewModel?.friends || [];
  const friendRequests = state.viewModel?.friendRequests || [];
  const suggestedFriends = state.viewModel?.suggestedFriends || [];
  const totalFriends = state.viewModel?.totalFriends || 0;
  const totalRequests = state.viewModel?.totalRequests || 0;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-6">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  เพื่อน
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  คุณมี {totalFriends} เพื่อน
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md mb-4">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab("all")}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === "all"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              เพื่อนทั้งหมด ({totalFriends})
            </button>
            <button
              onClick={() => setActiveTab("requests")}
              className={`flex-1 px-6 py-4 font-medium transition-colors relative ${
                activeTab === "requests"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              คำขอเป็นเพื่อน ({totalRequests})
              {totalRequests > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("suggestions")}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === "suggestions"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              คำแนะนำ ({suggestedFriends.length})
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          {/* All Friends Tab */}
          {activeTab === "all" && (
            <>
              {friends.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    ยังไม่มีเพื่อน
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    เริ่มค้นหาและเชื่อมต่อกับผู้คนใหม่ๆ
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {friends.map((friend) => (
                    <div
                      key={friend.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <Link href={`/profile/${friend.id}`}>
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xl">
                            {friend.name.charAt(0)}
                          </div>
                        </Link>
                        <button
                          onClick={() => actions.removeFriend(friend.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                          title="ยกเลิกเป็นเพื่อน"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      <Link href={`/profile/${friend.id}`}>
                        <h3 className="font-semibold text-gray-900 dark:text-white hover:underline">
                          {friend.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {friend.mutualFriends} เพื่อนร่วมกัน
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        เพื่อนตั้งแต่{" "}
                        {new Date(friend.friendsSince).toLocaleDateString(
                          "th-TH",
                          { year: "numeric", month: "long" }
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Friend Requests Tab */}
          {activeTab === "requests" && (
            <>
              {friendRequests.length === 0 ? (
                <div className="text-center py-12">
                  <UserPlus className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    ไม่มีคำขอเป็นเพื่อน
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    เมื่อมีคนส่งคำขอเป็นเพื่อน คุณจะเห็นที่นี่
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {friendRequests.map((friend) => (
                    <div
                      key={friend.id}
                      className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center">
                        <Link href={`/profile/${friend.id}`}>
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold mr-4">
                            {friend.name.charAt(0)}
                          </div>
                        </Link>
                        <div>
                          <Link href={`/profile/${friend.id}`}>
                            <h3 className="font-semibold text-gray-900 dark:text-white hover:underline">
                              {friend.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {friend.mutualFriends} เพื่อนร่วมกัน
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => actions.acceptFriendRequest(friend.id)}
                          className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                        >
                          <Check className="w-4 h-4 mr-2" />
                          ยอมรับ
                        </button>
                        <button
                          onClick={() => actions.rejectFriendRequest(friend.id)}
                          className="flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors"
                        >
                          <X className="w-4 h-4 mr-2" />
                          ปฏิเสธ
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Suggestions Tab */}
          {activeTab === "suggestions" && (
            <>
              {suggestedFriends.length === 0 ? (
                <div className="text-center py-12">
                  <UserCheck className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    ไม่มีคำแนะนำ
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    เราจะแนะนำเพื่อนใหม่ให้คุณเร็วๆ นี้
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {suggestedFriends.map((friend) => (
                    <div
                      key={friend.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <Link href={`/profile/${friend.id}`}>
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xl mx-auto mb-3">
                          {friend.name.charAt(0)}
                        </div>
                      </Link>
                      <Link href={`/profile/${friend.id}`}>
                        <h3 className="font-semibold text-gray-900 dark:text-white text-center hover:underline">
                          {friend.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-3">
                        {friend.mutualFriends} เพื่อนร่วมกัน
                      </p>
                      <button
                        onClick={() => actions.sendFriendRequest(friend.id)}
                        className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        เพิ่มเพื่อน
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
