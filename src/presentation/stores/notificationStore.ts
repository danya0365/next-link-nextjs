import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NotificationState {
  unreadNotifications: number;
  unreadMessages: number;
  setUnreadNotifications: (count: number) => void;
  setUnreadMessages: (count: number) => void;
  incrementNotifications: () => void;
  incrementMessages: () => void;
  clearNotifications: () => void;
  clearMessages: () => void;
}

/**
 * Notification Store
 * จัดการสถานะการแจ้งเตือนและข้อความที่ยังไม่ได้อ่าน
 */
export const useNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      unreadNotifications: 3,
      unreadMessages: 2,

      setUnreadNotifications: (count) =>
        set({ unreadNotifications: count }),

      setUnreadMessages: (count) =>
        set({ unreadMessages: count }),

      incrementNotifications: () =>
        set((state) => ({ unreadNotifications: state.unreadNotifications + 1 })),

      incrementMessages: () =>
        set((state) => ({ unreadMessages: state.unreadMessages + 1 })),

      clearNotifications: () =>
        set({ unreadNotifications: 0 }),

      clearMessages: () =>
        set({ unreadMessages: 0 }),
    }),
    {
      name: "notification-storage",
    }
  )
);
