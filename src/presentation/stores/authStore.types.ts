/**
 * Auth Store Types
 * Type definitions for authentication store
 */

export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  avatar?: string;
  coverPhoto?: string;
  bio?: string;
  location?: string;
  website?: string;
  birthday?: string;
  relationshipStatus?: string;
  createdAt: string;
  // Social stats
  friendsCount: number;
  followersCount: number;
  followingCount: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
  updateUser: (data: Partial<User>) => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  username: string;
}

export type AuthStore = AuthState & AuthActions;
