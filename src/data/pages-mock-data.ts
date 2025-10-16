/**
 * Mock Data for Pages
 * ข้อมูล Mock สำหรับหน้า Pages (Facebook-like Pages)
 */

export interface PagePost {
  id: string;
  pageId: string;
  content: string;
  images?: string[];
  createdAt: string;
  likes: number;
  comments: number;
  shares: number;
}

export interface Page {
  id: string;
  name: string;
  description: string;
  category: string;
  coverImage: string;
  avatar: string;
  followers: number;
  likes: number;
  isFollowing: boolean;
  isLiked: boolean;
  verified: boolean;
  website?: string;
  phone?: string;
  address?: string;
  rating?: number;
  reviewsCount?: number;
  posts?: PagePost[];
  createdAt: string;
}

export const pageCategories = [
  { id: "all", name: "ทั้งหมด", icon: "📄" },
  { id: "following", name: "กำลังติดตาม", icon: "⭐" },
  { id: "discover", name: "ค้นพบเพจ", icon: "🔍" },
  { id: "business", name: "ธุรกิจ", icon: "💼" },
  { id: "restaurant", name: "ร้านอาหาร", icon: "🍔" },
  { id: "shopping", name: "ช้อปปิ้ง", icon: "🛍️" },
  { id: "entertainment", name: "บันเทิง", icon: "🎬" },
  { id: "media", name: "สื่อ/ข่าว", icon: "📰" },
  { id: "education", name: "การศึกษา", icon: "📚" },
  { id: "health", name: "สุขภาพ", icon: "💊" },
  { id: "sports", name: "กีฬา", icon: "⚽" },
  { id: "technology", name: "เทคโนโลยี", icon: "💻" },
];

