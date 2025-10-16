"use client";

import { Conversation, Message } from "@/src/data/mock-messages";
import { MessagesPresenter } from "@/src/presentation/presenters/messages/MessagesPresenter";
import { useAuthStore } from "@/src/presentation/stores/authStore";
import {
  ArrowLeft,
  Image as ImageIcon,
  MoreVertical,
  Phone,
  Send,
  Smile,
  Users,
  Video,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface MessageDetailViewProps {
  conversation: Conversation;
  initialMessages: Message[];
}

const presenter = new MessagesPresenter();

/**
 * Message Detail View Component
 * หน้ารายละเอียดการสนทนา
 */
export function MessageDetailView({
  conversation,
  initialMessages,
}: MessageDetailViewProps) {
  const router = useRouter();
  const { user: currentUser } = useAuthStore();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "วันนี้";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "เมื่อวาน";
    } else {
      return date.toLocaleDateString("th-TH", {
        day: "numeric",
        month: "short",
        year: date.getFullYear() !== today.getFullYear() ? "numeric" : undefined,
      });
    }
  };

  // Group messages by date
  const groupedMessages: Record<string, Message[]> = {};
  messages.forEach((msg) => {
    const dateKey = formatDate(msg.createdAt);
    if (!groupedMessages[dateKey]) {
      groupedMessages[dateKey] = [];
    }
    groupedMessages[dateKey].push(msg);
  });

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>

            <div className="flex items-center gap-3">
              {conversation.isGroup ? (
                <>
                  {conversation.participantAvatar ? (
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                      <Image
                        src={conversation.participantAvatar}
                        alt={conversation.participantName}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                      <Users className="w-5 h-5" />
                    </div>
                  )}
                  <div>
                    <h2 className="font-semibold text-gray-900 dark:text-white">
                      {conversation.participantName}
                    </h2>
                    <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {conversation.members?.length || 0} สมาชิก
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                      {conversation.participantName.charAt(0)}
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900 dark:text-white">
                      {conversation.participantName}
                    </h2>
                    <p className="text-xs text-green-600 dark:text-green-400">
                      ออนไลน์
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
              <Phone className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
              <Video className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
              <MoreVertical className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {Object.entries(groupedMessages).map(([date, dateMessages]) => (
            <div key={date}>
              {/* Date Separator */}
              <div className="flex items-center justify-center mb-4">
                <div className="px-4 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-xs text-gray-600 dark:text-gray-400">
                  {date}
                </div>
              </div>

              {/* Messages for this date */}
              <div className="space-y-3">
                {dateMessages.map((message) => {
                  const isOwnMessage = message.senderId === currentUser?.id;

                  return (
                    <div
                      key={message.id}
                      className={`flex gap-2 ${
                        isOwnMessage ? "justify-end" : "justify-start"
                      }`}
                    >
                      {/* Avatar for group chat (left side) */}
                      {conversation.isGroup && !isOwnMessage && (
                        <div className="flex-shrink-0">
                          {message.senderAvatar ? (
                            <Image
                              src={message.senderAvatar}
                              alt={message.senderName || "User"}
                              width={32}
                              height={32}
                              className="rounded-full"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white text-xs font-semibold">
                              {(message.senderName || "U").charAt(0)}
                            </div>
                          )}
                        </div>
                      )}

                      <div
                        className={`max-w-md ${
                          isOwnMessage ? "items-end" : "items-start"
                        }`}
                      >
                        {/* Sender name for group chat */}
                        {conversation.isGroup && !isOwnMessage && (
                          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 px-2">
                            {message.senderName}
                          </p>
                        )}

                        <div
                          className={`px-4 py-2 rounded-2xl ${
                            isOwnMessage
                              ? "bg-blue-600 text-white rounded-br-none"
                              : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-2">
                          {formatTime(message.createdAt)}
                          {isOwnMessage && (
                            <span className="ml-1">
                              {message.read ? "อ่านแล้ว" : "ส่งแล้ว"}
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-3">
        <form
          onSubmit={handleSendMessage}
          className="max-w-4xl mx-auto flex items-end gap-2"
        >
          <button
            type="button"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors flex-shrink-0"
          >
            <ImageIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </button>

          <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-end">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
              placeholder="พิมพ์ข้อความ..."
              rows={1}
              className="flex-1 px-4 py-3 bg-transparent border-0 focus:outline-none text-gray-900 dark:text-white placeholder-gray-500 resize-none max-h-32"
            />
            <button
              type="button"
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors mr-2 mb-2"
            >
              <Smile className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-full transition-colors flex-shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
