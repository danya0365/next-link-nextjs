import { mockNotifications, Notification } from "@/src/data/mock-notifications";

export interface NotificationsViewModel {
  notifications: Notification[];
  unreadCount: number;
}

/**
 * Notifications Presenter
 * Business logic for notifications page
 */
export class NotificationsPresenter {
  /**
   * Get view model for the notifications page
   */
  async getViewModel(currentUserId?: string): Promise<NotificationsViewModel> {
    try {
      // Sort notifications by createdAt (newest first)
      const sortedNotifications = [...mockNotifications].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      // Count unread notifications
      const unreadCount = sortedNotifications.filter((n) => !n.read).length;

      return {
        notifications: sortedNotifications,
        unreadCount,
      };
    } catch (error) {
      console.error("NotificationsPresenter.getViewModel error:", error);
      throw new Error("Failed to load notifications data");
    }
  }

  /**
   * Mark notification as read
   */
  async markAsRead(notificationId: string): Promise<void> {
    // In real app, this would call an API
    const notification = mockNotifications.find((n) => n.id === notificationId);
    if (notification) {
      notification.read = true;
    }
  }

  /**
   * Mark all notifications as read
   */
  async markAllAsRead(): Promise<void> {
    // In real app, this would call an API
    mockNotifications.forEach((n) => {
      n.read = true;
    });
  }

  /**
   * Generate metadata for the page
   */
  async generateMetadata(unreadCount?: number) {
    const title = unreadCount && unreadCount > 0 
      ? `(${unreadCount}) การแจ้งเตือน | Next Link`
      : "การแจ้งเตือน | Next Link";

    return {
      title,
      description: "ดูการแจ้งเตือนทั้งหมดของคุณ",
      openGraph: {
        title,
        description: "ดูการแจ้งเตือนทั้งหมดของคุณ",
      },
    };
  }
}

/**
 * Factory for creating presenter instances
 */
export class NotificationsPresenterFactory {
  private static clientInstance: NotificationsPresenter | null = null;

  /**
   * Create server-side presenter (new instance)
   */
  static async createServer(): Promise<NotificationsPresenter> {
    return new NotificationsPresenter();
  }

  /**
   * Create client-side presenter (singleton)
   */
  static createClient(): NotificationsPresenter {
    if (!this.clientInstance) {
      this.clientInstance = new NotificationsPresenter();
    }
    return this.clientInstance;
  }
}
