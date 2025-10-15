"use client";

import { useAuthStore } from "@/src/presentation/stores/authStore";
import { useCallback, useEffect, useState } from "react";
import {
  NotificationsPresenterFactory,
  NotificationsViewModel,
} from "./NotificationsPresenter";

// Initialize presenter instance once (singleton pattern)
const presenter = NotificationsPresenterFactory.createClient();

/**
 * State interface
 */
export interface NotificationsPresenterState {
  viewModel: NotificationsViewModel | null;
  loading: boolean;
  error: string | null;
}

/**
 * Actions interface
 */
export interface NotificationsPresenterActions {
  loadData: () => Promise<void>;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  setError: (error: string | null) => void;
}

/**
 * Custom hook for Notifications Presenter (Pattern 3A)
 * Returns [state, actions] tuple
 */
export function useNotificationsPresenter(
  initialViewModel?: NotificationsViewModel
): [NotificationsPresenterState, NotificationsPresenterActions] {
  const { user: currentUser } = useAuthStore();

  const [viewModel, setViewModel] = useState<NotificationsViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Load data from presenter
   */
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const newViewModel = await presenter.getViewModel(currentUser?.id);
      setViewModel(newViewModel);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("useNotificationsPresenter.loadData error:", err);
    } finally {
      setLoading(false);
    }
  }, [currentUser?.id]);

  /**
   * Mark notification as read
   */
  const markAsRead = useCallback(
    async (notificationId: string) => {
      try {
        await presenter.markAsRead(notificationId);
        // Reload data to update UI
        await loadData();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        console.error("useNotificationsPresenter.markAsRead error:", err);
      }
    },
    [loadData]
  );

  /**
   * Mark all notifications as read
   */
  const markAllAsRead = useCallback(async () => {
    try {
      await presenter.markAllAsRead();
      // Reload data to update UI
      await loadData();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("useNotificationsPresenter.markAllAsRead error:", err);
    }
  }, [loadData]);

  /**
   * Set error
   */
  const handleSetError = useCallback((error: string | null) => {
    setError(error);
  }, []);

  // Load data on mount or when dependencies change
  useEffect(() => {
    loadData();
  }, [currentUser?.id, loadData]);

  return [
    {
      viewModel,
      loading,
      error,
    },
    {
      loadData,
      markAsRead,
      markAllAsRead,
      setError: handleSetError,
    },
  ];
}
