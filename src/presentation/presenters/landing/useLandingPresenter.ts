"use client";

import { useCallback, useState } from "react";
import {
  LandingPresenterFactory,
  LandingViewModel,
} from "./LandingPresenter";

// Initialize presenter instance once (singleton pattern)
const presenter = LandingPresenterFactory.createClient();

/**
 * State interface
 */
export interface LandingPresenterState {
  viewModel: LandingViewModel | null;
  loading: boolean;
  error: string | null;
}

/**
 * Actions interface
 */
export interface LandingPresenterActions {
  loadData: () => Promise<void>;
  setError: (error: string | null) => void;
}

/**
 * Custom hook for Landing Presenter (Pattern 3A)
 * Returns [state, actions] tuple
 */
export function useLandingPresenter(
  initialViewModel?: LandingViewModel
): [LandingPresenterState, LandingPresenterActions] {
  const [viewModel, setViewModel] = useState<LandingViewModel | null>(
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
      const newViewModel = await presenter.getViewModel();
      setViewModel(newViewModel);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("useLandingPresenter.loadData error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

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
    },
    {
      loadData,
      setError: handleSetError,
    },
  ];
}
