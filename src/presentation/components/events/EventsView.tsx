"use client";

import { EventsViewModel } from "@/src/presentation/presenters/events/EventsPresenter";
import { useEventsPresenter } from "@/src/presentation/presenters/events/useEventsPresenter";
import { useAuthStore } from "@/src/presentation/stores/authStore";
import { formatEventDate, formatShortDateTime } from "@/src/utils/date-helpers";
import { formatNumber } from "@/src/utils/text-helpers";
import {
  Calendar,
  Check,
  Globe,
  HelpCircle,
  MapPin,
  Search,
  Users,
  X,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface EventsViewProps {
  initialViewModel?: EventsViewModel;
}

/**
 * Events View Component
 * อีเว้นท์และกิจกรรม
 */
export function EventsView({ initialViewModel }: EventsViewProps) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const [state, actions] = useEventsPresenter(initialViewModel);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    actions.search(searchInput);
  };

  const getRsvpButtonColor = (status: string | null) => {
    if (status === "going") return "bg-green-600 hover:bg-green-700";
    if (status === "maybe") return "bg-yellow-600 hover:bg-yellow-700";
    if (status === "not_going") return "bg-red-600 hover:bg-red-700";
    return "bg-blue-600 hover:bg-blue-700";
  };

  const getRsvpIcon = (status: string | null) => {
    if (status === "going") return <Check className="w-4 h-4" />;
    if (status === "maybe") return <HelpCircle className="w-4 h-4" />;
    if (status === "not_going") return <XCircle className="w-4 h-4" />;
    return null;
  };

  const getRsvpLabel = (status: string | null) => {
    if (status === "going") return "เข้าร่วม";
    if (status === "maybe") return "อาจจะไป";
    if (status === "not_going") return "ไม่ไป";
    return "RSVP";
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header with Search */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Users className="w-6 h-6" />
              อีเว้นท์และกิจกรรม
            </h1>
          </div>
          <form onSubmit={handleSearch} className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="ค้นหาอีเว้นท์..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </form>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {state.viewModel?.categories.map((category) => (
              <button
                key={category.id}
                onClick={() => actions.filterByCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  state.selectedCategory === category.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                <span>{category.icon}</span>
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Your Events */}
        {state.viewModel?.yourEvents &&
          state.viewModel.yourEvents.length > 0 &&
          state.selectedCategory === "all" &&
          !state.searchQuery && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                ⭐ อีเว้นท์ของคุณ
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {state.viewModel.yourEvents.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className="group cursor-pointer bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
                    onClick={() => actions.selectEvent(event)}
                  >
                    <div className="relative h-40">
                      <Image
                        src={event.coverImage}
                        alt={event.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 mb-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {isMounted
                            ? formatShortDateTime(event.startDate)
                            : ""}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 mb-2">
                        {event.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>
                          {formatNumber(event.attendees.going)} เข้าร่วม
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Upcoming Events */}
        {state.viewModel?.upcomingEvents &&
          state.viewModel.upcomingEvents.length > 0 &&
          state.selectedCategory === "all" &&
          !state.searchQuery && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                📅 อีเว้นท์ที่กำลังจะมาถึง
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {state.viewModel.upcomingEvents.slice(0, 6).map((event) => (
                  <div
                    key={event.id}
                    className="group cursor-pointer bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
                    onClick={() => actions.selectEvent(event)}
                  >
                    <div className="relative h-40">
                      <Image
                        src={event.coverImage}
                        alt={event.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {event.isOnline && (
                        <div className="absolute top-3 right-3 px-2 py-1 bg-purple-600 text-white rounded-full text-xs font-medium flex items-center gap-1">
                          <Globe className="w-3 h-3" />
                          <span>Online</span>
                        </div>
                      )}
                      {event.price.isFree && (
                        <div className="absolute top-3 left-3 px-2 py-1 bg-green-600 text-white rounded-full text-xs font-bold">
                          ฟรี
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 mb-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {isMounted
                            ? formatShortDateTime(event.startDate)
                            : ""}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {event.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span className="line-clamp-1">
                          {event.location.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>
                          {formatNumber(event.attendees.going)} เข้าร่วม
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* All Events */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {state.searchQuery
              ? `ผลการค้นหา "${state.searchQuery}"`
              : state.selectedCategory === "all"
              ? "อีเว้นท์ทั้งหมด"
              : `${
                  state.viewModel?.categories.find(
                    (c) => c.id === state.selectedCategory
                  )?.name || ""
                }`}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {state.filteredEvents.length} อีเว้นท์
          </p>
        </div>

        {state.loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-xl h-40 mb-3" />
                <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded mb-2" />
                <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : state.filteredEvents.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              ไม่พบอีเว้นท์
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              ลองค้นหาด้วยคำอื่นหรือเลือกหมวดหมู่อื่น
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {state.filteredEvents.map((event) => (
              <div
                key={event.id}
                className="group cursor-pointer bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
                onClick={() => actions.selectEvent(event)}
              >
                <div className="relative h-40">
                  <Image
                    src={event.coverImage}
                    alt={event.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {event.isOnline && (
                    <div className="absolute top-3 right-3 px-2 py-1 bg-purple-600 text-white rounded-full text-xs font-medium flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      <span>Online</span>
                    </div>
                  )}
                  {event.price.isFree && (
                    <div className="absolute top-3 left-3 px-2 py-1 bg-green-600 text-white rounded-full text-xs font-bold">
                      ฟรี
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {isMounted ? formatShortDateTime(event.startDate) : ""}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {event.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                    {event.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="line-clamp-1">{event.location.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Users className="w-4 h-4" />
                      <span>{formatNumber(event.attendees.going)}</span>
                    </div>
                    {!event.price.isFree && (
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                        ฿{formatNumber(event.price.amount)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Event Detail Modal */}
      {state.showEventModal && state.selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
          onClick={actions.closeEventModal}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={actions.closeEventModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative h-64">
              <Image
                src={state.selectedEvent.coverImage}
                alt={state.selectedEvent.name}
                fill
                className="object-cover"
              />
              {state.selectedEvent.isOnline && (
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-purple-600 text-white rounded-full text-sm font-medium flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>Online Event</span>
                </div>
              )}
            </div>

            <div className="p-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {state.selectedEvent.name}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="flex items-start gap-3 mb-4">
                    <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {formatEventDate(
                          state.selectedEvent.startDate,
                          state.selectedEvent.endDate
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 mb-4">
                    <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {state.selectedEvent.location.name}
                      </p>
                      {state.selectedEvent.location.address && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {state.selectedEvent.location.address}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {formatNumber(state.selectedEvent.attendees.going)}{" "}
                        คนเข้าร่วม
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {formatNumber(state.selectedEvent.attendees.maybe)}{" "}
                        คนอาจจะไป
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    จัดโดย
                  </p>
                  <div className="flex items-center gap-3">
                    <Image
                      src={state.selectedEvent.organizer.avatar}
                      alt={state.selectedEvent.organizer.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {state.selectedEvent.organizer.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {state.selectedEvent.organizer.type === "group"
                          ? "กลุ่ม"
                          : state.selectedEvent.organizer.type === "page"
                          ? "เพจ"
                          : "ผู้ใช้"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  รายละเอียด
                </h3>
                <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                  {state.selectedEvent.description}
                </p>
              </div>

              {!state.selectedEvent.price.isFree && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    ราคา
                  </h3>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    ฿{formatNumber(state.selectedEvent.price.amount)}
                  </p>
                </div>
              )}

              {state.selectedEvent.tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    แท็ก
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {state.selectedEvent.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                {state.selectedEvent.userRsvp ? (
                  <>
                    <button
                      className={`flex-1 px-6 py-3 ${getRsvpButtonColor(
                        state.selectedEvent.userRsvp
                      )} text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2`}
                    >
                      {getRsvpIcon(state.selectedEvent.userRsvp)}
                      <span>{getRsvpLabel(state.selectedEvent.userRsvp)}</span>
                    </button>
                    <button
                      onClick={() =>
                        actions.removeRsvp(state.selectedEvent!.id)
                      }
                      className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors font-medium"
                    >
                      ยกเลิก
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() =>
                        actions.rsvpEvent(state.selectedEvent!.id, "going")
                      }
                      className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
                    >
                      เข้าร่วม
                    </button>
                    <button
                      onClick={() =>
                        actions.rsvpEvent(state.selectedEvent!.id, "maybe")
                      }
                      className="flex-1 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors font-medium"
                    >
                      อาจจะไป
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
