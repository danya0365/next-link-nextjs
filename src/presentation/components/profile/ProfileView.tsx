"use client";

import { ProfilePhoto } from "@/src/data/mock-profile-data";
import { ProfileViewModel } from "@/src/presentation/presenters/profile/ProfilePresenter";
import { useProfilePresenter } from "@/src/presentation/presenters/profile/useProfilePresenter";
import {
  Briefcase,
  Cake,
  Camera,
  GraduationCap,
  Mail,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  UserPlus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PostCard } from "../feed/PostCard";

interface ProfileViewProps {
  userId: string;
  initialViewModel?: ProfileViewModel;
}

/**
 * Empty State Component
 */
const EmptyState = ({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}) => (
  <div className="text-center py-12">
    <div className="text-5xl mb-4">{icon}</div>
    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
      {title}
    </h3>
    <p className="text-gray-500 dark:text-gray-400 mb-6">{description}</p>
    {action}
  </div>
);

/**
 * Profile View Component
 * หน้าโปรไฟล์ผู้ใช้
 */
export function ProfileView({ userId, initialViewModel }: ProfileViewProps) {
  const [state, actions] = useProfilePresenter(userId, initialViewModel);

  // Default empty view model
  const defaultViewModel: ProfileViewModel = {
    profileUser: null,
    isOwnProfile: false,
    aboutData: {
      work: [],
      education: [],
      placesLived: [],
      contactInfo: {},
      basicInfo: {},
    },
    photos: [],
    friends: [],
    userPosts: [],
  };

  const viewModel = state.viewModel || defaultViewModel;
  const { profileUser, isOwnProfile, aboutData, photos, friends, userPosts } =
    viewModel;

  // Loading state
  if (state.loading && !profileUser) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            กำลังโหลดโปรไฟล์...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (state.error && !profileUser) {
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

  // Not found state
  if (!profileUser) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">👤</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ไม่พบโปรไฟล์นี้
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            ดูเหมือนว่าไม่มีโปรไฟล์นี้อยู่หรืออาจถูกลบไปแล้ว
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            กลับไปยังหน้าหลัก
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pb-8">
      {/* Cover Photo */}
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="relative h-96 bg-gradient-to-r from-blue-500 to-purple-600">
          {profileUser?.coverPhoto && (
            <Image
              src={profileUser.coverPhoto}
              alt="Cover"
              fill
              className="object-cover"
            />
          )}
          {isOwnProfile && (
            <button className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors">
              <Camera className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-20 pb-4">
            <div className="flex flex-col md:flex-row md:items-end md:space-x-4">
              {/* Avatar */}
              <div className="relative">
                <div className="w-40 h-40 rounded-full border-4 border-white dark:border-gray-800 bg-white dark:bg-gray-700 overflow-hidden">
                  <Image
                    src={profileUser.avatar || "/default-avatar.png"}
                    alt={profileUser.name}
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                </div>
                {isOwnProfile && (
                  <button className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-md">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* User Info */}
              <div className="mt-4 md:mt-0">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  {profileUser.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  {profileUser.bio || "ไม่มีคำอธิบายโปรไฟล์"}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 mt-4 md:mt-0">
              {isOwnProfile ? (
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  แก้ไขโปรไฟล์
                </button>
              ) : (
                <>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors">
                    <UserPlus className="w-5 h-5" />
                    <span>เพิ่มเพื่อน</span>
                  </button>
                  <button className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span>ส่งข้อความ</span>
                  </button>
                </>
              )}
              <button className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white p-2 rounded-lg transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-200 dark:border-gray-700 flex space-x-6">
            <button
              onClick={() => actions.setActiveTab("posts")}
              className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                state.activeTab === "posts"
                  ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              โพสต์
            </button>
            <button
              onClick={() => actions.setActiveTab("about")}
              className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                state.activeTab === "about"
                  ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              เกี่ยวกับ
            </button>
            <button
              onClick={() => actions.setActiveTab("photos")}
              className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                state.activeTab === "photos"
                  ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              รูปภาพ
            </button>
            <button
              onClick={() => actions.setActiveTab("friends")}
              className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                state.activeTab === "friends"
                  ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
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
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
                ข้อมูลเบื้องต้น
              </h3>
              <div className="space-y-3">
                {aboutData.basicInfo?.birthday && (
                  <div className="flex items-center space-x-2">
                    <Cake className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">
                      เกิดเมื่อ{" "}
                      {new Date(
                        aboutData.basicInfo.birthday
                      ).toLocaleDateString("th-TH")}
                    </span>
                  </div>
                )}
                {aboutData.placesLived?.[0]?.city && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">
                      อาศัยอยู่ที่ {aboutData.placesLived[0].city}
                    </span>
                  </div>
                )}
                {aboutData.work?.[0]?.position && (
                  <div className="flex items-center space-x-2">
                    <Briefcase className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {aboutData.work[0].position} ที่{" "}
                      {aboutData.work[0].company}
                    </span>
                  </div>
                )}
                {aboutData.education?.[0]?.school && (
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">
                      ศึกษาที่ {aboutData.education[0].school}
                    </span>
                  </div>
                )}
                {aboutData.contactInfo?.email && (
                  <div className="flex items-center space-x-2">
                    <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {aboutData.contactInfo.email}
                    </span>
                  </div>
                )}
              </div>
              {isOwnProfile && (
                <button className="mt-4 w-full py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg font-medium transition-colors">
                  แก้ไขรายละเอียด
                </button>
              )}
            </div>

            {/* Photos Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                  ภาพถ่าย
                </h3>
                {photos.length > 0 && (
                  <Link
                    href="#"
                    className="text-blue-600 dark:text-blue-400 text-sm font-medium"
                  >
                    ดูทั้งหมด
                  </Link>
                )}
              </div>
              {photos.length > 0 ? (
                <div className="grid grid-cols-3 gap-1">
                  {photos.slice(0, 6).map((photo: ProfilePhoto) => (
                    <div
                      key={photo.id}
                      className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden"
                    >
                      <Image
                        src={photo.url}
                        alt={photo.caption || "Photo"}
                        width={120}
                        height={120}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon="📷"
                  title="ยังไม่มีรูปภาพ"
                  description={
                    isOwnProfile
                      ? "อัปโหลดรูปภาพแรกของคุณเพื่อแบ่งปันกับเพื่อนๆ"
                      : "ผู้ใช้ยังไม่ได้อัปโหลดรูปภาพ"
                  }
                  action={
                    isOwnProfile && (
                      <button className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                        อัปโหลดรูปภาพ
                      </button>
                    )
                  }
                />
              )}
            </div>

            {/* Friends Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                  เพื่อน
                </h3>
                {friends.length > 0 && (
                  <Link
                    href="#"
                    className="text-blue-600 dark:text-blue-400 text-sm font-medium"
                  >
                    ดูทั้งหมด
                  </Link>
                )}
              </div>
              {friends.length > 0 ? (
                <div className="grid grid-cols-3 gap-2">
                  {friends.slice(0, 6).map((friend) => (
                    <Link
                      href={`/profile/${friend.id}`}
                      key={friend.id}
                      className="block"
                    >
                      <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden mb-1">
                        <Image
                          src={friend.avatar}
                          alt={friend.name}
                          width={100}
                          height={100}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-xs text-gray-700 dark:text-gray-300 truncate text-center">
                        {friend.name}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon="👥"
                  title="ยังไม่มีเพื่อน"
                  description={
                    isOwnProfile
                      ? "ค้นหาเพื่อนและเริ่มติดต่อกับเพื่อนของคุณ"
                      : "ผู้ใช้ยังไม่มีเพื่อน"
                  }
                  action={
                    isOwnProfile && (
                      <Link
                        href="/friends/suggestions"
                        className="inline-block mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        ค้นหาเพื่อน
                      </Link>
                    )
                  }
                />
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {state.activeTab === "posts" && (
              <div className="space-y-4">
                {userPosts.length > 0 ? (
                  userPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))
                ) : (
                  <EmptyState
                    icon="📝"
                    title={isOwnProfile ? "คุณยังไม่มีโพสต์" : "ยังไม่มีโพสต์"}
                    description={
                      isOwnProfile
                        ? "เริ่มต้นแชร์ความคิดเห็นหรืออัปเดตสถานะของคุณ"
                        : "ผู้ใช้ยังไม่ได้โพสต์อะไรเลย"
                    }
                    action={
                      isOwnProfile && (
                        <button
                          onClick={() => {}}
                          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-medium transition-colors"
                        >
                          สร้างโพสต์แรก
                        </button>
                      )
                    }
                  />
                )}
              </div>
            )}

            {state.activeTab === "about" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  เกี่ยวกับ
                </h2>

                {aboutData.work && aboutData.work.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">
                      การทำงาน
                    </h3>
                    <div className="space-y-4">
                      {aboutData.work.map((work, index) => (
                        <div key={index} className="flex space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                              <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {work.position} ที่ {work.company}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                              {work.startDate} - {work.endDate || "ปัจจุบัน"}
                            </p>
                            {work.description && (
                              <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm">
                                {work.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {aboutData.education && aboutData.education.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">
                      การศึกษา
                    </h3>
                    <div className="space-y-4">
                      {aboutData.education.map((edu, index) => (
                        <div key={index} className="flex space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                              <GraduationCap className="w-6 h-6 text-green-600 dark:text-green-300" />
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {edu.school}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                              {edu.graduationYear}
                            </p>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                              {edu.degree} {edu.field ? `, ${edu.field}` : ""}
                            </p>
                            {edu.description && (
                              <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm">
                                {edu.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {aboutData.placesLived && aboutData.placesLived.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">
                      สถานที่
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                          ที่อยู่ปัจจุบัน
                        </h4>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-5 h-5 text-gray-500" />
                          <span className="text-gray-600 dark:text-gray-300">
                            {aboutData.placesLived.find(
                              (p) => p.type === "current"
                            )?.city || "ไม่ระบุ"}
                          </span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                          บ้านเกิด
                        </h4>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-5 h-5 text-gray-500" />
                          <span className="text-gray-600 dark:text-gray-300">
                            {aboutData.placesLived.find(
                              (p) => p.type === "hometown"
                            )?.city || "ไม่ระบุ"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {aboutData.contactInfo && (
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">
                      ข้อมูลติดต่อ
                    </h3>
                    <div className="space-y-2">
                      {aboutData.contactInfo.phone && (
                        <div className="flex items-center space-x-2">
                          <span className="w-5 h-5 flex items-center justify-center">
                            📱
                          </span>
                          <span className="text-gray-600 dark:text-gray-300">
                            {aboutData.contactInfo.phone}
                          </span>
                        </div>
                      )}
                      {aboutData.contactInfo.email && (
                        <div className="flex items-center space-x-2">
                          <Mail className="w-5 h-5 text-gray-500" />
                          <span className="text-gray-600 dark:text-gray-300">
                            {aboutData.contactInfo.email}
                          </span>
                        </div>
                      )}
                      {aboutData.contactInfo.website && (
                        <div className="flex items-center space-x-2">
                          <span className="w-5 h-5 flex items-center justify-center">
                            🌐
                          </span>
                          <a
                            href={aboutData.contactInfo.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            {aboutData.contactInfo.website}
                          </a>
                        </div>
                      )}
                      {aboutData.contactInfo.socialLinks &&
                        aboutData.contactInfo.socialLinks.length > 0 && (
                          <div className="pt-2">
                            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                              โซเชียลมีเดีย
                            </h4>
                            <div className="flex space-x-3">
                              {aboutData.contactInfo.socialLinks.map(
                                (social, index) => (
                                  <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
                                    aria-label={social.platform}
                                  >
                                    {social.platform === "facebook" && "📘"}
                                    {social.platform === "twitter" && "🐦"}
                                    {social.platform === "instagram" && "📸"}
                                    {social.platform === "linkedin" && "💼"}
                                    {![
                                      "facebook",
                                      "twitter",
                                      "instagram",
                                      "linkedin",
                                    ].includes(social.platform) && "🔗"}
                                  </a>
                                )
                              )}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                )}

                {aboutData.basicInfo && (
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">
                      ข้อมูลพื้นฐาน
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {aboutData.basicInfo.gender && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                            เพศ
                          </h4>
                          <p className="text-gray-900 dark:text-white">
                            {aboutData.basicInfo.gender === "male"
                              ? "ชาย"
                              : "หญิง"}
                          </p>
                        </div>
                      )}
                      {aboutData.basicInfo.birthday && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                            วันเกิด
                          </h4>
                          <p className="text-gray-900 dark:text-white">
                            {new Date(
                              aboutData.basicInfo.birthday
                            ).toLocaleDateString("th-TH", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      )}
                      {aboutData.basicInfo.relationshipStatus && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                            สถานะความสัมพันธ์
                          </h4>
                          <p className="text-gray-900 dark:text-white">
                            {aboutData.basicInfo.relationshipStatus}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {isOwnProfile && (
                  <div className="pt-4">
                    <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
                      แก้ไขรายละเอียด
                    </button>
                  </div>
                )}
              </div>
            )}

            {state.activeTab === "photos" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    รูปภาพ
                  </h2>
                  {isOwnProfile && photos.length > 0 && (
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                      อัปโหลดรูปภาพ
                    </button>
                  )}
                </div>

                {photos.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {photos.map((photo: ProfilePhoto) => (
                      <div
                        key={photo.id}
                        className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden"
                      >
                        <Image
                          src={photo.url}
                          alt={photo.caption || "Photo"}
                          width={300}
                          height={300}
                          className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon="📷"
                    title={
                      isOwnProfile ? "คุณยังไม่มีรูปภาพ" : "ยังไม่มีรูปภาพ"
                    }
                    description={
                      isOwnProfile
                        ? "อัปโหลดรูปภาพแรกของคุณเพื่อแบ่งปันกับเพื่อนๆ"
                        : "ผู้ใช้ยังไม่ได้อัปโหลดรูปภาพ"
                    }
                    action={
                      isOwnProfile && (
                        <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-medium transition-colors">
                          อัปโหลดรูปภาพ
                        </button>
                      )
                    }
                  />
                )}
              </div>
            )}

            {state.activeTab === "friends" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    เพื่อน {friends.length > 0 ? `(${friends.length})` : ""}
                  </h2>
                  {isOwnProfile && friends.length > 0 && (
                    <Link
                      href="/friends"
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      จัดการเพื่อน
                    </Link>
                  )}
                </div>

                {friends.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {friends.map((friend) => (
                      <Link
                        href={`/profile/${friend.id}`}
                        key={friend.id}
                        className="block group"
                      >
                        <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden mb-2 transition-transform group-hover:scale-105">
                          <Image
                            src={friend.avatar}
                            alt={friend.name}
                            width={200}
                            height={200}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="font-medium text-gray-900 dark:text-white text-center group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {friend.name}
                        </p>
                        {friend.mutualFriends > 0 && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                            เพื่อนร่วมกัน {friend.mutualFriends} คน
                          </p>
                        )}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon="👥"
                    title={
                      isOwnProfile ? "คุณยังไม่มีเพื่อน" : "ยังไม่มีเพื่อน"
                    }
                    description={
                      isOwnProfile
                        ? "ค้นหาเพื่อนและเริ่มติดต่อกับเพื่อนของคุณ"
                        : "ผู้ใช้ยังไม่มีเพื่อน"
                    }
                    action={
                      isOwnProfile && (
                        <Link
                          href="/friends/suggestions"
                          className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-medium transition-colors"
                        >
                          ค้นหาเพื่อน
                        </Link>
                      )
                    }
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
