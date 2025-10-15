/**
 * Mock Profile Data
 * ข้อมูลโปรไฟล์เพิ่มเติมสำหรับหน้า Profile
 */

export interface ProfileAbout {
  work?: {
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
  }[];
  education?: {
    school: string;
    degree?: string;
    field?: string;
    graduationYear?: string;
  }[];
  placesLived?: {
    city: string;
    type: "current" | "hometown";
  }[];
  contactInfo?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  basicInfo?: {
    birthday?: string;
    gender?: string;
    relationshipStatus?: string;
  };
}

export interface ProfilePhoto {
  id: string;
  url: string;
  createdAt: string;
}

export interface ProfileFriend {
  id: string;
  name: string;
  avatar: string;
  mutualFriends: number;
}

/**
 * Mock About Data
 */
export const mockAboutData: Record<string, ProfileAbout> = {
  "user-1": {
    work: [
      {
        company: "บริษัท ABC จำกัด",
        position: "เจ้าของธุรกิจ",
        startDate: "2020-01-01",
      },
    ],
    education: [
      {
        school: "มหาวิทยาลัยธรรมศาสตร์",
        degree: "ปริญญาตรี",
        field: "บริหารธุรกิจ",
        graduationYear: "2012",
      },
    ],
    placesLived: [
      { city: "กรุงเทพมหานคร", type: "current" },
      { city: "เชียงใหม่", type: "hometown" },
    ],
    contactInfo: {
      phone: "089-123-4567",
      email: "somchai@email.com",
      website: "https://somchai-blog.com",
    },
    basicInfo: {
      birthday: "15 พฤษภาคม 1990",
      gender: "ชาย",
      relationshipStatus: "โสด",
    },
  },
  "user-2": {
    work: [
      {
        company: "โรงเรียนเทศบาล 1",
        position: "ครูประจำการ",
        startDate: "2010-05-01",
      },
    ],
    education: [
      {
        school: "มหาวิทยาลัยเชียงใหม่",
        degree: "ปริญญาตรี",
        field: "ครุศาสตร์",
        graduationYear: "2008",
      },
    ],
    placesLived: [{ city: "เชียงใหม่", type: "current" }],
    contactInfo: {
      email: "somying@email.com",
    },
    basicInfo: {
      birthday: "20 สิงหาคม 1985",
      gender: "หญิง",
      relationshipStatus: "สมรส",
    },
  },
};

/**
 * Mock Photos Data
 */
export const mockPhotosData: Record<string, ProfilePhoto[]> = {
  "user-1": [
    {
      id: "photo-1",
      url: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5",
      createdAt: "2024-01-15T10:30:00Z",
    },
    {
      id: "photo-2",
      url: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a",
      createdAt: "2024-01-15T10:31:00Z",
    },
    {
      id: "photo-3",
      url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19",
      createdAt: "2024-01-15T10:32:00Z",
    },
    {
      id: "photo-4",
      url: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4",
      createdAt: "2024-01-13T10:00:00Z",
    },
    {
      id: "photo-5",
      url: "https://images.unsplash.com/photo-1559847844-5315695dadae",
      createdAt: "2024-01-13T10:01:00Z",
    },
    {
      id: "photo-6",
      url: "https://images.unsplash.com/photo-1545247181-516773cae754",
      createdAt: "2024-01-13T10:02:00Z",
    },
  ],
  "user-2": [
    {
      id: "photo-7",
      url: "https://images.unsplash.com/photo-1511367461989-f85a21fda167",
      createdAt: "2024-01-15T08:30:00Z",
    },
    {
      id: "photo-8",
      url: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
      createdAt: "2024-01-14T12:00:00Z",
    },
  ],
};

/**
 * Mock Friends Data
 */
export const mockFriendsData: Record<string, ProfileFriend[]> = {
  "user-1": [
    {
      id: "user-2",
      name: "สมหญิง รักงาน",
      avatar: "https://i.pravatar.cc/150?img=5",
      mutualFriends: 12,
    },
    {
      id: "user-3",
      name: "ณัฐพล ชอบเที่ยว",
      avatar: "https://i.pravatar.cc/150?img=33",
      mutualFriends: 8,
    },
    {
      id: "user-4",
      name: "พิมพ์ชนก สวยงาม",
      avatar: "https://i.pravatar.cc/150?img=10",
      mutualFriends: 15,
    },
  ],
  "user-2": [
    {
      id: "user-1",
      name: "สมชาย ใจดี",
      avatar: "https://i.pravatar.cc/150?img=12",
      mutualFriends: 12,
    },
    {
      id: "user-4",
      name: "พิมพ์ชนก สวยงาม",
      avatar: "https://i.pravatar.cc/150?img=10",
      mutualFriends: 6,
    },
  ],
};
