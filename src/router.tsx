import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ManagerLayout, TenantLayout, SeekerLayout } from './layouts';
import { LoginPage } from './pages/auth/LoginPage';
import { LandingPage } from './pages/landing/LandingPage';
import { ManagerDashboard } from './pages/manager/Dashboard';
import { BuildingsPage } from './pages/manager/Buildings';
import { TenantsPage } from './pages/manager/Tenants';
import { ReportsPage } from './pages/manager/Reports';
import { SettingsPage } from './pages/manager/Settings';
import { TenantHome } from './pages/tenant/TenantHome';
import { TenantRequests, TenantPayments, TenantProfile } from './pages/tenant/TenantPages';
import { DiscoverPage } from './pages/seeker/DiscoverPage';
import { RoommateFinder } from './pages/seeker/RoommateFinder';
import { BrokerDirectory, SeekerProfile } from './pages/seeker/BrokerDirectory';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },

  // ── Manager Routes ──
  {
    path: '/manager',
    element: <ManagerLayout />,
    children: [
      { index: true, element: <ManagerDashboard /> },
      { path: 'home', element: <ManagerDashboard /> },
      { path: 'buildings', element: <BuildingsPage /> },
      { path: 'tenants', element: <TenantsPage /> },
      { path: 'reports', element: <ReportsPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },

  // ── Tenant Routes ──
  {
    path: '/tenant',
    element: <TenantLayout />,
    children: [
      { index: true, element: <TenantHome /> },
      { path: 'home', element: <TenantHome /> },
      { path: 'payments', element: <TenantPayments /> },
      { path: 'requests', element: <TenantRequests /> },
      { path: 'profile', element: <TenantProfile /> },
    ],
  },

  // ── Seeker Routes ──
  {
    path: '/seeker',
    element: <SeekerLayout />,
    children: [
      { index: true, element: <DiscoverPage /> },
      { path: 'discover', element: <DiscoverPage /> },
      { path: 'roommates', element: <RoommateFinder /> },
      { path: 'brokers', element: <BrokerDirectory /> },
      { path: 'profile', element: <SeekerProfile /> },
    ],
  },

  // ── Catch-all ──
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);
