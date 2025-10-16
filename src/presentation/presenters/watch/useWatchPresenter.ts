"use client";

import { useCallback, useState } from "react";
import {
  WatchPresenterFactory,
  WatchViewModel,
} from "./WatchPresenter";
import { Video } from "@/src/data/watch-mock-data";

// Initialize presenter instance once (singleton pattern)
const presenter = WatchPresenterFactory.createClient();

/**
 * State interface
 */
export interface WatchPresenterState {
  viewModel: WatchViewModel | null;
  loading: boolean;
  error: string | null;
  selectedCategory: string;
  searchQuery: string;
  filteredVideos: Video[];
  selectedVideo: Video | null;
  showVideoModal: boolean;
}

/**
 * Actions interface
 */
export interface WatchPresenterActions {
  loadData: () => Promise<void>;
  filterByCategory: (category: string) => Promise<void>;
  search: (query: string) => Promise<void>;
  selectVideo: (video: Video) => void;
  closeVideoModal: () => void;
  setError: (error: string | null) => void;
}

/**
 * Custom hook for Watch Presenter (Pattern 3A)
 * Returns [state, actions] tuple
 */
export function useWatchPresenter(
  initialViewModel?: WatchViewModel
): [WatchPresenterState, WatchPresenterActions] {
  const [viewModel, setViewModel] = useState<WatchViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredVideos, setFilteredVideos] = useState<Video[]>(
    initialViewModel?.videos || []
  );
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);

  /**
   * Load data from presenter
   */
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const newViewModel = await presenter.getViewModel();
      setViewModel(newViewModel);
      setFilteredVideos(newViewModel.videos);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("useWatchPresenter.loadData error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Filter videos by category
   */
  const filterByCategory = useCallback(async (category: string) => {
    setLoading(true);
    setError(null);
    setSelectedCategory(category);
    setSearchQuery("");

    try {
      const videos = await presenter.getVideosByCategory(category);
      setFilteredVideos(videos);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("useWatchPresenter.filterByCategory error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Search videos
   */
  const search = useCallback(async (query: string) => {
    setSearchQuery(query);
    setSelectedCategory("all");

    try {
      const videos = await presenter.searchVideos(query);
      setFilteredVideos(videos);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("useWatchPresenter.search error:", err);
    }
  }, []);

  /**
   * Select video to play
   */
  const selectVideo = useCallback((video: Video) => {
    setSelectedVideo(video);
    setShowVideoModal(true);
  }, []);

  /**
   * Close video modal
   */
  const closeVideoModal = useCallback(() => {
    setShowVideoModal(false);
    setSelectedVideo(null);
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
      filteredVideos,
      selectedVideo,
      showVideoModal,
    },
    {
      loadData,
      filterByCategory,
      search,
      selectVideo,
      closeVideoModal,
      setError: handleSetError,
    },
  ];
}
