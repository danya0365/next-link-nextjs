"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MessageCircle, Send } from "lucide-react";
import { useAuthStore } from "@/src/presentation/stores/authStore";
import { useMessagesPresenter } from "@/src/presentation/presenters/messages/useMessagesPresenter";
import { MessagesViewModel } from "@/src/presentation/presenters/messages/MessagesPresenter";

interface MessagesViewProps {
  initialViewModel?: MessagesViewModel;
}

/**
 * Messages View Component
 * หน้ารายการข้อความ/แชท
 */
export function MessagesView({ initialViewModel }: MessagesViewProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [state, actions] = useMessagesPresenter(initialViewModel);

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
          <p className="text-gray-600 dark:text-gray-400">
            กำลังโหลดข้อความ...
          </p>
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

  const conversations = state.viewModel?.conversations || [];
  const totalUnread = state.viewModel?.totalUnread || 0;

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "เมื่อสักครู่";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} นาที`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} ชม.`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)} วัน`;
    return date.toLocaleDateString("th-TH", { day: "numeric", month: "short" });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-6">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <MessageCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  ข้อความ
                </h1>
                {totalUnread > 0 && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    คุณมี {totalUnread} ข้อความที่ยังไม่ได้อ่าน
                  </p>
                )}
              </div>
            </div>
            <button className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
              <Send className="w-4 h-4 mr-2" />
              ข้อความใหม่
            </button>
          </div>
        </div>

        {/* Conversations List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
          {conversations.length === 0 ? (
            <div className="p-12 text-center">
              <MessageCircle className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                ไม่มีข้อความ
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                เริ่มสนทนากับเพื่อนของคุณเลย
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {conversations.map((conversation) => (
                <Link
                  key={conversation.id}
                  href={`/messages/${conversation.id}`}
                  className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {/* Avatar */}
                  <div className="flex-shrink-0 mr-4 relative">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
                      {conversation.participantName.charAt(0)}
                    </div>
                    {/* Online indicator (placeholder) */}
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                        {conversation.participantName}
                      </h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">
                        {formatTimeAgo(conversation.lastMessageTime)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p
                        className={`text-sm truncate ${
                          conversation.unreadCount > 0
                            ? "text-gray-900 dark:text-white font-medium"
                            : "text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        {conversation.lastMessage}
                      </p>
                      {conversation.unreadCount > 0 && (
                        <span className="ml-2 flex-shrink-0 px-2 py-1 text-xs font-bold text-white bg-blue-600 rounded-full">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
