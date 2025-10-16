import { mockPages, Page, pageCategories } from "@/src/data/pages-mock-data";

export interface PagesViewModel {
  pages: Page[];
  followingPages: Page[];
  suggestedPages: Page[];
  categories: typeof pageCategories;
  totalPages: number;
}

/**
 * Pages Presenter
 * Business logic for Pages page
 */
export class PagesPresenter {
  /**
   * Get view model for the pages page
   */
  async getViewModel(): Promise<PagesViewModel> {
    try {
      const pages = [...mockPages];
      const followingPages = pages.filter((page) => page.isFollowing);
      const suggestedPages = pages.filter((page) => !page.isFollowing).slice(0, 6);

      return {
        pages,
        followingPages,
        suggestedPages,
        categories: pageCategories,
        totalPages: pages.length,
      };
    } catch (error) {
      console.error("PagesPresenter.getViewModel error:", error);
      throw new Error("Failed to load pages data");
    }
  }

  /**
   * Get pages by category
   */
  async getPagesByCategory(categoryId: string): Promise<Page[]> {
    try {
      if (categoryId === "all") {
        return [...mockPages];
      }
      if (categoryId === "following") {
        return mockPages.filter((page) => page.isFollowing);
      }
      if (categoryId === "discover") {
        return mockPages.filter((page) => !page.isFollowing);
      }
      return mockPages.filter((page) => page.category === categoryId);
    } catch (error) {
      console.error("PagesPresenter.getPagesByCategory error:", error);
      return [];
    }
  }

  /**
   * Search pages
   */
  async searchPages(query: string): Promise<Page[]> {
    try {
      if (!query.trim()) {
        return [...mockPages];
      }
      const lowerQuery = query.toLowerCase();
      return mockPages.filter(
        (page) =>
          page.name.toLowerCase().includes(lowerQuery) ||
          page.description.toLowerCase().includes(lowerQuery)
      );
    } catch (error) {
      console.error("PagesPresenter.searchPages error:", error);
      return [];
    }
  }

  /**
   * Follow/Unfollow page
   */
  async toggleFollowPage(pageId: string): Promise<boolean> {
    try {
      const page = mockPages.find((p) => p.id === pageId);
      if (page) {
        page.isFollowing = !page.isFollowing;
        if (page.isFollowing) {
          page.followers += 1;
        } else {
          page.followers -= 1;
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error("PagesPresenter.toggleFollowPage error:", error);
      return false;
    }
  }

  /**
   * Like/Unlike page
   */
  async toggleLikePage(pageId: string): Promise<boolean> {
    try {
      const page = mockPages.find((p) => p.id === pageId);
      if (page) {
        page.isLiked = !page.isLiked;
        if (page.isLiked) {
          page.likes += 1;
        } else {
          page.likes -= 1;
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error("PagesPresenter.toggleLikePage error:", error);
      return false;
    }
  }

  /**
   * Generate metadata for the page
   */
  async generateMetadata() {
    return {
      title: "Pages - เพจ | Next Link",
      description:
        "ค้นพบและติดตามเพจที่คุณสนใจ ธุรกิจ ร้านอาหาร บันเทิง และอีกมากมาย",
      keywords: ["pages", "เพจ", "business", "ธุรกิจ", "ร้านค้า"],
      openGraph: {
        title: "Pages - เพจ | Next Link",
        description: "ค้นพบและติดตามเพจที่คุณสนใจ",
        type: "website",
        locale: "th_TH",
      },
    };
  }
}

/**
 * Factory for creating presenter instances
 */
export class PagesPresenterFactory {
  private static clientInstance: PagesPresenter | null = null;

  /**
   * Create server-side presenter (new instance)
   */
  static async createServer(): Promise<PagesPresenter> {
    return new PagesPresenter();
  }

  /**
   * Create client-side presenter (singleton)
   */
  static createClient(): PagesPresenter {
    if (!this.clientInstance) {
      this.clientInstance = new PagesPresenter();
    }
    return this.clientInstance;
  }
}
