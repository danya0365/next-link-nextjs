/**
 * Mock Data for Marketplace
 * ข้อมูล Mock สำหรับหน้า Marketplace
 */

export interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  category: string;
  condition: "new" | "used" | "like_new";
  location: string;
  seller: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    totalReviews: number;
  };
  createdAt: string;
  views: number;
  likes: number;
  isAvailable: boolean;
  tags: string[];
}

export const marketplaceCategories = [
  { id: "all", name: "ทั้งหมด", icon: "🛍️" },
  { id: "electronics", name: "อิเล็กทรอนิกส์", icon: "📱" },
  { id: "fashion", name: "แฟชั่น", icon: "👕" },
  { id: "home", name: "บ้านและสวน", icon: "🏠" },
  { id: "vehicles", name: "ยานยนต์", icon: "🚗" },
  { id: "sports", name: "กีฬา", icon: "⚽" },
  { id: "books", name: "หนังสือ", icon: "📚" },
  { id: "toys", name: "ของเล่น", icon: "🧸" },
  { id: "furniture", name: "เฟอร์นิเจอร์", icon: "🛋️" },
  { id: "pets", name: "สัตว์เลี้ยง", icon: "🐾" },
  { id: "other", name: "อื่นๆ", icon: "📦" },
];

export const mockMarketplaceItems: MarketplaceItem[] = [
  {
    id: "1",
    title: "iPhone 15 Pro Max 256GB สีไทเทเนียมธรรมชาติ",
    description:
      "iPhone 15 Pro Max สภาพใหม่ ใช้งานมา 2 เดือน ยังมีประกันเหลืออีก 10 เดือน มีกล่องและอุปกรณ์ครบ ไม่มีรอยขีดข่วน",
    price: 42900,
    currency: "THB",
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800",
      "https://images.unsplash.com/photo-1695048133082-1c750a019e17?w=800",
    ],
    category: "electronics",
    condition: "like_new",
    location: "กรุงเทพมหานคร",
    seller: {
      id: "u1",
      name: "สมชาย ใจดี",
      avatar: "https://i.pravatar.cc/150?u=seller1",
      rating: 4.8,
      totalReviews: 156,
    },
    createdAt: "2024-01-15",
    views: 1250,
    likes: 89,
    isAvailable: true,
    tags: ["iphone", "apple", "smartphone"],
  },
  {
    id: "2",
    title: "MacBook Pro 14\" M3 Pro (2023) 18GB/512GB",
    description:
      "MacBook Pro 14 นิ้ว ชิป M3 Pro RAM 18GB SSD 512GB สภาพสวยมาก ใช้งานเบาๆ ยังมีประกันศูนย์ไทยถึงเดือน 8/2024",
    price: 75000,
    currency: "THB",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800",
    ],
    category: "electronics",
    condition: "like_new",
    location: "เชียงใหม่",
    seller: {
      id: "u2",
      name: "วิทยา Tech Store",
      avatar: "https://i.pravatar.cc/150?u=seller2",
      rating: 4.9,
      totalReviews: 342,
    },
    createdAt: "2024-01-14",
    views: 2341,
    likes: 234,
    isAvailable: true,
    tags: ["macbook", "apple", "laptop", "m3"],
  },
  {
    id: "3",
    title: "เสื้อยืด Uniqlo UT คอลเล็กชั่นใหม่ Size M",
    description:
      "เสื้อยืด Uniqlo UT ซื้อมาแต่ไม่เคยใส่ ติดแท็กเต็มตัว สภาพใหม่ 100% ไซส์ M พอดีตัว",
    price: 290,
    currency: "THB",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
    ],
    category: "fashion",
    condition: "new",
    location: "นนทบุรี",
    seller: {
      id: "u3",
      name: "แอน Fashion",
      avatar: "https://i.pravatar.cc/150?u=seller3",
      rating: 4.6,
      totalReviews: 89,
    },
    createdAt: "2024-01-13",
    views: 456,
    likes: 23,
    isAvailable: true,
    tags: ["uniqlo", "เสื้อยืด", "fashion"],
  },
  {
    id: "4",
    title: "โต๊ะทำงานไม้โอ๊ค ขนาด 120x60 ซม. พร้อมลิ้นชัก",
    description:
      "โต๊ะทำงานไม้โอ๊คแท้ สภาพดีมาก แข็งแรง ใช้งานมา 1 ปี มีรอยขีดข่วนเล็กน้อยตามการใช้งาน มีลิ้นชัก 2 ช่อง",
    price: 4500,
    currency: "THB",
    images: [
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800",
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800",
    ],
    category: "furniture",
    condition: "used",
    location: "ปทุมธานี",
    seller: {
      id: "u4",
      name: "บ้านและสวน Shop",
      avatar: "https://i.pravatar.cc/150?u=seller4",
      rating: 4.7,
      totalReviews: 78,
    },
    createdAt: "2024-01-12",
    views: 678,
    likes: 45,
    isAvailable: true,
    tags: ["โต๊ะ", "เฟอร์นิเจอร์", "ไม้โอ๊ค"],
  },
  {
    id: "5",
    title: "จักรยานเสือภูเขา Giant Talon 3 ปี 2023",
    description:
      "จักรยานเสือภูเขา Giant Talon 3 ปั่นมาแค่ 3 เดือน สภาพดีมาก ดูแลอย่างดี เคลื่อนตัวว่องไว เหมาะกับการออกกำลังกาย",
    price: 12900,
    currency: "THB",
    images: [
      "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800",
      "https://images.unsplash.com/photo-1571333250630-f0230c320b6d?w=800",
    ],
    category: "sports",
    condition: "like_new",
    location: "ระยอง",
    seller: {
      id: "u5",
      name: "Bike Pro Thailand",
      avatar: "https://i.pravatar.cc/150?u=seller5",
      rating: 4.9,
      totalReviews: 234,
    },
    createdAt: "2024-01-11",
    views: 892,
    likes: 67,
    isAvailable: true,
    tags: ["จักรยาน", "giant", "กีฬา"],
  },
  {
    id: "6",
    title: "Honda City 2020 สีขาว เกียร์ออโต้",
    description:
      "Honda City ปี 2020 สีขาว เกียร์ออโต้ วิ่งมา 45,000 กม. สภาพสวยมาก ไม่เคยชน ประหยัดน้ำมัน เซอร์วิสตรงเวลา",
    price: 485000,
    currency: "THB",
    images: [
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800",
    ],
    category: "vehicles",
    condition: "used",
    location: "สมุทรปราการ",
    seller: {
      id: "u6",
      name: "รถมือสอง Premium",
      avatar: "https://i.pravatar.cc/150?u=seller6",
      rating: 4.8,
      totalReviews: 445,
    },
    createdAt: "2024-01-10",
    views: 3456,
    likes: 189,
    isAvailable: true,
    tags: ["honda", "city", "รถยนต์"],
  },
  {
    id: "7",
    title: "PlayStation 5 พร้อมจอย 2 ตัว และเกม 5 แผ่น",
    description:
      "PS5 สภาพดีมาก ใช้งานปกติ ไม่มีปัญหา มีจอย 2 ตัว เกมแนว Action-Adventure 5 แผ่น ยังมีประกันเหลืออีก 6 เดือน",
    price: 18900,
    currency: "THB",
    images: [
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800",
    ],
    category: "electronics",
    condition: "like_new",
    location: "ขอนแก่น",
    seller: {
      id: "u7",
      name: "Gaming Zone",
      avatar: "https://i.pravatar.cc/150?u=seller7",
      rating: 4.7,
      totalReviews: 167,
    },
    createdAt: "2024-01-09",
    views: 1678,
    likes: 134,
    isAvailable: true,
    tags: ["playstation", "ps5", "gaming"],
  },
  {
    id: "8",
    title: "หนังสือ Harry Potter ฉบับภาษาไทย ครบชุด 7 เล่ม",
    description:
      "Harry Potter ฉบับภาษาไทย ครบชุด 7 เล่ม สภาพดีมาก อ่านแล้วเก็บไว้ ไม่มีรอยขาดหรือเปื้อน ปกสวยครบทุกเล่ม",
    price: 2900,
    currency: "THB",
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800",
    ],
    category: "books",
    condition: "used",
    location: "เชียงราย",
    seller: {
      id: "u8",
      name: "Book Lover",
      avatar: "https://i.pravatar.cc/150?u=seller8",
      rating: 4.9,
      totalReviews: 92,
    },
    createdAt: "2024-01-08",
    views: 567,
    likes: 56,
    isAvailable: true,
    tags: ["harry potter", "books", "หนังสือ"],
  },
  {
    id: "9",
    title: "โซฟา 3 ที่นั่ง หนังแท้ สีน้ำตาล สภาพดี",
    description:
      "โซฟาหนังแท้ 3 ที่นั่ง สีน้ำตาล ใช้งานมา 2 ปี สภาพดีมาก หนังยังนิ่ม ไม่แตกร้าว นั่งสบาย เหมาะกับห้องรับแขก",
    price: 15000,
    currency: "THB",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800",
    ],
    category: "furniture",
    condition: "used",
    location: "สงขลา",
    seller: {
      id: "u9",
      name: "Home Furniture",
      avatar: "https://i.pravatar.cc/150?u=seller9",
      rating: 4.6,
      totalReviews: 123,
    },
    createdAt: "2024-01-07",
    views: 789,
    likes: 67,
    isAvailable: true,
    tags: ["โซฟา", "หนังแท้", "furniture"],
  },
  {
    id: "10",
    title: "ตุ๊กตา LEGO Star Wars Millennium Falcon (ใหม่/มือหนึ่ง)",
    description:
      "LEGO Star Wars Millennium Falcon ใหม่ในกล่อง ยังไม่เคยแกะ ของสะสมสำหรับคนรัก Star Wars ชิ้นงานมีความละเอียดสูง",
    price: 8900,
    currency: "THB",
    images: [
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800",
    ],
    category: "toys",
    condition: "new",
    location: "นครศรีธรรมราช",
    seller: {
      id: "u10",
      name: "LEGO Collector",
      avatar: "https://i.pravatar.cc/150?u=seller10",
      rating: 5.0,
      totalReviews: 67,
    },
    createdAt: "2024-01-06",
    views: 445,
    likes: 78,
    isAvailable: true,
    tags: ["lego", "star wars", "collectible"],
  },
  {
    id: "11",
    title: "Apple Watch Series 9 GPS 41mm สีดำ",
    description:
      "Apple Watch Series 9 GPS 41mm อลูมิเนียม สีดำ ใช้งานมา 1 เดือน สภาพเหมือนใหม่ มีกล่องและสาย Sport Band",
    price: 12900,
    currency: "THB",
    images: [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800",
    ],
    category: "electronics",
    condition: "like_new",
    location: "ภูเก็ต",
    seller: {
      id: "u11",
      name: "Apple Gadget TH",
      avatar: "https://i.pravatar.cc/150?u=seller11",
      rating: 4.8,
      totalReviews: 278,
    },
    createdAt: "2024-01-05",
    views: 1234,
    likes: 98,
    isAvailable: true,
    tags: ["apple watch", "smartwatch", "apple"],
  },
  {
    id: "12",
    title: "กล้อง Canon EOS R6 Mark II Body (ประกันศูนย์)",
    description:
      "Canon EOS R6 Mark II Body เพียงตัวเดียว ยังมีประกันศูนย์ไทยเหลือ 11 เดือน ชัตเตอร์ไม่ถึง 5,000 ครั้ง สภาพสวยมาก",
    price: 89000,
    currency: "THB",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800",
      "https://images.unsplash.com/photo-1606189934846-a527add8a77b?w=800",
    ],
    category: "electronics",
    condition: "like_new",
    location: "กรุงเทพมหานคร",
    seller: {
      id: "u12",
      name: "Camera Pro Shop",
      avatar: "https://i.pravatar.cc/150?u=seller12",
      rating: 4.9,
      totalReviews: 567,
    },
    createdAt: "2024-01-04",
    views: 2890,
    likes: 267,
    isAvailable: true,
    tags: ["canon", "camera", "mirrorless"],
  },
];
