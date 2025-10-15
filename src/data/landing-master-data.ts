/**
 * Master Data for Landing Page
 * ข้อมูลหลักสำหรับหน้า Landing Page
 */

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface Statistic {
  id: string;
  value: string;
  label: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  role: string;
  content: string;
  rating: number;
}

export interface HowItWorksStep {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: string;
}

/**
 * ฟีเจอร์หลักของแพลตฟอร์ม
 */
export const features: Feature[] = [
  {
    id: "feature-1",
    icon: "👥",
    title: "เชื่อมต่อกับเพื่อนและครอบครัว",
    description:
      "ค้นหาและเชื่อมต่อกับเพื่อนเก่า เพื่อนใหม่ และคนที่คุณรัก ไม่ว่าจะอยู่ที่ไหนก็ตาม",
  },
  {
    id: "feature-2",
    icon: "📸",
    title: "แชร์ช่วงเวลาสำคัญ",
    description:
      "แชร์รูปภาพ วิดีโอ และเรื่องราวที่น่าประทับใจกับคนที่คุณสนใจ",
  },
  {
    id: "feature-3",
    icon: "💬",
    title: "แชทและส่งข้อความ",
    description:
      "สนทนากับเพื่อนผ่านระบบแชทที่รวดเร็วและปลอดภัย รองรับทั้งข้อความ รูปภาพ และวิดีโอ",
  },
  {
    id: "feature-4",
    icon: "👍",
    title: "แสดงความรู้สึก",
    description:
      "แสดงปฏิกิริยาที่หลากหลายต่อโพสต์ของเพื่อน Like, Love, Haha และอื่นๆ",
  },
  {
    id: "feature-5",
    icon: "🎉",
    title: "สร้างและเข้าร่วมกลุ่ม",
    description:
      "เข้าร่วมกลุ่มที่สนใจ หรือสร้างกลุ่มของคุณเองเพื่อแชร์ความสนใจร่วมกัน",
  },
  {
    id: "feature-6",
    icon: "🔒",
    title: "ความเป็นส่วนตัวและความปลอดภัย",
    description:
      "ควบคุมได้ว่าใครจะเห็นโพสต์ของคุณ พร้อมระบบรักษาความปลอดภัยที่แข็งแกร่ง",
  },
  {
    id: "feature-7",
    icon: "📺",
    title: "ดูและสร้างวิดีโอ",
    description:
      "เพลิดเพลินกับวิดีโอจากผู้สร้างคอนเทนต์ หรือสร้างวิดีโอของคุณเอง",
  },
  {
    id: "feature-8",
    icon: "🛍️",
    title: "ซื้อขายในตลาด",
    description:
      "ค้นหาสินค้าที่คุณต้องการ หรือขายของที่ไม่ได้ใช้ในชุมชนท้องถิ่น",
  },
];

/**
 * สถิติของแพลตฟอร์ม
 */
export const statistics: Statistic[] = [
  {
    id: "stat-1",
    value: "2.5M+",
    label: "ผู้ใช้งาน",
    icon: "👥",
  },
  {
    id: "stat-2",
    value: "10M+",
    label: "โพสต์ต่อวัน",
    icon: "📝",
  },
  {
    id: "stat-3",
    value: "50M+",
    label: "ข้อความต่อวัน",
    icon: "💬",
  },
  {
    id: "stat-4",
    value: "100K+",
    label: "กลุ่มและชุมชน",
    icon: "🎉",
  },
];

/**
 * รีวิวจากผู้ใช้งาน
 */
export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    name: "สมชาย ใจดี",
    avatar: "https://i.pravatar.cc/150?img=12",
    role: "เจ้าของธุรกิจ",
    content:
      "Next Link ช่วยให้ผมเชื่อมต่อกับลูกค้าได้ง่ายขึ้น และยังสามารถโปรโมทสินค้าผ่านเพจได้อีกด้วย ดีมากครับ!",
    rating: 5,
  },
  {
    id: "testimonial-2",
    name: "สมหญิง รักงาน",
    avatar: "https://i.pravatar.cc/150?img=5",
    role: "ครูประจำการ",
    content:
      "ใช้งานง่าย ติดต่อเพื่อนๆ ได้สะดวก แชร์ภาพกิจกรรมนักเรียนกับผู้ปกครองได้ง่ายๆ ชอบมากค่ะ",
    rating: 5,
  },
  {
    id: "testimonial-3",
    name: "ณัฐพล ชอบเที่ยว",
    avatar: "https://i.pravatar.cc/150?img=33",
    role: "Travel Blogger",
    content:
      "แชร์ประสบการณ์การเดินทางได้อย่างมีสีสัน ระบบอัลบั้มรูปก็ใช้งานง่าย เหมาะสำหรับคนชอบเที่ยวเหมือนผมครับ",
    rating: 5,
  },
  {
    id: "testimonial-4",
    name: "พิมพ์ชนก สวยงาม",
    avatar: "https://i.pravatar.cc/150?img=10",
    role: "นักศึกษา",
    content:
      "ใช้แชทกับเพื่อนๆ ในกลุ่มเรียน ได้สะดวกมาก ยังมีกลุ่มชุมชนที่น่าสนใจเยอะด้วย ชอบมากค่ะ!",
    rating: 5,
  },
];

/**
 * ขั้นตอนการใช้งาน
 */
export const howItWorksSteps: HowItWorksStep[] = [
  {
    id: "step-1",
    step: 1,
    title: "สมัครสมาชิก",
    description: "สร้างบัญชีฟรีภายในไม่กี่นาที ง่ายและรวดเร็ว",
    icon: "📝",
  },
  {
    id: "step-2",
    step: 2,
    title: "ตั้งค่าโปรไฟล์",
    description: "เพิ่มรูปโปรไฟล์ ข้อมูลส่วนตัว และความสนใจของคุณ",
    icon: "👤",
  },
  {
    id: "step-3",
    step: 3,
    title: "เชื่อมต่อกับเพื่อน",
    description: "ค้นหาและเพิ่มเพื่อนเก่า เพื่อนใหม่ และคนที่คุณสนใจ",
    icon: "🤝",
  },
  {
    id: "step-4",
    step: 4,
    title: "เริ่มแชร์และสนุก",
    description: "แชร์ช่วงเวลาสำคัญ แชทกับเพื่อน และสร้างความทรงจำร่วมกัน",
    icon: "🎉",
  },
];
