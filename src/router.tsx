import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ManagerLayout, TenantLayout, SeekerLayout, OwnerLayout, BrokerLayout } from './layouts';
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
import { OwnerDashboard } from './pages/owner/OwnerDashboard';
import { OwnerProperties } from './pages/owner/OwnerProperties';
import { OwnerSettings } from './pages/owner/OwnerSettings';
import { BrokerDashboard } from './pages/broker/BrokerDashboard';
import { BrokerListings } from './pages/broker/BrokerListings';
import { BrokerReviews } from './pages/broker/BrokerReviews';
import { BrokerProfile } from './pages/broker/BrokerProfile';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },

  // ── Owner Routes ──
  {
    path: '/owner',
    element: <OwnerLayout />,
    children: [
      { index: true, element: <OwnerDashboard /> },
      { path: 'home', element: <OwnerDashboard /> },
      { path: 'properties', element: <OwnerProperties /> },
      { path: 'managers', element: <TenantsPage /> },
      { path: 'reports', element: <ReportsPage /> },
      { path: 'settings', element: <OwnerSettings /> },
    ],
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

  // ── Broker Routes ──
  {
    path: '/broker',
    element: <BrokerLayout />,
    children: [
      { index: true, element: <BrokerDashboard /> },
      { path: 'home', element: <BrokerDashboard /> },
      { path: 'listings', element: <BrokerListings /> },
      { path: 'reviews', element: <BrokerReviews /> },
      { path: 'profile', element: <BrokerProfile /> },
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
