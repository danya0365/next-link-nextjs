/**
 * Mock Posts Data
 * ข้อมูล posts สำหรับ Feed
 */

export interface PostReaction {
  type: "like" | "love" | "haha" | "wow" | "sad" | "angry";
  count: number;
  userReacted: boolean;
}

export interface PostComment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: string;
  likes: number;
  replies?: PostComment[];
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  images?: string[];
  video?: string;
  createdAt: string;
  privacy: "public" | "friends" | "only_me";
  location?: string;
  feeling?: string;
  reactions: PostReaction[];
  totalReactions: number;
  comments: PostComment[];
  totalComments: number;
  shares: number;
}

/**
 * Mock Posts Data
 */
export const mockPosts: Post[] = [
  {
    id: "post-1",
    userId: "user-1",
    userName: "สมชาย ใจดี",
    userAvatar: "https://i.pravatar.cc/150?img=12",
    content:
      "วันนี้ไปเที่ยวทะเลที่ภูเก็ตมา สวยมากๆ อากาศดีสุดๆ แนะนำเลยครับ 🌊☀️ #ภูเก็ต #ทะเล #เที่ยวไทย",
    images: [
      "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5",
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19",
    ],
    createdAt: "2024-01-15T10:30:00Z",
    privacy: "public",
    location: "ภูเก็ต, ประเทศไทย",
    feeling: "รู้สึกมีความสุข",
    reactions: [
      { type: "like", count: 45, userReacted: true },
      { type: "love", count: 23, userReacted: false },
      { type: "wow", count: 8, userReacted: false },
    ],
    totalReactions: 76,
    comments: [
      {
        id: "comment-1",
        userId: "user-2",
        userName: "สมหญิง รักงาน",
        userAvatar: "https://i.pravatar.cc/150?img=5",
        content: "สวยมากเลยค่ะ อยากไปเหมือนกัน",
        createdAt: "2024-01-15T11:00:00Z",
        likes: 5,
      },
      {
        id: "comment-2",
        userId: "user-3",
        userName: "ณัฐพล ชอบเที่ยว",
        userAvatar: "https://i.pravatar.cc/150?img=33",
        content: "เที่ยวที่ไหนครับ แนะนำที่พักหน่อย",
        createdAt: "2024-01-15T11:15:00Z",
        likes: 2,
        replies: [
          {
            id: "comment-2-reply-1",
            userId: "user-1",
            userName: "สมชาย ใจดี",
            userAvatar: "https://i.pravatar.cc/150?img=12",
            content: "พักที่โรงแรมริมหาดครับ วิวสวยมาก",
            createdAt: "2024-01-15T11:30:00Z",
            likes: 3,
          },
        ],
      },
    ],
    totalComments: 2,
    shares: 12,
  },
  {
    id: "post-2",
    userId: "user-2",
    userName: "สมหญิง รักงาน",
    userAvatar: "https://i.pravatar.cc/150?img=5",
    content:
      "วันนี้นักเรียนสอบดีกันมาก ภูมิใจในตัวเด็กๆ มากค่ะ 👩‍🏫📚 ขอบคุณที่ตั้งใจเรียนนะลูก",
    createdAt: "2024-01-15T08:00:00Z",
    privacy: "public",
    reactions: [
      { type: "like", count: 34, userReacted: false },
      { type: "love", count: 56, userReacted: false },
    ],
    totalReactions: 90,
    comments: [
      {
        id: "comment-3",
        userId: "user-4",
        userName: "พิมพ์ชนก สวยงาม",
        userAvatar: "https://i.pravatar.cc/150?img=10",
        content: "ครูที่น่ารักค่ะ",
        createdAt: "2024-01-15T09:00:00Z",
        likes: 8,
      },
    ],
    totalComments: 1,
    shares: 5,
  },
  {
    id: "post-3",
    userId: "user-3",
    userName: "ณัฐพล ชอบเที่ยว",
    userAvatar: "https://i.pravatar.cc/150?img=33",
    content:
      "10 สถานที่ท่องเที่ยวสุดฮิตในประเทศไทยที่ต้องไปสักครั้งในชีวิต! 🇹🇭✈️\n\n1. พระบรมมหาราชวัง\n2. วัดพระแก้ว\n3. ตลาดน้ำดำเนินสะดวก\n4. เกาะพีพี\n5. เชียงใหม่\n\nและอีกมากมาย อ่านเพิ่มเติมที่บล็อก",
    images: [
      "https://images.unsplash.com/photo-1528181304800-259b08848526",
      "https://images.unsplash.com/photo-1551244072-5d12893278ab",
    ],
    createdAt: "2024-01-14T15:00:00Z",
    privacy: "public",
    location: "ประเทศไทย",
    reactions: [
      { type: "like", count: 156, userReacted: false },
      { type: "love", count: 89, userReacted: false },
      { type: "wow", count: 23, userReacted: false },
    ],
    totalReactions: 268,
    comments: [
      {
        id: "comment-4",
        userId: "user-1",
        userName: "สมชาย ใจดี",
        userAvatar: "https://i.pravatar.cc/150?img=12",
        content: "บันทึกไว้เลย ขอบคุณครับ",
        createdAt: "2024-01-14T16:00:00Z",
        likes: 12,
      },
      {
        id: "comment-5",
        userId: "user-4",
        userName: "พิมพ์ชนก สวยงาม",
        userAvatar: "https://i.pravatar.cc/150?img=10",
        content: "เก็บไว้ไปเที่ยวกับเพื่อนๆ ค่ะ",
        createdAt: "2024-01-14T17:00:00Z",
        likes: 7,
      },
    ],
    totalComments: 2,
    shares: 45,
  },
  {
    id: "post-4",
    userId: "user-4",
    userName: "พิมพ์ชนก สวยงาม",
    userAvatar: "https://i.pravatar.cc/150?img=10",
    content:
      "OOTD วันนี้ 💃✨ กระโปรงสีชมพูใหม่จาก Zara ชอบมากค่ะ #fashion #ootd #style",
    images: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f"],
    createdAt: "2024-01-14T12:00:00Z",
    privacy: "public",
    feeling: "รู้สึกสวยงาม",
    reactions: [
      { type: "like", count: 234, userReacted: false },
      { type: "love", count: 156, userReacted: false },
    ],
    totalReactions: 390,
    comments: [
      {
        id: "comment-6",
        userId: "user-2",
        userName: "สมหญิง รักงาน",
        userAvatar: "https://i.pravatar.cc/150?img=5",
        content: "สวยมากค่ะ ชุดเข้ากันสุดๆ",
        createdAt: "2024-01-14T13:00:00Z",
        likes: 15,
      },
    ],
    totalComments: 1,
    shares: 8,
  },
  {
    id: "post-5",
    userId: "user-1",
    userName: "สมชาย ใจดี",
    userAvatar: "https://i.pravatar.cc/150?img=12",
    content:
      "เปิดธุรกิจใหม่แล้วครับ! ร้านอาหารไทยแท้ๆ ในย่านสุขุมวิท มาลองชิมกันนะครับ 🍜🍛 เปิด 10:00-22:00 น. ทุกวัน\n\nเมนูแนะนำ:\n- ต้มยำกุ้ง\n- ผัดไทย\n- ส้มตำ\n- แกงเขียวหวาน",
    images: [
      "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4",
      "https://images.unsplash.com/photo-1559847844-5315695dadae",
      "https://images.unsplash.com/photo-1545247181-516773cae754",
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624",
    ],
    createdAt: "2024-01-13T10:00:00Z",
    privacy: "public",
    location: "สุขุมวิท, กรุงเทพฯ",
    feeling: "รู้สึกตื่นเต้น",
    reactions: [
      { type: "like", count: 89, userReacted: false },
      { type: "love", count: 45, userReacted: false },
      { type: "wow", count: 12, userReacted: false },
    ],
    totalReactions: 146,
    comments: [
      {
        id: "comment-7",
        userId: "user-3",
        userName: "ณัฐพล ชอบเที่ยว",
        userAvatar: "https://i.pravatar.cc/150?img=33",
        content: "ขอบคุณที่แชร์ครับ จะแวะไปชิมแน่นอน",
        createdAt: "2024-01-13T11:00:00Z",
        likes: 6,
      },
      {
        id: "comment-8",
        userId: "user-4",
        userName: "พิมพ์ชนก สวยงาม",
        userAvatar: "https://i.pravatar.cc/150?img=10",
        content: "ดูอร่อยมากเลยค่ะ",
        createdAt: "2024-01-13T12:00:00Z",
        likes: 4,
      },
    ],
    totalComments: 2,
    shares: 23,
  },
  {
    id: "post-6",
    userId: "user-2",
    userName: "สมหญิง รักงาน",
    userAvatar: "https://i.pravatar.cc/150?img=5",
    content: "อรุณสวัสดิ์ ☀️ วันนี้เป็นวันดีๆ ทุกคนขอให้มีความสุขนะคะ 😊",
    createdAt: "2024-01-13T06:00:00Z",
    privacy: "public",
    reactions: [
      { type: "like", count: 67, userReacted: false },
      { type: "love", count: 34, userReacted: false },
    ],
    totalReactions: 101,
    comments: [],
    totalComments: 0,
    shares: 3,
  },
  {
    id: "post-7",
    userId: "user-3",
    userName: "ณัฐพล ชอบเที่ยว",
    userAvatar: "https://i.pravatar.cc/150?img=33",
    content:
      "เคล็ดลับการถ่ายรูปท่องเที่ยวให้ได้ภาพสวยๆ 📸\n\n1. หาองค์ประกอบที่น่าสนใจ\n2. ใช้ Golden Hour (พระอาทิตย์ขึ้น/ตก)\n3. เปลี่ยนมุมมองบ้าง\n4. รอช่วงเวลาที่เหมาะสม\n5. แก้ไขภาพให้สวยงาม\n\nลองนำไปปรับใช้ดูนะครับ!",
    createdAt: "2024-01-12T14:00:00Z",
    privacy: "public",
    reactions: [
      { type: "like", count: 123, userReacted: false },
      { type: "love", count: 45, userReacted: false },
    ],
    totalReactions: 168,
    comments: [
      {
        id: "comment-9",
        userId: "user-1",
        userName: "สมชาย ใจดี",
        userAvatar: "https://i.pravatar.cc/150?img=12",
        content: "ขอบคุณครับ เป็นประโยชน์มาก",
        createdAt: "2024-01-12T15:00:00Z",
        likes: 8,
      },
    ],
    totalComments: 1,
    shares: 34,
  },
  {
    id: "post-8",
    userId: "user-4",
    userName: "พิมพ์ชนก สวยงาม",
    userAvatar: "https://i.pravatar.cc/150?img=10",
    content:
      "เรียนจบแล้วค่ะ! 🎓🎉 ขอบคุณทุกคนที่คอยเป็นกำลังใจ ตอนนี้พร้อมก้าวสู่โลกการทำงานแล้ว #graduation #kasetsartuniversity",
    images: [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f",
    ],
    createdAt: "2024-01-12T10:00:00Z",
    privacy: "public",
    location: "มหาวิทยาลัยเกษตรศาสตร์",
    feeling: "รู้สึกภูมิใจ",
    reactions: [
      { type: "like", count: 456, userReacted: false },
      { type: "love", count: 234, userReacted: false },
      { type: "wow", count: 45, userReacted: false },
    ],
    totalReactions: 735,
    comments: [
      {
        id: "comment-10",
        userId: "user-1",
        userName: "สมชาย ใจดี",
        userAvatar: "https://i.pravatar.cc/150?img=12",
        content: "ยินดีด้วยครับ สู้ๆ",
        createdAt: "2024-01-12T11:00:00Z",
        likes: 12,
      },
      {
        id: "comment-11",
        userId: "user-2",
        userName: "สมหญิง รักงาน",
        userAvatar: "https://i.pravatar.cc/150?img=5",
        content: "ยินดีด้วยค่ะ ขอให้ประสบความสำเร็จในหน้าที่การงาน",
        createdAt: "2024-01-12T11:30:00Z",
        likes: 9,
      },
      {
        id: "comment-12",
        userId: "user-3",
        userName: "ณัฐพล ชอบเที่ยว",
        userAvatar: "https://i.pravatar.cc/150?img=33",
        content: "Congrats! 🎉",
        createdAt: "2024-01-12T12:00:00Z",
        likes: 5,
      },
    ],
    totalComments: 3,
    shares: 67,
  },
];
