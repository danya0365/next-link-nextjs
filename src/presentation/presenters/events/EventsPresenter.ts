import {
  mockEvents,
  eventCategories,
  Event,
} from "@/src/data/events-mock-data";

export interface EventsViewModel {
  events: Event[];
  categories: typeof eventCategories;
  yourEvents: Event[];
  upcomingEvents: Event[];
  onlineEvents: Event[];
  totalEvents: number;
}

/**
 * Events Presenter
 * Business logic for Events page
 */
export class EventsPresenter {
  /**
   * Get view model for the events page
   */
  async getViewModel(): Promise<EventsViewModel> {
    try {
      // Get all events
      const events = [...mockEvents];

      // Get user's events (where userRsvp is "going")
      const yourEvents = events.filter((event) => event.userRsvp === "going");

      // Get upcoming events (sort by start date)
      const upcomingEvents = [...events]
        .sort(
          (a, b) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        )
        .slice(0, 6);

      // Get online events
      const onlineEvents = events.filter((event) => event.isOnline);

      return {
        events,
        categories: eventCategories,
        yourEvents,
        upcomingEvents,
        onlineEvents,
        totalEvents: events.length,
      };
    } catch (error) {
      console.error("EventsPresenter.getViewModel error:", error);
      throw new Error("Failed to load events data");
    }
  }

  /**
   * Get events by category
   */
  async getEventsByCategory(category: string): Promise<Event[]> {
    try {
      if (category === "all") {
        return mockEvents;
      }

      if (category === "your-events") {
        return mockEvents.filter((event) => event.userRsvp === "going");
      }

      if (category === "online") {
        return mockEvents.filter((event) => event.isOnline);
      }

      if (category === "today") {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        return mockEvents.filter((event) => {
          const eventDate = new Date(event.startDate);
          return eventDate >= today && eventDate < tomorrow;
        });
      }

      if (category === "this-week") {
        const today = new Date();
        const nextWeek = new Date(today);
        nextWeek.setDate(nextWeek.getDate() + 7);

        return mockEvents.filter((event) => {
          const eventDate = new Date(event.startDate);
          return eventDate >= today && eventDate <= nextWeek;
        });
      }

      return mockEvents.filter((event) => event.category === category);
    } catch (error) {
      console.error("EventsPresenter.getEventsByCategory error:", error);
      return [];
    }
  }

  /**
   * Search events
   */
  async searchEvents(query: string): Promise<Event[]> {
    try {
      if (!query.trim()) {
        return mockEvents;
      }

      const lowerQuery = query.toLowerCase();
      return mockEvents.filter(
        (event) =>
          event.name.toLowerCase().includes(lowerQuery) ||
          event.description.toLowerCase().includes(lowerQuery) ||
          event.location.name.toLowerCase().includes(lowerQuery) ||
          event.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
      );
    } catch (error) {
      console.error("EventsPresenter.searchEvents error:", error);
      return [];
    }
  }

  /**
   * Get event by ID
   */
  async getEventById(id: string): Promise<Event | null> {
    try {
      return mockEvents.find((event) => event.id === id) || null;
    } catch (error) {
      console.error("EventsPresenter.getEventById error:", error);
      return null;
    }
  }

  /**
   * RSVP to event
   */
  async rsvpEvent(
    eventId: string,
    status: "going" | "maybe" | "not_going"
  ): Promise<boolean> {
    try {
      // Mock implementation - in real app, this would call API
      const event = mockEvents.find((e) => e.id === eventId);
      if (event) {
        // Remove from previous status
        if (event.userRsvp === "going") event.attendees.going -= 1;
        else if (event.userRsvp === "maybe") event.attendees.maybe -= 1;
        else if (event.userRsvp === "not_going") event.attendees.notGoing -= 1;

        // Add to new status
        if (status === "going") event.attendees.going += 1;
        else if (status === "maybe") event.attendees.maybe += 1;
        else if (status === "not_going") event.attendees.notGoing += 1;

        event.userRsvp = status;
        return true;
      }
      return false;
    } catch (error) {
      console.error("EventsPresenter.rsvpEvent error:", error);
      return false;
    }
  }

  /**
   * Remove RSVP
   */
  async removeRsvp(eventId: string): Promise<boolean> {
    try {
      // Mock implementation - in real app, this would call API
      const event = mockEvents.find((e) => e.id === eventId);
      if (event && event.userRsvp) {
        // Remove from status
        if (event.userRsvp === "going") event.attendees.going -= 1;
        else if (event.userRsvp === "maybe") event.attendees.maybe -= 1;
        else if (event.userRsvp === "not_going") event.attendees.notGoing -= 1;

        event.userRsvp = null;
        return true;
      }
      return false;
    } catch (error) {
      console.error("EventsPresenter.removeRsvp error:", error);
      return false;
    }
  }

  /**
   * Generate metadata for the page
   */
  async generateMetadata() {
    return {
      title: "Events - อีเว้นท์และกิจกรรม | Next Link",
      description:
        "ค้นหาและเข้าร่วมอีเว้นท์ที่น่าสนใจ ทั้งออนไลน์และออฟไลน์ เวิร์คช็อป คอนเสิร์ต งานกีฬา และกิจกรรมมากมาย",
      keywords: [
        "events",
        "อีเว้นท์",
        "กิจกรรม",
        "workshop",
        "concert",
        "meetup",
      ],
      openGraph: {
        title: "Events - อีเว้นท์และกิจกรรม | Next Link",
        description:
          "ค้นหาและเข้าร่วมอีเว้นท์ที่น่าสนใจ ทั้งออนไลน์และออฟไลน์",
        type: "website",
        locale: "th_TH",
      },
    };
  }
}

/**
 * Factory for creating presenter instances
 */
export class EventsPresenterFactory {
  private static clientInstance: EventsPresenter | null = null;

  /**
   * Create server-side presenter (new instance)
   */
  static async createServer(): Promise<EventsPresenter> {
    return new EventsPresenter();
  }

  /**
   * Create client-side presenter (singleton)
   */
  static createClient(): EventsPresenter {
    if (!this.clientInstance) {
      this.clientInstance = new EventsPresenter();
    }
    return this.clientInstance;
  }
}
