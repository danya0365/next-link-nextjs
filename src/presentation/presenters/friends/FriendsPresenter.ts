import {
  mockFriends,
  mockFriendRequests,
  mockSuggestedFriends,
  Friend,
} from "@/src/data/mock-friends";

export interface FriendsViewModel {
  friends: Friend[];
  friendRequests: Friend[];
  suggestedFriends: Friend[];
  totalFriends: number;
  totalRequests: number;
}

/**
 * Friends Presenter
 * Business logic for friends page
 */
export class FriendsPresenter {
  /**
   * Get view model for the friends page
   */
  async getViewModel(currentUserId?: string): Promise<FriendsViewModel> {
    try {
      return {
        friends: mockFriends,
        friendRequests: mockFriendRequests,
        suggestedFriends: mockSuggestedFriends,
        totalFriends: mockFriends.length,
        totalRequests: mockFriendRequests.length,
      };
    } catch (error) {
      console.error("FriendsPresenter.getViewModel error:", error);
      throw new Error("Failed to load friends data");
    }
  }

  /**
   * Accept friend request
   */
  async acceptFriendRequest(friendId: string): Promise<void> {
    // In real app, this would call an API
    const request = mockFriendRequests.find((f) => f.id === friendId);
    if (request) {
      request.status = "friend";
      request.friendsSince = new Date().toISOString();
      mockFriends.push(request);
      const index = mockFriendRequests.indexOf(request);
      mockFriendRequests.splice(index, 1);
    }
  }

  /**
   * Reject friend request
   */
  async rejectFriendRequest(friendId: string): Promise<void> {
    // In real app, this would call an API
    const index = mockFriendRequests.findIndex((f) => f.id === friendId);
    if (index !== -1) {
      mockFriendRequests.splice(index, 1);
    }
  }

  /**
   * Remove friend
   */
  async removeFriend(friendId: string): Promise<void> {
    // In real app, this would call an API
    const index = mockFriends.findIndex((f) => f.id === friendId);
    if (index !== -1) {
      mockFriends.splice(index, 1);
    }
  }

  /**
   * Send friend request
   */
  async sendFriendRequest(friendId: string): Promise<void> {
    // In real app, this would call an API
    console.log("Sending friend request to:", friendId);
  }

  /**
   * Generate metadata for the page
   */
  async generateMetadata(totalFriends?: number) {
    const title =
      totalFriends && totalFriends > 0
        ? `เพื่อน (${totalFriends}) | Next Link`
        : "เพื่อน | Next Link";

    return {
      title,
      description: "จัดการเพื่อนและคำขอเป็นเพื่อน",
      openGraph: {
        title,
        description: "จัดการเพื่อนและคำขอเป็นเพื่อน",
      },
    };
  }
}

/**
 * Factory for creating presenter instances
 */
export class FriendsPresenterFactory {
  private static clientInstance: FriendsPresenter | null = null;

  /**
   * Create server-side presenter (new instance)
   */
  static async createServer(): Promise<FriendsPresenter> {
    return new FriendsPresenter();
  }

  /**
   * Create client-side presenter (singleton)
   */
  static createClient(): FriendsPresenter {
    if (!this.clientInstance) {
      this.clientInstance = new FriendsPresenter();
    }
    return this.clientInstance;
  }
}
