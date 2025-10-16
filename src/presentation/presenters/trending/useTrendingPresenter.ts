"use client";

import { useCallback, useState } from "react";
import {
  TrendingPresenterFactory,
  TrendingViewModel,
} from "./TrendingPresenter";
import { TrendingTopic, TrendingPost } from "@/src/data/trending-mock-data";

// Initialize presenter instance once (singleton pattern)
const presenter = TrendingPresenterFactory.createClient();

/**
 * State interface
 */
export interface TrendingPresenterState {
  viewModel: TrendingViewModel | null;
  loading: boolean;
  error: string | null;
  selectedCategory: string;
  searchQuery: string;
  filteredTopics: TrendingTopic[];
  selectedTopic: TrendingTopic | null;
  selectedTopicPosts: TrendingPost[];
  showTopicModal: boolean;
}

/**
 * Actions interface
 */
export interface TrendingPresenterActions {
  loadData: () => Promise<void>;
  filterByCategory: (category: string) => Promise<void>;
  search: (query: string) => Promise<void>;
  selectTopic: (topic: TrendingTopic) => Promise<void>;
  closeTopicModal: () => void;
  setError: (error: string | null) => void;
}

/**
 * Custom hook for Trending Presenter (Pattern 3A)
 * Returns [state, actions] tuple
 */
export function useTrendingPresenter(
  initialViewModel?: TrendingViewModel
): [TrendingPresenterState, TrendingPresenterActions] {
  const [viewModel, setViewModel] = useState<TrendingViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredTopics, setFilteredTopics] = useState<TrendingTopic[]>(
    initialViewModel?.topics || []
  );
  const [selectedTopic, setSelectedTopic] = useState<TrendingTopic | null>(
    null
  );
  const [selectedTopicPosts, setSelectedTopicPosts] = useState<TrendingPost[]>(
    []
  );
  const [showTopicModal, setShowTopicModal] = useState<boolean>(false);

  /**
   * Load data from presenter
   */
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const newViewModel = await presenter.getViewModel();
      setViewModel(newViewModel);
      setFilteredTopics(newViewModel.topics);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("useTrendingPresenter.loadData error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Filter topics by category
   */
  const filterByCategory = useCallback(async (category: string) => {
    setLoading(true);
    setError(null);
    setSelectedCategory(category);
    setSearchQuery("");

    try {
      const topics = await presenter.getTopicsByCategory(category);
      setFilteredTopics(topics);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("useTrendingPresenter.filterByCategory error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Search topics
   */
  const search = useCallback(async (query: string) => {
    setSearchQuery(query);
    setSelectedCategory("all");

    try {
      const topics = await presenter.searchTopics(query);
      setFilteredTopics(topics);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("useTrendingPresenter.search error:", err);
    }
  }, []);

  /**
   * Select topic to view details
   */
  const selectTopic = useCallback(async (topic: TrendingTopic) => {
    setSelectedTopic(topic);
    setShowTopicModal(true);

    try {
      // Get posts related to this hashtag
      const posts = await presenter.getPostsByHashtag(
        topic.hashtag.replace("#", "")
      );
      setSelectedTopicPosts(posts);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("useTrendingPresenter.selectTopic error:", err);
    }
  }, []);

  /**
   * Close topic modal
   */
  const closeTopicModal = useCallback(() => {
    setShowTopicModal(false);
    setSelectedTopic(null);
    setSelectedTopicPosts([]);
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
      selectedCategory,
      searchQuery,
      filteredTopics,
      selectedTopic,
      selectedTopicPosts,
      showTopicModal,
    },
    {
      loadData,
      filterByCategory,
      search,
      selectTopic,
      closeTopicModal,
      setError: handleSetError,
    },
  ];
}
