import {
  mockGroups,
  groupCategories,
  Group,
} from "@/src/data/groups-mock-data";

export interface GroupsViewModel {
  groups: Group[];
  categories: typeof groupCategories;
  yourGroups: Group[];
  suggestedGroups: Group[];
  totalGroups: number;
}

/**
 * Groups Presenter
 * Business logic for Groups page
 */
export class GroupsPresenter {
  /**
   * Get view model for the groups page
   */
  async getViewModel(): Promise<GroupsViewModel> {
    try {
      // Get all groups
      const groups = [...mockGroups];

      // Get user's groups (where isMember is true)
      const yourGroups = groups.filter((group) => group.isMember);

      // Get suggested groups (where isMember is false and not pending)
      const suggestedGroups = groups
        .filter((group) => !group.isMember && !group.isPending)
        .slice(0, 6);

      return {
        groups,
        categories: groupCategories,
        yourGroups,
        suggestedGroups,
        totalGroups: groups.length,
      };
    } catch (error) {
      console.error("GroupsPresenter.getViewModel error:", error);
      throw new Error("Failed to load groups data");
    }
  }

  /**
   * Get groups by category
   */
  async getGroupsByCategory(category: string): Promise<Group[]> {
    try {
      if (category === "all") {
        return mockGroups;
      }

      if (category === "your-groups") {
        return mockGroups.filter((group) => group.isMember);
      }

      if (category === "discover") {
        return mockGroups.filter((group) => !group.isMember && !group.isPending);
      }

      return mockGroups.filter((group) => group.category === category);
    } catch (error) {
      console.error("GroupsPresenter.getGroupsByCategory error:", error);
      return [];
    }
  }

  /**
   * Search groups
   */
  async searchGroups(query: string): Promise<Group[]> {
    try {
      if (!query.trim()) {
        return mockGroups;
      }

      const lowerQuery = query.toLowerCase();
      return mockGroups.filter(
        (group) =>
          group.name.toLowerCase().includes(lowerQuery) ||
          group.description.toLowerCase().includes(lowerQuery) ||
          group.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
      );
    } catch (error) {
      console.error("GroupsPresenter.searchGroups error:", error);
      return [];
    }
  }

  /**
   * Filter groups by privacy
   */
  async filterByPrivacy(
    privacy: "public" | "private" | "secret"
  ): Promise<Group[]> {
    try {
      return mockGroups.filter((group) => group.privacy === privacy);
    } catch (error) {
      console.error("GroupsPresenter.filterByPrivacy error:", error);
      return [];
    }
  }

  /**
   * Get group by ID
   */
  async getGroupById(id: string): Promise<Group | null> {
    try {
      return mockGroups.find((group) => group.id === id) || null;
    } catch (error) {
      console.error("GroupsPresenter.getGroupById error:", error);
      return null;
    }
  }

  /**
   * Join group
   */
  async joinGroup(groupId: string): Promise<boolean> {
    try {
      // Mock implementation - in real app, this would call API
      const group = mockGroups.find((g) => g.id === groupId);
      if (group) {
        if (group.privacy === "private") {
          group.isPending = true;
        } else {
          group.isMember = true;
          group.members += 1;
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error("GroupsPresenter.joinGroup error:", error);
      return false;
    }
  }

  /**
   * Leave group
   */
  async leaveGroup(groupId: string): Promise<boolean> {
    try {
      // Mock implementation - in real app, this would call API
      const group = mockGroups.find((g) => g.id === groupId);
      if (group && group.isMember) {
        group.isMember = false;
        group.members -= 1;
        return true;
      }
      return false;
    } catch (error) {
      console.error("GroupsPresenter.leaveGroup error:", error);
      return false;
    }
  }

  /**
   * Generate metadata for the page
   */
  async generateMetadata() {
    return {
      title: "Groups - กลุ่มและชุมชน | Next Link",
      description:
        "เข้าร่วมกลุ่มที่คุณสนใจ พบปะผู้คนที่มีความสนใจเหมือนกัน แชร์ประสบการณ์ และสร้างชุมชนออนไลน์ที่มีความหมาย",
      keywords: [
        "groups",
        "community",
        "กลุ่ม",
        "ชุมชน",
        "social",
        "hobby",
      ],
      openGraph: {
        title: "Groups - กลุ่มและชุมชน | Next Link",
        description:
          "เข้าร่วมกลุ่มที่คุณสนใจ พบปะผู้คนที่มีความสนใจเหมือนกัน",
        type: "website",
        locale: "th_TH",
      },
    };
  }
}

/**
 * Factory for creating presenter instances
 */
export class GroupsPresenterFactory {
  private static clientInstance: GroupsPresenter | null = null;

  /**
   * Create server-side presenter (new instance)
   */
  static async createServer(): Promise<GroupsPresenter> {
    return new GroupsPresenter();
  }

  /**
   * Create client-side presenter (singleton)
   */
  static createClient(): GroupsPresenter {
    if (!this.clientInstance) {
      this.clientInstance = new GroupsPresenter();
    }
    return this.clientInstance;
  }
}
