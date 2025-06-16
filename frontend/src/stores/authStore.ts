import { create } from 'zustand';
import { login as loginApi, register as registerApi, getProfile as getProfileApi, updateProfile as updateProfileApi } from '../utils/api';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: 'patient' | 'doctor' | 'admin';
  createdAt: string;
  updatedAt: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    specialization?: string;
  }) => Promise<void>;
  logout: () => void;
  fetchProfile: () => Promise<void>;
  editProfile: (data: { firstName: string; lastName: string; email: string }) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await loginApi(email, password) as AuthResponse;
      localStorage.setItem('token', response.token);
      set({ user: response.user, token: response.token, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Login failed',
        isLoading: false,
      });
      throw error;
    }
  },

  register: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await registerApi(data) as AuthResponse;
      localStorage.setItem('token', response.token);
      set({ user: response.user, token: response.token, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Registration failed',
        isLoading: false,
      });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },

  fetchProfile: async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    set({ isLoading: true, error: null });
    try {
      const user = await getProfileApi() as User;
      set({ user, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch profile',
        isLoading: false,
      });
      // If the token is invalid, clear it
      if (error instanceof Error && error.message.includes('401')) {
        localStorage.removeItem('token');
        set({ user: null, token: null });
      }
    }
  },

  editProfile: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const user = await updateProfileApi(data) as User;
      set({ user, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update profile',
        isLoading: false,
      });
      throw error;
    }
  },
})); 