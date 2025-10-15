"use client";

import { useState } from "react";
import {
  MoreHorizontal,
  Edit,
  Trash2,
  Bookmark,
  EyeOff,
  Flag,
  Link as LinkIcon,
  BellOff,
  UserX,
} from "lucide-react";
import { useAuthStore } from "@/src/presentation/stores/authStore";

interface PostActionsMenuProps {
  postId: string;
  postUserId: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onSave?: () => void;
  onHide?: () => void;
  onReport?: () => void;
}

/**
 * Post Actions Menu Component
 * เมนูตัวเลือกสำหรับโพสต์
 */
export function PostActionsMenu({
  postId,
  postUserId,
  onEdit,
  onDelete,
  onSave,
  onHide,
  onReport,
}: PostActionsMenuProps) {
  const { user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const isOwnPost = user?.id === postUserId;

  const handleAction = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  const handleCopyLink = () => {
    const link = `${window.location.origin}/post/${postId}`;
    navigator.clipboard.writeText(link);
    alert("คัดลอกลิงก์แล้ว!");
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        aria-label="เมนูเพิ่มเติม"
      >
        <MoreHorizontal className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Menu */}
          <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-20">
            {isOwnPost ? (
              <>
                {/* Own Post Actions */}
                <button
                  onClick={() => onEdit && handleAction(onEdit)}
                  className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Edit className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <div className="flex-1 text-left">
                    <p className="font-medium text-gray-900 dark:text-white">
                      แก้ไขโพสต์
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => onDelete && handleAction(onDelete)}
                  className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Trash2 className="w-5 h-5 text-red-600" />
                  <div className="flex-1 text-left">
                    <p className="font-medium text-gray-900 dark:text-white">
                      ลบโพสต์
                    </p>
                  </div>
                </button>

                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>

                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <LinkIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <div className="flex-1 text-left">
                    <p className="font-medium text-gray-900 dark:text-white">
                      คัดลอกลิงก์
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => handleAction(() => alert("ปิดการแจ้งเตือน"))}
                  className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <BellOff className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <div className="flex-1 text-left">
                    <p className="font-medium text-gray-900 dark:text-white">
                      ปิดการแจ้งเตือน
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      หยุดรับการแจ้งเตือนเกี่ยวกับโพสต์นี้
                    </p>
                  </div>
                </button>
              </>
            ) : (
              <>
                {/* Others' Post Actions */}
                <button
                  onClick={() => onSave && handleAction(onSave)}
                  className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Bookmark className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <div className="flex-1 text-left">
                    <p className="font-medium text-gray-900 dark:text-white">
                      บันทึกโพสต์
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      เพิ่มไปยังรายการที่บันทึกไว้
                    </p>
                  </div>
                </button>

                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <LinkIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <div className="flex-1 text-left">
                    <p className="font-medium text-gray-900 dark:text-white">
                      คัดลอกลิงก์
                    </p>
                  </div>
                </button>

                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>

                <button
                  onClick={() => onHide && handleAction(onHide)}
                  className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <EyeOff className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <div className="flex-1 text-left">
                    <p className="font-medium text-gray-900 dark:text-white">
                      ซ่อนโพสต์
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      เห็นโพสต์แบบนี้น้อยลง
                    </p>
                  </div>
                </button>

                <button
                  onClick={() =>
                    handleAction(() => alert("เลิกติดตาม " + postUserId))
                  }
                  className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <UserX className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <div className="flex-1 text-left">
                    <p className="font-medium text-gray-900 dark:text-white">
                      เลิกติดตาม
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      หยุดดูโพสต์จากบุคคลนี้
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => handleAction(() => alert("ปิดการแจ้งเตือน"))}
                  className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <BellOff className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <div className="flex-1 text-left">
                    <p className="font-medium text-gray-900 dark:text-white">
                      ปิดการแจ้งเตือน
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      หยุดรับการแจ้งเตือนเกี่ยวกับโพสต์นี้
                    </p>
                  </div>
                </button>

                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>

                <button
                  onClick={() => onReport && handleAction(onReport)}
                  className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Flag className="w-5 h-5 text-red-600" />
                  <div className="flex-1 text-left">
                    <p className="font-medium text-gray-900 dark:text-white">
                      รายงานโพสต์
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      ฉันเป็นห่วงเกี่ยวกับโพสต์นี้
                    </p>
                  </div>
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
