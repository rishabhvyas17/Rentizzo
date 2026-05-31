import { motion } from 'framer-motion';
import { GlassCard, Avatar, AnimatedButton } from '../../components/ui';
import { useAuthStore } from '../../store';
import { mockBrokers } from '../../lib/mock/data';
import { Verified, MapPin, Globe, Star, Building2, MessageSquare, TrendingUp, LogOut, Edit, ChevronRight, Shield, Bell } from 'lucide-react';

const broker = mockBrokers[0];

export function BrokerProfile() {
  const { user, logout } = useAuthStore();

  return (
    <motion.div key="broker-profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <h1 className="text-2xl font-bold font-heading text-text-primary mb-6">Profile</h1>

      {/* Profile Card */}
      <GlassCard variant="elevated" className="mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <Avatar name={broker.name} size="xl" showRing={broker.isVerified} />
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <h2 className="text-lg font-bold text-text-primary">{broker.name}</h2>
              {broker.isVerified && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-accent-emerald/15 text-[10px] font-semibold text-accent-emerald border border-accent-emerald/20">
                  <Verified size={10} /> RERA Verified
                </span>
              )}
            </div>
            <p className="text-sm text-text-secondary">{user?.phone}</p>
            <p className="text-xs text-text-tertiary mt-0.5">{user?.email}</p>

            <div className="flex items-center justify-center sm:justify-start gap-3 mt-2">
              <span className="text-xs text-text-tertiary flex items-center gap-1">
                <MapPin size={11} /> {broker.cities.join(', ')}
              </span>
              <span className="text-xs text-text-tertiary flex items-center gap-1">
                <Globe size={11} /> {broker.languages.join(', ')}
              </span>
            </div>

            {broker.reraNumber && (
              <p className="text-[11px] text-text-ghost mt-2">RERA: {broker.reraNumber}</p>
            )}
          </div>
          <AnimatedButton variant="secondary" size="sm" icon={<Edit size={14} />}>
            Edit
          </AnimatedButton>
        </div>
      </GlassCard>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { icon: <Star size={18} className="text-accent-amber" />, value: broker.avgRating.toString(), label: 'Avg Rating', sub: `${broker.totalReviews} reviews` },
          { icon: <TrendingUp size={18} className="text-accent-emerald" />, value: `${broker.responseRate}%`, label: 'Response', sub: 'Rate' },
          { icon: <Building2 size={18} className="text-accent-blue-light" />, value: broker.activeListings.toString(), label: 'Active', sub: 'Listings' },
          { icon: <MessageSquare size={18} className="text-accent-purple-light" />, value: '12', label: 'Enquiries', sub: 'This month' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
          >
            <GlassCard className="text-center">
              <div className="flex justify-center mb-2">{stat.icon}</div>
              <p className="text-xl font-bold text-text-primary">{stat.value}</p>
              <p className="text-[10px] text-text-tertiary uppercase">{stat.label}</p>
              <p className="text-[9px] text-text-ghost">{stat.sub}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Settings Sections */}
      <div className="space-y-5">
        <div>
          <h3 className="text-xs font-semibold text-text-ghost uppercase tracking-wider mb-2 px-1">Account</h3>
          <GlassCard padding="none">
            {[
              { icon: <Shield size={18} />, label: 'Verification Status', desc: broker.isVerified ? 'Verified ✓' : 'Pending verification' },
              { icon: <Bell size={18} />, label: 'Notification Preferences', desc: 'Email, SMS, In-app' },
              { icon: <Globe size={18} />, label: 'Service Areas', desc: broker.cities.join(', ') },
            ].map((item, ii) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-glass-hover transition-colors
                  ${ii < 2 ? 'border-b border-glass-border' : ''}`}
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
      </div>

      <div className="mt-6">
        <AnimatedButton variant="danger" fullWidth icon={<LogOut size={16} />} onClick={logout}>
          Sign Out
        </AnimatedButton>
      </div>
    </motion.div>
  );
}
