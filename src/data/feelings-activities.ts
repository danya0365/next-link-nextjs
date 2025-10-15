/**
 * Feelings and Activities Data
 * ข้อมูล Feeling และ Activity สำหรับโพสต์
 */

export interface FeelingActivity {
  id: string;
  label: string;
  emoji: string;
  category: "feeling" | "activity";
}

/**
 * Feelings List
 */
export const feelings: FeelingActivity[] = [
  { id: "happy", label: "มีความสุข", emoji: "😊", category: "feeling" },
  { id: "blessed", label: "รู้สึกได้รับพร", emoji: "🙏", category: "feeling" },
  { id: "loved", label: "รู้สึกได้รับความรัก", emoji: "🥰", category: "feeling" },
  { id: "excited", label: "ตื่นเต้น", emoji: "🤩", category: "feeling" },
  { id: "grateful", label: "รู้สึกขอบคุณ", emoji: "😌", category: "feeling" },
  { id: "crazy", label: "บ้าๆ", emoji: "🤪", category: "feeling" },
  { id: "fantastic", label: "ยอดเยี่ยม", emoji: "✨", category: "feeling" },
  { id: "lovely", label: "น่ารัก", emoji: "😍", category: "feeling" },
  { id: "cool", label: "เท่", emoji: "😎", category: "feeling" },
  { id: "proud", label: "ภูมิใจ", emoji: "😤", category: "feeling" },
  { id: "sad", label: "เศร้า", emoji: "😢", category: "feeling" },
  { id: "tired", label: "เหนื่อย", emoji: "😫", category: "feeling" },
  { id: "sick", label: "ป่วย", emoji: "🤒", category: "feeling" },
  { id: "bored", label: "เบื่อ", emoji: "😑", category: "feeling" },
  { id: "angry", label: "โกรธ", emoji: "😠", category: "feeling" },
  { id: "confused", label: "สับสน", emoji: "😕", category: "feeling" },
];

/**
 * Activities List
 */
export const activities: FeelingActivity[] = [
  { id: "eating", label: "กำลังกิน", emoji: "🍽️", category: "activity" },
  { id: "drinking", label: "กำลังดื่ม", emoji: "🥤", category: "activity" },
  { id: "cooking", label: "กำลังทำอาหาร", emoji: "👨‍🍳", category: "activity" },
  { id: "traveling", label: "กำลังเดินทาง", emoji: "✈️", category: "activity" },
  { id: "watching", label: "กำลังดู", emoji: "📺", category: "activity" },
  { id: "reading", label: "กำลังอ่าน", emoji: "📚", category: "activity" },
  { id: "listening", label: "กำลังฟัง", emoji: "🎧", category: "activity" },
  { id: "playing", label: "กำลังเล่น", emoji: "🎮", category: "activity" },
  { id: "working", label: "กำลังทำงาน", emoji: "💼", category: "activity" },
  { id: "studying", label: "กำลังเรียน", emoji: "📖", category: "activity" },
  { id: "exercising", label: "กำลังออกกำลังกาย", emoji: "🏃", category: "activity" },
  { id: "shopping", label: "กำลังช้อปปิ้ง", emoji: "🛍️", category: "activity" },
  { id: "celebrating", label: "กำลังเฉลิมฉลอง", emoji: "🎉", category: "activity" },
  { id: "sleeping", label: "กำลังนอน", emoji: "😴", category: "activity" },
  { id: "relaxing", label: "กำลังพักผ่อน", emoji: "🧘", category: "activity" },
  { id: "meeting", label: "กำลังประชุม", emoji: "👥", category: "activity" },
];

/**
 * Get feeling/activity by ID
 */
export function getFeelingActivity(id: string): FeelingActivity | undefined {
  return [...feelings, ...activities].find((item) => item.id === id);
}
