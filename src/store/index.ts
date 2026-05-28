import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UserRole } from '../types';
import { mockCurrentUser, mockTenantUser } from '../lib/mock/data';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  otpSent: boolean;
  otpPhone: string;
  currentRole: UserRole;
  setUser: (user: User) => void;
  setRole: (role: UserRole) => void;
  sendOtp: (phone: string) => void;
  verifyOtp: (otp: string) => boolean;
  loginAsManager: () => void;
  loginAsTenant: () => void;
  loginAsSeeker: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      otpSent: false,
      otpPhone: '',
      currentRole: 'manager',

      setUser: (user) => set({ user, isAuthenticated: true, currentRole: user.role }),
      setRole: (role) => set({ currentRole: role }),

      sendOtp: (phone) => set({ otpSent: true, otpPhone: phone }),

      verifyOtp: (_otp) => {
        // Mock: always succeeds
        return true;
      },

      loginAsManager: () => set({
        user: mockCurrentUser,
        isAuthenticated: true,
        currentRole: 'manager',
        otpSent: false,
      }),

      loginAsTenant: () => set({
        user: mockTenantUser,
        isAuthenticated: true,
        currentRole: 'tenant',
        otpSent: false,
      }),

      loginAsSeeker: () => set({
        user: { ...mockTenantUser, id: 'u-040', name: 'Nitin Verma', role: 'seeker' as UserRole },
        isAuthenticated: true,
        currentRole: 'seeker',
        otpSent: false,
      }),

      logout: () => set({
        user: null,
        isAuthenticated: false,
        otpSent: false,
        otpPhone: '',
        currentRole: 'manager',
      }),
    }),
    { name: 'nestease-auth' }
  )
);

// ── UI Store ──

interface UIState {
  theme: 'dark' | 'light';
  sidebarOpen: boolean;
  activeBuildingId: string | null;
  activeTab: string;
  toasts: Array<{ id: string; message: string; type: 'success' | 'error' | 'info' }>;
  toggleTheme: () => void;
  setSidebarOpen: (open: boolean) => void;
  setActiveBuilding: (id: string | null) => void;
  setActiveTab: (tab: string) => void;
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIState>()((set) => ({
  theme: 'dark',
  sidebarOpen: false,
  activeBuildingId: null,
  activeTab: 'home',
  toasts: [],

  toggleTheme: () => set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setActiveBuilding: (id) => set({ activeBuildingId: id }),
  setActiveTab: (tab) => set({ activeTab: tab }),

  addToast: (message, type = 'info') => {
    const id = Date.now().toString();
    set((s) => ({ toasts: [...s.toasts, { id, message, type }] }));
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    }, 4000);
  },

  removeToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
