import { motion } from 'framer-motion';
import { GlassCard, Avatar, AnimatedButton } from '../../components/ui';
import { useAuthStore } from '../../store';
import { mockOrg } from '../../lib/mock/data';
import { Building2, Bell, Shield, CreditCard, HelpCircle, LogOut, ChevronRight, Moon, Crown } from 'lucide-react';

export function OwnerSettings() {
  const { user, logout } = useAuthStore();

  const sections = [
    {
      title: 'Portfolio',
      items: [
        { icon: <Building2 size={18} />, label: 'Company Details', desc: mockOrg.name },
        { icon: <Shield size={18} />, label: 'Manager Assignments', desc: '2 active managers' },
        { icon: <Crown size={18} />, label: 'Ownership Verification', desc: 'Verified ✓' },
      ]
    },
    {
      title: 'Notifications',
      items: [
        { icon: <Bell size={18} />, label: 'Alert Preferences', desc: 'Revenue alerts, vacancy alerts' },
      ]
    },
    {
      title: 'Billing',
      items: [
        { icon: <CreditCard size={18} />, label: 'Subscription Plan', desc: `${mockOrg.plan.charAt(0).toUpperCase() + mockOrg.plan.slice(1)} Plan` },
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: <HelpCircle size={18} />, label: 'Help & Support', desc: 'FAQs, Contact us' },
        { icon: <Moon size={18} />, label: 'Appearance', desc: 'Light mode (default)' },
      ]
    }
  ];

  return (
    <motion.div key="owner-settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <h1 className="text-2xl font-bold font-heading text-text-primary mb-6">Settings</h1>

      {/* Profile Card */}
      <GlassCard variant="elevated" className="mb-6">
        <div className="flex items-center gap-4">
          <Avatar name={user?.name || 'Owner'} size="xl" showRing />
          <div>
            <h2 className="text-lg font-bold text-text-primary">{user?.name}</h2>
            <p className="text-sm text-text-secondary">{user?.phone}</p>
            <p className="text-xs text-text-tertiary mt-0.5">{user?.email}</p>
            <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-semibold border border-amber-200">
              <Crown size={10} /> Property Owner
            </span>
          </div>
        </div>
      </GlassCard>

      {sections.map((section, si) => (
        <div key={section.title} className="mb-5">
          <motion.h3
            className="text-xs font-semibold text-text-ghost uppercase tracking-wider mb-2 px-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: si * 0.1 }}
          >
            {section.title}
          </motion.h3>
          <GlassCard padding="none" delay={si * 0.05}>
            {section.items.map((item, ii) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-glass-hover transition-colors
                  ${ii < section.items.length - 1 ? 'border-b border-glass-border' : ''}`}
              >
                <div className="p-2 rounded-xl bg-surface text-text-secondary">{item.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary">{item.label}</p>
                  <p className="text-xs text-text-tertiary">{item.desc}</p>
                </div>
                <ChevronRight size={16} className="text-text-ghost" />
              </button>
            ))}
          </GlassCard>
        </div>
      ))}

      <div className="mt-6">
        <AnimatedButton variant="danger" fullWidth icon={<LogOut size={16} />} onClick={logout}>
          Sign Out
        </AnimatedButton>
      </div>
    </motion.div>
  );
}
