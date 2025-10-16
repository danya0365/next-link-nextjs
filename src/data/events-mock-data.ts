/**
 * Mock Data for Events
 * ข้อมูล Mock สำหรับหน้า Events
 */

export interface Event {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  startDate: string;
  endDate: string;
  location: {
    type: "online" | "physical";
    name: string;
    address?: string;
    url?: string;
  };
  category: string;
  organizer: {
    id: string;
    name: string;
    avatar: string;
    type: "user" | "page" | "group";
  };
  attendees: {
    going: number;
    maybe: number;
    notGoing: number;
  };
  userRsvp: "going" | "maybe" | "not_going" | null;
  price: {
    amount: number;
    currency: string;
    isFree: boolean;
  };
  tags: string[];
  isOnline: boolean;
  createdAt: string;
}

export const eventCategories = [
  { id: "all", name: "ทั้งหมด", icon: "🎉" },
  { id: "your-events", name: "อีเว้นท์ของคุณ", icon: "⭐" },
  { id: "online", name: "ออนไลน์", icon: "💻" },
  { id: "today", name: "วันนี้", icon: "📅" },
  { id: "this-week", name: "สัปดาห์นี้", icon: "📆" },
  { id: "music", name: "ดนตรี", icon: "🎵" },
  { id: "workshop", name: "เวิร์คช็อป", icon: "🎓" },
  { id: "sports", name: "กีฬา", icon: "⚽" },
  { id: "networking", name: "Networking", icon: "🤝" },
  { id: "food", name: "อาหาร", icon: "🍔" },
  { id: "art", name: "ศิลปะ", icon: "🎨" },
  { id: "technology", name: "เทคโนโลยี", icon: "💡" },
];

