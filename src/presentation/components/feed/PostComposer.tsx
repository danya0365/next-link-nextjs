"use client";

import { useState } from "react";
import Image from "next/image";
import { Image as ImageIcon, Video, Smile, MapPin, X } from "lucide-react";
import { useAuthStore } from "@/src/presentation/stores/authStore";
import { useFeedStore } from "@/src/presentation/stores/feedStore";

/**
 * Post Composer Component
 * แบบฟอร์มสร้างโพสต์ใหม่
 */
export function PostComposer() {
  const { user } = useAuthStore();
  const { addPost } = useFeedStore();

  const [content, setContent] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [privacy, setPrivacy] = useState<"public" | "friends" | "only_me">("public");
  const [feeling, setFeeling] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = () => {
    if (!content.trim() || !user) return;

    addPost({
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar || "https://i.pravatar.cc/150?img=1",
      content: content.trim(),
      privacy,
      feeling: feeling || undefined,
      location: location || undefined,
    });

    // Reset form
    setContent("");
    setFeeling("");
    setLocation("");
    setIsExpanded(false);
  };

  if (!user) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-4">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-4">
        <Image
          src={user.avatar || "https://i.pravatar.cc/150?img=1"}
          alt={user.name}
          width={40}
          height={40}
          className="rounded-full"
        />
        <button
          onClick={() => setIsExpanded(true)}
          className="flex-1 text-left px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          {user.name} คุณกำลังคิดอะไรอยู่?
        </button>
      </div>

      {/* Expanded Form */}
      {isExpanded && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
          {/* Text Area */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="คุณกำลังคิดอะไรอยู่?"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white placeholder-gray-400 resize-none"
            rows={4}
            autoFocus
          />

          {/* Additional Info */}
          <div className="mt-3 space-y-2">
            {/* Feeling */}
            {feeling && (
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Smile className="w-4 h-4 mr-2" />
                <span>รู้สึก{feeling}</span>
                <button
                  onClick={() => setFeeling("")}
                  className="ml-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Location */}
            {location && (
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4 mr-2" />
                <span>อยู่ที่ {location}</span>
                <button
                  onClick={() => setLocation("")}
                  className="ml-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex space-x-2">
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-green-600">
                <ImageIcon className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-red-600">
                <Video className="w-5 h-5" />
              </button>
              <button
                onClick={() => setFeeling("มีความสุข")}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-yellow-600"
              >
                <Smile className="w-5 h-5" />
              </button>
              <button
                onClick={() => setLocation("กรุงเทพฯ")}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-blue-600"
              >
                <MapPin className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center space-x-2">
              {/* Privacy Selector */}
              <select
                value={privacy}
                onChange={(e) => setPrivacy(e.target.value as typeof privacy)}
                className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="public">สาธารณะ</option>
                <option value="friends">เพื่อน</option>
                <option value="only_me">เฉพาะฉัน</option>
              </select>

              {/* Cancel Button */}
              <button
                onClick={() => {
                  setIsExpanded(false);
                  setContent("");
                  setFeeling("");
                  setLocation("");
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                ยกเลิก
              </button>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={!content.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                โพสต์
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions (when not expanded) */}
      {!isExpanded && (
        <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
          <button className="flex-1 flex items-center justify-center space-x-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <Video className="w-5 h-5 text-red-600" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Live วิดีโอ
            </span>
          </button>
          <button className="flex-1 flex items-center justify-center space-x-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <ImageIcon className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              รูปภาพ/วิดีโอ
            </span>
          </button>
          <button className="flex-1 flex items-center justify-center space-x-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <Smile className="w-5 h-5 text-yellow-600" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              ความรู้สึก/กิจกรรม
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
