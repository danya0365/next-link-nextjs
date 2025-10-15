import { mockUsers } from "@/src/data/mock-users";
import { mockPosts, Post } from "@/src/data/mock-posts";

export interface SearchResult {
  users: Array<{
    id: string;
    name: string;
    email: string;
    avatar?: string;
    bio?: string;
  }>;
  posts: Post[];
}

export interface SearchViewModel {
  query: string;
  results: SearchResult;
  totalResults: number;
}

/**
 * Search Presenter
 * Business logic for search page
 */
export class SearchPresenter {
  /**
   * Search users and posts
   */
  async search(query: string): Promise<SearchViewModel> {
    try {
      if (!query || query.trim().length === 0) {
        return {
          query: "",
          results: {
            users: [],
            posts: [],
          },
          totalResults: 0,
        };
      }

      const lowerQuery = query.toLowerCase().trim();

      // Search users
      const matchedUsers = mockUsers
        .filter(
          (user) =>
            user.name.toLowerCase().includes(lowerQuery) ||
            user.email.toLowerCase().includes(lowerQuery) ||
            (user.bio && user.bio.toLowerCase().includes(lowerQuery))
        )
        .map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          bio: user.bio,
        }));

      // Search posts
      const matchedPosts = mockPosts.filter(
        (post) =>
          post.content.toLowerCase().includes(lowerQuery) ||
          post.userName.toLowerCase().includes(lowerQuery)
      );

      const totalResults = matchedUsers.length + matchedPosts.length;

      return {
        query,
        results: {
          users: matchedUsers,
          posts: matchedPosts,
        },
        totalResults,
      };
    } catch (error) {
      console.error("SearchPresenter.search error:", error);
      throw new Error("Failed to search");
    }
  }

  /**
   * Get view model (empty search state)
   */
  async getViewModel(): Promise<SearchViewModel> {
    return {
      query: "",
      results: {
        users: [],
        posts: [],
      },
      totalResults: 0,
    };
  }

  /**
   * Generate metadata for the page
   */
  async generateMetadata(query?: string) {
    const title = query
      ? `ค้นหา "${query}" | Next Link`
      : "ค้นหา | Next Link";

    return {
      title,
      description: "ค้นหาผู้ใช้และโพสต์บน Next Link",
      openGraph: {
        title,
        description: "ค้นหาผู้ใช้และโพสต์บน Next Link",
      },
    };
  }
}

/**
 * Factory for creating presenter instances
 */
export class SearchPresenterFactory {
  private static clientInstance: SearchPresenter | null = null;

  /**
   * Create server-side presenter (new instance)
   */
  static async createServer(): Promise<SearchPresenter> {
    return new SearchPresenter();
  }

  /**
   * Create client-side presenter (singleton)
   */
  static createClient(): SearchPresenter {
    if (!this.clientInstance) {
      this.clientInstance = new SearchPresenter();
    }
    return this.clientInstance;
  }
}
