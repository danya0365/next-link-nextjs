"use client";

import { Group } from "@/src/data/groups-mock-data";
import { formatNumber } from "@/src/utils/text-helpers";
import { formatDistanceToNow } from "@/src/utils/date-helpers";
import {
  ArrowLeft,
  Users,
  Globe,
  Lock,
  Shield,
  Settings,
  Bell,
  Share2,
  MoreHorizontal,
  ThumbsUp,
  MessageCircle,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface GroupDetailViewProps {
  group: Group;
}

/**
 * Group Detail View Component
 * แสดงรายละเอียดกลุ่มและโพสต์ในกลุ่ม
 */
export function GroupDetailView({ group }: GroupDetailViewProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"discussion" | "about" | "members">("discussion");
  const [postContent, setPostContent] = useState("");

  const getPrivacyIcon = (privacy: string) => {
    if (privacy === "public") return <Globe className="w-4 h-4" />;
    if (privacy === "private") return <Lock className="w-4 h-4" />;
    return <Shield className="w-4 h-4" />;
  };

  const getPrivacyLabel = (privacy: string) => {
    if (privacy === "public") return "กลุ่มสาธารณะ";
    if (privacy === "private") return "กลุ่มส่วนตัว";
    return "กลุ่มลับ";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">กลับ</span>
          </button>
        </div>
      </div>

      {/* Cover Image */}
      <div className="relative h-64 md:h-96 bg-gray-200 dark:bg-gray-700">
        <Image
          src={group.coverImage}
          alt={group.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Group Info */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end gap-4 -mt-16 pb-4">
            {/* Group Icon */}
            <div className="relative w-32 h-32 rounded-xl overflow-hidden border-4 border-white dark:border-gray-800 bg-white dark:bg-gray-700">
              <Image
                src={group.icon}
                alt={group.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Group Name & Stats */}
            <div className="flex-1 pt-16">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {group.name}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  {getPrivacyIcon(group.privacy)}
                  <span>{getPrivacyLabel(group.privacy)}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{formatNumber(group.members)} สมาชิก</span>
                </div>
                <span>•</span>
                <span>{group.postsToday} โพสต์วันนี้</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                {group.isMember ? (
                  <>
                    <button className="px-6 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors font-medium flex items-center gap-2">
                      <Bell className="w-4 h-4" />
                      <span>การแจ้งเตือน</span>
                    </button>
                    <button className="px-6 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors font-medium flex items-center gap-2">
                      <Share2 className="w-4 h-4" />
                      <span>แชร์</span>
                    </button>
                    <button className="p-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors">
                      <Settings className="w-5 h-5" />
                    </button>
                  </>
                ) : group.isPending ? (
                  <button
                    disabled
                    className="px-6 py-2 bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-lg font-medium cursor-not-allowed"
                  >
                    รอการอนุมัติ
                  </button>
                ) : (
                  <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium">
                    เข้าร่วมกลุ่ม
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-8 mt-6">
            <button
              onClick={() => setActiveTab("discussion")}
              className={`pb-4 font-semibold transition-colors relative ${
                activeTab === "discussion"
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              การสนทนา
              {activeTab === "discussion" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("about")}
              className={`pb-4 font-semibold transition-colors relative ${
                activeTab === "about"
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              เกี่ยวกับ
              {activeTab === "about" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("members")}
              className={`pb-4 font-semibold transition-colors relative ${
                activeTab === "members"
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              สมาชิก
              {activeTab === "members" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === "discussion" && (
              <div className="space-y-6">
                {/* Create Post */}
                {group.isMember && (
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-4">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600" />
                      <input
                        type="text"
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        placeholder="เขียนบางอย่างในกลุ่ม..."
                        className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <button className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <ImageIcon className="w-5 h-5" />
                        <span className="text-sm font-medium">รูปภาพ/วิดีโอ</span>
                      </button>
                      <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium">
                        โพสต์
                      </button>
                    </div>
                  </div>
                )}

                {/* Posts */}
                {group.posts && group.posts.length > 0 ? (
                  group.posts.map((post) => (
                    <div
                      key={post.id}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
                    >
                      {/* Post Header */}
                      <div className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <Image
                              src={post.userAvatar}
                              alt={post.userName}
                              width={40}
                              height={40}
                              className="rounded-full"
                            />
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white">
                                {post.userName}
                              </h3>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {formatDistanceToNow(post.createdAt)}
                              </p>
                            </div>
                          </div>
                          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                            <MoreHorizontal className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                          </button>
                        </div>

                        {/* Post Content */}
                        <p className="mt-4 text-gray-900 dark:text-white whitespace-pre-wrap">
                          {post.content}
                        </p>
                      </div>

                      {/* Post Images */}
                      {post.images && post.images.length > 0 && (
                        <div className="grid grid-cols-2 gap-1">
                          {post.images.map((img, idx) => (
                            <div key={idx} className="relative h-64">
                              <Image
                                src={img}
                                alt={`Post image ${idx + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Post Actions */}
                      <div className="px-4 py-2 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-4">
                          <span>{formatNumber(post.likes)} ถูกใจ</span>
                          <span>{post.comments} ความคิดเห็น</span>
                          <span>{post.shares} แชร์</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="px-4 py-2 flex items-center gap-4 border-t border-gray-200 dark:border-gray-700">
                        <button className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                          <ThumbsUp className="w-5 h-5" />
                          <span className="text-sm font-medium">ถูกใจ</span>
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                          <MessageCircle className="w-5 h-5" />
                          <span className="text-sm font-medium">ความคิดเห็น</span>
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                          <Share2 className="w-5 h-5" />
                          <span className="text-sm font-medium">แชร์</span>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-12 text-center">
                    <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      ยังไม่มีโพสต์
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      เป็นคนแรกที่โพสต์ในกลุ่มนี้
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "about" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  เกี่ยวกับกลุ่มนี้
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {group.description}
                </p>

                {group.tags.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                      แท็ก
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {group.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "members" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  สมาชิก · {formatNumber(group.members)}
                </h2>
                <div className="space-y-4">
                  {group.admins.map((admin) => (
                    <div key={admin.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Image
                          src={admin.avatar}
                          alt={admin.name}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {admin.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            ผู้ดูแล
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* About Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                เกี่ยวกับ
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  {getPrivacyIcon(group.privacy)}
                  <span>{getPrivacyLabel(group.privacy)}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <Users className="w-4 h-4" />
                  <span>{formatNumber(group.members)} สมาชิก</span>
                </div>
              </div>
            </div>

            {/* Admins Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                ผู้ดูแล
              </h3>
              <div className="space-y-3">
                {group.admins.map((admin) => (
                  <div key={admin.id} className="flex items-center gap-3">
                    <Image
                      src={admin.avatar}
                      alt={admin.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white truncate">
                        {admin.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        ผู้ดูแล
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
