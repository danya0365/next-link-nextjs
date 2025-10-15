export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  read: boolean;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export const mockConversations: Conversation[] = [
  {
    id: "conv-1",
    participantId: "user-2",
    participantName: "สมชาย ใจดี",
    participantAvatar: "/avatars/somchai.jpg",
    lastMessage: "เจอกันพรุ่งนี้นะครับ",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    unreadCount: 2,
  },
  {
    id: "conv-2",
    participantId: "user-3",
    participantName: "สมหญิง รักสวย",
    participantAvatar: "/avatars/somying.jpg",
    lastMessage: "ขอบคุณนะคะ",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    unreadCount: 0,
  },
  {
    id: "conv-3",
    participantId: "user-4",
    participantName: "ประยุทธ์ มั่นคง",
    participantAvatar: "/avatars/prayut.jpg",
    lastMessage: "ได้เลยครับ",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    unreadCount: 1,
  },
  {
    id: "conv-4",
    participantId: "user-5",
    participantName: "วิภา สุขใจ",
    participantAvatar: "/avatars/wipa.jpg",
    lastMessage: "สวัสดีค่ะ",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    unreadCount: 0,
  },
];

export const mockMessages: Record<string, Message[]> = {
  "conv-1": [
    {
      id: "msg-1",
      conversationId: "conv-1",
      senderId: "user-2",
      receiverId: "user-1",
      content: "สวัสดีครับ",
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    },
    {
      id: "msg-2",
      conversationId: "conv-1",
      senderId: "user-1",
      receiverId: "user-2",
      content: "สวัสดีครับ ว่างไหม",
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
    },
    {
      id: "msg-3",
      conversationId: "conv-1",
      senderId: "user-2",
      receiverId: "user-1",
      content: "ว่างครับ มีอะไร",
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
    },
    {
      id: "msg-4",
      conversationId: "conv-1",
      senderId: "user-1",
      receiverId: "user-2",
      content: "ไปทานข้าวกันไหม",
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
    {
      id: "msg-5",
      conversationId: "conv-1",
      senderId: "user-2",
      receiverId: "user-1",
      content: "ได้เลยครับ",
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    },
    {
      id: "msg-6",
      conversationId: "conv-1",
      senderId: "user-2",
      receiverId: "user-1",
      content: "เจอกันพรุ่งนี้นะครับ",
      read: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    },
  ],
  "conv-2": [
    {
      id: "msg-7",
      conversationId: "conv-2",
      senderId: "user-1",
      receiverId: "user-3",
      content: "สวัสดีครับ",
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    },
    {
      id: "msg-8",
      conversationId: "conv-2",
      senderId: "user-3",
      receiverId: "user-1",
      content: "สวัสดีค่ะ",
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
    },
    {
      id: "msg-9",
      conversationId: "conv-2",
      senderId: "user-1",
      receiverId: "user-3",
      content: "ขอบคุณมากครับ",
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
    },
    {
      id: "msg-10",
      conversationId: "conv-2",
      senderId: "user-3",
      receiverId: "user-1",
      content: "ขอบคุณนะคะ",
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
  ],
};
