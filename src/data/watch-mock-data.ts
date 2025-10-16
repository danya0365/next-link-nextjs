/**
 * Mock Data for Watch (Video Platform)
 * ข้อมูล Mock สำหรับหน้า Watch
 */

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  views: number;
  uploadDate: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    verified: boolean;
  };
  category: string;
  likes: number;
  dislikes: number;
  description: string;
  tags: string[];
}

export const videoCategories = [
  { id: "all", name: "ทั้งหมด", icon: "🎬" },
  { id: "trending", name: "กำลังฮิต", icon: "🔥" },
  { id: "music", name: "เพลง", icon: "🎵" },
  { id: "gaming", name: "เกม", icon: "🎮" },
  { id: "news", name: "ข่าว", icon: "📰" },
  { id: "sports", name: "กีฬา", icon: "⚽" },
  { id: "education", name: "การศึกษา", icon: "📚" },
  { id: "entertainment", name: "บันเทิง", icon: "🎭" },
  { id: "technology", name: "เทคโนโลยี", icon: "💻" },
  { id: "cooking", name: "ทำอาหาร", icon: "🍳" },
  { id: "travel", name: "ท่องเที่ยว", icon: "✈️" },
  { id: "lifestyle", name: "ไลฟ์สไตล์", icon: "🌟" },
];

