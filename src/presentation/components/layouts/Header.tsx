"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Home,
  Users,
  MessageCircle,
  Bell,
  Search,
  Menu,
  X,
  Sun,
  Moon,
  UserCircle,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/src/utils/cn";
import { useAuthStore } from "@/src/presentation/stores/authStore";

/**
 * Header Component
 * แถบเมนูด้านบนพร้อมการนำทาง Theme Toggle และฟีเจอร์ต่างๆ
 */
export function Header() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  
  // Auth state from Zustand store
  const { user, isAuthenticated, logout } = useAuthStore();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">NL</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
                Next Link
              </span>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 w-64 lg:w-96">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="ค้นหา..."
                className="bg-transparent border-none outline-none ml-2 text-gray-900 dark:text-white placeholder-gray-400 w-full"
              />
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          {isAuthenticated && (
            <nav className="hidden md:flex items-center space-x-2">
              <Link
                href="/feed"
                className={cn(
                  "p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
                  "text-gray-700 dark:text-gray-300"
                )}
                title="หน้าแรก"
              >
                <Home className="w-6 h-6" />
              </Link>
              <Link
                href="/friends"
                className={cn(
                  "p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
                  "text-gray-700 dark:text-gray-300"
                )}
                title="เพื่อน"
              >
                <Users className="w-6 h-6" />
              </Link>
              <Link
                href="/messages"
                className={cn(
                  "p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative",
                  "text-gray-700 dark:text-gray-300"
                )}
                title="ข้อความ"
              >
                <MessageCircle className="w-6 h-6" />
                {/* Unread badge */}
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              </Link>
              <Link
                href="/notifications"
                className={cn(
                  "p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative",
                  "text-gray-700 dark:text-gray-300"
                )}
                title="การแจ้งเตือน"
              >
                <Bell className="w-6 h-6" />
                {/* Notification badge */}
                <span className="absolute top-2 right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  5
                </span>
              </Link>
            </nav>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="เปลี่ยนธีม"
            >
              {theme === "dark" ? (
                <Sun className="w-6 h-6 text-yellow-500" />
              ) : (
                <Moon className="w-6 h-6 text-gray-700" />
              )}
            </button>

            {/* User Menu / Auth Buttons */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <UserCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="hidden sm:block text-gray-900 dark:text-white font-medium">
                    {user?.name || "ผู้ใช้"}
                  </span>
                </button>

                {/* Profile Dropdown */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2">
                    <Link
                      href={`/profile/${user?.id || ""}`}
                      className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <UserCircle className="w-5 h-5" />
                      <span>โปรไฟล์</span>
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                    >
                      <Settings className="w-5 h-5" />
                      <span>ตั้งค่า</span>
                    </Link>
                    <hr className="my-2 border-gray-200 dark:border-gray-700" />
                    <button 
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 w-full"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>ออกจากระบบ</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  เข้าสู่ระบบ
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                >
                  สมัครสมาชิก
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden py-3">
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="ค้นหา..."
              className="bg-transparent border-none outline-none ml-2 text-gray-900 dark:text-white placeholder-gray-400 w-full"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <nav className="py-4 px-4 space-y-2">
            {isAuthenticated ? (
              <>
                <Link
                  href="/feed"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  onClick={toggleMobileMenu}
                >
                  <Home className="w-6 h-6" />
                  <span>หน้าแรก</span>
                </Link>
                <Link
                  href="/friends"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  onClick={toggleMobileMenu}
                >
                  <Users className="w-6 h-6" />
                  <span>เพื่อน</span>
                </Link>
                <Link
                  href="/messages"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  onClick={toggleMobileMenu}
                >
                  <MessageCircle className="w-6 h-6" />
                  <span>ข้อความ</span>
                </Link>
                <Link
                  href="/notifications"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  onClick={toggleMobileMenu}
                >
                  <Bell className="w-6 h-6" />
                  <span>การแจ้งเตือน</span>
                </Link>
                <Link
                  href={`/profile/${user?.id || ""}`}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  onClick={toggleMobileMenu}
                >
                  <UserCircle className="w-6 h-6" />
                  <span>โปรไฟล์</span>
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  onClick={toggleMobileMenu}
                >
                  <Settings className="w-6 h-6" />
                  <span>ตั้งค่า</span>
                </Link>
                <hr className="my-2 border-gray-200 dark:border-gray-700" />
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 w-full"
                >
                  <LogOut className="w-6 h-6" />
                  <span>ออกจากระบบ</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block w-full text-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  onClick={toggleMobileMenu}
                >
                  เข้าสู่ระบบ
                </Link>
                <Link
                  href="/register"
                  className="block w-full text-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                  onClick={toggleMobileMenu}
                >
                  สมัครสมาชิก
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
