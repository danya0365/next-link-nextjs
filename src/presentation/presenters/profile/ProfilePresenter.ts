import { Post } from "@/src/data/mock-posts";
import {
  mockAboutData,
  mockFriendsData,
  mockPhotosData,
  ProfileAbout,
  ProfileFriend,
  ProfilePhoto,
} from "@/src/data/mock-profile-data";
import { mockUsers } from "@/src/data/mock-users";

export interface ProfileUser {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar?: string;
  coverPhoto?: string;
  bio?: string;
  friendsCount: number;
  followersCount: number;
  followingCount: number;
}

export interface ProfileViewModel {
  profileUser: ProfileUser | null;
  isOwnProfile: boolean;
  aboutData: ProfileAbout;
  photos: ProfilePhoto[];
  friends: ProfileFriend[];
  userPosts: Post[];
}

/**
 * Presenter for Profile page
 * Follows Clean Architecture with proper separation of concerns
 */
export class ProfilePresenter {
  /**
   * Get view model for the profile page
   */
  async getViewModel(
    userId: string,
    currentUserId?: string,
    posts?: Post[]
  ): Promise<ProfileViewModel> {
    try {
      const profileUser = mockUsers.find((u) => u.id === userId);

      if (!profileUser) {
        throw new Error("Profile not found");
      }

      console.log("ProfilePresenter.getViewModel", userId, currentUserId);

      const isOwnProfile = currentUserId === userId;
      const aboutData = mockAboutData[userId] || {};
      const photos = mockPhotosData[userId] || [];
      const friends = mockFriendsData[userId] || [];
      const userPosts = posts?.filter((post) => post.userId === userId) || [];

      return {
        profileUser,
        isOwnProfile,
        aboutData,
        photos,
        friends,
        userPosts,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Generate metadata for the profile page
   */
  async generateMetadata(userId: string) {
    try {
      const user = mockUsers.find((u) => u.id === userId);

      if (!user) {
        return {
          title: "โปรไฟล์ | Next Link",
          description: "ดูโปรไฟล์ผู้ใช้",
        };
      }

      return {
        title: `${user.name} | Next Link`,
        description: user.bio || `ดูโปรไฟล์ของ ${user.name}`,
      };
    } catch (error) {
      throw error;
    }
  }
}

/**
 * Factory for creating ProfilePresenter instances
 */
export class ProfilePresenterFactory {
  static async createServer(): Promise<ProfilePresenter> {
    return new ProfilePresenter();
  }

  static createClient(): ProfilePresenter {
    return new ProfilePresenter();
  }
}
