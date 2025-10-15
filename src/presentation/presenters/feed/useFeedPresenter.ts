"use client";

import { useAuthStore } from "@/src/presentation/stores/authStore";
import { useFeedStore } from "@/src/presentation/stores/feedStore";
import { useCallback, useEffect, useState } from "react";
import { FeedPresenterFactory, FeedViewModel } from "./FeedPresenter";

// Initialize presenter instance once (singleton pattern)
const presenter = FeedPresenterFactory.createClient();

/**
 * State interface
 */
export interface FeedPresenterState {
  viewModel: FeedViewModel | null;
  loading: boolean;
  error: string | null;
}

/**
 * Actions interface
 */
export interface FeedPresenterActions {
  loadData: () => Promise<void>;
  refreshPosts: () => Promise<void>;
  setError: (error: string | null) => void;
}

/**
 * Custom hook for Feed Presenter (Pattern 3A)
 * Returns [state, actions] tuple
 */
export function useFeedPresenter(
  initialViewModel?: FeedViewModel
): [FeedPresenterState, FeedPresenterActions] {
  const { user: currentUser } = useAuthStore();
  const { posts } = useFeedStore();

  const [viewModel, setViewModel] = useState<FeedViewModel | null>(
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
      console.error("useFeedPresenter.loadData error:", err);
    } finally {
      setLoading(false);
    }
  }, [currentUser?.id]);

  /**
   * Refresh posts (same as loadData but can be called manually)
   */
  const refreshPosts = useCallback(async () => {
    await loadData();
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
  }, [currentUser?.id, posts.length, loadData]);

  return [
    {
      viewModel,
      loading,
      error,
    },
    {
      loadData,
      refreshPosts,
      setError: handleSetError,
    },
  ];
}
