"use client";

import { Conversation, Message } from "@/src/data/mock-messages";
import { MessagesPresenter } from "@/src/presentation/presenters/messages/MessagesPresenter";
import { useAuthStore } from "@/src/presentation/stores/authStore";
import {
  Minimize2,
  Send,
  Smile,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ChatPopupProps {
  conversation: Conversation;
  initialMessages?: Message[];
  onClose: () => void;
  onMinimize?: () => void;
}

const presenter = new MessagesPresenter();

/**
 * Chat Popup Component
 * แชทแบบ Popup (เหมือน Facebook Messenger)
 */
export function ChatPopup({
  conversation,
  initialMessages = [],
  onClose,
  onMinimize,
}: ChatPopupProps) {
  const { user: currentUser } = useAuthStore();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!isMinimized) {
      scrollToBottom();
    }
  }, [messages, isMinimized]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentUser) return;

    try {
      if (!currentUser) return;
      
      const message = await presenter.sendMessage(
        conversation.id,
        currentUser.id,
        newMessage.trim()
      );

      setMessages((prev) => [...prev, message]);
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
    if (onMinimize) {
      onMinimize();
    }
  };

  return (
    <div className="fixed bottom-0 right-4 w-80 bg-white dark:bg-gray-800 rounded-t-xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col z-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-t-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-semibold text-sm">
              {conversation.participantName.charAt(0)}
            </div>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border border-white"></div>
          </div>
          <div>
            <h3 className="font-semibold text-sm">
              {conversation.participantName}
            </h3>
            <p className="text-xs text-white/80">ออนไลน์</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleMinimize}
            className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 h-96 bg-gray-50 dark:bg-gray-900">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  ยังไม่มีข้อความ
                </p>
              </div>
            ) : (
              <>
                {messages.map((message) => {
                  const isOwnMessage = message.senderId === currentUser?.id;

                  return (
                    <div
                      key={message.id}
                      className={`flex ${
                        isOwnMessage ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div>
                        <div
                          className={`px-3 py-2 rounded-2xl max-w-xs ${
                            isOwnMessage
                              ? "bg-blue-600 text-white rounded-br-none"
                              : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-2">
                          {formatTime(message.createdAt)}
                        </span>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <form onSubmit={handleSendMessage} className="flex items-end gap-2">
              <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                  placeholder="พิมพ์ข้อความ..."
                  className="flex-1 px-3 py-2 bg-transparent border-0 focus:outline-none text-gray-900 dark:text-white placeholder-gray-500 text-sm"
                />
                <button
                  type="button"
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors mr-1"
                >
                  <Smile className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-full transition-colors flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
