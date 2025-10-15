export interface Notification {
  id: string;
  type: "like" | "comment" | "friend_request" | "friend_accept" | "mention" | "share";
  fromUserId: string;
  fromUserName: string;
  fromUserAvatar?: string;
  postId?: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export const mockNotifications: Notification[] = [
  {
    id: "notif-1",
    type: "like",
    fromUserId: "user-2",
    fromUserName: "สมชาย ใจดี",
    fromUserAvatar: "/avatars/somchai.jpg",
    postId: "post-1",
    message: "ถูกใจโพสต์ของคุณ",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
  },
  {
    id: "notif-2",
    type: "comment",
    fromUserId: "user-3",
    fromUserName: "สมหญิง รักสวย",
    fromUserAvatar: "/avatars/somying.jpg",
    postId: "post-2",
    message: 'แสดงความคิดเห็น: "เห็นด้วยมากครับ"',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
  },
  {
    id: "notif-3",
    type: "friend_request",
    fromUserId: "user-4",
    fromUserName: "ประยุทธ์ มั่นคง",
    fromUserAvatar: "/avatars/prayut.jpg",
    message: "ส่งคำขอเป็นเพื่อน",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
  },
  {
    id: "notif-4",
    type: "friend_accept",
    fromUserId: "user-5",
    fromUserName: "วิภา สุขใจ",
    fromUserAvatar: "/avatars/wipa.jpg",
    message: "ยอมรับคำขอเป็นเพื่อนของคุณ",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
  },
  {
    id: "notif-5",
    type: "mention",
    fromUserId: "user-2",
    fromUserName: "สมชาย ใจดี",
    fromUserAvatar: "/avatars/somchai.jpg",
    postId: "post-3",
    message: "แท็กคุณในโพสต์",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    id: "notif-6",
    type: "share",
    fromUserId: "user-3",
    fromUserName: "สมหญิง รักสวย",
    fromUserAvatar: "/avatars/somying.jpg",
    postId: "post-1",
    message: "แชร์โพสต์ของคุณ",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
  },
  {
    id: "notif-7",
    type: "like",
    fromUserId: "user-4",
    fromUserName: "ประยุทธ์ มั่นคง",
    fromUserAvatar: "/avatars/prayut.jpg",
    postId: "post-4",
    message: "ถูกใจโพสต์ของคุณ",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
  {
    id: "notif-8",
    type: "comment",
    fromUserId: "user-5",
    fromUserName: "วิภา สุขใจ",
    fromUserAvatar: "/avatars/wipa.jpg",
    postId: "post-2",
    message: 'แสดงความคิดเห็น: "สวยมากเลยค่ะ"',
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
  },
];
