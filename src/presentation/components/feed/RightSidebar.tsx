"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, MoreHorizontal, Video, Phone } from "lucide-react";
import { mockUsers } from "@/src/data/mock-users";
import { useAuthStore } from "@/src/presentation/stores/authStore";

/**
 * Right Sidebar Component
 * Sidebar ด้านขวาสำหรับ contacts และ suggestions
 */
export function RightSidebar() {
  const { user } = useAuthStore();
  
  // Filter out current user
  const contacts = mockUsers.filter((u) => u.id !== user?.id);
  
  // Mock online status (random)
  const onlineContacts = contacts.map((contact) => ({
    ...contact,
    isOnline: Math.random() > 0.5,
  }));

  return (
    <div className="hidden xl:block w-80 fixed right-0 top-16 h-[calc(100vh-4rem)] overflow-y-auto p-4 scrollbar-thin">
      <div className="space-y-6">
        {/* Friend Suggestions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              คำขอเป็นเพื่อน
            </h3>
            <Link
              href="/friends/requests"
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              ดูทั้งหมด
            </Link>
          </div>
          <div className="space-y-3">
            {onlineContacts.slice(0, 2).map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Link
                  href={`/profile/${contact.id}`}
                  className="flex items-center space-x-3 flex-1"
                >
                  <div className="relative">
                    <Image
                      src={contact.avatar || "https://i.pravatar.cc/150?img=1"}
                      alt={contact.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-900 dark:text-white truncate">
                      {contact.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      2 เพื่อนร่วมกัน
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-700"></div>

        {/* Contacts */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              ผู้ติดต่อ
            </h3>
            <div className="flex space-x-2">
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                <Video className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                <Search className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                <MoreHorizontal className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>

          {/* Online Contacts List */}
          <div className="space-y-2">
            {onlineContacts.map((contact) => (
              <Link
                key={contact.id}
                href={`/messages/${contact.id}`}
                className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors group"
              >
                <div className="flex items-center space-x-3 flex-1">
                  <div className="relative">
                    <Image
                      src={contact.avatar || "https://i.pravatar.cc/150?img=1"}
                      alt={contact.name}
                      width={36}
                      height={36}
                      className="rounded-full"
                    />
                    {contact.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                    )}
                  </div>
                  <span className="font-medium text-sm text-gray-900 dark:text-white truncate">
                    {contact.name}
                  </span>
                </div>
                <button className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-all">
                  <Phone className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
              </Link>
            ))}
          </div>
        </div>

        {/* Group Chat Suggestions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              แชทกลุ่มแนะนำ
            </h3>
          </div>
          <div className="space-y-2">
            <Link
              href="/messages/group-1"
              className="flex items-center space-x-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">👥</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-gray-900 dark:text-white truncate">
                  ครอบครัว
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  8 สมาชิก
                </p>
              </div>
            </Link>
            <Link
              href="/messages/group-2"
              className="flex items-center space-x-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">🎓</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-gray-900 dark:text-white truncate">
                  เพื่อนมหาลัย
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  12 สมาชิก
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Ads Section (Optional) */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            ได้รับการสนับสนุน
          </p>
          <div className="flex items-start space-x-3">
            <Image
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
              alt="Sponsored"
              width={60}
              height={60}
              className="rounded-lg"
            />
            <div>
              <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
                Next Link Premium
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                อัพเกรดเพื่อประสบการณ์ที่ดีขึ้น
              </p>
              <button className="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">
                เรียนรู้เพิ่มเติม →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
