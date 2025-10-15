import { mockPosts, Post } from "@/src/data/mock-posts";
import { mockUsers } from "@/src/data/mock-users";

export interface FeedViewModel {
  posts: Post[];
  currentUser: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    coverImage?: string;
    bio?: string;
  } | null;
}

/**
 * Feed Presenter
 * Business logic for feed page
 */
export class FeedPresenter {
  /**
   * Get view model for the feed page
   */
  async getViewModel(currentUserId?: string): Promise<FeedViewModel> {
    try {
      // Get current user
      const currentUser = currentUserId
        ? mockUsers.find((u) => u.id === currentUserId) || null
        : null;

      // Get all posts sorted by createdAt (newest first)
      const sortedPosts = [...mockPosts].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      return {
        posts: sortedPosts,
        currentUser,
      };
    } catch (error) {
      console.error("FeedPresenter.getViewModel error:", error);
      throw new Error("Failed to load feed data");
    }
  }

  /**
   * Generate metadata for the page
   */
  async generateMetadata() {
    return {
      title: "ฟีดข่าว | Next Link",
      description: "ดูโพสต์จากเพื่อนและเพจที่คุณติดตาม",
      openGraph: {
        title: "ฟีดข่าว | Next Link",
        description: "ดูโพสต์จากเพื่อนและเพจที่คุณติดตาม",
      },
    };
  }
}

/**
 * Factory for creating presenter instances
 * Server-side: Create new instance each time
 * Client-side: Use singleton pattern
 */
export class FeedPresenterFactory {
  private static clientInstance: FeedPresenter | null = null;

  /**
   * Create server-side presenter (new instance)
   */
  static async createServer(): Promise<FeedPresenter> {
    return new FeedPresenter();
  }

  /**
   * Create client-side presenter (singleton)
   */
  static createClient(): FeedPresenter {
    if (!this.clientInstance) {
      this.clientInstance = new FeedPresenter();
    }
    return this.clientInstance;
  }
}
