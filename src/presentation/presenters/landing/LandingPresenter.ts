import {
  features,
  statistics,
  testimonials,
  howItWorksSteps,
} from "@/src/data/landing-master-data";

export interface LandingViewModel {
  features: typeof features;
  statistics: typeof statistics;
  testimonials: typeof testimonials;
  howItWorksSteps: typeof howItWorksSteps;
}

/**
 * Landing Presenter
 * Business logic for landing page
 */
export class LandingPresenter {
  /**
   * Get view model for the landing page
   */
  async getViewModel(): Promise<LandingViewModel> {
    try {
      return {
        features,
        statistics,
        testimonials,
        howItWorksSteps,
      };
    } catch (error) {
      console.error("LandingPresenter.getViewModel error:", error);
      throw new Error("Failed to load landing data");
    }
  }

  /**
   * Generate metadata for the page
   */
  async generateMetadata() {
    return {
      title: "Next Link - เชื่อมต่อกับคนที่คุณรัก",
      description:
        "แพลตฟอร์มโซเชียลมีเดียที่ทันสมัย เชื่อมต่อกับเพื่อน ครอบครัว และคนที่คุณสนใจ แชร์ช่วงเวลาสำคัญและสร้างความทรงจำร่วมกัน",
      keywords: [
        "social media",
        "โซเชียลมีเดีย",
        "เชื่อมต่อ",
        "แชร์",
        "เพื่อน",
        "ครอบครัว",
      ],
      openGraph: {
        title: "Next Link - เชื่อมต่อกับคนที่คุณรัก",
        description:
          "แพลตฟอร์มโซเชียลมีเดียที่ทันสมัย เชื่อมต่อกับเพื่อน ครอบครัว และคนที่คุณสนใจ",
        type: "website",
        locale: "th_TH",
      },
      twitter: {
        card: "summary_large_image",
        title: "Next Link - เชื่อมต่อกับคนที่คุณรัก",
        description:
          "แพลตฟอร์มโซเชียลมีเดียที่ทันสมัย เชื่อมต่อกับเพื่อน ครอบครัว และคนที่คุณสนใจ",
      },
    };
  }
}

/**
 * Factory for creating presenter instances
 */
export class LandingPresenterFactory {
  private static clientInstance: LandingPresenter | null = null;

  /**
   * Create server-side presenter (new instance)
   */
  static async createServer(): Promise<LandingPresenter> {
    return new LandingPresenter();
  }

  /**
   * Create client-side presenter (singleton)
   */
  static createClient(): LandingPresenter {
    if (!this.clientInstance) {
      this.clientInstance = new LandingPresenter();
    }
    return this.clientInstance;
  }
}
