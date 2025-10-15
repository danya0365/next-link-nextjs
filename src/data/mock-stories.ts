/**
 * Mock Stories Data
 * ข้อมูล Stories สำหรับแสดงที่ Feed
 */

export interface Story {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  image: string;
  video?: string;
  createdAt: string;
  viewed: boolean;
}

/**
 * Mock Stories Data
 */
export const mockStories: Story[] = [
  {
    id: "story-1",
    userId: "user-1",
    userName: "สมชาย ใจดี",
    userAvatar: "https://i.pravatar.cc/150?img=12",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    createdAt: "2024-01-15T09:00:00Z",
    viewed: false,
  },
  {
    id: "story-2",
    userId: "user-2",
    userName: "สมหญิง รักงาน",
    userAvatar: "https://i.pravatar.cc/150?img=5",
    image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167",
    createdAt: "2024-01-15T08:30:00Z",
    viewed: false,
  },
  {
    id: "story-3",
    userId: "user-3",
    userName: "ณัฐพล ชอบเที่ยว",
    userAvatar: "https://i.pravatar.cc/150?img=33",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1",
    createdAt: "2024-01-15T07:00:00Z",
    viewed: true,
  },
  {
    id: "story-4",
    userId: "user-4",
    userName: "พิมพ์ชนก สวยงาม",
    userAvatar: "https://i.pravatar.cc/150?img=10",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    createdAt: "2024-01-14T18:00:00Z",
    viewed: true,
  },
  {
    id: "story-5",
    userId: "user-5",
    userName: "Admin Next Link",
    userAvatar: "https://i.pravatar.cc/150?img=68",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    createdAt: "2024-01-14T15:00:00Z",
    viewed: false,
  },
];
