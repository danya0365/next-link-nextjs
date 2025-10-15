"use client";

import { useAuthStore } from "@/src/presentation/stores/authStore";
import { useCallback, useEffect, useState } from "react";
import {
  MessagesPresenterFactory,
  MessagesViewModel,
} from "./MessagesPresenter";

// Initialize presenter instance once (singleton pattern)
const presenter = MessagesPresenterFactory.createClient();

/**
 * State interface
 */
export interface MessagesPresenterState {
  viewModel: MessagesViewModel | null;
  loading: boolean;
  error: string | null;
}

/**
 * Actions interface
 */
export interface MessagesPresenterActions {
  loadData: () => Promise<void>;
  setError: (error: string | null) => void;
}

/**
 * Custom hook for Messages Presenter (Pattern 3A)
 * Returns [state, actions] tuple
 */
export function useMessagesPresenter(
  initialViewModel?: MessagesViewModel
): [MessagesPresenterState, MessagesPresenterActions] {
  const { user: currentUser } = useAuthStore();

  const [viewModel, setViewModel] = useState<MessagesViewModel | null>(
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
      console.error("useMessagesPresenter.loadData error:", err);
    } finally {
      setLoading(false);
    }
  }, [currentUser?.id]);

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
      setError: handleSetError,
    },
  ];
}
