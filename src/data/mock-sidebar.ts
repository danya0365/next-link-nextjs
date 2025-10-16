import { User } from "@/src/presentation/stores/authStore.types";

// Mock data for friend requests
export const friendRequests = [
  {
    id: 'user-4',
    name: 'วิศวกร ใจดี',
    avatar: 'https://i.pravatar.cc/150?img=15',
    mutualFriends: 12,
    timestamp: '2 ชั่วโมงที่แล้ว'
  },
  {
    id: 'user-5',
    name: 'นักเขียน สุดเจ๋ง',
    avatar: 'https://i.pravatar.cc/150?img=25',
    mutualFriends: 5,
    timestamp: '5 ชั่วโมงที่แล้ว'
  }
];

// Mock data for suggested groups
export const suggestedGroups = [
  {
    id: 'group-1',
    name: 'คนรักการเดินทาง',
    avatar: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=200&q=80',
    members: 1245,
    category: 'การเดินทางและกิจกรรม'
  },
  {
    id: 'group-2',
    name: 'อาหารไทยอร่อยทั่วไทย',
    avatar: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&q=80',
    members: 8756,
    category: 'อาหารและเครื่องดื่ม'
  }
];

// Mock data for upcoming events
export const upcomingEvents = [
  {
    id: 'event-1',
    title: 'งานเลี้ยงสังสรรค์ประจำปี',
    date: '15 ต.ค. 2566',
    time: '18:00 น.',
    location: 'ร้านอาหารริมน้ำ',
    attendees: 24,
    coverPhoto: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=400&q=80'
  },
  {
    id: 'event-2',
    title: 'สัมมนาออนไลน์ 2023',
    date: '20 ต.ค. 2566',
    time: '13:00 น.',
    location: 'ออนไลน์',
    attendees: 156,
    coverPhoto: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&q=80'
  }
];

// Mock data for sponsored content
export const sponsoredContent = [
  {
    id: 'sponsored-1',
    title: 'โปรโมชั่นพิเศษ!',
    description: 'ส่วนลด 50% สำหรับลูกค้าใหม่',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&q=80',
    link: '#',
    sponsor: 'ร้านอาหารไทย'
  }
];

// Mock data for contacts
export const getOnlineContacts = (users: User[], currentUserId?: string) => {
  return users
    .filter(user => user.id !== currentUserId)
    .slice(0, 5)
    .map(user => ({
      ...user,
      isOnline: Math.random() > 0.3, // 70% chance of being online
      lastSeen: 'เมื่อสักครู่',
      status: 'ออนไลน์'
    }));
};
