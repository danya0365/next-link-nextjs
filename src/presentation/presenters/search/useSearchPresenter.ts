"use client";

import { useCallback, useState } from "react";
import {
  SearchPresenterFactory,
  SearchViewModel,
} from "./SearchPresenter";

// Initialize presenter instance once (singleton pattern)
const presenter = SearchPresenterFactory.createClient();

/**
 * State interface
 */
export interface SearchPresenterState {
  viewModel: SearchViewModel | null;
  loading: boolean;
  error: string | null;
}

/**
 * Actions interface
 */
export interface SearchPresenterActions {
  search: (query: string) => Promise<void>;
  clearSearch: () => void;
  setError: (error: string | null) => void;
}

/**
 * Custom hook for Search Presenter (Pattern 3A)
 * Returns [state, actions] tuple
 */
export function useSearchPresenter(
  initialViewModel?: SearchViewModel
): [SearchPresenterState, SearchPresenterActions] {
  const [viewModel, setViewModel] = useState<SearchViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Search
   */
  const search = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);

    try {
      const newViewModel = await presenter.search(query);
      setViewModel(newViewModel);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("useSearchPresenter.search error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Clear search
   */
  const clearSearch = useCallback(() => {
    setViewModel({
      query: "",
      results: {
        users: [],
        posts: [],
      },
      totalResults: 0,
    });
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
      search,
      clearSearch,
      setError: handleSetError,
    },
  ];
}
