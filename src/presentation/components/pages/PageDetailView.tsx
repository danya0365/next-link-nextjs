"use client";

import { Page } from "@/src/data/pages-mock-data";
import { formatNumber } from "@/src/utils/text-helpers";
import { formatDistanceToNow } from "@/src/utils/date-helpers";
import {
  ArrowLeft,
  Check,
  Globe,
  Heart,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Phone,
  Share2,
  Star,
  ThumbsUp,
  UserPlus,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PageDetailViewProps {
  page: Page;
}

/**
 * Page Detail View Component
 * แสดงรายละเอียดเพจ
 */
export function PageDetailView({ page }: PageDetailViewProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"posts" | "about" | "reviews">("posts");
  const [isFollowing, setIsFollowing] = useState(page.isFollowing);
  const [isLiked, setIsLiked] = useState(page.isLiked);
  const [postContent, setPostContent] = useState("");

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
          src={page.coverImage}
          alt={page.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Page Info */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end gap-4 -mt-16 pb-4">
            {/* Page Avatar */}
            <div className="relative w-32 h-32 rounded-xl overflow-hidden border-4 border-white dark:border-gray-800 bg-white dark:bg-gray-700">
              <Image
                src={page.avatar}
                alt={page.name}
                fill
                className="object-cover"
              />
              {page.verified && (
                <div className="absolute bottom-2 right-2 bg-blue-600 text-white rounded-full p-1">
                  <Check className="w-5 h-5" />
                </div>
              )}
            </div>

            {/* Page Name & Stats */}
            <div className="flex-1 pt-16">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    {page.name}
                    {page.verified && (
                      <Check className="w-6 h-6 text-blue-600" />
                    )}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{formatNumber(page.likes)} ถูกใจ</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <UserPlus className="w-4 h-4" />
                      <span>{formatNumber(page.followers)} ผู้ติดตาม</span>
                    </div>
                    {page.rating && (
                      <>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span>{page.rating} ({formatNumber(page.reviewsCount || 0)} รีวิว)</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 mb-4">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`px-6 py-2 rounded-lg transition-colors font-medium flex items-center gap-2 ${
                    isLiked
                      ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50"
                      : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? "fill-red-500" : ""}`} />
                  <span>{isLiked ? "ถูกใจแล้ว" : "ถูกใจ"}</span>
                </button>

                {isFollowing ? (
                  <button
                    onClick={() => setIsFollowing(false)}
                    className="px-6 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors font-medium flex items-center gap-2"
                  >
                    <Check className="w-5 h-5" />
                    <span>กำลังติดตาม</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setIsFollowing(true)}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium flex items-center gap-2"
                  >
                    <UserPlus className="w-5 h-5" />
                    <span>ติดตาม</span>
                  </button>
                )}

                <button className="px-6 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors font-medium flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  <span>แชร์</span>
                </button>

                <button className="p-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors">
                  <MoreHorizontal className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-8 mt-6">
            <button
              onClick={() => setActiveTab("posts")}
              className={`pb-4 font-semibold transition-colors relative ${
                activeTab === "posts"
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              โพสต์
              {activeTab === "posts" && (
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
            {page.rating && (
              <button
                onClick={() => setActiveTab("reviews")}
                className={`pb-4 font-semibold transition-colors relative ${
                  activeTab === "reviews"
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                รีวิว
                {activeTab === "reviews" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === "posts" && (
              <div className="space-y-6">
                {/* Create Post */}
                {isFollowing && (
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-4">
                    <div className="flex gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600" />
                      <input
                        type="text"
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        placeholder="เขียนบางอย่าง..."
                        className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
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
                {page.posts && page.posts.length > 0 ? (
                  page.posts.map((post) => (
                    <div
                      key={post.id}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
                    >
                      {/* Post Header */}
                      <div className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <Image
                              src={page.avatar}
                              alt={page.name}
                              width={40}
                              height={40}
                              className="rounded-full"
                            />
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                {page.name}
                                {page.verified && (
                                  <Check className="w-4 h-4 text-blue-600" />
                                )}
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

                      {/* Post Stats */}
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
                      เพจนี้ยังไม่ได้โพสต์อะไร
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "about" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  เกี่ยวกับ
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {page.description}
                </p>

                <div className="space-y-4">
                  {page.website && (
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-gray-500" />
                      <a
                        href={page.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {page.website}
                      </a>
                    </div>
                  )}
                  {page.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700 dark:text-gray-300">{page.phone}</span>
                    </div>
                  )}
                  {page.address && (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                      <span className="text-gray-700 dark:text-gray-300">{page.address}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "reviews" && page.rating && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  รีวิว
                </h2>
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-5xl font-bold text-gray-900 dark:text-white">
                    {page.rating}
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(page.rating!)
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-300 dark:text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      จาก {formatNumber(page.reviewsCount || 0)} รีวิว
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  รีวิวจะแสดงที่นี่
                </p>
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
                <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
                  {page.description}
                </p>
                {page.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-500" />
                    <a
                      href={page.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline truncate"
                    >
                      เว็บไซต์
                    </a>
                  </div>
                )}
                {page.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700 dark:text-gray-300">{page.phone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                สถิติ
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">ถูกใจ</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatNumber(page.likes)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">ผู้ติดตาม</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatNumber(page.followers)}
                  </span>
                </div>
                {page.rating && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">คะแนน</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {page.rating} / 5
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
