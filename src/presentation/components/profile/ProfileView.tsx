"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Camera,
  UserPlus,
  MessageCircle,
  MoreHorizontal,
  Briefcase,
  GraduationCap,
  MapPin,
  Heart,
  Cake,
  Mail,
} from "lucide-react";
import { useAuthStore } from "@/src/presentation/stores/authStore";
import { useFeedStore } from "@/src/presentation/stores/feedStore";
import { mockUsers } from "@/src/data/mock-users";
import { mockAboutData, mockPhotosData, mockFriendsData } from "@/src/data/mock-profile-data";
import { PostCard } from "../feed/PostCard";

interface ProfileViewProps {
  userId: string;
}

/**
 * Profile View Component
 * หน้าโปรไฟล์ผู้ใช้
 */
export function ProfileView({ userId }: ProfileViewProps) {
  const { user: currentUser } = useAuthStore();
  const { posts } = useFeedStore();
  const [activeTab, setActiveTab] = useState<"posts" | "about" | "photos" | "friends">("posts");

  const profileUser = mockUsers.find((u) => u.id === userId);
  const isOwnProfile = currentUser?.id === userId;
  const aboutData = mockAboutData[userId] || {};
  const photos = mockPhotosData[userId] || [];
  const friends = mockFriendsData[userId] || [];
  const userPosts = posts.filter((post) => post.userId === userId);

  if (!profileUser) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 dark:text-gray-400">
            ไม่พบโปรไฟล์นี้
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pb-8">
      {/* Cover Photo */}
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="relative h-96 bg-gradient-to-r from-blue-500 to-purple-600">
          {profileUser.coverPhoto && (
            <Image
              src={profileUser.coverPhoto}
              alt="Cover"
              fill
              className="object-cover"
            />
          )}
          {isOwnProfile && (
            <button className="absolute bottom-4 right-4 px-4 py-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex items-center space-x-2 transition-colors">
              <Camera className="w-5 h-5" />
              <span className="font-medium">แก้ไขภาพปก</span>
            </button>
          )}
        </div>

        {/* Profile Info */}
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-20 pb-4">
            <div className="flex flex-col md:flex-row md:items-end md:space-x-4">
              {/* Avatar */}
              <div className="relative">
                <div className="w-40 h-40 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-800">
                  <Image
                    src={profileUser.avatar || "https://i.pravatar.cc/150?img=1"}
                    alt={profileUser.name}
                    width={160}
                    height={160}
                    className="object-cover"
                  />
                </div>
                {isOwnProfile && (
                  <button className="absolute bottom-2 right-2 p-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full transition-colors">
                    <Camera className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Name & Stats */}
              <div className="mt-4 md:mt-0 md:mb-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {profileUser.name}
                </h1>
                {profileUser.bio && (
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {profileUser.bio}
                  </p>
                )}
                <div className="flex items-center space-x-4 mt-2 text-gray-600 dark:text-gray-400">
                  <span>{profileUser.friendsCount} เพื่อน</span>
                  <span>{profileUser.followersCount} ผู้ติดตาม</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 mt-4 md:mt-0 md:mb-4">
              {isOwnProfile ? (
                <>
                  <button className="flex-1 md:flex-none px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                    เพิ่มเรื่องราว
                  </button>
                  <button className="flex-1 md:flex-none px-6 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-medium transition-colors">
                    แก้ไขโปรไฟล์
                  </button>
                </>
              ) : (
                <>
                  <button className="flex-1 md:flex-none px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors">
                    <UserPlus className="w-5 h-5" />
                    <span>เพิ่มเพื่อน</span>
                  </button>
                  <button className="flex-1 md:flex-none px-6 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span>ส่งข้อความ</span>
                  </button>
                  <button className="p-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors">
                    <MoreHorizontal className="w-5 h-5 text-gray-900 dark:text-white" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-200 dark:border-gray-700 flex space-x-6">
            <button
              onClick={() => setActiveTab("posts")}
              className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                activeTab === "posts"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              โพสต์
            </button>
            <button
              onClick={() => setActiveTab("about")}
              className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                activeTab === "about"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              เกี่ยวกับ
            </button>
            <button
              onClick={() => setActiveTab("photos")}
              className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                activeTab === "photos"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              รูปภาพ
            </button>
            <button
              onClick={() => setActiveTab("friends")}
              className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                activeTab === "friends"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              เพื่อน
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Intro Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
              <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-4">
                ข้อมูลเบื้องต้น
              </h3>
              <div className="space-y-3">
                {aboutData.work && aboutData.work[0] && (
                  <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                    <Briefcase className="w-5 h-5 text-gray-500" />
                    <span>
                      {aboutData.work[0].position} ที่{" "}
                      <span className="font-medium">{aboutData.work[0].company}</span>
                    </span>
                  </div>
                )}
                {aboutData.education && aboutData.education[0] && (
                  <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                    <GraduationCap className="w-5 h-5 text-gray-500" />
                    <span>
                      เรียนที่{" "}
                      <span className="font-medium">{aboutData.education[0].school}</span>
                    </span>
                  </div>
                )}
                {aboutData.placesLived && aboutData.placesLived[0] && (
                  <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <span>
                      อาศัยอยู่ที่{" "}
                      <span className="font-medium">{aboutData.placesLived[0].city}</span>
                    </span>
                  </div>
                )}
                {aboutData.basicInfo?.relationshipStatus && (
                  <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                    <Heart className="w-5 h-5 text-gray-500" />
                    <span>{aboutData.basicInfo.relationshipStatus}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Photos Preview */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-xl text-gray-900 dark:text-white">
                  รูปภาพ
                </h3>
                <Link
                  href="#"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  ดูทั้งหมด
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {photos.slice(0, 9).map((photo) => (
                  <div key={photo.id} className="relative aspect-square">
                    <Image
                      src={photo.url}
                      alt="Photo"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Friends Preview */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white">
                    เพื่อน
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {profileUser.friendsCount} คน
                  </p>
                </div>
                <Link
                  href="#"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  ดูทั้งหมด
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {friends.slice(0, 6).map((friend) => (
                  <Link
                    key={friend.id}
                    href={`/profile/${friend.id}`}
                    className="group"
                  >
                    <div className="relative aspect-square rounded-lg overflow-hidden mb-2">
                      <Image
                        src={friend.avatar}
                        alt={friend.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {friend.name}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === "posts" && (
              <div className="space-y-4">
                {userPosts.length === 0 ? (
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-12 text-center">
                    <p className="text-gray-500 dark:text-gray-400">
                      ยังไม่มีโพสต์
                    </p>
                  </div>
                ) : (
                  userPosts.map((post) => <PostCard key={post.id} post={post} />)
                )}
              </div>
            )}

            {activeTab === "about" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  เกี่ยวกับ
                </h2>

                {/* Work */}
                {aboutData.work && aboutData.work.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3 flex items-center">
                      <Briefcase className="w-5 h-5 mr-2" />
                      ประสบการณ์ทำงาน
                    </h3>
                    <div className="space-y-3">
                      {aboutData.work.map((work, index) => (
                        <div key={index}>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {work.position}
                          </p>
                          <p className="text-gray-600 dark:text-gray-400">
                            {work.company}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-500">
                            {new Date(work.startDate).getFullYear()} - ปัจจุบัน
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education */}
                {aboutData.education && aboutData.education.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3 flex items-center">
                      <GraduationCap className="w-5 h-5 mr-2" />
                      การศึกษา
                    </h3>
                    <div className="space-y-3">
                      {aboutData.education.map((edu, index) => (
                        <div key={index}>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {edu.school}
                          </p>
                          {edu.degree && edu.field && (
                            <p className="text-gray-600 dark:text-gray-400">
                              {edu.degree} {edu.field}
                            </p>
                          )}
                          {edu.graduationYear && (
                            <p className="text-sm text-gray-500 dark:text-gray-500">
                              จบการศึกษา {edu.graduationYear}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Info */}
                {aboutData.contactInfo && (
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3 flex items-center">
                      <Mail className="w-5 h-5 mr-2" />
                      ข้อมูลติดต่อ
                    </h3>
                    <div className="space-y-2">
                      {aboutData.contactInfo.email && (
                        <p className="text-gray-700 dark:text-gray-300">
                          <span className="font-medium">Email:</span>{" "}
                          {aboutData.contactInfo.email}
                        </p>
                      )}
                      {aboutData.contactInfo.phone && (
                        <p className="text-gray-700 dark:text-gray-300">
                          <span className="font-medium">โทรศัพท์:</span>{" "}
                          {aboutData.contactInfo.phone}
                        </p>
                      )}
                      {aboutData.contactInfo.website && (
                        <p className="text-gray-700 dark:text-gray-300">
                          <span className="font-medium">เว็บไซต์:</span>{" "}
                          <a
                            href={aboutData.contactInfo.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {aboutData.contactInfo.website}
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Basic Info */}
                {aboutData.basicInfo && (
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">
                      ข้อมูลพื้นฐาน
                    </h3>
                    <div className="space-y-2">
                      {aboutData.basicInfo.birthday && (
                        <p className="text-gray-700 dark:text-gray-300 flex items-center">
                          <Cake className="w-4 h-4 mr-2" />
                          {aboutData.basicInfo.birthday}
                        </p>
                      )}
                      {aboutData.basicInfo.gender && (
                        <p className="text-gray-700 dark:text-gray-300">
                          <span className="font-medium">เพศ:</span>{" "}
                          {aboutData.basicInfo.gender}
                        </p>
                      )}
                      {aboutData.basicInfo.relationshipStatus && (
                        <p className="text-gray-700 dark:text-gray-300 flex items-center">
                          <Heart className="w-4 h-4 mr-2" />
                          {aboutData.basicInfo.relationshipStatus}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "photos" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  รูปภาพ
                </h2>
                {photos.length === 0 ? (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-12">
                    ยังไม่มีรูปภาพ
                  </p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {photos.map((photo) => (
                      <div key={photo.id} className="relative aspect-square">
                        <Image
                          src={photo.url}
                          alt="Photo"
                          fill
                          className="object-cover rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "friends" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  เพื่อน
                  <span className="text-gray-500 dark:text-gray-400 font-normal ml-2">
                    {friends.length} คน
                  </span>
                </h2>
                {friends.length === 0 ? (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-12">
                    ยังไม่มีเพื่อน
                  </p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {friends.map((friend) => (
                      <Link
                        key={friend.id}
                        href={`/profile/${friend.id}`}
                        className="group"
                      >
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-3">
                            <Image
                              src={friend.avatar}
                              alt={friend.name}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform"
                            />
                          </div>
                          <p className="font-medium text-gray-900 dark:text-white truncate">
                            {friend.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {friend.mutualFriends} เพื่อนร่วมกัน
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
