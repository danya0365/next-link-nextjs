/**
 * Mock Data for Memories
 * ข้อมูล Mock สำหรับความทรงจำ
 */

export interface Memory {
  id: string;
  date: string; // วันที่ของความทรงจำ (เมื่อกี่ปีที่แล้ว)
  yearsAgo: number; // กี่ปีที่แล้ว
  type: "post" | "photo" | "video" | "event";
  content?: string;
  images: string[];
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  likes: number;
  comments: number;
  shares: number;
  location?: string;
  friendsTags?: {
    id: string;
    name: string;
    avatar: string;
  }[];
}

export const mockMemories: Memory[] = [
  {
    id: "1",
    date: "2023-01-16",
    yearsAgo: 1,
    type: "photo",
    content:
      "เที่ยวเชียงใหม่สุดสัปดาห์ 🏔️ บรรยากาศดีมาก อากาศเย็นสบาย ได้พักผ่อนเต็มที่!",
    images: [
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800",
      "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    ],
    author: {
      id: "me",
      name: "คุณ",
      avatar: "https://i.pravatar.cc/150?u=me",
    },
    likes: 234,
    comments: 45,
    shares: 12,
    location: "Chiang Mai, Thailand",
    friendsTags: [
      {
        id: "f1",
        name: "สมชาย ใจดี",
        avatar: "https://i.pravatar.cc/150?u=friend1",
      },
      {
        id: "f2",
        name: "สมหญิง สวยงาม",
        avatar: "https://i.pravatar.cc/150?u=friend2",
      },
    ],
  },
  {
    id: "2",
    date: "2022-01-16",
    yearsAgo: 2,
    type: "post",
    content:
      "วันนี้เริ่มงานใหม่! ตื่นเต้นมากๆ กับความท้าทายใหม่ๆ ที่รออยู่ ขอบคุณทุกคนที่คอยให้กำลังใจ 💪",
    images: [
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800",
    ],
    author: {
      id: "me",
      name: "คุณ",
      avatar: "https://i.pravatar.cc/150?u=me",
    },
    likes: 567,
    comments: 89,
    shares: 23,
  },
  {
    id: "3",
    date: "2021-01-16",
    yearsAgo: 3,
    type: "photo",
    content:
      "Birthday Party 🎂🎉 ขอบคุณทุกคนที่มาร่วมฉลองวันเกิดนะคะ ปีนี้มีความสุขมากๆ",
    images: [
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800",
      "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800",
    ],
    author: {
      id: "me",
      name: "คุณ",
      avatar: "https://i.pravatar.cc/150?u=me",
    },
    likes: 892,
    comments: 156,
    shares: 34,
    friendsTags: [
      {
        id: "f3",
        name: "นพดล รักษ์ดี",
        avatar: "https://i.pravatar.cc/150?u=friend3",
      },
      {
        id: "f4",
        name: "วรรณา สุขใจ",
        avatar: "https://i.pravatar.cc/150?u=friend4",
      },
      {
        id: "f5",
        name: "ประยุทธ มั่นคง",
        avatar: "https://i.pravatar.cc/150?u=friend5",
      },
    ],
  },
  {
    id: "4",
    date: "2020-01-16",
    yearsAgo: 4,
    type: "photo",
    content:
      "ทริปภูเก็ต 🏝️ ทะเลสวย น้ำใส อากาศดี พักผ่อนได้เต็มที่ อยากกลับมาอีก!",
    images: [
      "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800",
      "https://images.unsplash.com/photo-1552751753-d6e1be5f8f82?w=800",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
    ],
    author: {
      id: "me",
      name: "คุณ",
      avatar: "https://i.pravatar.cc/150?u=me",
    },
    likes: 1234,
    comments: 234,
    shares: 67,
    location: "Phuket, Thailand",
  },
  {
    id: "5",
    date: "2023-01-16",
    yearsAgo: 1,
    type: "post",
    content:
      "ปีนี้ตั้งเป้าหมายใหม่! ออกกำลังกายอย่างน้อยสัปดาห์ละ 3 ครั้ง อ่านหนังสือเดือนละ 2 เล่ม และเรียนรู้สิ่งใหม่ๆ #NewYearResolution",
    images: [],
    author: {
      id: "me",
      name: "คุณ",
      avatar: "https://i.pravatar.cc/150?u=me",
    },
    likes: 345,
    comments: 67,
    shares: 15,
  },
  {
    id: "6",
    date: "2022-01-16",
    yearsAgo: 2,
    type: "photo",
    content: "Concert ของวง Potato แรงสุดๆ! 🎸🎤 ขอบคุณประสบการณ์ดีๆ",
    images: [
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800",
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800",
    ],
    author: {
      id: "me",
      name: "คุณ",
      avatar: "https://i.pravatar.cc/150?u=me",
    },
    likes: 678,
    comments: 123,
    shares: 45,
    location: "Impact Arena, Bangkok",
    friendsTags: [
      {
        id: "f6",
        name: "ธนพล มีสุข",
        avatar: "https://i.pravatar.cc/150?u=friend6",
      },
    ],
  },
  {
    id: "7",
    date: "2021-01-16",
    yearsAgo: 3,
    type: "photo",
    content:
      "จบการศึกษาแล้ว! 🎓 ขอบคุณทุกคนที่คอยสนับสนุนตลอดมา ขอบคุณครอบครัว เพื่อนๆ และอาจารย์ทุกท่าน",
    images: [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
      "https://images.unsplash.com/photo-1627556704353-43fee19fc27a?w=800",
    ],
    author: {
      id: "me",
      name: "คุณ",
      avatar: "https://i.pravatar.cc/150?u=me",
    },
    likes: 2345,
    comments: 456,
    shares: 123,
    location: "Chulalongkorn University",
  },
  {
    id: "8",
    date: "2020-01-16",
    yearsAgo: 4,
    type: "post",
    content:
      "Happy New Year 2020! 🎊🎉 ขอให้ทุกคนมีความสุข สุขภาพแข็งแรง และประสบความสำเร็จในทุกๆ เรื่อง",
    images: [
      "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=800",
    ],
    author: {
      id: "me",
      name: "คุณ",
      avatar: "https://i.pravatar.cc/150?u=me",
    },
    likes: 890,
    comments: 145,
    shares: 56,
  },
  {
    id: "9",
    date: "2019-01-16",
    yearsAgo: 5,
    type: "photo",
    content:
      "First day at work! 💼 ตื่นเต้นกับความท้าทายใหม่ๆ ขอบคุณทุกโอกาสที่ได้รับ",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
    ],
    author: {
      id: "me",
      name: "คุณ",
      avatar: "https://i.pravatar.cc/150?u=me",
    },
    likes: 456,
    comments: 78,
    shares: 23,
  },
  {
    id: "10",
    date: "2018-01-16",
    yearsAgo: 6,
    type: "photo",
    content:
      "Road trip กับเพื่อนๆ 🚗 ขับรถเที่ยวทั่วไทยภายใน 7 วัน ประสบการณ์ที่ไม่มีวันลืม!",
    images: [
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    ],
    author: {
      id: "me",
      name: "คุณ",
      avatar: "https://i.pravatar.cc/150?u=me",
    },
    likes: 1567,
    comments: 289,
    shares: 89,
    friendsTags: [
      {
        id: "f7",
        name: "อรุณ สว่างใจ",
        avatar: "https://i.pravatar.cc/150?u=friend7",
      },
      {
        id: "f8",
        name: "ชัยวัฒน์ เจริญ",
        avatar: "https://i.pravatar.cc/150?u=friend8",
      },
    ],
  },
];
