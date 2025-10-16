/**
 * Mock Data for Trending
 * ข้อมูล Mock สำหรับหัวข้อที่กำลังมาแรง
 */

export interface TrendingTopic {
  id: string;
  hashtag: string;
  category: string;
  postsCount: number;
  views: number;
  description?: string;
  image?: string;
  trend: "up" | "down" | "stable";
  position: number;
  previousPosition?: number;
}

export interface TrendingPost {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    verified?: boolean;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  hashtags: string[];
}

export const trendingCategories = [
  { id: "all", name: "ทั้งหมด", icon: "🔥" },
  { id: "news", name: "ข่าว", icon: "📰" },
  { id: "entertainment", name: "บันเทิง", icon: "🎬" },
  { id: "sports", name: "กีฬา", icon: "⚽" },
  { id: "technology", name: "เทคโนโลยี", icon: "💻" },
  { id: "lifestyle", name: "ไลฟ์สไตล์", icon: "✨" },
  { id: "food", name: "อาหาร", icon: "🍔" },
  { id: "travel", name: "ท่องเที่ยว", icon: "✈️" },
];

export const mockTrendingTopics: TrendingTopic[] = [
  {
    id: "1",
    hashtag: "#React19",
    category: "technology",
    postsCount: 15600,
    views: 1240000,
    description: "React 19 เปิดตัวอย่างเป็นทางการพร้อม Server Components",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    trend: "up",
    position: 1,
    previousPosition: 5,
  },
  {
    id: "2",
    hashtag: "#WorldCup2024",
    category: "sports",
    postsCount: 234000,
    views: 5670000,
    description: "การแข่งขันฟุตบอลโลกรอบคัดเลือก",
    image: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800",
    trend: "up",
    position: 2,
    previousPosition: 3,
  },
  {
    id: "3",
    hashtag: "#StreetFoodBangkok",
    category: "food",
    postsCount: 8900,
    views: 567000,
    description: "มหกรรมอาหารริมทางกรุงเทพ",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
    trend: "up",
    position: 3,
    previousPosition: 8,
  },
  {
    id: "4",
    hashtag: "#AIRevolution",
    category: "technology",
    postsCount: 45600,
    views: 2340000,
    description: "ปัญญาประดิษฐ์กำลังเปลี่ยนโลก",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
    trend: "stable",
    position: 4,
    previousPosition: 4,
  },
  {
    id: "5",
    hashtag: "#ThailandTravel",
    category: "travel",
    postsCount: 12300,
    views: 890000,
    description: "สถานที่ท่องเที่ยวสุดฮิตในไทย",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800",
    trend: "up",
    position: 5,
    previousPosition: 10,
  },
  {
    id: "6",
    hashtag: "#NewMovie2024",
    category: "entertainment",
    postsCount: 67800,
    views: 3450000,
    description: "หนังใหม่ที่กำลังฮิตในปี 2024",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800",
    trend: "down",
    position: 6,
    previousPosition: 2,
  },
  {
    id: "7",
    hashtag: "#HealthyLifestyle",
    category: "lifestyle",
    postsCount: 23400,
    views: 1120000,
    description: "เคล็ดลับการใช้ชีวิตเพื่อสุขภาพ",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800",
    trend: "stable",
    position: 7,
    previousPosition: 7,
  },
  {
    id: "8",
    hashtag: "#BreakingNews",
    category: "news",
    postsCount: 89000,
    views: 4560000,
    description: "ข่าวด่วนวันนี้",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800",
    trend: "up",
    position: 8,
    previousPosition: 12,
  },
  {
    id: "9",
    hashtag: "#MusicFestival",
    category: "entertainment",
    postsCount: 34500,
    views: 1780000,
    description: "เทศกาลดนตรีที่ใหญ่ที่สุดแห่งปี",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800",
    trend: "up",
    position: 9,
    previousPosition: 15,
  },
  {
    id: "10",
    hashtag: "#StartupThailand",
    category: "technology",
    postsCount: 5600,
    views: 340000,
    description: "สตาร์ทอัพไทยที่กำลังเติบโต",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800",
    trend: "stable",
    position: 10,
    previousPosition: 9,
  },
  {
    id: "11",
    hashtag: "#FitnessGoals",
    category: "lifestyle",
    postsCount: 18900,
    views: 920000,
    description: "เป้าหมายการออกกำลังกายของคุณ",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800",
    trend: "up",
    position: 11,
    previousPosition: 18,
  },
  {
    id: "12",
    hashtag: "#MobileLegends",
    category: "entertainment",
    postsCount: 156000,
    views: 6780000,
    description: "ทัวร์นาเมนต์ Mobile Legends",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800",
    trend: "down",
    position: 12,
    previousPosition: 6,
  },
  {
    id: "13",
    hashtag: "#VeganRecipes",
    category: "food",
    postsCount: 7800,
    views: 450000,
    description: "สูตรอาหารเจและมังสวิรัติ",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
    trend: "stable",
    position: 13,
    previousPosition: 13,
  },
  {
    id: "14",
    hashtag: "#TechConference",
    category: "technology",
    postsCount: 9800,
    views: 670000,
    description: "งานประชุมเทคโนโลยีระดับโลก",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    trend: "up",
    position: 14,
    previousPosition: 20,
  },
  {
    id: "15",
    hashtag: "#SummerVibes",
    category: "travel",
    postsCount: 14500,
    views: 780000,
    description: "บรรยากาศหน้าร้อน",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    trend: "stable",
    position: 15,
    previousPosition: 14,
  },
];

