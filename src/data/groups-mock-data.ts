/**
 * Mock Data for Groups
 * ข้อมูล Mock สำหรับหน้า Groups
 */

export interface Group {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  icon: string;
  category: string;
  privacy: "public" | "private" | "secret";
  members: number;
  postsToday: number;
  createdAt: string;
  admins: {
    id: string;
    name: string;
    avatar: string;
  }[];
  isMember: boolean;
  isPending: boolean;
  tags: string[];
}

export const groupCategories = [
  { id: "all", name: "ทั้งหมด", icon: "👥" },
  { id: "your-groups", name: "กลุ่มของคุณ", icon: "⭐" },
  { id: "discover", name: "ค้นพบกลุ่ม", icon: "🔍" },
  { id: "travel", name: "ท่องเที่ยว", icon: "✈️" },
  { id: "food", name: "อาหาร", icon: "🍔" },
  { id: "technology", name: "เทคโนโลยี", icon: "💻" },
  { id: "gaming", name: "เกม", icon: "🎮" },
  { id: "photography", name: "ถ่ายภาพ", icon: "📷" },
  { id: "fitness", name: "ออกกำลังกาย", icon: "💪" },
  { id: "music", name: "ดนตรี", icon: "🎵" },
  { id: "art", name: "ศิลปะ", icon: "🎨" },
  { id: "education", name: "การศึกษา", icon: "📚" },
  { id: "business", name: "ธุรกิจ", icon: "💼" },
];

