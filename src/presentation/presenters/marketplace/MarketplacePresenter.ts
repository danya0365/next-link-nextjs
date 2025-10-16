import {
  mockMarketplaceItems,
  marketplaceCategories,
  MarketplaceItem,
} from "@/src/data/marketplace-mock-data";

export interface MarketplaceViewModel {
  items: MarketplaceItem[];
  categories: typeof marketplaceCategories;
  featuredItems: MarketplaceItem[];
  totalItems: number;
}

/**
 * Marketplace Presenter
 * Business logic for Marketplace page
 */
export class MarketplacePresenter {
  /**
   * Get view model for the marketplace page
   */
  async getViewModel(): Promise<MarketplaceViewModel> {
    try {
      // Get all items
      const items = [...mockMarketplaceItems].filter(
        (item) => item.isAvailable
      );

      // Get featured items (most liked)
      const featuredItems = [...items]
        .sort((a, b) => b.likes - a.likes)
        .slice(0, 4);

      return {
        items,
        categories: marketplaceCategories,
        featuredItems,
        totalItems: items.length,
      };
    } catch (error) {
      console.error("MarketplacePresenter.getViewModel error:", error);
      throw new Error("Failed to load marketplace data");
    }
  }

  /**
   * Get items by category
   */
  async getItemsByCategory(category: string): Promise<MarketplaceItem[]> {
    try {
      const availableItems = mockMarketplaceItems.filter(
        (item) => item.isAvailable
      );

      if (category === "all") {
        return availableItems;
      }

      return availableItems.filter((item) => item.category === category);
    } catch (error) {
      console.error("MarketplacePresenter.getItemsByCategory error:", error);
      return [];
    }
  }

  /**
   * Search items
   */
  async searchItems(query: string): Promise<MarketplaceItem[]> {
    try {
      if (!query.trim()) {
        return mockMarketplaceItems.filter((item) => item.isAvailable);
      }

      const lowerQuery = query.toLowerCase();
      return mockMarketplaceItems.filter(
        (item) =>
          item.isAvailable &&
          (item.title.toLowerCase().includes(lowerQuery) ||
            item.description.toLowerCase().includes(lowerQuery) ||
            item.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
            item.location.toLowerCase().includes(lowerQuery))
      );
    } catch (error) {
      console.error("MarketplacePresenter.searchItems error:", error);
      return [];
    }
  }

  /**
   * Filter items by price range
   */
  async filterByPriceRange(
    minPrice: number,
    maxPrice: number
  ): Promise<MarketplaceItem[]> {
    try {
      return mockMarketplaceItems.filter(
        (item) =>
          item.isAvailable && item.price >= minPrice && item.price <= maxPrice
      );
    } catch (error) {
      console.error("MarketplacePresenter.filterByPriceRange error:", error);
      return [];
    }
  }

  /**
   * Filter items by condition
   */
  async filterByCondition(
    condition: "new" | "used" | "like_new"
  ): Promise<MarketplaceItem[]> {
    try {
      return mockMarketplaceItems.filter(
        (item) => item.isAvailable && item.condition === condition
      );
    } catch (error) {
      console.error("MarketplacePresenter.filterByCondition error:", error);
      return [];
    }
  }

  /**
   * Get item by ID
   */
  async getItemById(id: string): Promise<MarketplaceItem | null> {
    try {
      return (
        mockMarketplaceItems.find(
          (item) => item.id === id && item.isAvailable
        ) || null
      );
    } catch (error) {
      console.error("MarketplacePresenter.getItemById error:", error);
      return null;
    }
  }

  /**
   * Generate metadata for the page
   */
  async generateMetadata() {
    return {
      title: "Marketplace - ตลาดซื้อขายออนไลน์ | Next Link",
      description:
        "ซื้อขายสินค้ามือสอง สินค้าใหม่ และสินค้าหลากหลายประเภท อิเล็กทรอนิกส์ แฟชั่น เฟอร์นิเจอร์ ยานยนต์ และอื่นๆ อีกมากมาย",
      keywords: [
        "marketplace",
        "ตลาด",
        "ซื้อขาย",
        "มือสอง",
        "electronics",
        "fashion",
      ],
      openGraph: {
        title: "Marketplace - ตลาดซื้อขายออนไลน์ | Next Link",
        description:
          "ซื้อขายสินค้ามือสอง สินค้าใหม่ และสินค้าหลากหลายประเภท",
        type: "website",
        locale: "th_TH",
      },
    };
  }
}

/**
 * Factory for creating presenter instances
 */
export class MarketplacePresenterFactory {
  private static clientInstance: MarketplacePresenter | null = null;

  /**
   * Create server-side presenter (new instance)
   */
  static async createServer(): Promise<MarketplacePresenter> {
    return new MarketplacePresenter();
  }

  /**
   * Create client-side presenter (singleton)
   */
  static createClient(): MarketplacePresenter {
    if (!this.clientInstance) {
      this.clientInstance = new MarketplacePresenter();
    }
    return this.clientInstance;
  }
}
