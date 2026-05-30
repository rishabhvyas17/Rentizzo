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
  loginAsOwner: () => void;
  loginAsBroker: () => void;
  switchRole: (role: UserRole) => void;
  logout: () => void;
}

const mockOwnerUser: User = {
  id: 'u-050', phone: '+919876500001', name: 'Vikram Mehta',
  email: 'vikram@mehtaproperties.in', gender: 'male', role: 'owner',
  isVerified: true, createdAt: '2025-06-01T10:00:00Z'
};

const mockBrokerUser: User = {
  id: 'u-030', phone: '+919876500002', name: 'Rajesh Kumar',
  email: 'rajesh.broker@gmail.com', gender: 'male', role: 'broker',
  isVerified: true, createdAt: '2025-08-15T10:00:00Z'
};

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

      loginAsOwner: () => set({
        user: mockOwnerUser,
        isAuthenticated: true,
        currentRole: 'owner',
        otpSent: false,
      }),

      loginAsBroker: () => set({
        user: mockBrokerUser,
        isAuthenticated: true,
        currentRole: 'broker',
        otpSent: false,
      }),

      switchRole: (role) => {
        const roleUsers: Record<UserRole, User> = {
          manager: mockCurrentUser,
          tenant: mockTenantUser,
          seeker: { ...mockTenantUser, id: 'u-040', name: 'Nitin Verma', role: 'seeker' as UserRole },
          owner: mockOwnerUser,
          broker: mockBrokerUser,
        };
        set({
          user: roleUsers[role],
          isAuthenticated: true,
          currentRole: role,
        });
      },

      logout: () => set({
        user: null,
        isAuthenticated: false,
        otpSent: false,
        otpPhone: '',
        currentRole: 'manager',
      }),
    }),
    { name: 'rentizzo-auth' }
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