export const mockPages: Page[] = [
  {
    id: "1",
    name: "สยามพารากอน Siam Paragon",
    description:
      "ศูนย์การค้าระดับโลกใจกลางกรุงเทพฯ มอบประสบการณ์การช้อปปิ้ง รับประทานอาหาร และความบันเทิงระดับพรีเมียม",
    category: "shopping",
    coverImage:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200",
    avatar:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200",
    followers: 2500000,
    likes: 2450000,
    isFollowing: true,
    isLiked: true,
    verified: true,
    website: "https://www.siamparagon.co.th",
    phone: "02-690-1000",
    address: "991 ถนนพระราม 1 แขวงปทุมวัน เขตปทุมวัน กรุงเทพฯ 10330",
    rating: 4.5,
    reviewsCount: 125000,
    createdAt: "2005-12-09",
  },
  {
    id: "2",
    name: "เซ็นทรัล เวิลด์ CentralWorld",
    description:
      "ศูนย์การค้าขนาดใหญ่ที่สุดในประเทศไทย พร้อมแบรนด์ดังมากมาย ร้านอาหารหลากหลาย และกิจกรรมตลอดทั้งปี",
    category: "shopping",
    coverImage:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200",
    avatar:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=200",
    followers: 1800000,
    likes: 1750000,
    isFollowing: true,
    isLiked: true,
    verified: true,
    website: "https://www.centralworld.co.th",
    phone: "02-635-1111",
    address: "999/9 ถนนพระราม 1 แขวงปทุมวัน เขตปทุมวัน กรุงเทพฯ 10330",
    rating: 4.6,
    reviewsCount: 98000,
    createdAt: "2006-05-01",
  },
  {
    id: "3",
    name: "Netflix Thailand",
    description:
      "บริการสตรีมมิ่งภาพยนตร์และซีรีส์ออนไลน์ ดูได้ไม่อั้นบนทุกอุปกรณ์ มีคอนเทนต์ภาษาไทยและเนื้อหาจากทั่วโลก",
    category: "entertainment",
    coverImage:
      "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1200",
    avatar:
      "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=200",
    followers: 3500000,
    likes: 3200000,
    isFollowing: true,
    isLiked: true,
    verified: true,
    website: "https://www.netflix.com/th",
    rating: 4.7,
    reviewsCount: 450000,
    createdAt: "2016-01-15",
  },
  {
    id: "4",
    name: "After You Dessert Cafe",
    description:
      "คาเฟ่ขนมหวานชื่อดัง เมนูเด็ดที่ต้องลอง Shibuya Honey Toast, Kakigori และเครื่องดื่มหลากหลาย",
    category: "restaurant",
    coverImage:
      "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=1200",
    avatar:
      "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=200",
    followers: 890000,
    likes: 850000,
    isFollowing: true,
    isLiked: true,
    verified: true,
    website: "https://www.afteryoudessertcafe.com",
    phone: "02-252-3355",
    rating: 4.4,
    reviewsCount: 45000,
    createdAt: "2007-03-20",
  },
  {
    id: "5",
    name: "LINE Thailand",
    description:
      "แอปพลิเคชันแชทอันดับ 1 ของไทย ติดต่อเพื่อนฝูง แชร์ช่วงเวลาดีๆ และใช้บริการต่างๆ มากมาย",
    category: "technology",
    coverImage:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200",
    avatar:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200",
    followers: 5600000,
    likes: 5200000,
    isFollowing: true,
    isLiked: true,
    verified: true,
    website: "https://line.me/th",
    rating: 4.3,
    reviewsCount: 890000,
    createdAt: "2011-06-23",
  },
  {
    id: "6",
    name: "ThaiPBS ไทยพีบีเอส",
    description:
      "สถานีโทรทัศน์ไทยพีบีเอส มอบข่าวสารและรายการคุณภาพเพื่อสังคม ติดตามข่าวสารและรายการดีๆ ได้ที่นี่",
    category: "media",
    coverImage:
      "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=1200",
    avatar:
      "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=200",
    followers: 4200000,
    likes: 3800000,
    isFollowing: false,
    isLiked: false,
    verified: true,
    website: "https://www.thaipbs.or.th",
    phone: "02-790-2000",
    rating: 4.5,
    reviewsCount: 67000,
    createdAt: "2008-01-15",
  },
  {
    id: "7",
    name: "มหาวิทยาลัยธรรมศาสตร์ Thammasat University",
    description:
      "สถาบันการศึกษาชั้นนำของไทย มุ่งพัฒนาผู้เรียนให้เป็นบัณฑิตที่มีคุณภาพและรับผิดชอบต่อสังคม",
    category: "education",
    coverImage:
      "https://images.unsplash.com/photo-1562774053-701939374585?w=1200",
    avatar:
      "https://images.unsplash.com/photo-1562774053-701939374585?w=200",
    followers: 1500000,
    likes: 1350000,
    isFollowing: false,
    isLiked: false,
    verified: true,
    website: "https://www.tu.ac.th",
    phone: "02-564-4440",
    rating: 4.6,
    reviewsCount: 23000,
    createdAt: "1934-06-27",
  },
  {
    id: "8",
    name: "โรงพยาบาลบำรุงราษฎร์ Bumrungrad Hospital",
    description:
      "โรงพยาบาลเอกชนชั้นนำระดับสากล มาตรฐาน JCI ให้บริการด้านสุขภาพครบวงจร",
    category: "health",
    coverImage:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200",
    avatar:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=200",
    followers: 890000,
    likes: 820000,
    isFollowing: false,
    isLiked: false,
    verified: true,
    website: "https://www.bumrungrad.com",
    phone: "02-066-8888",
    rating: 4.7,
    reviewsCount: 45000,
    createdAt: "1980-01-01",
  },
  {
    id: "9",
    name: "ช้างบุรี ศรีราชา FC Chonburi FC",
    description:
      "สมาคมฟุตบอลชั้นนำของไทย ติดตามข่าวสาร ผลการแข่งขัน และกิจกรรมต่างๆ ของทีม",
    category: "sports",
    coverImage:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200",
    avatar:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200",
    followers: 650000,
    likes: 580000,
    isFollowing: false,
    isLiked: false,
    verified: true,
    website: "https://www.chonburifc.com",
    phone: "038-347-888",
    rating: 4.3,
    reviewsCount: 12000,
    createdAt: "1997-12-28",
  },
  {
    id: "10",
    name: "Grab Thailand",
    description:
      "แอปพลิเคชันบริการเดินทางและส่งอาหารอันดับ 1 ในเอเชียตะวันออกเฉียงใต้ ใช้งานง่าย ปลอดภัย สะดวกสบาย",
    category: "business",
    coverImage:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200",
    avatar:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=200",
    followers: 3200000,
    likes: 2900000,
    isFollowing: true,
    isLiked: true,
    verified: true,
    website: "https://www.grab.com/th",
    rating: 4.2,
    reviewsCount: 567000,
    createdAt: "2013-06-06",
  },
  {
    id: "11",
    name: "CP All - 7-Eleven Thailand",
    description:
      "ร้านสะดวกซื้อ 7-Eleven มีให้เลือกมากมายทั้งอาหาร เครื่องดื่ม และสินค้าอุปโภคบริโภค",
    category: "shopping",
    coverImage:
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200",
    avatar:
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200",
    followers: 4500000,
    likes: 4100000,
    isFollowing: true,
    isLiked: true,
    verified: true,
    website: "https://www.cpall.co.th",
    phone: "02-677-1000",
    rating: 4.4,
    reviewsCount: 234000,
    createdAt: "1988-01-01",
  },
  {
    id: "12",
    name: "ครัวคุณต๋อย Kitchen Khun Toy",
    description:
      "ร้านอาหารไทยต้นตำรับ รสชาติเข้มข้น หอมกลิ่นเครื่องเทศ บรรยากาศอบอุ่น เหมาะกับการมาทานกับครอบครัว",
    category: "restaurant",
    coverImage:
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=1200",
    avatar:
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=200",
    followers: 234000,
    likes: 210000,
    isFollowing: false,
    isLiked: false,
    verified: true,
    phone: "02-234-5678",
    address: "123 ถนนสุขุมวิท แขวงคลองเตย กรุงเทพฯ 10110",
    rating: 4.8,
    reviewsCount: 8900,
    createdAt: "2015-08-15",
  },
];

