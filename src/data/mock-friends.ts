export interface Friend {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  mutualFriends: number;
  friendsSince: string;
  status: "friend" | "pending" | "suggested";
}

export const mockFriends: Friend[] = [
  {
    id: "user-2",
    name: "สมชาย ใจดี",
    email: "somchai@example.com",
    avatar: "/avatars/somchai.jpg",
    bio: "นักพัฒนาซอฟต์แวร์",
    mutualFriends: 15,
    friendsSince: "2023-01-15",
    status: "friend",
  },
  {
    id: "user-3",
    name: "สมหญิง รักสวย",
    email: "somying@example.com",
    avatar: "/avatars/somying.jpg",
    bio: "Designer & Artist",
    mutualFriends: 12,
    friendsSince: "2023-03-20",
    status: "friend",
  },
  {
    id: "user-4",
    name: "ประยุทธ์ มั่นคง",
    email: "prayut@example.com",
    avatar: "/avatars/prayut.jpg",
    bio: "Digital Marketing",
    mutualFriends: 8,
    friendsSince: "2023-06-10",
    status: "friend",
  },
  {
    id: "user-5",
    name: "วิภา สุขใจ",
    email: "wipa@example.com",
    avatar: "/avatars/wipa.jpg",
    bio: "Photographer & Traveler",
    mutualFriends: 20,
    friendsSince: "2022-11-05",
    status: "friend",
  },
];

export const mockFriendRequests: Friend[] = [
  {
    id: "user-6",
    name: "อนุชา สมหวัง",
    email: "anucha@example.com",
    avatar: "/avatars/anucha.jpg",
    bio: "Backend Developer",
    mutualFriends: 5,
    friendsSince: "",
    status: "pending",
  },
  {
    id: "user-7",
    name: "กานต์ ดีใจ",
    email: "kan@example.com",
    avatar: "/avatars/kan.jpg",
    bio: "Content Creator",
    mutualFriends: 3,
    friendsSince: "",
    status: "pending",
  },
];

export const mockSuggestedFriends: Friend[] = [
  {
    id: "user-8",
    name: "นภา สดใส",
    email: "napa@example.com",
    avatar: "/avatars/napa.jpg",
    bio: "UX/UI Designer",
    mutualFriends: 10,
    friendsSince: "",
    status: "suggested",
  },
  {
    id: "user-9",
    name: "ธนา รุ่งเรือง",
    email: "tana@example.com",
    avatar: "/avatars/tana.jpg",
    bio: "Business Analyst",
    mutualFriends: 7,
    friendsSince: "",
    status: "suggested",
  },
  {
    id: "user-10",
    name: "ปิยะ วัฒนา",
    email: "piya@example.com",
    avatar: "/avatars/piya.jpg",
    bio: "Data Scientist",
    mutualFriends: 4,
    friendsSince: "",
    status: "suggested",
  },
];
