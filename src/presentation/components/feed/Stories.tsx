"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { mockStories, Story } from "@/src/data/mock-stories";
import { useAuthStore } from "@/src/presentation/stores/authStore";

/**
 * Stories Component
 * แสดง Stories ของเพื่อนๆ
 */
export function Stories() {
  const { user } = useAuthStore();
  const [stories] = useState<Story[]>(mockStories);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollStories = (direction: "left" | "right") => {
    const container = document.getElementById("stories-container");
    if (!container) return;

    const scrollAmount = 300;
    const newPosition =
      direction === "left"
        ? scrollPosition - scrollAmount
        : scrollPosition + scrollAmount;

    container.scrollTo({ left: newPosition, behavior: "smooth" });
    setScrollPosition(newPosition);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-4 relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Stories
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => scrollStories("left")}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={() => scrollStories("right")}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      <div
        id="stories-container"
        className="flex space-x-3 overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: "none" }}
      >
        {/* Create Story Card */}
        {user && (
          <div className="flex-shrink-0 w-28 cursor-pointer group">
            <div className="relative h-44 rounded-xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
              <Image
                src={user.avatar || "https://i.pravatar.cc/150?img=1"}
                alt="Create story"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <div className="flex justify-center mb-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white">
                    <Plus className="w-5 h-5 text-white" />
                  </div>
                </div>
                <p className="text-white text-xs font-semibold text-center">
                  สร้าง Story
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Story Cards */}
        {stories.map((story) => (
          <div
            key={story.id}
            className="flex-shrink-0 w-28 cursor-pointer group"
          >
            <div className="relative h-44 rounded-xl overflow-hidden">
              {/* Story Image */}
              <Image
                src={story.image}
                alt={story.userName}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60"></div>

              {/* Avatar Ring */}
              <div
                className={`absolute top-3 left-3 w-10 h-10 rounded-full p-0.5 ${
                  story.viewed
                    ? "bg-gray-300"
                    : "bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500"
                }`}
              >
                <div className="w-full h-full rounded-full border-2 border-white overflow-hidden">
                  <Image
                    src={story.userAvatar}
                    alt={story.userName}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
              </div>

              {/* User Name */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white text-xs font-semibold line-clamp-2">
                  {story.userName}
                </p>
              </div>

              {/* Viewed Overlay */}
              {story.viewed && (
                <div className="absolute inset-0 bg-black/20"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