// Mock page posts
export const mockPagePosts: PagePost[] = [
  {
    id: "pp-1",
    pageId: "1",
    content:
      "🎉 Grand Sale สิ้นปี! ลดสูงสุด 70% ทุกชั้น เริ่มวันนี้ - 31 ธันวาคม แวะมาช้อปปิ้งกันได้เลย!",
    images: [
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800",
      "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800",
    ],
    createdAt: "2024-01-18T10:00:00",
    likes: 12500,
    comments: 890,
    shares: 3400,
  },
  {
    id: "pp-2",
    pageId: "1",
    content:
      "✨ เปิดโซนใหม่ Luxury Brand Floor รวมแบรนด์ดังระดับโลก พร้อมให้บริการแล้ววันนี้!",
    images: ["https://images.unsplash.com/photo-1555529902-5261145633bf?w=800"],
    createdAt: "2024-01-17T14:30:00",
    likes: 8900,
    comments: 456,
    shares: 1200,
  },
  {
    id: "pp-3",
    pageId: "3",
    content:
      "🎬 ซีรีส์ใหม่ห้ามพลาด! 'The Last Kingdom' Season 5 มาแล้ว! ดูได้แล้ววันนี้",
    images: ["https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800"],
    createdAt: "2024-01-18T08:00:00",
    likes: 45000,
    comments: 5600,
    shares: 12000,
  },
  {
    id: "pp-4",
    pageId: "4",
    content:
      "🍰 เมนูใหม่! Matcha Tiramisu Kakigori หอมกรุ่นชาเขียว ละลายในปาก ต้องลอง!",
    images: ["https://images.unsplash.com/photo-1497534446932-c925b458314e?w=800"],
    createdAt: "2024-01-18T11:15:00",
    likes: 6700,
    comments: 890,
    shares: 2300,
  },
  {
    id: "pp-5",
    pageId: "5",
    content:
      "🎁 LINE Points สูงสุด 1,000 Points! ใช้ LINE Pay ครบ 500 บาท รับคะแนนทันที",
    createdAt: "2024-01-18T09:30:00",
    likes: 23000,
    comments: 1200,
    shares: 8900,
  },
];

// Add posts to pages
mockPages.forEach((page) => {
  page.posts = mockPagePosts.filter((post) => post.pageId === page.id);
});
