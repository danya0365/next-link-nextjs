"use client";

import { useAuthStore } from "@/src/presentation/stores/authStore";
import { useCallback, useEffect, useState } from "react";
import {
  FriendsPresenterFactory,
  FriendsViewModel,
} from "./FriendsPresenter";

// Initialize presenter instance once (singleton pattern)
const presenter = FriendsPresenterFactory.createClient();

/**
 * State interface
 */
export interface FriendsPresenterState {
  viewModel: FriendsViewModel | null;
  loading: boolean;
  error: string | null;
}

/**
 * Actions interface
 */
export interface FriendsPresenterActions {
  loadData: () => Promise<void>;
  acceptFriendRequest: (friendId: string) => Promise<void>;
  rejectFriendRequest: (friendId: string) => Promise<void>;
  removeFriend: (friendId: string) => Promise<void>;
  sendFriendRequest: (friendId: string) => Promise<void>;
  setError: (error: string | null) => void;
}

/**
 * Custom hook for Friends Presenter (Pattern 3A)
 * Returns [state, actions] tuple
 */
export function useFriendsPresenter(
  initialViewModel?: FriendsViewModel
): [FriendsPresenterState, FriendsPresenterActions] {
  const { user: currentUser } = useAuthStore();

  const [viewModel, setViewModel] = useState<FriendsViewModel | null>(
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
      console.error("useFriendsPresenter.loadData error:", err);
    } finally {
      setLoading(false);
    }
  }, [currentUser?.id]);

  /**
   * Accept friend request
   */
  const acceptFriendRequest = useCallback(
    async (friendId: string) => {
      try {
        await presenter.acceptFriendRequest(friendId);
        // Reload data to update UI
        await loadData();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        console.error("useFriendsPresenter.acceptFriendRequest error:", err);
      }
    },
    [loadData]
  );

  /**
   * Reject friend request
   */
  const rejectFriendRequest = useCallback(
    async (friendId: string) => {
      try {
        await presenter.rejectFriendRequest(friendId);
        // Reload data to update UI
        await loadData();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        console.error("useFriendsPresenter.rejectFriendRequest error:", err);
      }
    },
    [loadData]
  );

  /**
   * Remove friend
   */
  const removeFriend = useCallback(
    async (friendId: string) => {
      try {
        await presenter.removeFriend(friendId);
        // Reload data to update UI
        await loadData();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        console.error("useFriendsPresenter.removeFriend error:", err);
      }
    },
    [loadData]
  );

  /**
   * Send friend request
   */
  const sendFriendRequest = useCallback(
    async (friendId: string) => {
      try {
        await presenter.sendFriendRequest(friendId);
        // Reload data to update UI
        await loadData();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        console.error("useFriendsPresenter.sendFriendRequest error:", err);
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
      acceptFriendRequest,
      rejectFriendRequest,
      removeFriend,
      sendFriendRequest,
      setError: handleSetError,
    },
  ];
}
