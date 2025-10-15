import {
  mockConversations,
  mockMessages,
  Conversation,
  Message,
} from "@/src/data/mock-messages";

export interface MessagesViewModel {
  conversations: Conversation[];
  totalUnread: number;
}

export interface ConversationViewModel {
  conversation: Conversation;
  messages: Message[];
}

/**
 * Messages Presenter
 * Business logic for messages page
 */
export class MessagesPresenter {
  /**
   * Get view model for the messages list page
   */
  async getViewModel(currentUserId?: string): Promise<MessagesViewModel> {
    try {
      // Sort conversations by lastMessageTime (newest first)
      const sortedConversations = [...mockConversations].sort(
        (a, b) =>
          new Date(b.lastMessageTime).getTime() -
          new Date(a.lastMessageTime).getTime()
      );

      // Calculate total unread count
      const totalUnread = sortedConversations.reduce(
        (sum, conv) => sum + conv.unreadCount,
        0
      );

      return {
        conversations: sortedConversations,
        totalUnread,
      };
    } catch (error) {
      console.error("MessagesPresenter.getViewModel error:", error);
      throw new Error("Failed to load messages data");
    }
  }

  /**
   * Get view model for a specific conversation
   */
  async getConversationViewModel(
    conversationId: string
  ): Promise<ConversationViewModel> {
    try {
      const conversation = mockConversations.find(
        (c) => c.id === conversationId
      );

      if (!conversation) {
        throw new Error("Conversation not found");
      }

      const messages = mockMessages[conversationId] || [];

      // Sort messages by createdAt (oldest first)
      const sortedMessages = [...messages].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

      return {
        conversation,
        messages: sortedMessages,
      };
    } catch (error) {
      console.error("MessagesPresenter.getConversationViewModel error:", error);
      throw new Error("Failed to load conversation data");
    }
  }

  /**
   * Send a message
   */
  async sendMessage(
    conversationId: string,
    senderId: string,
    content: string
  ): Promise<Message> {
    // In real app, this would call an API
    const conversation = mockConversations.find(
      (c) => c.id === conversationId
    );
    if (!conversation) {
      throw new Error("Conversation not found");
    }

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId,
      receiverId: conversation.participantId,
      content,
      read: false,
      createdAt: new Date().toISOString(),
    };

    // Add message to mock data
    if (!mockMessages[conversationId]) {
      mockMessages[conversationId] = [];
    }
    mockMessages[conversationId].push(newMessage);

    // Update conversation
    conversation.lastMessage = content;
    conversation.lastMessageTime = newMessage.createdAt;

    return newMessage;
  }

  /**
   * Generate metadata for the page
   */
  async generateMetadata(totalUnread?: number) {
    const title =
      totalUnread && totalUnread > 0
        ? `(${totalUnread}) ข้อความ | Next Link`
        : "ข้อความ | Next Link";

    return {
      title,
      description: "ดูข้อความและแชทกับเพื่อนของคุณ",
      openGraph: {
        title,
        description: "ดูข้อความและแชทกับเพื่อนของคุณ",
      },
    };
  }
}

/**
 * Factory for creating presenter instances
 */
export class MessagesPresenterFactory {
  private static clientInstance: MessagesPresenter | null = null;

  /**
   * Create server-side presenter (new instance)
   */
  static async createServer(): Promise<MessagesPresenter> {
    return new MessagesPresenter();
  }

  /**
   * Create client-side presenter (singleton)
   */
  static createClient(): MessagesPresenter {
    if (!this.clientInstance) {
      this.clientInstance = new MessagesPresenter();
    }
    return this.clientInstance;
  }
}
