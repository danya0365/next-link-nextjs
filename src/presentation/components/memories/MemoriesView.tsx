"use client";

import { MemoriesViewModel } from "@/src/presentation/presenters/memories/MemoriesPresenter";
import { useMemoriesPresenter } from "@/src/presentation/presenters/memories/useMemoriesPresenter";
import { useAuthStore } from "@/src/presentation/stores/authStore";
import { formatNumber } from "@/src/utils/text-helpers";
import {
  Calendar,
  Heart,
  MessageCircle,
  Share2,
  X,
  MapPin,
  Users,
  Clock,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface MemoriesViewProps {
  initialViewModel?: MemoriesViewModel;
}

/**
 * Memories View Component
 * ความทรงจำ
 */
export function MemoriesView({ initialViewModel }: MemoriesViewProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [state, actions] = useMemoriesPresenter(initialViewModel);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <Calendar className="w-8 h-8" />
                ความทรงจำ
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                ย้อนดูช่วงเวลาดีๆ ที่ผ่านมา
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Today's Memories */}
        {state.viewModel?.todayMemories &&
          state.viewModel.todayMemories.length > 0 && (
            <div className="mb-12">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {new Date().toLocaleDateString("th-TH", {
                    day: "numeric",
                    month: "long",
                  })}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  ความทรงจำในวันนี้ของคุณ
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {state.viewModel.todayMemories.map((memory) => (
                  <div
                    key={memory.id}
                    onClick={() => actions.selectMemory(memory)}
                    className="group cursor-pointer bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                  >
                    {/* Time Badge */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-5 h-5" />
                        <span className="text-sm font-medium">
                          ความทรงจำ
                        </span>
                      </div>
                      <p className="text-2xl font-bold">
                        {memory.yearsAgo} ปีที่แล้ว
                      </p>
                      <p className="text-sm opacity-90">
                        {new Date(memory.date).toLocaleDateString("th-TH", {
                          year: "numeric",
                        })}
                      </p>
                    </div>

                    {/* Images */}
                    {memory.images.length > 0 && (
                      <div className="relative h-64 bg-gray-100 dark:bg-gray-700">
                        <Image
                          src={memory.images[0]}
                          alt="Memory"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {memory.images.length > 1 && (
                          <div className="absolute bottom-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                            +{memory.images.length - 1} ภาพ
                          </div>
                        )}
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6">
                      {memory.content && (
                        <p className="text-gray-900 dark:text-white mb-4 line-clamp-3">
                          {memory.content}
                        </p>
                      )}

                      {memory.location && (
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                          <MapPin className="w-4 h-4" />
                          <span>{memory.location}</span>
                        </div>
                      )}

                      {memory.friendsTags && memory.friendsTags.length > 0 && (
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                          <Users className="w-4 h-4" />
                          <span>
                            กับ {memory.friendsTags[0].name}
                            {memory.friendsTags.length > 1 &&
                              ` และอีก ${memory.friendsTags.length - 1} คน`}
                          </span>
                        </div>
                      )}

                      {/* Stats */}
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span>{formatNumber(memory.likes)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{formatNumber(memory.comments)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Share2 className="w-4 h-4" />
                          <span>{formatNumber(memory.shares)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Empty State */}
        {state.viewModel?.todayMemories &&
          state.viewModel.todayMemories.length === 0 && (
            <div className="text-center py-16">
              <div className="text-8xl mb-6">📅</div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                ไม่มีความทรงจำในวันนี้
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                คุณยังไม่มีความทรงจำในวันที่{" "}
                {new Date().toLocaleDateString("th-TH", {
                  day: "numeric",
                  month: "long",
                })}
                <br />
                แชร์ช่วงเวลาดีๆ วันนี้เพื่อสร้างความทรงจำในอนาคต
              </p>
            </div>
          )}

        {/* All Memories Timeline */}
        {state.viewModel?.memories && state.viewModel.memories.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              ความทรงจำทั้งหมด
            </h2>
            <div className="space-y-6">
              {state.viewModel.memories.map((memory) => (
                <div
                  key={memory.id}
                  onClick={() => actions.selectMemory(memory)}
                  className="group cursor-pointer bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Sidebar */}
                    <div className="md:w-48 bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-white flex flex-col justify-center items-center">
                      <Clock className="w-8 h-8 mb-2" />
                      <p className="text-3xl font-bold mb-1">
                        {memory.yearsAgo}
                      </p>
                      <p className="text-sm">ปีที่แล้ว</p>
                      <p className="text-xs mt-2 opacity-90">
                        {new Date(memory.date).toLocaleDateString("th-TH")}
                      </p>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6">
                      {memory.content && (
                        <p className="text-gray-900 dark:text-white mb-4">
                          {memory.content}
                        </p>
                      )}

                      {/* Images Grid */}
                      {memory.images.length > 0 && (
                        <div
                          className={`grid gap-2 mb-4 ${
                            memory.images.length === 1
                              ? "grid-cols-1"
                              : memory.images.length === 2
                              ? "grid-cols-2"
                              : "grid-cols-3"
                          }`}
                        >
                          {memory.images.slice(0, 3).map((img, idx) => (
                            <div
                              key={idx}
                              className="relative h-32 rounded-lg overflow-hidden"
                            >
                              <Image
                                src={img}
                                alt={`Memory ${idx + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        {memory.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{memory.location}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span>{formatNumber(memory.likes)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{formatNumber(memory.comments)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Memory Detail Modal */}
      {state.showMemoryModal && state.selectedMemory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
          onClick={actions.closeMemoryModal}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={actions.closeMemoryModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-8 h-8" />
                <div>
                  <p className="text-3xl font-bold">
                    {state.selectedMemory.yearsAgo} ปีที่แล้ว
                  </p>
                  <p className="text-sm opacity-90">
                    {new Date(state.selectedMemory.date).toLocaleDateString(
                      "th-TH",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Content */}
              {state.selectedMemory.content && (
                <p className="text-xl text-gray-900 dark:text-white mb-6">
                  {state.selectedMemory.content}
                </p>
              )}

              {/* Images */}
              {state.selectedMemory.images.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {state.selectedMemory.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative h-64 rounded-lg overflow-hidden"
                    >
                      <Image
                        src={img}
                        alt={`Memory ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Location */}
              {state.selectedMemory.location && (
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
                  <MapPin className="w-5 h-5" />
                  <span>{state.selectedMemory.location}</span>
                </div>
              )}

              {/* Tagged Friends */}
              {state.selectedMemory.friendsTags &&
                state.selectedMemory.friendsTags.length > 0 && (
                  <div className="mb-6">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      กับ
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {state.selectedMemory.friendsTags.map((friend) => (
                        <div
                          key={friend.id}
                          className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2"
                        >
                          <Image
                            src={friend.avatar}
                            alt={friend.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {friend.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {formatNumber(state.selectedMemory.likes)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    ถูกใจ
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {formatNumber(state.selectedMemory.comments)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    ความคิดเห็น
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {formatNumber(state.selectedMemory.shares)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    แชร์
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() =>
                    actions.shareMemory(state.selectedMemory!.id)
                  }
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Share2 className="w-5 h-5" />
                  <span>แชร์ความทรงจำนี้</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
