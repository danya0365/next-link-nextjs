"use client";

import { useCallback, useEffect, useState } from "react";
import {
  PagesPresenterFactory,
  PagesViewModel,
} from "./PagesPresenter";
import { Page } from "@/src/data/pages-mock-data";

// Initialize presenter instance once (singleton pattern)
const presenter = PagesPresenterFactory.createClient();

/**
 * State interface
 */
export interface PagesPresenterState {
  viewModel: PagesViewModel | null;
  loading: boolean;
  error: string | null;
  selectedCategory: string;
  searchQuery: string;
  filteredPages: Page[];
  selectedPage: Page | null;
  showPageModal: boolean;
}

/**
 * Actions interface
 */
export interface PagesPresenterActions {
  loadData: () => Promise<void>;
  setCategory: (categoryId: string) => void;
  setSearchQuery: (query: string) => void;
  selectPage: (page: Page) => void;
  closePageModal: () => void;
  toggleFollowPage: (pageId: string) => Promise<void>;
  toggleLikePage: (pageId: string) => Promise<void>;
  setError: (error: string | null) => void;
}

/**
 * Custom hook for Pages Presenter (Pattern 3A)
 * Returns [state, actions] tuple
 */
export function usePagesPresenter(
  initialViewModel?: PagesViewModel
): [PagesPresenterState, PagesPresenterActions] {
  const [viewModel, setViewModel] = useState<PagesViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredPages, setFilteredPages] = useState<Page[]>([]);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [showPageModal, setShowPageModal] = useState<boolean>(false);

  /**
   * Load data from presenter
   */
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const newViewModel = await presenter.getViewModel();
      setViewModel(newViewModel);
      setFilteredPages(newViewModel.pages);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("usePagesPresenter.loadData error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Set category filter
   */
  const handleSetCategory = useCallback(
    async (categoryId: string) => {
      setSelectedCategory(categoryId);
      setSearchQuery("");
      try {
        const pages = await presenter.getPagesByCategory(categoryId);
        setFilteredPages(pages);
      } catch (err) {
        console.error("usePagesPresenter.setCategory error:", err);
      }
    },
    []
  );

  /**
   * Set search query
   */
  const handleSetSearchQuery = useCallback(
    async (query: string) => {
      setSearchQuery(query);
      setSelectedCategory("all");
      try {
        const pages = await presenter.searchPages(query);
        setFilteredPages(pages);
      } catch (err) {
        console.error("usePagesPresenter.setSearchQuery error:", err);
      }
    },
    []
  );

  /**
   * Select page to view details
   */
  const selectPage = useCallback((page: Page) => {
    setSelectedPage(page);
    setShowPageModal(true);
  }, []);

  /**
   * Close page modal
   */
  const closePageModal = useCallback(() => {
    setShowPageModal(false);
    setSelectedPage(null);
  }, []);

  /**
   * Toggle follow page
   */
  const toggleFollowPage = useCallback(
    async (pageId: string) => {
      try {
        const success = await presenter.toggleFollowPage(pageId);
        if (success) {
          await loadData();
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        console.error("usePagesPresenter.toggleFollowPage error:", err);
      }
    },
    [loadData]
  );

  /**
   * Toggle like page
   */
  const toggleLikePage = useCallback(
    async (pageId: string) => {
      try {
        const success = await presenter.toggleLikePage(pageId);
        if (success) {
          await loadData();
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        console.error("usePagesPresenter.toggleLikePage error:", err);
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

  // Load initial data if no initial view model provided
  useEffect(() => {
    if (!initialViewModel) {
      loadData();
    }
  }, [initialViewModel, loadData]);

  return [
    {
      viewModel,
      loading,
      error,
      selectedCategory,
      searchQuery,
      filteredPages,
      selectedPage,
      showPageModal,
    },
    {
      loadData,
      setCategory: handleSetCategory,
      setSearchQuery: handleSetSearchQuery,
      selectPage,
      closePageModal,
      toggleFollowPage,
      toggleLikePage,
      setError: handleSetError,
    },
  ];
}
