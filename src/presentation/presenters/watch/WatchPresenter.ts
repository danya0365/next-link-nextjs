import {
  mockVideos,
  videoCategories,
  Video,
} from "@/src/data/watch-mock-data";

export interface WatchViewModel {
  videos: Video[];
  categories: typeof videoCategories;
  featuredVideo: Video | null;
  trendingVideos: Video[];
  recommendedVideos: Video[];
  totalVideos: number;
}

/**
 * Watch Presenter
 * Business logic for Watch (Video Platform) page
 */
export class WatchPresenter {
  /**
   * Get view model for the watch page
   */
  async getViewModel(): Promise<WatchViewModel> {
    try {
      // Get all videos
      const videos = [...mockVideos];

      // Get featured video (most viewed)
      const featuredVideo = videos.reduce((prev, current) =>
        prev.views > current.views ? prev : current
      );

      // Get trending videos (most likes)
      const trendingVideos = [...videos]
        .sort((a, b) => b.likes - a.likes)
        .slice(0, 6);

      // Get recommended videos (random selection)
      const recommendedVideos = [...videos]
        .sort(() => Math.random() - 0.5)
        .slice(0, 8);

      return {
        videos,
        categories: videoCategories,
        featuredVideo,
        trendingVideos,
        recommendedVideos,
        totalVideos: videos.length,
      };
    } catch (error) {
      console.error("WatchPresenter.getViewModel error:", error);
      throw new Error("Failed to load watch data");
    }
  }

  /**
   * Get videos by category
   */
  async getVideosByCategory(category: string): Promise<Video[]> {
    try {
      if (category === "all") {
        return mockVideos;
      }

      if (category === "trending") {
        return [...mockVideos].sort((a, b) => b.likes - a.likes);
      }

      return mockVideos.filter((video) => video.category === category);
    } catch (error) {
      console.error("WatchPresenter.getVideosByCategory error:", error);
      return [];
    }
  }

  /**
   * Search videos
   */
  async searchVideos(query: string): Promise<Video[]> {
    try {
      if (!query.trim()) {
        return mockVideos;
      }

      const lowerQuery = query.toLowerCase();
      return mockVideos.filter(
        (video) =>
          video.title.toLowerCase().includes(lowerQuery) ||
          video.description.toLowerCase().includes(lowerQuery) ||
          video.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
          video.author.name.toLowerCase().includes(lowerQuery)
      );
    } catch (error) {
      console.error("WatchPresenter.searchVideos error:", error);
      return [];
    }
  }

  /**
   * Get video by ID
   */
  async getVideoById(id: string): Promise<Video | null> {
    try {
      return mockVideos.find((video) => video.id === id) || null;
    } catch (error) {
      console.error("WatchPresenter.getVideoById error:", error);
      return null;
    }
  }

  /**
   * Generate metadata for the page
   */
  async generateMetadata() {
    return {
      title: "Watch - Next Link Video Platform",
      description:
        "รับชมวิดีโอที่น่าสนใจ เรียนรู้สิ่งใหม่ๆ และเพลิดเพลินกับคอนเทนต์คุณภาพจากผู้สร้างที่คุณชื่นชอบ",
      keywords: [
        "video",
        "watch",
        "streaming",
        "entertainment",
        "education",
        "วิดีโอ",
      ],
      openGraph: {
        title: "Watch - Next Link Video Platform",
        description:
          "รับชมวิดีโอที่น่าสนใจ เรียนรู้สิ่งใหม่ๆ และเพลิดเพลินกับคอนเทนต์คุณภาพ",
        type: "website",
        locale: "th_TH",
      },
    };
  }
}

/**
 * Factory for creating presenter instances
 */
export class WatchPresenterFactory {
  private static clientInstance: WatchPresenter | null = null;

  /**
   * Create server-side presenter (new instance)
   */
  static async createServer(): Promise<WatchPresenter> {
    return new WatchPresenter();
  }

  /**
   * Create client-side presenter (singleton)
   */
  static createClient(): WatchPresenter {
    if (!this.clientInstance) {
      this.clientInstance = new WatchPresenter();
    }
    return this.clientInstance;
  }
}
