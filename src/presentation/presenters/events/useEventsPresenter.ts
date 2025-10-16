"use client";

import { useCallback, useState } from "react";
import {
  EventsPresenterFactory,
  EventsViewModel,
} from "./EventsPresenter";
import { Event } from "@/src/data/events-mock-data";

// Initialize presenter instance once (singleton pattern)
const presenter = EventsPresenterFactory.createClient();

/**
 * State interface
 */
export interface EventsPresenterState {
  viewModel: EventsViewModel | null;
  loading: boolean;
  error: string | null;
  selectedCategory: string;
  searchQuery: string;
  filteredEvents: Event[];
  selectedEvent: Event | null;
  showEventModal: boolean;
}

/**
 * Actions interface
 */
export interface EventsPresenterActions {
  loadData: () => Promise<void>;
  filterByCategory: (category: string) => Promise<void>;
  search: (query: string) => Promise<void>;
  selectEvent: (event: Event) => void;
  closeEventModal: () => void;
  rsvpEvent: (eventId: string, status: "going" | "maybe" | "not_going") => Promise<void>;
  removeRsvp: (eventId: string) => Promise<void>;
  setError: (error: string | null) => void;
}

/**
 * Custom hook for Events Presenter (Pattern 3A)
 * Returns [state, actions] tuple
 */
export function useEventsPresenter(
  initialViewModel?: EventsViewModel
): [EventsPresenterState, EventsPresenterActions] {
  const [viewModel, setViewModel] = useState<EventsViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(
    initialViewModel?.events || []
  );
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventModal, setShowEventModal] = useState<boolean>(false);

  /**
   * Load data from presenter
   */
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const newViewModel = await presenter.getViewModel();
      setViewModel(newViewModel);
      setFilteredEvents(newViewModel.events);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("useEventsPresenter.loadData error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Filter events by category
   */
  const filterByCategory = useCallback(async (category: string) => {
    setLoading(true);
    setError(null);
    setSelectedCategory(category);
    setSearchQuery("");

    try {
      const events = await presenter.getEventsByCategory(category);
      setFilteredEvents(events);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("useEventsPresenter.filterByCategory error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Search events
   */
  const search = useCallback(async (query: string) => {
    setSearchQuery(query);
    setSelectedCategory("all");

    try {
      const events = await presenter.searchEvents(query);
      setFilteredEvents(events);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("useEventsPresenter.search error:", err);
    }
  }, []);

  /**
   * Select event to view details
   */
  const selectEvent = useCallback((event: Event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  }, []);

  /**
   * Close event modal
   */
  const closeEventModal = useCallback(() => {
    setShowEventModal(false);
    setSelectedEvent(null);
  }, []);

  /**
   * RSVP to event
   */
  const rsvpEvent = useCallback(
    async (eventId: string, status: "going" | "maybe" | "not_going") => {
      try {
        const success = await presenter.rsvpEvent(eventId, status);
        if (success) {
          // Reload data to reflect changes
          await loadData();
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        console.error("useEventsPresenter.rsvpEvent error:", err);
      }
    },
    [loadData]
  );

  /**
   * Remove RSVP
   */
  const removeRsvp = useCallback(
    async (eventId: string) => {
      try {
        const success = await presenter.removeRsvp(eventId);
        if (success) {
          // Reload data to reflect changes
          await loadData();
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        console.error("useEventsPresenter.removeRsvp error:", err);
      }
    },
    [loadData]
  );

  /**
   * Set error
   */
  const handleSetError = useCallback((error: string | null) => {
    setError(error);
  }, []);

  return [
    {
      viewModel,
      loading,
      error,
      selectedCategory,
      searchQuery,
      filteredEvents,
      selectedEvent,
      showEventModal,
    },
    {
      loadData,
      filterByCategory,
      search,
      selectEvent,
      closeEventModal,
      rsvpEvent,
      removeRsvp,
      setError: handleSetError,
    },
  ];
}
