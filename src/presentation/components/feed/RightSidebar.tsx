"use client";

import {
  friendRequests,
  getOnlineContacts,
  sponsoredContent,
  suggestedGroups,
  upcomingEvents,
} from "@/src/data/mock-sidebar";
import { mockUsers } from "@/src/data/mock-users";
import { useAuthStore } from "@/src/presentation/stores/authStore";
import {
  Calendar,
  ChevronRight,
  Clock,
  MapPin,
  MoreHorizontal,
  Search,
  UserPlus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SidebarSectionProps {
  title: string;
  viewAll?: string;
  children: React.ReactNode;
}

const SidebarSection = ({ title, viewAll, children }: SidebarSectionProps) => (
  <div className="mb-6">
    <div className="flex items-center justify-between mb-3 px-2">
      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
        {title}
      </h3>
      {viewAll && (
        <Link
          href={viewAll}
          className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:underline"
        >
          ดูทั้งหมด
        </Link>
      )}
    </div>
    <div className="space-y-3">{children}</div>
  </div>
);

const OnlineStatusIndicator = ({ isOnline }: { isOnline: boolean }) => (
  <span
    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
      isOnline ? "bg-green-500" : "bg-gray-400"
    }`}
    title={isOnline ? "ออนไลน์" : "ออฟไลน์"}
  />
);

/**
 * Right Sidebar Component
 * แถบด้านขวาสำหรับแสดงข้อมูลผู้ติดต่อ, คำขอเป็นเพื่อน, กลุ่ม, และอีเวนท์
 */
export function RightSidebar() {
  const { user } = useAuthStore();
  const onlineContacts = getOnlineContacts(mockUsers, user?.id);

  return (
    <div className="hidden xl:block w-80 fixed right-0 top-16 h-[calc(100vh-4rem)] overflow-y-auto p-4 scrollbar-thin">
      <div className="space-y-6">
        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="ค้นหา"
          />
        </div>

        {/* Online Contacts */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <SidebarSection title="ผู้ติดต่อ" viewAll="/friends">
            <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
              {onlineContacts.map((contact) => (
                <Link
                  key={contact.id}
                  href={`/profile/${contact.id}`}
                  className="flex flex-col items-center space-y-1 group min-w-[60px]"
                >
                  <div className="relative">
                    <Image
                      src={contact.avatar || "https://i.pravatar.cc/150?img=1"}
                      alt={contact.name}
                      width={50}
                      height={50}
                      className="rounded-full object-cover h-12 w-12"
                    />
                    <OnlineStatusIndicator isOnline={contact.isOnline} />
                  </div>
                  <span className="text-xs text-center text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate w-full">
                    {contact.name.split(" ")[0]}
                  </span>
                </Link>
              ))}
            </div>
          </SidebarSection>
        </div>

        {/* Friend Requests */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <SidebarSection
            title={`คำขอเป็นเพื่อน (${friendRequests.length})`}
            viewAll="/friends/requests"
          >
            {friendRequests.map((request) => (
              <div
                key={request.id}
                className="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <div className="relative mr-3">
                  <Image
                    src={request.avatar}
                    alt={request.name}
                    width={40}
                    height={40}
                    className="rounded-full h-10 w-10 object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {request.name}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {request.mutualFriends} เพื่อนร่วมกัน • {request.timestamp}
                  </p>
                </div>
                <div className="flex space-x-1">
                  <button className="p-1.5 text-white bg-blue-600 hover:bg-blue-700 rounded-full">
                    <UserPlus className="h-4 w-4" />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </SidebarSection>
        </div>

        {/* Suggested Groups */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <SidebarSection
            title="กลุ่มที่คุณอาจสนใจ"
            viewAll="/groups/suggested"
          >
            {suggestedGroups.map((group) => (
              <div
                key={group.id}
                className="flex items-start p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Image
                  src={group.avatar}
                  alt={group.name}
                  width={80}
                  height={80}
                  className="rounded-lg h-14 w-14 object-cover mr-3"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    {group.name}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    {group.members.toLocaleString()} สมาชิก • {group.category}
                  </p>
                  <button className="text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-full">
                    เข้าร่วมกลุ่ม
                  </button>
                </div>
              </div>
            ))}
          </SidebarSection>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <SidebarSection title="อีเวนท์ที่กำลังจะถึง" viewAll="/events">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="mb-4 last:mb-0">
                <div className="relative h-24 rounded-lg overflow-hidden mb-2">
                  <Image
                    src={event.coverPhoto}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="absolute bottom-2 left-2 right-2">
                      <h4 className="text-sm font-medium text-white line-clamp-1">
                        {event.title}
                      </h4>
                      <div className="flex items-center text-xs text-gray-200 space-x-2">
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {event.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {event.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 px-1">
                  <span className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {event.location}
                  </span>
                  <span>{event.attendees} คนเข้าร่วม</span>
                </div>
              </div>
            ))}
          </SidebarSection>
        </div>

        {/* Sponsored Content */}
        {sponsoredContent.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <SidebarSection title="โฆษณา">
              {sponsoredContent.map((item) => (
                <div
                  key={item.id}
                  className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
                >
                  <div className="relative h-32 w-full">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      ประชาสัมพันธ์ • {item.sponsor}
                    </div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      {item.description}
                    </p>
                    <a
                      href={item.link}
                      className="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center"
                    >
                      ดูรายละเอียด <ChevronRight className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                </div>
              ))}
            </SidebarSection>
          </div>
        )}
      </div>
    </div>
  );
}
