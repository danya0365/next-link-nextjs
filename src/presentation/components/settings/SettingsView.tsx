"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Settings, User, Lock, Bell, Shield } from "lucide-react";
import { useAuthStore } from "@/src/presentation/stores/authStore";
import { useSettingsPresenter } from "@/src/presentation/presenters/settings/useSettingsPresenter";
import { SettingsViewModel } from "@/src/presentation/presenters/settings/SettingsPresenter";

interface SettingsViewProps {
  initialViewModel?: SettingsViewModel;
}

type SettingsTab = "profile" | "privacy" | "notifications" | "security";

/**
 * Settings View Component
 * หน้าตั้งค่าบัญชี
 */
export function SettingsView({ initialViewModel }: SettingsViewProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [state, actions] = useSettingsPresenter(initialViewModel);
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
  }, [isAuthenticated, router]);

  // Loading state
  if (state.loading && !state.viewModel) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            กำลังโหลดการตั้งค่า...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (state.error) {
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

  const settings = state.viewModel?.settings;

  if (!settings) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-6">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center">
            <Settings className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              ตั้งค่า
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "profile"
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <User className="w-5 h-5 mr-3" />
                  <span className="font-medium">โปรไฟล์</span>
                </button>
                <button
                  onClick={() => setActiveTab("privacy")}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "privacy"
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <Lock className="w-5 h-5 mr-3" />
                  <span className="font-medium">ความเป็นส่วนตัว</span>
                </button>
                <button
                  onClick={() => setActiveTab("notifications")}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "notifications"
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <Bell className="w-5 h-5 mr-3" />
                  <span className="font-medium">การแจ้งเตือน</span>
                </button>
                <button
                  onClick={() => setActiveTab("security")}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "security"
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <Shield className="w-5 h-5 mr-3" />
                  <span className="font-medium">ความปลอดภัย</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    ข้อมูลโปรไฟล์
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        ชื่อ
                      </label>
                      <input
                        type="text"
                        defaultValue={settings.profile.name}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        อีเมล
                      </label>
                      <input
                        type="email"
                        defaultValue={settings.profile.email}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        ประวัติส่วนตัว
                      </label>
                      <textarea
                        defaultValue={settings.profile.bio}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <button
                      disabled={state.saving}
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                    >
                      {state.saving ? "กำลังบันทึก..." : "บันทึกการเปลี่ยนแปลง"}
                    </button>
                  </div>
                </div>
              )}

              {/* Privacy Tab */}
              {activeTab === "privacy" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    ความเป็นส่วนตัว
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        ใครสามารถเห็นโปรไฟล์ของคุณ
                      </label>
                      <select
                        defaultValue={settings.privacy.profileVisibility}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      >
                        <option value="public">ทุกคน</option>
                        <option value="friends">เพื่อนเท่านั้น</option>
                        <option value="only_me">ฉันเท่านั้น</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        การมองเห็นโพสต์เริ่มต้น
                      </label>
                      <select
                        defaultValue={settings.privacy.postDefaultVisibility}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      >
                        <option value="public">สาธารณะ</option>
                        <option value="friends">เพื่อนเท่านั้น</option>
                        <option value="only_me">ฉันเท่านั้น</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        อนุญาตให้แท็กได้
                      </span>
                      <input
                        type="checkbox"
                        defaultChecked={settings.privacy.allowTagging}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    การแจ้งเตือน
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        การแจ้งเตือนทางอีเมล
                      </span>
                      <input
                        type="checkbox"
                        defaultChecked={settings.notifications.emailNotifications}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        การแจ้งเตือนแบบพุช
                      </span>
                      <input
                        type="checkbox"
                        defaultChecked={settings.notifications.pushNotifications}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        แจ้งเตือนเมื่อมีคนกดถูกใจ
                      </span>
                      <input
                        type="checkbox"
                        defaultChecked={settings.notifications.notifyOnLikes}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        แจ้งเตือนเมื่อมีคนแสดงความคิดเห็น
                      </span>
                      <input
                        type="checkbox"
                        defaultChecked={settings.notifications.notifyOnComments}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        แจ้งเตือนเมื่อมีคำขอเป็นเพื่อน
                      </span>
                      <input
                        type="checkbox"
                        defaultChecked={settings.notifications.notifyOnFriendRequests}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    ความปลอดภัย
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 block">
                          การยืนยันตัวตนแบบสองขั้นตอน
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          เพิ่มความปลอดภัยให้กับบัญชีของคุณ
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked={settings.security.twoFactorEnabled}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 block">
                          แจ้งเตือนการเข้าสู่ระบบ
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          แจ้งเตือนเมื่อมีการเข้าสู่ระบบจากอุปกรณ์ใหม่
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked={settings.security.loginAlerts}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium">
                        เปลี่ยนรหัสผ่าน
                      </button>
                    </div>
                    <div>
                      <button className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 font-medium">
                        ลบบัญชี
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
