/**
 * Mock Data for Saved Items
 * ข้อมูล Mock สำหรับรายการที่บันทึก
 */

export interface SavedItem {
  id: string;
  type: "post" | "video" | "event" | "marketplace" | "link";
  title: string;
  description?: string;
  image?: string;
  url?: string;
  savedAt: string;
  collection?: string;
  author?: {
    id: string;
    name: string;
    avatar: string;
  };
  metadata?: {
    likes?: number;
    comments?: number;
    views?: number;
    price?: number;
    date?: string;
  };
}

export const savedCollections = [
  { id: "all", name: "ทั้งหมด", icon: "📑", count: 24 },
  { id: "posts", name: "โพสต์", icon: "📝", count: 8 },
  { id: "videos", name: "วิดีโอ", icon: "🎬", count: 6 },
  { id: "events", name: "อีเว้นท์", icon: "📅", count: 4 },
  { id: "marketplace", name: "ตลาด", icon: "🛍️", count: 3 },
  { id: "links", name: "ลิงก์", icon: "🔗", count: 3 },
];

export const mockSavedItems: SavedItem[] = [
  {
    id: "1",
    type: "post",
    title: "10 เทคนิคการเขียน React ให้มีประสิทธิภาพ",
    description:
      "สรุปเทคนิคการเขียน React แบบ Pro ที่ช่วยเพิ่มประสิทธิภาพและลดการ re-render ที่ไม่จำเป็น",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    savedAt: "2024-01-18",
    collection: "posts",
    author: {
      id: "u1",
      name: "React Thailand",
      avatar: "https://i.pravatar.cc/150?u=reactth",
    },
    metadata: {
      likes: 234,
      comments: 56,
    },
  },
  {
    id: "2",
    type: "video",
    title: "Tutorial: Next.js 15 App Router - Complete Guide",
    description:
      "สอนการใช้งาน Next.js 15 App Router แบบเจาะลึก ตั้งแต่พื้นฐานจนถึงขั้นสูง",
    image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800",
    savedAt: "2024-01-17",
    collection: "videos",
    author: {
      id: "u2",
      name: "Web Dev Simplified",
      avatar: "https://i.pravatar.cc/150?u=webdev",
    },
    metadata: {
      views: 15600,
    },
  },
  {
    id: "3",
    type: "event",
    title: "React & Next.js Meetup Bangkok #12",
    description: "มาพบปะพูดคุยแลกเปลี่ยนความรู้เกี่ยวกับ React และ Next.js",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    savedAt: "2024-01-16",
    collection: "events",
    metadata: {
      date: "2024-01-25T18:00:00",
    },
  },
  {
    id: "4",
    type: "marketplace",
    title: "MacBook Pro 14\" M3 Pro (2023)",
    description: "MacBook Pro 14 นิ้ว ชิป M3 Pro RAM 18GB SSD 512GB",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
    savedAt: "2024-01-15",
    collection: "marketplace",
    metadata: {
      price: 75000,
    },
  },
  {
    id: "5",
    type: "link",
    title: "React Documentation - New Docs",
    description: "เอกสารอย่างเป็นทางการของ React เวอร์ชันใหม่",
    url: "https://react.dev",
    savedAt: "2024-01-14",
    collection: "links",
  },
  {
    id: "6",
    type: "post",
    title: "สูตรอาหารไทยยอดนิยม 20 เมนู",
    description:
      "รวมสูตรอาหารไทยที่ทำง่าย อร่อย และได้รับความนิยมมากที่สุด",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    savedAt: "2024-01-13",
    collection: "posts",
    author: {
      id: "u3",
      name: "ครัวคุณแม่",
      avatar: "https://i.pravatar.cc/150?u=cooking",
    },
    metadata: {
      likes: 1234,
      comments: 234,
    },
  },
  {
    id: "7",
    type: "video",
    title: "การถ่ายภาพ Portrait แบบมืออาชีพ",
    description: "เรียนรู้เทคนิคการจัดแสงและมุมกล้องสำหรับการถ่ายภาพ Portrait",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800",
    savedAt: "2024-01-12",
    collection: "videos",
    author: {
      id: "u4",
      name: "Photography Thailand",
      avatar: "https://i.pravatar.cc/150?u=photo",
    },
    metadata: {
      views: 8900,
    },
  },
  {
    id: "8",
    type: "event",
    title: "Bangkok Marathon 2024",
    description: "มาร่วมวิ่งมาราธอนครั้งยิ่งใหญ่ของกรุงเทพฯ!",
    image: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800",
    savedAt: "2024-01-11",
    collection: "events",
    metadata: {
      date: "2024-02-15T05:00:00",
    },
  },
  {
    id: "9",
    type: "post",
    title: "เทคนิคการออกกำลังกายลดน้ำหนัก",
    description:
      "แชร์เทคนิคการออกกำลังกายและการควบคุมอาหารเพื่อลดน้ำหนักอย่างมีประสิทธิภาพ",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800",
    savedAt: "2024-01-10",
    collection: "posts",
    author: {
      id: "u5",
      name: "Fitness Coach",
      avatar: "https://i.pravatar.cc/150?u=fitness",
    },
    metadata: {
      likes: 567,
      comments: 89,
    },
  },
  {
    id: "10",
    type: "marketplace",
    title: "iPhone 15 Pro Max 256GB",
    description: "iPhone 15 Pro Max สภาพใหม่ ใช้งานมา 2 เดือน",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800",
    savedAt: "2024-01-09",
    collection: "marketplace",
    metadata: {
      price: 42900,
    },
  },
  {
    id: "11",
    type: "video",
    title: "Web3 & Blockchain Explained",
    description: "อธิบาย Web3 และ Blockchain แบบเข้าใจง่าย",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800",
    savedAt: "2024-01-08",
    collection: "videos",
    author: {
      id: "u6",
      name: "Tech Guru",
      avatar: "https://i.pravatar.cc/150?u=techguru",
    },
    metadata: {
      views: 23400,
    },
  },
  {
    id: "12",
    type: "link",
    title: "TypeScript Handbook",
    description: "คู่มือการใช้งาน TypeScript อย่างเป็นทางการ",
    url: "https://www.typescriptlang.org/docs/handbook/intro.html",
    savedAt: "2024-01-07",
    collection: "links",
  },
  {
    id: "13",
    type: "post",
    title: "แนะนำสถานที่ท่องเที่ยวเชียงใหม่",
    description: "10 สถานที่ท่องเที่ยวในเชียงใหม่ที่ไม่ควรพลาด",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800",
    savedAt: "2024-01-06",
    collection: "posts",
    author: {
      id: "u7",
      name: "Travel Thailand",
      avatar: "https://i.pravatar.cc/150?u=travel",
    },
    metadata: {
      likes: 2341,
      comments: 456,
    },
  },
  {
    id: "14",
    type: "event",
    title: "Digital Art Workshop - Procreate",
    description: "เรียนรู้การวาดภาพดิจิทัลด้วย Procreate แบบเจาะลึก",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800",
    savedAt: "2024-01-05",
    collection: "events",
    metadata: {
      date: "2024-01-28T10:00:00",
    },
  },
  {
    id: "15",
    type: "video",
    title: "UI/UX Design Principles 2024",
    description: "หลักการออกแบบ UI/UX ที่ทุกคนควรรู้",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
    savedAt: "2024-01-04",
    collection: "videos",
    author: {
      id: "u8",
      name: "Design Master",
      avatar: "https://i.pravatar.cc/150?u=design",
    },
    metadata: {
      views: 12300,
    },
  },
  {
    id: "16",
    type: "marketplace",
    title: "จักรยานเสือภูเขา Giant Talon 3",
    description: "จักรยานเสือภูเขา Giant Talon 3 ปั่นมาแค่ 3 เดือน",
    image: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800",
    savedAt: "2024-01-03",
    collection: "marketplace",
    metadata: {
      price: 12900,
    },
  },
  {
    id: "17",
    type: "post",
    title: "AI Tools ที่ช่วยเพิ่มประสิทธิภาพการทำงาน",
    description: "รวม AI Tools ที่ดีที่สุดสำหรับการทำงานในปี 2024",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
    savedAt: "2024-01-02",
    collection: "posts",
    author: {
      id: "u9",
      name: "AI Enthusiast",
      avatar: "https://i.pravatar.cc/150?u=ai",
    },
    metadata: {
      likes: 3456,
      comments: 678,
    },
  },
  {
    id: "18",
    type: "link",
    title: "Tailwind CSS Documentation",
    description: "เอกสารการใช้งาน Tailwind CSS",
    url: "https://tailwindcss.com/docs",
    savedAt: "2024-01-01",
    collection: "links",
  },
  {
    id: "19",
    type: "video",
    title: "Docker & Kubernetes Tutorial",
    description: "เรียนรู้ Docker และ Kubernetes ตั้งแต่เริ่มต้น",
    image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800",
    savedAt: "2023-12-31",
    collection: "videos",
    author: {
      id: "u10",
      name: "DevOps Pro",
      avatar: "https://i.pravatar.cc/150?u=devops",
    },
    metadata: {
      views: 18900,
    },
  },
  {
    id: "20",
    type: "event",
    title: "AI & Machine Learning Conference 2024",
    description: "การประชุมระดับชาติเกี่ยวกับ AI และ Machine Learning",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
    savedAt: "2023-12-30",
    collection: "events",
    metadata: {
      date: "2024-03-15T09:00:00",
    },
  },
  {
    id: "21",
    type: "post",
    title: "วิธีการดูแลสุขภาพจิต",
    description: "เทคนิคการดูแลสุขภาพจิตในยุค WFH",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
    savedAt: "2023-12-29",
    collection: "posts",
    author: {
      id: "u11",
      name: "Mental Health Thailand",
      avatar: "https://i.pravatar.cc/150?u=mental",
    },
    metadata: {
      likes: 1890,
      comments: 234,
    },
  },
  {
    id: "22",
    type: "post",
    title: "Investment Tips สำหรับมือใหม่",
    description: "คำแนะนำการลงทุนสำหรับผู้เริ่มต้น",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
    savedAt: "2023-12-28",
    collection: "posts",
    author: {
      id: "u12",
      name: "Finance Guru",
      avatar: "https://i.pravatar.cc/150?u=finance",
    },
    metadata: {
      likes: 4567,
      comments: 890,
    },
  },
  {
    id: "23",
    type: "video",
    title: "Photography Composition Techniques",
    description: "เทคนิคการจัดองค์ประกอบภาพถ่ายแบบมืออาชีพ",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800",
    savedAt: "2023-12-27",
    collection: "videos",
    author: {
      id: "u13",
      name: "Photo Academy",
      avatar: "https://i.pravatar.cc/150?u=photoacademy",
    },
    metadata: {
      views: 9870,
    },
  },
  {
    id: "24",
    type: "post",
    title: "สูตรขนมไทยโบราณ",
    description: "รวมสูตรขนมไทยโบราณที่กำลังจะสูญหาย",
    image: "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=800",
    savedAt: "2023-12-26",
    collection: "posts",
    author: {
      id: "u14",
      name: "ขนมไทยโบราณ",
      avatar: "https://i.pravatar.cc/150?u=dessert",
    },
    metadata: {
      likes: 987,
      comments: 123,
    },
  },
];
