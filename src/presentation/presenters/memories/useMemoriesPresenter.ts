"use client";

import { useCallback, useState } from "react";
import {
  MemoriesPresenterFactory,
  MemoriesViewModel,
} from "./MemoriesPresenter";
import { Memory } from "@/src/data/memories-mock-data";

// Initialize presenter instance once (singleton pattern)
const presenter = MemoriesPresenterFactory.createClient();

/**
 * State interface
 */
export interface MemoriesPresenterState {
  viewModel: MemoriesViewModel | null;
  loading: boolean;
  error: string | null;
  selectedMemory: Memory | null;
  showMemoryModal: boolean;
}

/**
 * Actions interface
 */
export interface MemoriesPresenterActions {
  loadData: () => Promise<void>;
  selectMemory: (memory: Memory) => void;
  closeMemoryModal: () => void;
  shareMemory: (memoryId: string) => Promise<void>;
  setError: (error: string | null) => void;
}

/**
 * Custom hook for Memories Presenter (Pattern 3A)
 * Returns [state, actions] tuple
 */
export function useMemoriesPresenter(
  initialViewModel?: MemoriesViewModel
): [MemoriesPresenterState, MemoriesPresenterActions] {
  const [viewModel, setViewModel] = useState<MemoriesViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [showMemoryModal, setShowMemoryModal] = useState<boolean>(false);

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
      console.error("useMemoriesPresenter.loadData error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Select memory to view details
   */
  const selectMemory = useCallback((memory: Memory) => {
    setSelectedMemory(memory);
    setShowMemoryModal(true);
  }, []);

  /**
   * Close memory modal
   */
  const closeMemoryModal = useCallback(() => {
    setShowMemoryModal(false);
    setSelectedMemory(null);
  }, []);

  /**
   * Share memory
   */
  const shareMemory = useCallback(
    async (memoryId: string) => {
      try {
        const success = await presenter.shareMemory(memoryId);
        if (success) {
          // Reload data to reflect changes
          await loadData();
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        console.error("useMemoriesPresenter.shareMemory error:", err);
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
      selectedMemory,
      showMemoryModal,
    },
    {
      loadData,
      selectMemory,
      closeMemoryModal,
      shareMemory,
      setError: handleSetError,
    },
  ];
}
