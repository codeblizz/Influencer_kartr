import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface AppStore {
  user: User | null;
  isLoading: boolean;
  sidebarOpen: boolean;
  notifications: Notification[];
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setSidebarOpen: (open: boolean) => void;
  removeNotification: (id: string) => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
}

export interface Notification {
  id?: string;
  title: string;
  message: string;
  timestamp?: Date;
  type: 'success' | 'error' | 'warning' | 'info';
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      sidebarOpen: false,
      notifications: [],
      setUser: (user) => set({ user }),
      setLoading: (isLoading) => set({ isLoading }),
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      addNotification: (notification) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newNotification = {
          ...notification,
          id,
          timestamp: new Date(),
        };
        set({
          notifications: [newNotification, ...get().notifications.slice(0, 4)],
        });
      },
      removeNotification: (id) => {
        set({
          notifications: get().notifications.filter((n) => n.id !== id),
        });
      },
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({
        user: state.user,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
);