export const mockEvents: Event[] = [
  {
    id: "1",
    name: "React & Next.js Meetup Bangkok #12",
    description:
      "มาพบปะพูดคุยแลกเปลี่ยนความรู้เกี่ยวกับ React และ Next.js กับเหล่า Developers ชาว Bangkok! งานนี้จะมีการแชร์ประสบการณ์การใช้งาน Next.js 15, Server Components, และ App Router พร้อมกับ Live Coding และ Q&A",
    coverImage:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200",
    startDate: "2024-01-25T18:00:00",
    endDate: "2024-01-25T21:00:00",
    location: {
      type: "physical",
      name: "True Digital Park",
      address: "101 ถนนสุขุมวิท แขวงบางนา เขตบางนา กรุงเทพมหานคร 10260",
    },
    category: "technology",
    organizer: {
      id: "org1",
      name: "React Thailand Community",
      avatar: "https://i.pravatar.cc/150?u=org1",
      type: "group",
    },
    attendees: {
      going: 234,
      maybe: 56,
      notGoing: 12,
    },
    userRsvp: "going",
    price: {
      amount: 0,
      currency: "THB",
      isFree: true,
    },
    tags: ["react", "nextjs", "javascript", "web development"],
    isOnline: false,
    createdAt: "2024-01-10",
  },
  {
    id: "2",
    name: "Online Photography Workshop - Portrait Lighting",
    description:
      "เรียนรู้เทคนิคการจัดแสงสำหรับการถ่ายภาพ Portrait แบบ Professional พร้อม Live Demo และ Q&A กับช่างภาพมืออาชีพ เหมาะสำหรับทั้งมือใหม่และมือโปร",
    coverImage:
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1200",
    startDate: "2024-01-20T19:00:00",
    endDate: "2024-01-20T21:00:00",
    location: {
      type: "online",
      name: "Zoom Webinar",
      url: "https://zoom.us/j/example",
    },
    category: "workshop",
    organizer: {
      id: "org2",
      name: "Photography Masterclass TH",
      avatar: "https://i.pravatar.cc/150?u=org2",
      type: "page",
    },
    attendees: {
      going: 456,
      maybe: 123,
      notGoing: 23,
    },
    userRsvp: "going",
    price: {
      amount: 299,
      currency: "THB",
      isFree: false,
    },
    tags: ["photography", "workshop", "portrait", "lighting"],
    isOnline: true,
    createdAt: "2024-01-05",
  },
  {
    id: "3",
    name: "Bangkok Marathon 2024",
    description:
      "มาร่วมวิ่งมาราธอนครั้งยิ่งใหญ่ของกรุงเทพฯ! มีระยะทาง Full Marathon (42.195 km), Half Marathon (21 km), Mini Marathon (10 km) และ Fun Run (5 km) เลือกระยะทางที่เหมาะกับคุณได้เลย!",
    coverImage:
      "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=1200",
    startDate: "2024-02-15T05:00:00",
    endDate: "2024-02-15T12:00:00",
    location: {
      type: "physical",
      name: "ลานพระบรมรูปทรงม้า",
      address: "ถนนราชดำเนินนอก เขตพระนคร กรุงเทพมหานคร",
    },
    category: "sports",
    organizer: {
      id: "org3",
      name: "Bangkok Marathon Organization",
      avatar: "https://i.pravatar.cc/150?u=org3",
      type: "page",
    },
    attendees: {
      going: 15000,
      maybe: 3400,
      notGoing: 567,
    },
    userRsvp: null,
    price: {
      amount: 1200,
      currency: "THB",
      isFree: false,
    },
    tags: ["marathon", "running", "sports", "fitness"],
    isOnline: false,
    createdAt: "2023-12-01",
  },
  {
    id: "4",
    name: "Jazz Night at The Living Room",
    description:
      "เพลิดเพลินกับดนตรี Jazz Live สุดชิลล์ในบรรยากาศสุดพิเศษ พร้อมเครื่องดื่มและอาหารว่างอร่อยๆ มีที่นั่งจำกัด จองด่วน!",
    coverImage:
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1200",
    startDate: "2024-01-26T19:30:00",
    endDate: "2024-01-26T23:00:00",
    location: {
      type: "physical",
      name: "The Living Room Jazz Club",
      address: "Sheraton Grande Sukhumvit, Bangkok",
    },
    category: "music",
    organizer: {
      id: "org4",
      name: "Jazz Lovers Thailand",
      avatar: "https://i.pravatar.cc/150?u=org4",
      type: "group",
    },
    attendees: {
      going: 89,
      maybe: 34,
      notGoing: 5,
    },
    userRsvp: "maybe",
    price: {
      amount: 800,
      currency: "THB",
      isFree: false,
    },
    tags: ["jazz", "music", "concert", "nightlife"],
    isOnline: false,
    createdAt: "2024-01-08",
  },
  {
    id: "5",
    name: "Startup Networking Night",
    description:
      "พบปะผู้ประกอบการ นักลงทุน และคนในวงการสตาร์ทอัพ แลกเปลี่ยนไอเดีย สร้างเครือข่าย และหาพาร์ทเนอร์ธุรกิจ มีของว่างและเครื่องดื่มฟรี!",
    coverImage:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200",
    startDate: "2024-01-30T18:00:00",
    endDate: "2024-01-30T21:00:00",
    location: {
      type: "physical",
      name: "HUBBA Coworking Space",
      address: "ถนนเพชรบุรีตัดใหม่ เขตราชเทวี กรุงเทพมหานคร",
    },
    category: "networking",
    organizer: {
      id: "org5",
      name: "Thailand Startup Community",
      avatar: "https://i.pravatar.cc/150?u=org5",
      type: "group",
    },
    attendees: {
      going: 167,
      maybe: 89,
      notGoing: 23,
    },
    userRsvp: null,
    price: {
      amount: 0,
      currency: "THB",
      isFree: true,
    },
    tags: ["startup", "networking", "business", "entrepreneur"],
    isOnline: false,
    createdAt: "2024-01-12",
  },
  {
    id: "6",
    name: "Street Food Festival 2024",
    description:
      "มหกรรมอาหารริมทางระดับประเทศ! รวมร้านอาหารดังกว่า 200 ร้าน อาหารนานาชาติ และของหวานอร่อยๆ มากมาย พร้อมบรรยากาศสุดชิลล์และดนตรี Live",
    coverImage:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200",
    startDate: "2024-02-10T16:00:00",
    endDate: "2024-02-11T22:00:00",
    location: {
      type: "physical",
      name: "CentralWorld Square",
      address: "ถนนราชดำริ เขตปทุมวัน กรุงเทพมหานคร",
    },
    category: "food",
    organizer: {
      id: "org6",
      name: "Food Lovers Thailand",
      avatar: "https://i.pravatar.cc/150?u=org6",
      type: "page",
    },
    attendees: {
      going: 5678,
      maybe: 2345,
      notGoing: 123,
    },
    userRsvp: "going",
    price: {
      amount: 0,
      currency: "THB",
      isFree: true,
    },
    tags: ["food", "festival", "street food", "bangkok"],
    isOnline: false,
    createdAt: "2024-01-01",
  },
  {
    id: "7",
    name: "Digital Art Workshop - Procreate Masterclass",
    description:
      "เรียนรู้การวาดภาพดิจิทัลด้วย Procreate แบบเจาะลึก! ตั้งแต่พื้นฐานจนถึงเทคนิคขั้นสูง พร้อม Live Demo และแบบฝึกหัด เหมาะสำหรับทุกระดับ",
    coverImage:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200",
    startDate: "2024-01-28T10:00:00",
    endDate: "2024-01-28T16:00:00",
    location: {
      type: "online",
      name: "Google Meet",
      url: "https://meet.google.com/example",
    },
    category: "art",
    organizer: {
      id: "org7",
      name: "Digital Artists Thailand",
      avatar: "https://i.pravatar.cc/150?u=org7",
      type: "group",
    },
    attendees: {
      going: 234,
      maybe: 67,
      notGoing: 12,
    },
    userRsvp: null,
    price: {
      amount: 1500,
      currency: "THB",
      isFree: false,
    },
    tags: ["digital art", "procreate", "illustration", "workshop"],
    isOnline: true,
    createdAt: "2024-01-06",
  },
  {
    id: "8",
    name: "AI & Machine Learning Conference 2024",
    description:
      "การประชุมระดับชาติเกี่ยวกับ AI และ Machine Learning พร้อมวิทยากรชั้นนำจากทั่วเอเชีย หัวข้อครอบคลุม Deep Learning, NLP, Computer Vision และอื่นๆ อีกมากมาย",
    coverImage:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200",
    startDate: "2024-03-15T09:00:00",
    endDate: "2024-03-16T18:00:00",
    location: {
      type: "physical",
      name: "Queen Sirikit National Convention Center",
      address: "ถนนรัชดาภิเษก เขตคลองเตย กรุงเทพมหานคร",
    },
    category: "technology",
    organizer: {
      id: "org8",
      name: "AI Thailand Association",
      avatar: "https://i.pravatar.cc/150?u=org8",
      type: "page",
    },
    attendees: {
      going: 1234,
      maybe: 456,
      notGoing: 78,
    },
    userRsvp: null,
    price: {
      amount: 3500,
      currency: "THB",
      isFree: false,
    },
    tags: ["ai", "machine learning", "technology", "conference"],
    isOnline: false,
    createdAt: "2023-12-15",
  },
  {
    id: "9",
    name: "Yoga & Meditation Retreat",
    description:
      "พักผ่อนจิตใจและออกกำลังกายกับคอร์สโยคะและสมาธิ 3 วัน 2 คืน ในบรรยากาศสงบท่ามกลางธรรมชาติ พร้อมอาหารเพื่อสุขภาพและกิจกรรมผ่อนคลาย",
    coverImage:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200",
    startDate: "2024-02-23T14:00:00",
    endDate: "2024-02-25T12:00:00",
    location: {
      type: "physical",
      name: "Chiang Mai Yoga Resort",
      address: "ตำบลหนองหาร อำเภอสันทราย จังหวัดเชียงใหม่",
    },
    category: "sports",
    organizer: {
      id: "org9",
      name: "Wellness Thailand",
      avatar: "https://i.pravatar.cc/150?u=org9",
      type: "page",
    },
    attendees: {
      going: 45,
      maybe: 23,
      notGoing: 5,
    },
    userRsvp: "maybe",
    price: {
      amount: 8900,
      currency: "THB",
      isFree: false,
    },
    tags: ["yoga", "meditation", "wellness", "retreat"],
    isOnline: false,
    createdAt: "2024-01-03",
  },
  {
    id: "10",
    name: "Web3 & Blockchain Meetup",
    description:
      "พูดคุยเกี่ยวกับอนาคตของ Web3, Blockchain, NFT และ Cryptocurrency พร้อมแชร์ประสบการณ์จากผู้เชี่ยวชาญในวงการ เหมาะสำหรับทั้งมือใหม่และมืออาชีพ",
    coverImage:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200",
    startDate: "2024-01-24T18:30:00",
    endDate: "2024-01-24T21:00:00",
    location: {
      type: "online",
      name: "Discord Server",
      url: "https://discord.gg/example",
    },
    category: "technology",
    organizer: {
      id: "org10",
      name: "Web3 Thailand Community",
      avatar: "https://i.pravatar.cc/150?u=org10",
      type: "group",
    },
    attendees: {
      going: 567,
      maybe: 234,
      notGoing: 45,
    },
    userRsvp: null,
    price: {
      amount: 0,
      currency: "THB",
      isFree: true,
    },
    tags: ["web3", "blockchain", "cryptocurrency", "nft"],
    isOnline: true,
    createdAt: "2024-01-09",
  },
];
