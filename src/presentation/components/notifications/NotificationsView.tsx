"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Bell,
  Heart,
  MessageCircle,
  UserPlus,
  UserCheck,
  AtSign,
  Share2,
  CheckCheck,
} from "lucide-react";
import { useAuthStore } from "@/src/presentation/stores/authStore";
import { useNotificationsPresenter } from "@/src/presentation/presenters/notifications/useNotificationsPresenter";
import { NotificationsViewModel } from "@/src/presentation/presenters/notifications/NotificationsPresenter";
import { Notification } from "@/src/data/mock-notifications";

interface NotificationsViewProps {
  initialViewModel?: NotificationsViewModel;
}

/**
 * Notifications View Component
 * หน้าการแจ้งเตือน
 */
export function NotificationsView({
  initialViewModel,
}: NotificationsViewProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [state, actions] = useNotificationsPresenter(initialViewModel);

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
            กำลังโหลดการแจ้งเตือน...
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

  const notifications = state.viewModel?.notifications || [];
  const unreadCount = state.viewModel?.unreadCount || 0;

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "like":
        return <Heart className="w-5 h-5 text-red-500" />;
      case "comment":
        return <MessageCircle className="w-5 h-5 text-blue-500" />;
      case "friend_request":
        return <UserPlus className="w-5 h-5 text-green-500" />;
      case "friend_accept":
        return <UserCheck className="w-5 h-5 text-green-500" />;
      case "mention":
        return <AtSign className="w-5 h-5 text-purple-500" />;
      case "share":
        return <Share2 className="w-5 h-5 text-blue-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "เมื่อสักครู่";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} นาทีที่แล้ว`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} ชั่วโมงที่แล้ว`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)} วันที่แล้ว`;
    return date.toLocaleDateString("th-TH");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-6">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bell className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  การแจ้งเตือน
                </h1>
                {unreadCount > 0 && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    คุณมี {unreadCount} การแจ้งเตือนที่ยังไม่ได้อ่าน
                  </p>
                )}
              </div>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={actions.markAllAsRead}
                className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                <CheckCheck className="w-4 h-4 mr-2" />
                ทำเครื่องหมายว่าอ่านทั้งหมด
              </button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
          {notifications.length === 0 ? (
            <div className="p-12 text-center">
              <Bell className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                ไม่มีการแจ้งเตือน
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                เมื่อมีคนโต้ตอบกับโพสต์ของคุณ คุณจะเห็นการแจ้งเตือนที่นี่
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer ${
                    !notification.read ? "bg-blue-50 dark:bg-blue-900/10" : ""
                  }`}
                  onClick={() => {
                    if (!notification.read) {
                      actions.markAsRead(notification.id);
                    }
                    if (notification.postId) {
                      router.push(`/post/${notification.postId}`);
                    }
                  }}
                >
                  <div className="flex items-start">
                    {/* Avatar */}
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                        {notification.fromUserName.charAt(0)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm text-gray-900 dark:text-white">
                            <Link
                              href={`/profile/${notification.fromUserId}`}
                              className="font-semibold hover:underline"
                            >
                              {notification.fromUserName}
                            </Link>{" "}
                            <span className="text-gray-600 dark:text-gray-400">
                              {notification.message}
                            </span>
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {formatTimeAgo(notification.createdAt)}
                          </p>
                        </div>
                        {/* Icon */}
                        <div className="ml-3 flex-shrink-0">
                          {getNotificationIcon(notification.type)}
                        </div>
                      </div>

                      {/* Unread indicator */}
                      {!notification.read && (
                        <div className="mt-2">
                          <span className="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
