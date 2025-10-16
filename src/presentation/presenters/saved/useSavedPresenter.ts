"use client";

import { useCallback, useState } from "react";
import { SavedPresenterFactory, SavedViewModel } from "./SavedPresenter";
import { SavedItem } from "@/src/data/saved-mock-data";

// Initialize presenter instance once (singleton pattern)
const presenter = SavedPresenterFactory.createClient();

/**
 * State interface
 */
export interface SavedPresenterState {
  viewModel: SavedViewModel | null;
  loading: boolean;
  error: string | null;
  selectedCollection: string;
  searchQuery: string;
  filteredItems: SavedItem[];
  selectedItem: SavedItem | null;
  showItemModal: boolean;
}

/**
 * Actions interface
 */
export interface SavedPresenterActions {
  loadData: () => Promise<void>;
  filterByCollection: (collection: string) => Promise<void>;
  search: (query: string) => Promise<void>;
  selectItem: (item: SavedItem) => void;
  closeItemModal: () => void;
  removeSavedItem: (itemId: string) => Promise<void>;
  setError: (error: string | null) => void;
}

/**
 * Custom hook for Saved Presenter (Pattern 3A)
 * Returns [state, actions] tuple
 */
export function useSavedPresenter(
  initialViewModel?: SavedViewModel
): [SavedPresenterState, SavedPresenterActions] {
  const [viewModel, setViewModel] = useState<SavedViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState<SavedItem[]>(
    initialViewModel?.items || []
  );
  const [selectedItem, setSelectedItem] = useState<SavedItem | null>(null);
  const [showItemModal, setShowItemModal] = useState<boolean>(false);

  /**
   * Load data from presenter
   */
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const newViewModel = await presenter.getViewModel();
      setViewModel(newViewModel);
      setFilteredItems(newViewModel.items);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("useSavedPresenter.loadData error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Filter items by collection
   */
  const filterByCollection = useCallback(async (collection: string) => {
    setLoading(true);
    setError(null);
    setSelectedCollection(collection);
    setSearchQuery("");

    try {
      const items = await presenter.getItemsByCollection(collection);
      setFilteredItems(items);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("useSavedPresenter.filterByCollection error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Search items
   */
  const search = useCallback(async (query: string) => {
    setSearchQuery(query);
    setSelectedCollection("all");

    try {
      const items = await presenter.searchItems(query);
      setFilteredItems(items);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("useSavedPresenter.search error:", err);
    }
  }, []);

  /**
   * Select item to view details
   */
  const selectItem = useCallback((item: SavedItem) => {
    setSelectedItem(item);
    setShowItemModal(true);
  }, []);

  /**
   * Close item modal
   */
  const closeItemModal = useCallback(() => {
    setShowItemModal(false);
    setSelectedItem(null);
  }, []);

  /**
   * Remove saved item
   */
  const removeSavedItem = useCallback(
    async (itemId: string) => {
      try {
        const success = await presenter.removeSavedItem(itemId);
        if (success) {
          // Reload data to reflect changes
          await loadData();
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        console.error("useSavedPresenter.removeSavedItem error:", err);
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
      selectedCollection,
      searchQuery,
      filteredItems,
      selectedItem,
      showItemModal,
    },
    {
      loadData,
      filterByCollection,
      search,
      selectItem,
      closeItemModal,
      removeSavedItem,
      setError: handleSetError,
    },
  ];
}
