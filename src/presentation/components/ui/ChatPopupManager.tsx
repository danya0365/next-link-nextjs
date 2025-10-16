"use client";

import { Conversation } from "@/src/data/mock-messages";
import { ChatPopup } from "./ChatPopup";
import { useState } from "react";

/**
 * Chat Popup Manager Component
 * จัดการ Chat Popup หลายหน้าต่าง
 */
export function ChatPopupManager() {
  const [openChats, setOpenChats] = useState<Conversation[]>([]);

  const openChat = (conversation: Conversation) => {
    if (!openChats.find((c) => c.id === conversation.id)) {
      setOpenChats((prev) => [...prev, conversation]);
    }
  };

  const closeChat = (conversationId: string) => {
    setOpenChats((prev) => prev.filter((c) => c.id !== conversationId));
  };

  return (
    <>
      {openChats.map((conversation, index) => (
        <div
          key={conversation.id}
          style={{ right: `${20 + index * 336}px` }}
        >
          <ChatPopup
            conversation={conversation}
            onClose={() => closeChat(conversation.id)}
          />
        </div>
      ))}
    </>
  );
}
