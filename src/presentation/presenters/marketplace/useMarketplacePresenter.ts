"use client";

import { useCallback, useState } from "react";
import {
  MarketplacePresenterFactory,
  MarketplaceViewModel,
} from "./MarketplacePresenter";
import { MarketplaceItem } from "@/src/data/marketplace-mock-data";

// Initialize presenter instance once (singleton pattern)
const presenter = MarketplacePresenterFactory.createClient();

/**
 * State interface
 */
export interface MarketplacePresenterState {
  viewModel: MarketplaceViewModel | null;
  loading: boolean;
  error: string | null;
  selectedCategory: string;
  searchQuery: string;
  filteredItems: MarketplaceItem[];
  selectedItem: MarketplaceItem | null;
  showItemModal: boolean;
  priceRange: { min: number; max: number };
  selectedCondition: "all" | "new" | "used" | "like_new";
}

/**
 * Actions interface
 */
export interface MarketplacePresenterActions {
  loadData: () => Promise<void>;
  filterByCategory: (category: string) => Promise<void>;
  search: (query: string) => Promise<void>;
  selectItem: (item: MarketplaceItem) => void;
  closeItemModal: () => void;
  filterByPriceRange: (min: number, max: number) => Promise<void>;
  filterByCondition: (condition: "new" | "used" | "like_new") => Promise<void>;
  resetFilters: () => Promise<void>;
  setError: (error: string | null) => void;
}

/**
 * Custom hook for Marketplace Presenter (Pattern 3A)
 * Returns [state, actions] tuple
 */
export function useMarketplacePresenter(
  initialViewModel?: MarketplaceViewModel
): [MarketplacePresenterState, MarketplacePresenterActions] {
  const [viewModel, setViewModel] = useState<MarketplaceViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState<MarketplaceItem[]>(
    initialViewModel?.items || []
  );
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(
    null
  );
  const [showItemModal, setShowItemModal] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 1000000,
  });
  const [selectedCondition, setSelectedCondition] = useState<
    "all" | "new" | "used" | "like_new"
  >("all");

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
      console.error("useMarketplacePresenter.loadData error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Filter items by category
   */
  const filterByCategory = useCallback(async (category: string) => {
    setLoading(true);
    setError(null);
    setSelectedCategory(category);
    setSearchQuery("");
    setSelectedCondition("all");

    try {
      const items = await presenter.getItemsByCategory(category);
      setFilteredItems(items);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("useMarketplacePresenter.filterByCategory error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Search items
   */
  const search = useCallback(async (query: string) => {
    setSearchQuery(query);
    setSelectedCategory("all");
    setSelectedCondition("all");

    try {
      const items = await presenter.searchItems(query);
      setFilteredItems(items);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("useMarketplacePresenter.search error:", err);
    }
  }, []);

  /**
   * Select item to view details
   */
  const selectItem = useCallback((item: MarketplaceItem) => {
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
   * Filter by price range
   */
  const filterByPriceRange = useCallback(
    async (min: number, max: number) => {
      setPriceRange({ min, max });

      try {
        const items = await presenter.filterByPriceRange(min, max);
        setFilteredItems(items);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        console.error("useMarketplacePresenter.filterByPriceRange error:", err);
      }
    },
    []
  );

  /**
   * Filter by condition
   */
  const filterByCondition = useCallback(
    async (condition: "new" | "used" | "like_new") => {
      setSelectedCondition(condition);

      try {
        const items = await presenter.filterByCondition(condition);
        setFilteredItems(items);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        console.error("useMarketplacePresenter.filterByCondition error:", err);
      }
    },
    []
  );

  /**
   * Reset all filters
   */
  const resetFilters = useCallback(async () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setSelectedCondition("all");
    setPriceRange({ min: 0, max: 1000000 });
    await loadData();
  }, [loadData]);

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
      filteredItems,
      selectedItem,
      showItemModal,
      priceRange,
      selectedCondition,
    },
    {
      loadData,
      filterByCategory,
      search,
      selectItem,
      closeItemModal,
      filterByPriceRange,
      filterByCondition,
      resetFilters,
      setError: handleSetError,
    },
  ];
}
