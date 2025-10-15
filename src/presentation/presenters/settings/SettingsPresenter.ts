export interface UserSettings {
  profile: {
    name: string;
    email: string;
    bio?: string;
    avatar?: string;
    coverImage?: string;
  };
  privacy: {
    profileVisibility: "public" | "friends" | "only_me";
    postDefaultVisibility: "public" | "friends" | "only_me";
    allowTagging: boolean;
    allowMessagesFrom: "everyone" | "friends" | "no_one";
  };
  notifications: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    notifyOnLikes: boolean;
    notifyOnComments: boolean;
    notifyOnShares: boolean;
    notifyOnFriendRequests: boolean;
  };
  security: {
    twoFactorEnabled: boolean;
    loginAlerts: boolean;
    connectedDevices: number;
  };
}

export interface SettingsViewModel {
  settings: UserSettings;
}

/**
 * Settings Presenter
 * Business logic for settings page
 */
export class SettingsPresenter {
  /**
   * Get view model for the settings page
   */
  async getViewModel(currentUserId?: string): Promise<SettingsViewModel> {
    try {
      // In real app, fetch user settings from API
      // For now, return mock data
      const settings: UserSettings = {
        profile: {
          name: "สมชาย ใจดี",
          email: "somchai@example.com",
          bio: "นักพัฒนาซอฟต์แวร์ที่รักการเรียนรู้สิ่งใหม่ๆ",
          avatar: "/avatars/somchai.jpg",
          coverImage: "/covers/somchai.jpg",
        },
        privacy: {
          profileVisibility: "public",
          postDefaultVisibility: "friends",
          allowTagging: true,
          allowMessagesFrom: "friends",
        },
        notifications: {
          emailNotifications: true,
          pushNotifications: true,
          notifyOnLikes: true,
          notifyOnComments: true,
          notifyOnShares: false,
          notifyOnFriendRequests: true,
        },
        security: {
          twoFactorEnabled: false,
          loginAlerts: true,
          connectedDevices: 3,
        },
      };

      return {
        settings,
      };
    } catch (error) {
      console.error("SettingsPresenter.getViewModel error:", error);
      throw new Error("Failed to load settings data");
    }
  }

  /**
   * Update settings
   */
  async updateSettings(
    currentUserId: string,
    settings: Partial<UserSettings>
  ): Promise<void> {
    // In real app, this would call an API
    console.log("Updating settings:", settings);
  }

  /**
   * Generate metadata for the page
   */
  async generateMetadata() {
    return {
      title: "ตั้งค่า | Next Link",
      description: "จัดการการตั้งค่าบัญชีและความเป็นส่วนตัวของคุณ",
      openGraph: {
        title: "ตั้งค่า | Next Link",
        description: "จัดการการตั้งค่าบัญชีและความเป็นส่วนตัวของคุณ",
      },
    };
  }
}

/**
 * Factory for creating presenter instances
 */
export class SettingsPresenterFactory {
  private static clientInstance: SettingsPresenter | null = null;

  /**
   * Create server-side presenter (new instance)
   */
  static async createServer(): Promise<SettingsPresenter> {
    return new SettingsPresenter();
  }

  /**
   * Create client-side presenter (singleton)
   */
  static createClient(): SettingsPresenter {
    if (!this.clientInstance) {
      this.clientInstance = new SettingsPresenter();
    }
    return this.clientInstance;
  }
}
