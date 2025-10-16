"use client";

import { useCallback, useState } from "react";
import {
  GroupsPresenterFactory,
  GroupsViewModel,
} from "./GroupsPresenter";
import { Group } from "@/src/data/groups-mock-data";

// Initialize presenter instance once (singleton pattern)
const presenter = GroupsPresenterFactory.createClient();

/**
 * State interface
 */
export interface GroupsPresenterState {
  viewModel: GroupsViewModel | null;
  loading: boolean;
  error: string | null;
  selectedCategory: string;
  searchQuery: string;
  filteredGroups: Group[];
  selectedGroup: Group | null;
  showGroupModal: boolean;
}

/**
 * Actions interface
 */
export interface GroupsPresenterActions {
  loadData: () => Promise<void>;
  filterByCategory: (category: string) => Promise<void>;
  search: (query: string) => Promise<void>;
  selectGroup: (group: Group) => void;
  closeGroupModal: () => void;
  joinGroup: (groupId: string) => Promise<void>;
  leaveGroup: (groupId: string) => Promise<void>;
  setError: (error: string | null) => void;
}

/**
 * Custom hook for Groups Presenter (Pattern 3A)
 * Returns [state, actions] tuple
 */
export function useGroupsPresenter(
  initialViewModel?: GroupsViewModel
): [GroupsPresenterState, GroupsPresenterActions] {
  const [viewModel, setViewModel] = useState<GroupsViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredGroups, setFilteredGroups] = useState<Group[]>(
    initialViewModel?.groups || []
  );
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [showGroupModal, setShowGroupModal] = useState<boolean>(false);

  /**
   * Load data from presenter
   */
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const newViewModel = await presenter.getViewModel();
      setViewModel(newViewModel);
      setFilteredGroups(newViewModel.groups);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("useGroupsPresenter.loadData error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Filter groups by category
   */
  const filterByCategory = useCallback(async (category: string) => {
    setLoading(true);
    setError(null);
    setSelectedCategory(category);
    setSearchQuery("");

    try {
      const groups = await presenter.getGroupsByCategory(category);
      setFilteredGroups(groups);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("useGroupsPresenter.filterByCategory error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Search groups
   */
  const search = useCallback(async (query: string) => {
    setSearchQuery(query);
    setSelectedCategory("all");

    try {
      const groups = await presenter.searchGroups(query);
      setFilteredGroups(groups);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("useGroupsPresenter.search error:", err);
    }
  }, []);

  /**
   * Select group to view details
   */
  const selectGroup = useCallback((group: Group) => {
    setSelectedGroup(group);
    setShowGroupModal(true);
  }, []);

  /**
   * Close group modal
   */
  const closeGroupModal = useCallback(() => {
    setShowGroupModal(false);
    setSelectedGroup(null);
  }, []);

  /**
   * Join group
   */
  const joinGroup = useCallback(
    async (groupId: string) => {
      try {
        const success = await presenter.joinGroup(groupId);
        if (success) {
          // Reload data to reflect changes
          await loadData();
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        console.error("useGroupsPresenter.joinGroup error:", err);
      }
    },
    [loadData]
  );

  /**
   * Leave group
   */
  const leaveGroup = useCallback(
    async (groupId: string) => {
      try {
        const success = await presenter.leaveGroup(groupId);
        if (success) {
          // Reload data to reflect changes
          await loadData();
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        console.error("useGroupsPresenter.leaveGroup error:", err);
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
      selectedCategory,
      searchQuery,
      filteredGroups,
      selectedGroup,
      showGroupModal,
    },
    {
      loadData,
      filterByCategory,
      search,
      selectGroup,
      closeGroupModal,
      joinGroup,
      leaveGroup,
      setError: handleSetError,
    },
  ];
}
