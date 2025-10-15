"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/presentation/stores/authStore";

/**
 * Profile Redirect Page
 * Redirect ไปยังโปรไฟล์ของ current user
 */
export default function ProfileRedirectPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push("/login");
    } else {
      router.push(`/profile/${user.id}`);
    }
  }, [isAuthenticated, user, router]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">กำลังโหลด...</p>
      </div>
    </div>
  );
}