export const mockTrendingPosts: TrendingPost[] = [
  {
    id: "1",
    author: {
      id: "u1",
      name: "React Thailand",
      avatar: "https://i.pravatar.cc/150?u=reactth",
      verified: true,
    },
    content:
      "🚀 React 19 ออกมาแล้ว! มาพร้อม Server Components, Actions, และอีกมากมาย ใครลองแล้วบ้าง? #React19 #WebDev",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    likes: 3456,
    comments: 234,
    shares: 567,
    timestamp: "2024-01-18T10:30:00",
    hashtags: ["React19", "WebDev"],
  },
  {
    id: "2",
    author: {
      id: "u2",
      name: "Football News TH",
      avatar: "https://i.pravatar.cc/150?u=football",
      verified: true,
    },
    content:
      "⚽ ทีมชาติไทยเอาชนะเวียดนาม 2-1 ในการแข่งขันฟุตบอลโลกรอบคัดเลือก! #WorldCup2024 #ThaiFootball",
    image: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800",
    likes: 12340,
    comments: 1567,
    shares: 3456,
    timestamp: "2024-01-18T20:45:00",
    hashtags: ["WorldCup2024", "ThaiFootball"],
  },
  {
    id: "3",
    author: {
      id: "u3",
      name: "Food Lover BKK",
      avatar: "https://i.pravatar.cc/150?u=foodie",
      verified: false,
    },
    content:
      "🍜 มหกรรมอาหารริมทาง CentralWorld วันนี้! รวมร้านอาหารดัง 200+ ร้าน ฟรีค่าเข้า! #StreetFoodBangkok #FoodFestival",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
    likes: 2890,
    comments: 345,
    shares: 678,
    timestamp: "2024-01-18T14:20:00",
    hashtags: ["StreetFoodBangkok", "FoodFestival"],
  },
  {
    id: "4",
    author: {
      id: "u4",
      name: "AI Tech News",
      avatar: "https://i.pravatar.cc/150?u=aitech",
      verified: true,
    },
    content:
      "🤖 Google เปิดตัว Gemini 2.0 - AI ที่ทรงพลังที่สุดในโลก! ทำได้ทุกอย่างตั้งแต่เขียนโค้ดไปจนถึงสร้างวิดีโอ #AIRevolution #Gemini",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
    likes: 5678,
    comments: 890,
    shares: 1234,
    timestamp: "2024-01-18T09:15:00",
    hashtags: ["AIRevolution", "Gemini"],
  },
  {
    id: "5",
    author: {
      id: "u5",
      name: "Travel Thailand",
      avatar: "https://i.pravatar.cc/150?u=travel",
      verified: true,
    },
    content:
      "✈️ 10 เกาะสวรรค์ในไทยที่ต้องไปให้ได้สักครั้งในชีวิต! จัดกระเป๋าได้เลย 🏝️ #ThailandTravel #IslandHopping",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800",
    likes: 4567,
    comments: 678,
    shares: 901,
    timestamp: "2024-01-18T11:30:00",
    hashtags: ["ThailandTravel", "IslandHopping"],
  },
  {
    id: "6",
    author: {
      id: "u6",
      name: "Cinema World",
      avatar: "https://i.pravatar.cc/150?u=cinema",
      verified: true,
    },
    content:
      "🎬 หนังใหม่ที่รอคอย 'Dune 3' เตรียมถ่ายทำกลางปีนี้! ใครชอบ Dune บ้าง? #NewMovie2024 #Dune3",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800",
    likes: 6789,
    comments: 1234,
    shares: 890,
    timestamp: "2024-01-18T16:00:00",
    hashtags: ["NewMovie2024", "Dune3"],
  },
  {
    id: "7",
    author: {
      id: "u7",
      name: "Fitness Coach",
      avatar: "https://i.pravatar.cc/150?u=fitness",
      verified: false,
    },
    content:
      "💪 5 เทคนิคการออกกำลังกายที่บ้านให้ได้ผลเหมือนไปฟิต! ไม่ต้องใช้อุปกรณ์ #HealthyLifestyle #HomeworkOut",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800",
    likes: 3456,
    comments: 456,
    shares: 678,
    timestamp: "2024-01-18T07:00:00",
    hashtags: ["HealthyLifestyle", "HomeworkOut"],
  },
  {
    id: "8",
    author: {
      id: "u8",
      name: "Breaking News TH",
      avatar: "https://i.pravatar.cc/150?u=news",
      verified: true,
    },
    content:
      "📰 ข่าวด่วน: รัฐบาลประกาศมาตรการกระตุ้นเศรษฐกิจใหม่ เงินดิจิทัลเฟส 2 #BreakingNews #Thailand",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800",
    likes: 8901,
    comments: 2345,
    shares: 3456,
    timestamp: "2024-01-18T12:00:00",
    hashtags: ["BreakingNews", "Thailand"],
  },
];
