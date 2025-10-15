"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Users,
  MessageCircle,
  Calendar,
  Store,
  Video,
  Clock,
  Bookmark,
  Flag,
  TrendingUp,
  ChevronDown,
} from "lucide-react";
import { useAuthStore } from "@/src/presentation/stores/authStore";
import { useState } from "react";

/**
 * Left Sidebar Component
 * Sidebar ด้านซ้ายสำหรับ navigation และ shortcuts
 */
export function LeftSidebar() {
  const { user } = useAuthStore();
  const [showMore, setShowMore] = useState(false);

  const mainMenuItems = [
    {
      icon: <Users className="w-6 h-6" />,
      label: "เพื่อน",
      href: "/friends",
      color: "text-blue-600",
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      label: "ข้อความ",
      href: "/messages",
      color: "text-blue-600",
      badge: 3,
    },
    {
      icon: <Video className="w-6 h-6" />,
      label: "Watch",
      href: "/watch",
      color: "text-blue-600",
    },
    {
      icon: <Store className="w-6 h-6" />,
      label: "ตลาด",
      href: "/marketplace",
      color: "text-blue-600",
    },
    {
      icon: <Users className="w-6 h-6" />,
      label: "กลุ่ม",
      href: "/groups",
      color: "text-blue-600",
    },
  ];

  const moreMenuItems = [
    {
      icon: <Calendar className="w-6 h-6" />,
      label: "อีเว้นท์",
      href: "/events",
      color: "text-red-600",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      label: "ความทรงจำ",
      href: "/memories",
      color: "text-blue-600",
    },
    {
      icon: <Bookmark className="w-6 h-6" />,
      label: "รายการที่บันทึก",
      href: "/saved",
      color: "text-purple-600",
    },
    {
      icon: <Flag className="w-6 h-6" />,
      label: "เพจ",
      href: "/pages",
      color: "text-orange-600",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: "Trending",
      href: "/trending",
      color: "text-green-600",
    },
  ];

  if (!user) return null;

  return (
    <div className="hidden lg:block w-64 xl:w-72 fixed left-0 top-16 h-[calc(100vh-4rem)] overflow-y-auto p-4 scrollbar-thin">
      <div className="space-y-2">
        {/* User Profile Link */}
        <Link
          href={`/profile/${user.id}`}
          className="flex items-center space-x-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors group"
        >
          <Image
            src={user.avatar || "https://i.pravatar.cc/150?img=1"}
            alt={user.name}
            width={36}
            height={36}
            className="rounded-full"
          />
          <span className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {user.name}
          </span>
        </Link>

        {/* Main Menu Items */}
        {mainMenuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors group"
          >
            <div className="flex items-center space-x-3">
              <div className={item.color}>{item.icon}</div>
              <span className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {item.label}
              </span>
            </div>
            {item.badge && (
              <span className="px-2 py-0.5 bg-red-600 text-white text-xs font-bold rounded-full">
                {item.badge}
              </span>
            )}
          </Link>
        ))}

        {/* Show More Button */}
        <button
          onClick={() => setShowMore(!showMore)}
          className="w-full flex items-center space-x-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <div className="w-9 h-9 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
            <ChevronDown
              className={`w-5 h-5 text-gray-700 dark:text-gray-300 transition-transform ${
                showMore ? "rotate-180" : ""
              }`}
            />
          </div>
          <span className="font-medium text-gray-900 dark:text-white">
            {showMore ? "แสดงน้อยลง" : "ดูเพิ่มเติม"}
          </span>
        </button>

        {/* More Menu Items */}
        {showMore && (
          <div className="space-y-2 pl-2 border-l-2 border-gray-200 dark:border-gray-700 ml-4">
            {moreMenuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors group"
              >
                <div className={item.color}>{item.icon}</div>
                <span className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>

        {/* Your Shortcuts */}
        <div className="space-y-2">
          <h3 className="px-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
            ทางลัดของคุณ
          </h3>
          <Link
            href="/groups/1"
            className="flex items-center space-x-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TH</span>
            </div>
            <span className="font-medium text-gray-900 dark:text-white">
              กลุ่มคนรักการเดินทาง
            </span>
          </Link>
          <Link
            href="/groups/2"
            className="flex items-center space-x-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">FD</span>
            </div>
            <span className="font-medium text-gray-900 dark:text-white">
              Foodies Thailand
            </span>
          </Link>
        </div>

        {/* Footer Links */}
        <div className="pt-4 space-y-2">
          <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
            <Link href="/privacy" className="hover:underline">
              ความเป็นส่วนตัว
            </Link>
            <span>·</span>
            <Link href="/terms" className="hover:underline">
              เงื่อนไข
            </Link>
            <span>·</span>
            <Link href="/help" className="hover:underline">
              ช่วยเหลือ
            </Link>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Next Link © 2024
          </p>
        </div>
      </div>
    </div>
  );
}