export const mockGroups: Group[] = [
  {
    id: "1",
    name: "กลุ่มคนรักการเดินทาง ทั่วโลก",
    description:
      "กลุ่มสำหรับคนรักการเดินทาง แบ่งปันประสบการณ์ ภาพถ่าย และคำแนะนำสถานที่ท่องเที่ยวทั่วโลก พร้อมเทคนิคการวางแผนการเดินทางและการประหยัดค่าใช้จ่าย",
    coverImage:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200",
    icon: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=200",
    category: "travel",
    privacy: "public",
    members: 125430,
    postsToday: 234,
    createdAt: "2022-03-15",
    admins: [
      {
        id: "a1",
        name: "สมชาย ท่องโลก",
        avatar: "https://i.pravatar.cc/150?u=admin1",
      },
    ],
    isMember: true,
    isPending: false,
    tags: ["travel", "adventure", "backpacker", "photography"],
  },
  {
    id: "2",
    name: "Foodies Thailand - คนรักอาหาร",
    description:
      "รวมตัวคนรักอาหารทุกประเภท แชร์ร้านอร่อย สูตรอาหารเด็ด และรีวิวร้านอาหารทั่วประเทศไทย อัพเดตร้านใหม่ทุกวัน!",
    coverImage:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200",
    icon: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200",
    category: "food",
    privacy: "public",
    members: 89560,
    postsToday: 456,
    createdAt: "2021-08-20",
    admins: [
      {
        id: "a2",
        name: "กินให้ชัวร์",
        avatar: "https://i.pravatar.cc/150?u=admin2",
      },
    ],
    isMember: true,
    isPending: false,
    tags: ["food", "restaurant", "cooking", "recipe"],
  },
  {
    id: "3",
    name: "Tech Geeks Thailand - คนรักเทคโนโลยี",
    description:
      "กลุ่มสำหรับคนรักเทคโนโลยี อัพเดตข่าวสาร IT, Gadget Reviews, Programming Tips และ Tech Trends ล่าสุด",
    coverImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200",
    icon: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=200",
    category: "technology",
    privacy: "public",
    members: 67890,
    postsToday: 178,
    createdAt: "2021-05-10",
    admins: [
      {
        id: "a3",
        name: "TechMaster",
        avatar: "https://i.pravatar.cc/150?u=admin3",
      },
    ],
    isMember: false,
    isPending: false,
    tags: ["technology", "programming", "gadgets", "ai"],
  },
  {
    id: "4",
    name: "ROV Thailand Community",
    description:
      "กลุ่มผู้เล่น ROV ประเทศไทย แชร์เทคนิคการเล่น, Meta, Build ไอเทม และหาเพื่อนร่วมทีม Rank together!",
    coverImage:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200",
    icon: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200",
    category: "gaming",
    privacy: "public",
    members: 234560,
    postsToday: 892,
    createdAt: "2020-11-25",
    admins: [
      {
        id: "a4",
        name: "ProGamer99",
        avatar: "https://i.pravatar.cc/150?u=admin4",
      },
    ],
    isMember: true,
    isPending: false,
    tags: ["rov", "gaming", "esports", "moba"],
  },
  {
    id: "5",
    name: "Photography Thailand - ถ่ายภาพ",
    description:
      "กลุ่มช่างภาพและคนรักการถ่ายภาพ แชร์ผลงาน เทคนิค และรีวิวอุปกรณ์ถ่ายภาพ ทั้ง DSLR, Mirrorless และมือถือ",
    coverImage:
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200",
    icon: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=200",
    category: "photography",
    privacy: "public",
    members: 45670,
    postsToday: 123,
    createdAt: "2022-01-08",
    admins: [
      {
        id: "a5",
        name: "PhotoPro_TH",
        avatar: "https://i.pravatar.cc/150?u=admin5",
      },
    ],
    isMember: false,
    isPending: false,
    tags: ["photography", "camera", "editing", "portrait"],
  },
  {
    id: "6",
    name: "Fitness & Gym Thailand",
    description:
      "กลุ่มคนรักสุขภาพและการออกกำลังกาย แชร์ Workout Routine, Diet Plan, และ Progress Photos พร้อมกำลังใจจากเพื่อนๆ",
    coverImage:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200",
    icon: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200",
    category: "fitness",
    privacy: "public",
    members: 56780,
    postsToday: 267,
    createdAt: "2021-09-15",
    admins: [
      {
        id: "a6",
        name: "FitCoach",
        avatar: "https://i.pravatar.cc/150?u=admin6",
      },
    ],
    isMember: true,
    isPending: false,
    tags: ["fitness", "gym", "health", "workout"],
  },
  {
    id: "7",
    name: "Music Lovers Thailand",
    description:
      "กลุ่มคนรักดนตรีทุกแนว แชร์เพลงโปรด, Concert Reviews, และพูดคุยเกี่ยวกับศิลปิน อัลบั้ม และเครื่องดนตรี",
    coverImage:
      "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=1200",
    icon: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=200",
    category: "music",
    privacy: "public",
    members: 78900,
    postsToday: 345,
    createdAt: "2021-12-20",
    admins: [
      {
        id: "a7",
        name: "MusicMania",
        avatar: "https://i.pravatar.cc/150?u=admin7",
      },
    ],
    isMember: false,
    isPending: false,
    tags: ["music", "concert", "artist", "playlist"],
  },
  {
    id: "8",
    name: "Digital Artists Thailand",
    description:
      "กลุ่มศิลปินดิจิทัล แชร์ผลงาน เทคนิคการวาด, 3D Modeling, และ Animation พร้อมรีวิว Software และ Tools",
    coverImage:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200",
    icon: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=200",
    category: "art",
    privacy: "public",
    members: 34560,
    postsToday: 89,
    createdAt: "2022-04-12",
    admins: [
      {
        id: "a8",
        name: "ArtMaster_TH",
        avatar: "https://i.pravatar.cc/150?u=admin8",
      },
    ],
    isMember: true,
    isPending: false,
    tags: ["art", "digital art", "illustration", "design"],
  },
  {
    id: "9",
    name: "เรียนรู้ด้วยกัน - Self Learning",
    description:
      "กลุ่มสำหรับผู้ที่รักการเรียนรู้ แชร์คอร์สออนไลน์, หนังสือดีๆ และ Learning Resources ฟรี พร้อมสร้างกลุ่มเรียนร่วมกัน",
    coverImage:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200",
    icon: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=200",
    category: "education",
    privacy: "public",
    members: 67800,
    postsToday: 156,
    createdAt: "2021-07-05",
    admins: [
      {
        id: "a9",
        name: "LearnTogether",
        avatar: "https://i.pravatar.cc/150?u=admin9",
      },
    ],
    isMember: false,
    isPending: false,
    tags: ["education", "learning", "online course", "books"],
  },
  {
    id: "10",
    name: "Startup Thailand - ธุรกิจและสตาร์ทอัพ",
    description:
      "กลุ่มผู้ประกอบการและคนที่สนใจสตาร์ทอัพ แชร์ประสบการณ์, Business Ideas, และ Networking สำหรับการทำธุรกิจ",
    coverImage:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200",
    icon: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=200",
    category: "business",
    privacy: "private",
    members: 23450,
    postsToday: 67,
    createdAt: "2022-02-28",
    admins: [
      {
        id: "a10",
        name: "BusinessMentor",
        avatar: "https://i.pravatar.cc/150?u=admin10",
      },
    ],
    isMember: false,
    isPending: true,
    tags: ["startup", "business", "entrepreneurship", "networking"],
  },
  {
    id: "11",
    name: "React & Next.js Developers Thailand",
    description:
      "กลุ่มนักพัฒนาเว็บที่ใช้ React และ Next.js แชร์โค้ด, แก้ปัญหา, และอัพเดต Best Practices ล่าสุด",
    coverImage:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200",
    icon: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200",
    category: "technology",
    privacy: "public",
    members: 12340,
    postsToday: 45,
    createdAt: "2023-01-10",
    admins: [
      {
        id: "a11",
        name: "NextJS_Pro",
        avatar: "https://i.pravatar.cc/150?u=admin11",
      },
    ],
    isMember: true,
    isPending: false,
    tags: ["react", "nextjs", "javascript", "web development"],
  },
  {
    id: "12",
    name: "รักหมา รักแมว - Pet Lovers",
    description:
      "กลุ่มคนรักสัตว์เลี้ยง โดยเฉพาะหมาและแมว แชร์ภาพน่ารัก คำแนะนำการเลี้ยงดู และหาบ้านให้น้องๆ",
    coverImage:
      "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1200",
    icon: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=200",
    category: "travel",
    privacy: "public",
    members: 156780,
    postsToday: 678,
    createdAt: "2020-06-18",
    admins: [
      {
        id: "a12",
        name: "PetLover_TH",
        avatar: "https://i.pravatar.cc/150?u=admin12",
      },
    ],
    isMember: true,
    isPending: false,
    tags: ["pets", "dogs", "cats", "animals"],
  },
];
