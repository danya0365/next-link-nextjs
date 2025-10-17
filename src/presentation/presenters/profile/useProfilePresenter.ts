"use client";

import { useAuthStore } from "@/src/presentation/stores/authStore";
import { useCallback, useEffect, useState } from "react";
import { ProfilePresenterFactory, ProfileViewModel } from "./ProfilePresenter";

// Initialize presenter instance once (singleton pattern)
const presenter = ProfilePresenterFactory.createClient();

export interface ProfilePresenterState {
  viewModel: ProfileViewModel | null;
  loading: boolean;
  error: string | null;
  activeTab: "posts" | "about" | "photos" | "friends";
}

export interface ProfilePresenterActions {
  loadData: () => Promise<void>;
  setActiveTab: (tab: "posts" | "about" | "photos" | "friends") => void;
  setError: (error: string | null) => void;
}

/**
 * Custom hook for Profile presenter
 * Provides state management and actions for Profile operations
 */
export function useProfilePresenter(
  userId: string,
  initialViewModel?: ProfileViewModel
): [ProfilePresenterState, ProfilePresenterActions] {
  const { user: currentUser } = useAuthStore();

  const [viewModel, setViewModel] = useState<ProfileViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "posts" | "about" | "photos" | "friends"
  >("posts");

  /**
   * Load data from presenter
   */
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const newViewModel = await presenter.getViewModel(
        userId,
        currentUser?.id
      );
      setViewModel(newViewModel);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Error loading profile data:", err);
    } finally {
      setLoading(false);
    }
  }, [userId, currentUser?.id]);

  /**
   * Set active tab
   */
  const handleSetActiveTab = useCallback(
    (tab: "posts" | "about" | "photos" | "friends") => {
      setActiveTab(tab);
    },
    []
  );

  /**
   * Set error
   */
  const handleSetError = useCallback((error: string | null) => {
    setError(error);
  }, []);

  // Load data on mount or when userId/posts change
  useEffect(() => {
    loadData();
  }, [userId, currentUser?.id, loadData]);

  return [
    {
      viewModel,
      loading,
      error,
      activeTab,
    },
    {
      loadData,
      setActiveTab: handleSetActiveTab,
      setError: handleSetError,
    },
  ];
}
