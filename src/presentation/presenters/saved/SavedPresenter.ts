import {
  mockSavedItems,
  savedCollections,
  SavedItem,
} from "@/src/data/saved-mock-data";

export interface SavedViewModel {
  items: SavedItem[];
  collections: typeof savedCollections;
  totalItems: number;
}

/**
 * Saved Presenter
 * Business logic for Saved page
 */
export class SavedPresenter {
  /**
   * Get view model for the saved page
   */
  async getViewModel(): Promise<SavedViewModel> {
    try {
      // Get all saved items
      const items = [...mockSavedItems];

      return {
        items,
        collections: savedCollections,
        totalItems: items.length,
      };
    } catch (error) {
      console.error("SavedPresenter.getViewModel error:", error);
      throw new Error("Failed to load saved data");
    }
  }

  /**
   * Get items by collection
   */
  async getItemsByCollection(collection: string): Promise<SavedItem[]> {
    try {
      if (collection === "all") {
        return mockSavedItems;
      }

      return mockSavedItems.filter((item) => item.collection === collection);
    } catch (error) {
      console.error("SavedPresenter.getItemsByCollection error:", error);
      return [];
    }
  }

  /**
   * Get items by type
   */
  async getItemsByType(
    type: "post" | "video" | "event" | "marketplace" | "link"
  ): Promise<SavedItem[]> {
    try {
      return mockSavedItems.filter((item) => item.type === type);
    } catch (error) {
      console.error("SavedPresenter.getItemsByType error:", error);
      return [];
    }
  }

  /**
   * Search items
   */
  async searchItems(query: string): Promise<SavedItem[]> {
    try {
      if (!query.trim()) {
        return mockSavedItems;
      }

      const lowerQuery = query.toLowerCase();
      return mockSavedItems.filter(
        (item) =>
          item.title.toLowerCase().includes(lowerQuery) ||
          (item.description &&
            item.description.toLowerCase().includes(lowerQuery))
      );
    } catch (error) {
      console.error("SavedPresenter.searchItems error:", error);
      return [];
    }
  }

  /**
   * Get item by ID
   */
  async getItemById(id: string): Promise<SavedItem | null> {
    try {
      return mockSavedItems.find((item) => item.id === id) || null;
    } catch (error) {
      console.error("SavedPresenter.getItemById error:", error);
      return null;
    }
  }

  /**
   * Remove saved item
   */
  async removeSavedItem(itemId: string): Promise<boolean> {
    try {
      // Mock implementation - in real app, this would call API
      const index = mockSavedItems.findIndex((item) => item.id === itemId);
      if (index !== -1) {
        mockSavedItems.splice(index, 1);
        return true;
      }
      return false;
    } catch (error) {
      console.error("SavedPresenter.removeSavedItem error:", error);
      return false;
    }
  }

  /**
   * Generate metadata for the page
   */
  async generateMetadata() {
    return {
      title: "Saved - รายการที่บันทึก | Next Link",
      description:
        "รายการที่บันทึกไว้ทั้งหมด โพสต์ วิดีโอ อีเว้นท์ และลิงก์ที่คุณสนใจ",
      keywords: ["saved", "บันทึก", "รายการที่บันทึก", "bookmark"],
      openGraph: {
        title: "Saved - รายการที่บันทึก | Next Link",
        description: "รายการที่บันทึกไว้ทั้งหมด โพสต์ วิดีโอ อีเว้นท์ และลิงก์",
        type: "website",
        locale: "th_TH",
      },
    };
  }
}

/**
 * Factory for creating presenter instances
 */
export class SavedPresenterFactory {
  private static clientInstance: SavedPresenter | null = null;

  /**
   * Create server-side presenter (new instance)
   */
  static async createServer(): Promise<SavedPresenter> {
    return new SavedPresenter();
  }

  /**
   * Create client-side presenter (singleton)
   */
  static createClient(): SavedPresenter {
    if (!this.clientInstance) {
      this.clientInstance = new SavedPresenter();
    }
    return this.clientInstance;
  }
}
