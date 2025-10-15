/**
 * Auth Presenter
 * Business logic for authentication pages (Login & Register)
 */
export class AuthPresenter {
  /**
   * Generate metadata for login page
   */
  async generateLoginMetadata() {
    return {
      title: "เข้าสู่ระบบ | Next Link",
      description: "เข้าสู่ระบบ Next Link เพื่อเชื่อมต่อกับเพื่อนและครอบครัว",
      openGraph: {
        title: "เข้าสู่ระบบ | Next Link",
        description: "เข้าสู่ระบบ Next Link เพื่อเชื่อมต่อกับเพื่อนและครอบครัว",
      },
    };
  }

  /**
   * Generate metadata for register page
   */
  async generateRegisterMetadata() {
    return {
      title: "สมัครสมาชิก | Next Link",
      description: "สมัครสมาชิก Next Link ฟรี เชื่อมต่อกับเพื่อนและครอบครัว",
      openGraph: {
        title: "สมัครสมาชิก | Next Link",
        description: "สมัครสมาชิก Next Link ฟรี เชื่อมต่อกับเพื่อนและครอบครัว",
      },
    };
  }
}

/**
 * Factory for creating presenter instances
 */
export class AuthPresenterFactory {
  private static clientInstance: AuthPresenter | null = null;

  /**
   * Create server-side presenter (new instance)
   */
  static async createServer(): Promise<AuthPresenter> {
    return new AuthPresenter();
  }

  /**
   * Create client-side presenter (singleton)
   */
  static createClient(): AuthPresenter {
    if (!this.clientInstance) {
      this.clientInstance = new AuthPresenter();
    }
    return this.clientInstance;
  }
}
