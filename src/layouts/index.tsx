import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { TabBar, Avatar, ToastContainer } from '../components/ui';
import { useAuthStore, useUIStore } from '../store';
import {
  LayoutDashboard, Building2, Users, BarChart3, Settings,
  Home, CreditCard, Wrench, UserCircle, Search, Heart, X,
  Menu, LogOut, Bell
} from 'lucide-react';
import { useState } from 'react';

// ── Manager Layout ──

const managerTabs = [
  { id: 'home', label: 'Home', icon: <LayoutDashboard size={20} /> },
  { id: 'buildings', label: 'Buildings', icon: <Building2 size={20} /> },
  { id: 'tenants', label: 'Tenants', icon: <Users size={20} /> },
  { id: 'reports', label: 'Reports', icon: <BarChart3 size={20} /> },
  { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
];

export function ManagerLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const { toasts, removeToast } = useUIStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeTab = location.pathname.split('/')[2] || 'home';

  const handleTabChange = (id: string) => {
    const path = id === 'home' ? '/manager' : `/manager/${id}`;
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-mesh-dark">
      <div className="gradient-mesh" />

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 flex-col glass-elevated border-r border-glass-border z-30">
        <div className="p-5 border-b border-glass-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Building2 size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-text-primary font-heading">NestEase</h1>
              <p className="text-[10px] text-text-tertiary font-medium uppercase tracking-wider">Rental Ecosystem</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {managerTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative
                  ${isActive ? 'text-accent-blue-light' : 'text-text-secondary hover:text-text-primary hover:bg-glass-hover'}`}
                onClick={() => handleTabChange(tab.id)}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-accent-blue/10 rounded-xl border border-accent-blue/20"
                    layoutId="sidebar-indicator"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.icon}</span>
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-glass-border">
          <div className="flex items-center gap-3 p-2">
            <Avatar name={user?.name || 'User'} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">{user?.name}</p>
              <p className="text-[10px] text-text-tertiary uppercase">Manager</p>
            </div>
            <button className="p-1.5 text-text-tertiary hover:text-accent-coral rounded-lg transition-colors" onClick={logout}>
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-30 glass-elevated border-b border-glass-border">
        <div className="flex items-center justify-between px-4 py-3">
          <button className="p-1.5 text-text-secondary" onClick={() => setSidebarOpen(true)}>
            <Menu size={22} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Building2 size={14} className="text-white" />
            </div>
            <span className="text-sm font-bold font-heading text-text-primary">NestEase</span>
          </div>
          <button className="p-1.5 text-text-secondary relative">
            <Bell size={20} />
            <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-accent-coral rounded-full" />
          </button>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              className="md:hidden fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              className="md:hidden fixed left-0 top-0 bottom-0 w-72 glass-elevated z-50 flex flex-col"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            >
              <div className="flex items-center justify-between p-5 border-b border-glass-border">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center">
                    <Building2 size={18} className="text-white" />
                  </div>
                  <h1 className="text-base font-bold font-heading text-text-primary">NestEase</h1>
                </div>
                <button className="p-1 text-text-tertiary" onClick={() => setSidebarOpen(false)}><X size={20} /></button>
              </div>
              <nav className="flex-1 p-3 space-y-1">
                {managerTabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all
                      ${activeTab === tab.id ? 'bg-accent-blue/10 text-accent-blue-light' : 'text-text-secondary'}`}
                    onClick={() => { handleTabChange(tab.id); setSidebarOpen(false); }}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
              <div className="p-4 border-t border-glass-border">
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-accent-coral hover:bg-accent-coral/10 transition-colors" onClick={logout}>
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="md:ml-64 pt-16 md:pt-0 pb-20 md:pb-0 min-h-screen">
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <Outlet />
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <TabBar tabs={managerTabs} activeTab={activeTab} onTabChange={handleTabChange} />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

// ── Tenant Layout ──

const tenantTabs = [
  { id: 'home', label: 'Home', icon: <Home size={20} /> },
  { id: 'payments', label: 'Payments', icon: <CreditCard size={20} /> },
  { id: 'requests', label: 'Requests', icon: <Wrench size={20} /> },
  { id: 'profile', label: 'Profile', icon: <UserCircle size={20} /> },
];

export function TenantLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const { toasts, removeToast } = useUIStore();
  const activeTab = location.pathname.split('/')[2] || 'home';

  return (
    <div className="min-h-screen bg-gradient-mesh-dark">
      <div className="gradient-mesh" />
      <header className="fixed top-0 left-0 right-0 z-30 glass-elevated border-b border-glass-border">
        <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Building2 size={14} className="text-white" />
            </div>
            <span className="text-sm font-bold font-heading text-text-primary">NestEase</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1.5 text-text-secondary relative">
              <Bell size={20} />
            </button>
            <button onClick={logout}>
              <Avatar name={user?.name || 'Tenant'} size="sm" />
            </button>
          </div>
        </div>
      </header>

      <main className="pt-16 pb-20 min-h-screen max-w-lg mx-auto px-4">
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </main>

      <TabBar
        tabs={tenantTabs}
        activeTab={activeTab}
        onTabChange={(id) => navigate(id === 'home' ? '/tenant' : `/tenant/${id}`)}
      />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

// ── Seeker Layout ──

const seekerTabs = [
  { id: 'discover', label: 'Discover', icon: <Search size={20} /> },
  { id: 'roommates', label: 'Roommates', icon: <Heart size={20} /> },
  { id: 'brokers', label: 'Brokers', icon: <Users size={20} /> },
  { id: 'profile', label: 'Profile', icon: <UserCircle size={20} /> },
];

export function SeekerLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const { toasts, removeToast } = useUIStore();
  const activeTab = location.pathname.split('/')[2] || 'discover';

  return (
    <div className="min-h-screen bg-gradient-mesh-dark">
      <div className="gradient-mesh" />
      <header className="fixed top-0 left-0 right-0 z-30 glass-elevated border-b border-glass-border">
        <div className="flex items-center justify-between px-4 py-3 max-w-3xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Building2 size={14} className="text-white" />
            </div>
            <span className="text-sm font-bold font-heading text-text-primary">NestEase</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1.5 text-text-secondary"><Bell size={20} /></button>
            <button onClick={logout}><Avatar name={user?.name || 'Seeker'} size="sm" /></button>
          </div>
        </div>
      </header>

      <main className="pt-16 pb-20 min-h-screen max-w-3xl mx-auto px-4">
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </main>

      <TabBar
        tabs={seekerTabs}
        activeTab={activeTab}
        onTabChange={(id) => navigate(id === 'discover' ? '/seeker' : `/seeker/${id}`)}
      />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
