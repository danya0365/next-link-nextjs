import {
  mockTrendingTopics,
  mockTrendingPosts,
  trendingCategories,
  TrendingTopic,
  TrendingPost,
} from "@/src/data/trending-mock-data";

export interface TrendingViewModel {
  topics: TrendingTopic[];
  posts: TrendingPost[];
  categories: typeof trendingCategories;
  totalTopics: number;
  totalPosts: number;
}

/**
 * Trending Presenter
 * Business logic for Trending page
 */
export class TrendingPresenter {
  /**
   * Get view model for the trending page
   */
  async getViewModel(): Promise<TrendingViewModel> {
    try {
      // Get all trending topics and posts
      const topics = [...mockTrendingTopics];
      const posts = [...mockTrendingPosts];

      return {
        topics,
        posts,
        categories: trendingCategories,
        totalTopics: topics.length,
        totalPosts: posts.length,
      };
    } catch (error) {
      console.error("TrendingPresenter.getViewModel error:", error);
      throw new Error("Failed to load trending data");
    }
  }

  /**
   * Get topics by category
   */
  async getTopicsByCategory(category: string): Promise<TrendingTopic[]> {
    try {
      if (category === "all") {
        return mockTrendingTopics;
      }

      return mockTrendingTopics.filter((topic) => topic.category === category);
    } catch (error) {
      console.error("TrendingPresenter.getTopicsByCategory error:", error);
      return [];
    }
  }

  /**
   * Get posts by hashtag
   */
  async getPostsByHashtag(hashtag: string): Promise<TrendingPost[]> {
    try {
      return mockTrendingPosts.filter((post) =>
        post.hashtags.some(
          (tag) => tag.toLowerCase() === hashtag.toLowerCase()
        )
      );
    } catch (error) {
      console.error("TrendingPresenter.getPostsByHashtag error:", error);
      return [];
    }
  }

  /**
   * Search topics
   */
  async searchTopics(query: string): Promise<TrendingTopic[]> {
    try {
      if (!query.trim()) {
        return mockTrendingTopics;
      }

      const lowerQuery = query.toLowerCase();
      return mockTrendingTopics.filter(
        (topic) =>
          topic.hashtag.toLowerCase().includes(lowerQuery) ||
          (topic.description &&
            topic.description.toLowerCase().includes(lowerQuery))
      );
    } catch (error) {
      console.error("TrendingPresenter.searchTopics error:", error);
      return [];
    }
  }

  /**
   * Get topic by ID
   */
  async getTopicById(id: string): Promise<TrendingTopic | null> {
    try {
      return mockTrendingTopics.find((topic) => topic.id === id) || null;
    } catch (error) {
      console.error("TrendingPresenter.getTopicById error:", error);
      return null;
    }
  }

  /**
   * Generate metadata for the page
   */
  async generateMetadata() {
    return {
      title: "Trending - หัวข้อที่กำลังมาแรง | Next Link",
      description:
        "ค้นพบหัวข้อ แฮชแท็ก และเนื้อหาที่กำลังฮิตในขณะนี้ ติดตามเทรนด์ล่าสุด",
      keywords: [
        "trending",
        "hashtag",
        "viral",
        "popular",
        "เทรนด์",
        "กำลังฮิต",
      ],
      openGraph: {
        title: "Trending - หัวข้อที่กำลังมาแรง | Next Link",
        description: "ค้นพบหัวข้อและเนื้อหาที่กำลังฮิตในขณะนี้",
        type: "website",
        locale: "th_TH",
      },
    };
  }
}

/**
 * Factory for creating presenter instances
 */
export class TrendingPresenterFactory {
  private static clientInstance: TrendingPresenter | null = null;

  /**
   * Create server-side presenter (new instance)
   */
  static async createServer(): Promise<TrendingPresenter> {
    return new TrendingPresenter();
  }

  /**
   * Create client-side presenter (singleton)
   */
  static createClient(): TrendingPresenter {
    if (!this.clientInstance) {
      this.clientInstance = new TrendingPresenter();
    }
    return this.clientInstance;
  }
}