export const mockVideos: Video[] = [
  {
    id: "1",
    title: "สอนทำเว็บด้วย Next.js 15 - สำหรับมือใหม่",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    videoUrl: "#",
    duration: "15:32",
    views: 125000,
    uploadDate: "2024-01-15",
    author: {
      id: "u1",
      name: "Tech Guru TH",
      avatar: "https://i.pravatar.cc/150?u=techguru",
      verified: true,
    },
    category: "technology",
    likes: 5400,
    dislikes: 120,
    description:
      "เรียนรู้การสร้างเว็บไซต์ด้วย Next.js 15 แบบละเอียด เหมาะสำหรับมือใหม่",
    tags: ["nextjs", "react", "web development", "tutorial"],
  },
  {
    id: "2",
    title: "10 เทคนิคถ่ายรูปสวยด้วยมือถือ",
    thumbnail: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800",
    videoUrl: "#",
    duration: "12:45",
    views: 89000,
    uploadDate: "2024-01-14",
    author: {
      id: "u2",
      name: "PhotoPro Thailand",
      avatar: "https://i.pravatar.cc/150?u=photopro",
      verified: true,
    },
    category: "education",
    likes: 3200,
    dislikes: 45,
    description: "เทคนิคการถ่ายรูปด้วยมือถือให้สวยเหมือนกล้องโปร",
    tags: ["photography", "mobile", "tips", "tutorial"],
  },
  {
    id: "3",
    title: "ทำแพนเค้กนุ่มฟูแบบญี่ปุ่น | Japanese Fluffy Pancake",
    thumbnail: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800",
    videoUrl: "#",
    duration: "8:20",
    views: 234000,
    uploadDate: "2024-01-13",
    author: {
      id: "u3",
      name: "ครัวคุณแม่",
      avatar: "https://i.pravatar.cc/150?u=kruamae",
      verified: false,
    },
    category: "cooking",
    likes: 8900,
    dislikes: 78,
    description: "สูตรแพนเค้กนุ่มฟูแบบญี่ปุ่น ทำง่าย อร่อยมาก!",
    tags: ["cooking", "recipe", "pancake", "japanese"],
  },
  {
    id: "4",
    title: "TOP 5 มือถือเกมมิ่งราคาไม่เกิน 15,000 บาท",
    thumbnail: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
    videoUrl: "#",
    duration: "18:55",
    views: 156000,
    uploadDate: "2024-01-12",
    author: {
      id: "u4",
      name: "GadgetZone",
      avatar: "https://i.pravatar.cc/150?u=gadgetzone",
      verified: true,
    },
    category: "technology",
    likes: 6700,
    dislikes: 234,
    description: "รีวิวมือถือเกมมิ่งสเปคดี ราคาไม่แพง เล่นเกมลื่นๆ",
    tags: ["smartphone", "gaming", "review", "budget"],
  },
  {
    id: "5",
    title: "เพลงสากลฮิตติดหู 2024 | Top Hits Playlist",
    thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800",
    videoUrl: "#",
    duration: "45:30",
    views: 450000,
    uploadDate: "2024-01-11",
    author: {
      id: "u5",
      name: "Music Station TH",
      avatar: "https://i.pravatar.cc/150?u=musicstation",
      verified: true,
    },
    category: "music",
    likes: 15000,
    dislikes: 320,
    description: "รวมเพลงสากลฮิตติดหูประจำปี 2024",
    tags: ["music", "playlist", "hits", "2024"],
  },
  {
    id: "6",
    title: "ฟุตบอลไทยลีก ไฮไลท์ประตูสวยๆ",
    thumbnail: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800",
    videoUrl: "#",
    duration: "10:15",
    views: 67000,
    uploadDate: "2024-01-10",
    author: {
      id: "u6",
      name: "Thai League Official",
      avatar: "https://i.pravatar.cc/150?u=thaileague",
      verified: true,
    },
    category: "sports",
    likes: 2800,
    dislikes: 95,
    description: "ไฮไลท์ประตูสวยๆ จากฟุตบอลไทยลีก",
    tags: ["football", "thai league", "highlights", "sports"],
  },
  {
    id: "7",
    title: "เที่ยวเชียงใหม่ 3 วัน 2 คืน งบ 5,000 บาท",
    thumbnail: "https://images.unsplash.com/photo-1598935898639-81586f7d2129?w=800",
    videoUrl: "#",
    duration: "22:40",
    views: 189000,
    uploadDate: "2024-01-09",
    author: {
      id: "u7",
      name: "Travel with Me",
      avatar: "https://i.pravatar.cc/150?u=travelwithme",
      verified: false,
    },
    category: "travel",
    likes: 7500,
    dislikes: 145,
    description: "พาเที่ยวเชียงใหม่แบบประหยัด ครบทุกที่เที่ยวสำคัญ",
    tags: ["travel", "chiangmai", "budget", "thailand"],
  },
  {
    id: "8",
    title: "รีวิว ROV ฮีโร่ใหม่ล่าสุด | META SHIFT!",
    thumbnail: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800",
    videoUrl: "#",
    duration: "16:25",
    views: 312000,
    uploadDate: "2024-01-08",
    author: {
      id: "u8",
      name: "Pro Gamer TH",
      avatar: "https://i.pravatar.cc/150?u=progamer",
      verified: true,
    },
    category: "gaming",
    likes: 12000,
    dislikes: 450,
    description: "รีวิวฮีโร่ใหม่ล่าสุดใน ROV พร้อมสอนวิธีเล่น",
    tags: ["rov", "gaming", "review", "moba"],
  },
  {
    id: "9",
    title: "ข่าวเช้าวันนี้ | สรุปข่าวสำคัญ 16 มกราคม 2024",
    thumbnail: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800",
    videoUrl: "#",
    duration: "25:10",
    views: 98000,
    uploadDate: "2024-01-08",
    author: {
      id: "u9",
      name: "Daily News Thailand",
      avatar: "https://i.pravatar.cc/150?u=dailynews",
      verified: true,
    },
    category: "news",
    likes: 3400,
    dislikes: 210,
    description: "สรุปข่าวสำคัญประจำวันที่ 16 มกราคม 2024",
    tags: ["news", "daily", "thailand", "current events"],
  },
  {
    id: "10",
    title: "Stand-up Comedy | ตลกร้ายวันศุกร์",
    thumbnail: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800",
    videoUrl: "#",
    duration: "32:15",
    views: 275000,
    uploadDate: "2024-01-07",
    author: {
      id: "u10",
      name: "Comedy Club TH",
      avatar: "https://i.pravatar.cc/150?u=comedyclub",
      verified: true,
    },
    category: "entertainment",
    likes: 11500,
    dislikes: 280,
    description: "Stand-up Comedy โชว์สุดฮาจากนักแสดงชื่อดัง",
    tags: ["comedy", "standup", "entertainment", "funny"],
  },
  {
    id: "11",
    title: "เรียนภาษาอังกฤษ 30 วัน พูดคล่องแน่นอน!",
    thumbnail: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800",
    videoUrl: "#",
    duration: "42:30",
    views: 423000,
    uploadDate: "2024-01-06",
    author: {
      id: "u11",
      name: "English Master TH",
      avatar: "https://i.pravatar.cc/150?u=englishmaster",
      verified: true,
    },
    category: "education",
    likes: 18000,
    dislikes: 340,
    description: "คอร์สเรียนภาษาอังกฤษแบบเข้มข้น 30 วันพูดได้",
    tags: ["english", "education", "learning", "course"],
  },
  {
    id: "12",
    title: "ตกแต่งห้องนอนสไตล์มินิมอล งบ 10,000 บาท",
    thumbnail: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800",
    videoUrl: "#",
    duration: "14:50",
    views: 134000,
    uploadDate: "2024-01-05",
    author: {
      id: "u12",
      name: "Home Decor Ideas",
      avatar: "https://i.pravatar.cc/150?u=homedecor",
      verified: false,
    },
    category: "lifestyle",
    likes: 5600,
    dislikes: 89,
    description: "ไอเดียตกแต่งห้องนอนสไตล์มินิมอลงบไม่เกิน 10,000",
    tags: ["home decor", "minimal", "diy", "budget"],
  },
];
