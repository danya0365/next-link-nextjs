import { mockMemories, Memory } from "@/src/data/memories-mock-data";

export interface MemoriesViewModel {
  memories: Memory[];
  todayMemories: Memory[];
  totalMemories: number;
}

/**
 * Memories Presenter
 * Business logic for Memories page
 */
export class MemoriesPresenter {
  /**
   * Get view model for the memories page
   */
  async getViewModel(): Promise<MemoriesViewModel> {
    try {
      // Get all memories
      const memories = [...mockMemories];

      // Get today's date
      const today = new Date();
      const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

      // Filter memories for today (same month and day)
      const todayMemories = memories.filter((memory) => {
        const memoryDate = new Date(memory.date);
        return (
          memoryDate.getMonth() === today.getMonth() &&
          memoryDate.getDate() === today.getDate()
        );
      });

      // Sort by years ago (most recent first)
      todayMemories.sort((a, b) => a.yearsAgo - b.yearsAgo);

      return {
        memories,
        todayMemories,
        totalMemories: memories.length,
      };
    } catch (error) {
      console.error("MemoriesPresenter.getViewModel error:", error);
      throw new Error("Failed to load memories data");
    }
  }

  /**
   * Get memories by year
   */
  async getMemoriesByYear(yearsAgo: number): Promise<Memory[]> {
    try {
      return mockMemories.filter((memory) => memory.yearsAgo === yearsAgo);
    } catch (error) {
      console.error("MemoriesPresenter.getMemoriesByYear error:", error);
      return [];
    }
  }

  /**
   * Get memory by ID
   */
  async getMemoryById(id: string): Promise<Memory | null> {
    try {
      return mockMemories.find((memory) => memory.id === id) || null;
    } catch (error) {
      console.error("MemoriesPresenter.getMemoryById error:", error);
      return null;
    }
  }

  /**
   * Share memory
   */
  async shareMemory(memoryId: string): Promise<boolean> {
    try {
      // Mock implementation - in real app, this would call API
      const memory = mockMemories.find((m) => m.id === memoryId);
      if (memory) {
        memory.shares += 1;
        return true;
      }
      return false;
    } catch (error) {
      console.error("MemoriesPresenter.shareMemory error:", error);
      return false;
    }
  }

  /**
   * Generate metadata for the page
   */
  async generateMetadata() {
    return {
      title: "Memories - ความทรงจำ | Next Link",
      description:
        "ย้อนดูความทรงจำและช่วงเวลาดีๆ ที่ผ่านมา ค้นพบโพสต์และภาพถ่ายจากอดีต",
      keywords: ["memories", "ความทรงจำ", "flashback", "throwback"],
      openGraph: {
        title: "Memories - ความทรงจำ | Next Link",
        description: "ย้อนดูความทรงจำและช่วงเวลาดีๆ ที่ผ่านมา",
        type: "website",
        locale: "th_TH",
      },
    };
  }
}

/**
 * Factory for creating presenter instances
 */
export class MemoriesPresenterFactory {
  private static clientInstance: MemoriesPresenter | null = null;

  /**
   * Create server-side presenter (new instance)
   */
  static async createServer(): Promise<MemoriesPresenter> {
    return new MemoriesPresenter();
  }

  /**
   * Create client-side presenter (singleton)
   */
  static createClient(): MemoriesPresenter {
    if (!this.clientInstance) {
      this.clientInstance = new MemoriesPresenter();
    }
    return this.clientInstance;
  }
}
