"use client";

import { useState } from "react";
import { X, Search } from "lucide-react";
import { feelings, activities, FeelingActivity } from "@/src/data/feelings-activities";

interface FeelingActivityPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: FeelingActivity) => void;
}

/**
 * Feeling/Activity Picker Modal
 * Modal สำหรับเลือก Feeling หรือ Activity
 */
export function FeelingActivityPicker({
  isOpen,
  onClose,
  onSelect,
}: FeelingActivityPickerProps) {
  const [activeTab, setActiveTab] = useState<"feeling" | "activity">("feeling");
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  const currentItems = activeTab === "feeling" ? feelings : activities;
  const filteredItems = currentItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (item: FeelingActivity) => {
    onSelect(item);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            คุณรู้สึกอย่างไร?
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab("feeling")}
            className={`flex-1 py-3 px-4 font-medium transition-colors ${
              activeTab === "feeling"
                ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            ความรู้สึก
          </button>
          <button
            onClick={() => setActiveTab("activity")}
            className={`flex-1 py-3 px-4 font-medium transition-colors ${
              activeTab === "activity"
                ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            กิจกรรม
          </button>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`ค้นหา${activeTab === "feeling" ? "ความรู้สึก" : "กิจกรรม"}...`}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white placeholder-gray-400"
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
          <div className="grid grid-cols-2 gap-2">
            {filteredItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item)}
                className="flex items-center space-x-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-left"
              >
                <span className="text-3xl">{item.emoji}</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">ไม่พบผลลัพธ์</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
