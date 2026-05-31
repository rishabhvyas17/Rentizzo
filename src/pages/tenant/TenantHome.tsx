import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard, AnimatedButton, StatusBadge } from '../../components/ui';
import { useAuthStore, useUIStore } from '../../store';
import { mockRentCycles, mockPayments, mockMaintenanceRequests } from '../../lib/mock/data';
import { CreditCard, Wrench, FileText, Phone, CheckCircle, Clock, AlertCircle, IndianRupee, ArrowUpRight, Building2, CalendarDays, UserCircle, MapPin } from 'lucide-react';

export function TenantHome() {
  const { user } = useAuthStore();
  const { addToast } = useUIStore();
  const [showConfetti, setShowConfetti] = useState(false);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const rentCycle = mockRentCycles[0]; // Current tenant's cycle
  const recentPayments = mockPayments.slice(0, 3);
  const openRequests = mockMaintenanceRequests.filter(r => r.status !== 'resolved' && r.status !== 'closed');

  const statusConfig = {
    paid: { bg: 'from-accent-emerald/25 to-accent-emerald/5', border: 'border-accent-emerald/30', icon: <CheckCircle size={24} className="text-accent-emerald" />, label: 'Rent Paid', sublabel: `₹${rentCycle.amountDue.toLocaleString('en-IN')} on ${new Date(rentCycle.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}` },
    pending: { bg: 'from-accent-amber/25 to-accent-amber/5', border: 'border-accent-amber/30', icon: <Clock size={24} className="text-accent-amber" />, label: `₹${rentCycle.amountDue.toLocaleString('en-IN')} Due`, sublabel: `Pay by ${new Date(rentCycle.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}` },
    overdue: { bg: 'from-accent-coral/25 to-accent-coral/5', border: 'border-accent-coral/30', icon: <AlertCircle size={24} className="text-accent-coral" />, label: `₹${rentCycle.amountDue.toLocaleString('en-IN')} Overdue`, sublabel: `${Math.floor((Date.now() - new Date(rentCycle.dueDate).getTime()) / 86400000)} days past due date` },
    partial: { bg: 'from-accent-purple/25 to-accent-purple/5', border: 'border-accent-purple/30', icon: <IndianRupee size={24} className="text-accent-purple-light" />, label: `₹${(rentCycle.amountDue - rentCycle.amountPaid).toLocaleString('en-IN')} Remaining`, sublabel: `₹${rentCycle.amountPaid.toLocaleString('en-IN')} already paid` },
  };

  const config = statusConfig[rentCycle.status as keyof typeof statusConfig] || statusConfig.pending;

  const handlePayNow = () => {
    setShowConfetti(true);
    addToast('Payment successful! Receipt generated 🎉', 'success');
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <motion.div key="tenant-home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-4">
      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 z-50 pointer-events-none">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-sm"
                style={{
                  left: `${Math.random() * 100}%`,
                  backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#8B5CF6', '#F43F5E', '#22D3EE'][i % 6],
                }}
                initial={{ y: -20, opacity: 1, rotate: 0 }}
                animate={{ y: '100vh', opacity: 0, rotate: Math.random() * 720 }}
                transition={{ duration: 2 + Math.random() * 2, delay: Math.random() * 0.5 }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Greeting */}
      <motion.div className="mb-4" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold font-heading text-text-primary">{greeting}, {user?.name?.split(' ')[0]}</h1>
        <p className="text-sm text-text-secondary mt-1">Sunrise Heights · Room 101</p>
      </motion.div>

      {/* Lease Info Card */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="mb-5">
        <GlassCard variant="subtle" className="!p-3">
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-accent-blue/10"><Building2 size={13} className="text-accent-blue-light" /></div>
              <div>
                <p className="text-[10px] text-text-ghost uppercase">Property</p>
                <p className="text-xs font-medium text-text-primary">Sunrise Heights</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-accent-purple/10"><MapPin size={13} className="text-accent-purple-light" /></div>
              <div>
                <p className="text-[10px] text-text-ghost uppercase">Room</p>
                <p className="text-xs font-medium text-text-primary">101 · Single</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-accent-emerald/10"><CalendarDays size={13} className="text-accent-emerald" /></div>
              <div>
                <p className="text-[10px] text-text-ghost uppercase">Lease</p>
                <p className="text-xs font-medium text-text-primary">Jan '26 – Dec '26</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-accent-amber/10"><UserCircle size={13} className="text-accent-amber" /></div>
              <div>
                <p className="text-[10px] text-text-ghost uppercase">Manager</p>
                <p className="text-xs font-medium text-text-primary">Arjun Mehta</p>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Rent Status Card */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <GlassCard variant="elevated" className={`relative overflow-hidden mb-5 border ${config.border}`}>
          <div className={`absolute inset-0 bg-gradient-to-br ${config.bg} pointer-events-none`} />
          <div className="relative">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-1">May 2026</p>
                <h2 className="text-xl font-bold text-text-primary">{config.label}</h2>
                <p className="text-sm text-text-secondary mt-0.5">{config.sublabel}</p>
              </div>
              {config.icon}
            </div>

            {rentCycle.status !== 'paid' && (
              <AnimatedButton fullWidth size="lg" onClick={handlePayNow} className="mt-3"
                icon={<CreditCard size={18} />}>
                Pay Now — ₹{(rentCycle.amountDue - rentCycle.amountPaid).toLocaleString('en-IN')}
              </AnimatedButton>
            )}

            {rentCycle.status === 'paid' && (
              <button className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-accent-emerald/20 text-sm font-medium text-accent-emerald hover:bg-accent-emerald/5 transition-colors">
                <FileText size={16} /> Download Receipt
              </button>
            )}
          </div>
        </GlassCard>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { icon: <CreditCard size={20} />, label: 'Pay Rent', color: 'text-accent-blue-light' },
          { icon: <Wrench size={20} />, label: 'Request', color: 'text-accent-amber' },
          { icon: <FileText size={20} />, label: 'Documents', color: 'text-accent-purple-light' },
          { icon: <Phone size={20} />, label: 'Contact', color: 'text-accent-emerald' },
        ].map((action, i) => (
          <motion.button
            key={action.label}
            className="flex flex-col items-center gap-1.5 py-3 rounded-xl glass border border-glass-border hover:bg-glass-hover transition-all"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className={action.color}>{action.icon}</span>
            <span className="text-[10px] font-medium text-text-secondary">{action.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Payment History */}
      <GlassCard delay={0.3} className="mb-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-text-primary">Payment History</h3>
          <button className="text-xs text-accent-blue-light font-medium flex items-center gap-1">
            See all <ArrowUpRight size={12} />
          </button>
        </div>
        <div className="space-y-2.5">
          {recentPayments.map((p) => (
            <div key={p.id} className="flex items-center justify-between py-2 border-b border-glass-border last:border-0">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-accent-emerald/10">
                  <CheckCircle size={16} className="text-accent-emerald" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">₹{p.amount.toLocaleString('en-IN')}</p>
                  <p className="text-[11px] text-text-tertiary">
                    {p.paidAt ? new Date(p.paidAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                    {' · '}{p.method.toUpperCase()}
                  </p>
                </div>
              </div>
              <StatusBadge status="success" />
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Open Requests */}
      {openRequests.length > 0 && (
        <GlassCard delay={0.35}>
          <h3 className="text-sm font-semibold text-text-primary mb-3">Active Requests</h3>
          <div className="space-y-2.5">
            {openRequests.map((r) => (
              <div key={r.id} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-accent-amber/10">
                    <Wrench size={16} className="text-accent-amber" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{r.title}</p>
                    <p className="text-[11px] text-text-tertiary">{r.category} · Raised {new Date(r.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                  </div>
                </div>
                <StatusBadge status={r.status} variant="dot" />
              </div>
            ))}
          </div>
        </GlassCard>
      )}
    </motion.div>
  );
}
