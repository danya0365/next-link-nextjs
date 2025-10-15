"use client";

import { useAuthStore } from "@/src/presentation/stores/authStore";
import { useCallback, useEffect, useState } from "react";
import {
  SettingsPresenterFactory,
  SettingsViewModel,
  UserSettings,
} from "./SettingsPresenter";

// Initialize presenter instance once (singleton pattern)
const presenter = SettingsPresenterFactory.createClient();

/**
 * State interface
 */
export interface SettingsPresenterState {
  viewModel: SettingsViewModel | null;
  loading: boolean;
  error: string | null;
  saving: boolean;
}

/**
 * Actions interface
 */
export interface SettingsPresenterActions {
  loadData: () => Promise<void>;
  updateSettings: (settings: Partial<UserSettings>) => Promise<void>;
  setError: (error: string | null) => void;
}

/**
 * Custom hook for Settings Presenter (Pattern 3A)
 * Returns [state, actions] tuple
 */
export function useSettingsPresenter(
  initialViewModel?: SettingsViewModel
): [SettingsPresenterState, SettingsPresenterActions] {
  const { user: currentUser } = useAuthStore();

  const [viewModel, setViewModel] = useState<SettingsViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
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
      console.error("useSettingsPresenter.loadData error:", err);
    } finally {
      setLoading(false);
    }
  }, [currentUser?.id]);

  /**
   * Update settings
   */
  const updateSettings = useCallback(
    async (settings: Partial<UserSettings>) => {
      if (!currentUser?.id) {
        setError("User not authenticated");
        return;
      }

      setSaving(true);
      setError(null);

      try {
        await presenter.updateSettings(currentUser.id, settings);
        // Reload data to reflect changes
        await loadData();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        console.error("useSettingsPresenter.updateSettings error:", err);
      } finally {
        setSaving(false);
      }
    },
    [currentUser?.id, loadData]
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
      saving,
    },
    {
      loadData,
      updateSettings,
      setError: handleSetError,
    },
  ];
}
