export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName?: string; // For group chat
  senderAvatar?: string; // For group chat
  receiverId: string;
  content: string;
  read: boolean;
  createdAt: string;
}

export interface GroupMember {
  id: string;
  name: string;
  avatar?: string;
}

export interface Conversation {
  id: string;
  isGroup?: boolean; // true if group chat
  participantId: string; // For 1-1 chat, or group id
  participantName: string; // Participant name or Group name
  participantAvatar?: string;
  members?: GroupMember[]; // For group chat
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
  // Group Chats
  {
    id: "group-1",
    isGroup: true,
    participantId: "group-1",
    participantName: "🚀 ทีมพัฒนา Next Link",
    participantAvatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200",
    members: [
      { id: "user-1", name: "คุณ (ผู้ใช้งานปัจจุบัน)", avatar: "https://i.pravatar.cc/150?img=12" },
      { id: "user-2", name: "สมชาย ใจดี", avatar: "https://i.pravatar.cc/150?img=33" },
      { id: "user-3", name: "สมหญิง รักสวย", avatar: "https://i.pravatar.cc/150?img=44" },
      { id: "user-6", name: "ชัยวัฒน์ เก่งโค้ด", avatar: "https://i.pravatar.cc/150?img=15" },
      { id: "user-7", name: "ปวีณา ออกแบบ", avatar: "https://i.pravatar.cc/150?img=26" },
    ],
    lastMessage: "ปวีณา: อัพเดท UI ใหม่แล้วนะคะ",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    unreadCount: 3,
  },
  {
    id: "group-2",
    isGroup: true,
    participantId: "group-2",
    participantName: "🎮 สายเกมเมอร์",
    participantAvatar: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200",
    members: [
      { id: "user-1", name: "คุณ (ผู้ใช้งานปัจจุบัน)", avatar: "https://i.pravatar.cc/150?img=12" },
      { id: "user-4", name: "ประยุทธ์ มั่นคง", avatar: "https://i.pravatar.cc/150?img=55" },
      { id: "user-8", name: "กิตติพงษ์ เล่นเกม", avatar: "https://i.pravatar.cc/150?img=18" },
      { id: "user-9", name: "วราภรณ์ โปร", avatar: "https://i.pravatar.cc/150?img=29" },
    ],
    lastMessage: "กิตติพงษ์: มาเล่นกันไหม?",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    unreadCount: 5,
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
  // Group 1 Messages
  "group-1": [
    {
      id: "gmsg-1",
      conversationId: "group-1",
      senderId: "user-6",
      senderName: "ชัยวัฒน์ เก่งโค้ด",
      senderAvatar: "https://i.pravatar.cc/150?img=15",
      receiverId: "group-1",
      content: "สวัสดีครับทีม มีอัพเดทเรื่อง API ใหม่",
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    },
    {
      id: "gmsg-2",
      conversationId: "group-1",
      senderId: "user-2",
      senderName: "สมชาย ใจดี",
      senderAvatar: "https://i.pravatar.cc/150?img=33",
      receiverId: "group-1",
      content: "เจ้งครับ พอดีผมกำลังทำ integration อยู่พอดี",
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 110).toISOString(),
    },
    {
      id: "gmsg-3",
      conversationId: "group-1",
      senderId: "user-1",
      senderName: "คุณ",
      senderAvatar: "https://i.pravatar.cc/150?img=12",
      receiverId: "group-1",
      content: "ผมเห็นด้วยครับ ช่วยเพิ่ม documentation ด้วยนะครับ",
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 100).toISOString(),
    },
    {
      id: "gmsg-4",
      conversationId: "group-1",
      senderId: "user-7",
      senderName: "ปวีณา ออกแบบ",
      senderAvatar: "https://i.pravatar.cc/150?img=26",
      receiverId: "group-1",
      content: "ฝั่ง design ผมอัพเดท Figma ไปแล้วนะคะ ลองดูได้เลย",
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 80).toISOString(),
    },
    {
      id: "gmsg-5",
      conversationId: "group-1",
      senderId: "user-3",
      senderName: "สมหญิง รักสวย",
      senderAvatar: "https://i.pravatar.cc/150?img=44",
      receiverId: "group-1",
      content: "สวยมากเลยค่ะ 👍",
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 70).toISOString(),
    },
    {
      id: "gmsg-6",
      conversationId: "group-1",
      senderId: "user-6",
      senderName: "ชัยวัฒน์ เก่งโค้ด",
      senderAvatar: "https://i.pravatar.cc/150?img=15",
      receiverId: "group-1",
      content: "เดี๋ยวผมจะ push code ขึ้น branch develop นะครับ",
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
    },
    {
      id: "gmsg-7",
      conversationId: "group-1",
      senderId: "user-7",
      senderName: "ปวีณา ออกแบบ",
      senderAvatar: "https://i.pravatar.cc/150?img=26",
      receiverId: "group-1",
      content: "อัพเดท UI ใหม่แล้วนะคะ ลองดูได้เลย 🎨",
      read: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    },
  ],
  // Group 2 Messages
  "group-2": [
    {
      id: "gmsg-8",
      conversationId: "group-2",
      senderId: "user-8",
      senderName: "กิตติพงษ์ เล่นเกม",
      senderAvatar: "https://i.pravatar.cc/150?img=18",
      receiverId: "group-2",
      content: "วันนี้มีใครว่างเล่น Valorant ไหม?",
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    },
    {
      id: "gmsg-9",
      conversationId: "group-2",
      senderId: "user-4",
      senderName: "ประยุทธ์ มั่นคง",
      senderAvatar: "https://i.pravatar.cc/150?img=55",
      receiverId: "group-2",
      content: "ผมว่างครับ จะเล่น?",
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 170).toISOString(),
    },
    {
      id: "gmsg-10",
      conversationId: "group-2",
      senderId: "user-9",
      senderName: "วราภรณ์ โปร",
      senderAvatar: "https://i.pravatar.cc/150?img=29",
      receiverId: "group-2",
      content: "ดีเลยค่ะ ชวนด้วยนะคะ",
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 160).toISOString(),
    },
    {
      id: "gmsg-11",
      conversationId: "group-2",
      senderId: "user-1",
      senderName: "คุณ",
      senderAvatar: "https://i.pravatar.cc/150?img=12",
      receiverId: "group-2",
      content: "เดี๋ยวผมเล่นด้วยครับ อีก 30 นาที",
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 150).toISOString(),
    },
    {
      id: "gmsg-12",
      conversationId: "group-2",
      senderId: "user-8",
      senderName: "กิตติพงษ์ เล่นเกม",
      senderAvatar: "https://i.pravatar.cc/150?img=18",
      receiverId: "group-2",
      content: "โอเค! ตกลงนะเดี๋ยวรอ",
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 140).toISOString(),
    },
    {
      id: "gmsg-13",
      conversationId: "group-2",
      senderId: "user-9",
      senderName: "วราภรณ์ โปร",
      senderAvatar: "https://i.pravatar.cc/150?img=29",
      receiverId: "group-2",
      content: "มี rank ใหม่แล้วนะ Radiant! 🎮",
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    },
    {
      id: "gmsg-14",
      conversationId: "group-2",
      senderId: "user-4",
      senderName: "ประยุทธ์ มั่นคง",
      senderAvatar: "https://i.pravatar.cc/150?img=55",
      receiverId: "group-2",
      content: "เก่งมาก! เทคนิคยิง headshot แชร์หน่อยสิครับ",
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
    },
    {
      id: "gmsg-15",
      conversationId: "group-2",
      senderId: "user-8",
      senderName: "กิตติพงษ์ เล่นเกม",
      senderAvatar: "https://i.pravatar.cc/150?img=18",
      receiverId: "group-2",
      content: "มาเล่นกันไหม? ผมพร้อมแล้ว 🔥",
      read: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    },
  ],
};
