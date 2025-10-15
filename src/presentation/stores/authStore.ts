/**
 * Auth Store
 * Zustand store for authentication state management
 * ใช้ localforage สำหรับ persistence
 */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import localforage from "localforage";
import { AuthStore, RegisterData, User } from "./authStore.types";
import { authenticateUser } from "@/src/data/mock-users";

/**
 * Auth Store with persistence
 */
export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // State
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          // Simulate API call
          const user = await authenticateUser(email, password);

          if (!user) {
            throw new Error("เข้าสู่ระบบไม่สำเร็จ");
          }

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "เกิดข้อผิดพลาดในการเข้าสู่ระบบ";
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: errorMessage,
          });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true, error: null });

        try {
          // Simulate API call delay
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Mock registration - สร้าง user ใหม่
          const newUser: User = {
            id: `user-${Date.now()}`,
            email: data.email,
            name: data.name,
            username: data.username,
            avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
            coverPhoto: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
            bio: "",
            location: "",
            website: "",
            birthday: "",
            relationshipStatus: "ไม่ระบุ",
            createdAt: new Date().toISOString(),
            friendsCount: 0,
            followersCount: 0,
            followingCount: 0,
          };

          set({
            user: newUser,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "เกิดข้อผิดพลาดในการสมัครสมาชิก";
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: errorMessage,
          });
          throw error;
        }
      },

      updateUser: (data: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({
            user: { ...user, ...data },
          });
        }
      },

      clearError: () => {
        set({ error: null });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: "next-link-auth-storage",
      storage: createJSONStorage(() => localforage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
