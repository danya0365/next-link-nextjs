/**
 * Mock Users Data
 * ข้อมูลผู้ใช้สำหรับทดสอบระบบ
 */

import { User } from "@/src/presentation/stores/authStore.types";

export const mockUsers: User[] = [
  {
    id: "user-1",
    email: "somchai@email.com",
    name: "สมชาย ใจดี",
    username: "somchai_jaidee",
    avatar: "https://i.pravatar.cc/150?img=12",
    coverPhoto: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
    bio: "รักการเดินทาง ถ่ายภาพ และอาหารอร่อย 📸🍜✈️",
    location: "กรุงเทพมหานคร, ประเทศไทย",
    website: "https://somchai-blog.com",
    birthday: "1990-05-15",
    relationshipStatus: "โสด",
    createdAt: "2020-01-15T10:00:00Z",
    friendsCount: 542,
    followersCount: 1234,
    followingCount: 892,
  },
  {
    id: "user-2",
    email: "somying@email.com",
    name: "สมหญิง รักงาน",
    username: "somying_rakngarn",
    avatar: "https://i.pravatar.cc/150?img=5",
    coverPhoto: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    bio: "ครูประจำการ | รักการสอน รักเด็ก 👩‍🏫📚",
    location: "เชียงใหม่, ประเทศไทย",
    website: "",
    birthday: "1985-08-20",
    relationshipStatus: "สมรส",
    createdAt: "2019-03-20T08:30:00Z",
    friendsCount: 789,
    followersCount: 2341,
    followingCount: 456,
  },
  {
    id: "user-3",
    email: "natthaphon@email.com",
    name: "ณัฐพล ชอบเที่ยว",
    username: "natthaphon_travel",
    avatar: "https://i.pravatar.cc/150?img=33",
    coverPhoto: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    bio: "Travel Blogger | ชีวิตคือการเดินทาง 🌏✈️🏝️",
    location: "ภูเก็ต, ประเทศไทย",
    website: "https://travelblog-natthaphon.com",
    birthday: "1992-11-10",
    relationshipStatus: "มีแฟน",
    createdAt: "2018-06-10T14:20:00Z",
    friendsCount: 1523,
    followersCount: 5678,
    followingCount: 234,
  },
  {
    id: "user-4",
    email: "pimchanok@email.com",
    name: "พิมพ์ชนก สวยงาม",
    username: "pimchanok_beauty",
    avatar: "https://i.pravatar.cc/150?img=10",
    coverPhoto: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9",
    bio: "นักศึกษา มหาวิทยาลัยเกษตรศาสตร์ | Fashion & Beauty 💄👗",
    location: "กรุงเทพมหานคร, ประเทศไทย",
    website: "",
    birthday: "2000-03-25",
    relationshipStatus: "โสด",
    createdAt: "2021-09-01T09:00:00Z",
    friendsCount: 892,
    followersCount: 3456,
    followingCount: 1234,
  },
  {
    id: "user-5",
    email: "admin@nextlink.com",
    name: "Admin Next Link",
    username: "admin",
    avatar: "https://i.pravatar.cc/150?img=68",
    coverPhoto: "https://images.unsplash.com/photo-1557683316-973673baf926",
    bio: "Official Next Link Admin Account",
    location: "Bangkok, Thailand",
    website: "https://nextlink.com",
    birthday: "1995-01-01",
    relationshipStatus: "ไม่ระบุ",
    createdAt: "2018-01-01T00:00:00Z",
    friendsCount: 9999,
    followersCount: 99999,
    followingCount: 0,
  },
];

/**
 * Mock credentials สำหรับทดสอบ
 * Email: ใช้ email จาก mockUsers
 * Password: "password123" สำหรับทุก account
 */
export const mockCredentials = {
  password: "password123",
};

/**
 * Simulate API call delay
 */
export const simulateDelay = (ms: number = 1000): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Mock authentication function
 */
export const authenticateUser = async (
  email: string,
  password: string
): Promise<User | null> => {
  await simulateDelay(800);

  // ตรวจสอบ email และ password
  if (password !== mockCredentials.password) {
    throw new Error("รหัสผ่านไม่ถูกต้อง");
  }

  const user = mockUsers.find((u) => u.email === email);
  if (!user) {
    throw new Error("ไม่พบบัญชีผู้ใช้นี้");
  }

  return user;
};
