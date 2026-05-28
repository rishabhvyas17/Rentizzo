import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard, AnimatedButton, StatusBadge } from '../../components/ui';
import { mockMaintenanceRequests } from '../../lib/mock/data';
import { triageMaintenance } from '../../lib/ai/classifiers';
import { Plus, Camera, Sparkles, Wrench, Zap, Droplets, Brush, HelpCircle, X, CheckCircle } from 'lucide-react';
import { useUIStore } from '../../store';

const categoryIcons: Record<string, React.ReactNode> = {
  plumber: <Droplets size={20} />, electrician: <Zap size={20} />,
  housekeeping: <Brush size={20} />, other: <HelpCircle size={20} />,
};

const categoryColors: Record<string, string> = {
  plumber: 'from-accent-blue/20 to-accent-cyan/10 border-accent-blue/30 text-accent-blue-light',
  electrician: 'from-accent-amber/20 to-accent-amber/10 border-accent-amber/30 text-accent-amber',
  housekeeping: 'from-accent-emerald/20 to-accent-emerald/10 border-accent-emerald/30 text-accent-emerald',
  other: 'from-accent-purple/20 to-accent-purple/10 border-accent-purple/30 text-accent-purple-light',
};

export function TenantRequests() {
  const { addToast } = useUIStore();
  const [showForm, setShowForm] = useState(false);
  const [description, setDescription] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState<ReturnType<typeof triageMaintenance> | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleDescriptionChange = (val: string) => {
    setDescription(val);
    if (val.length > 15) {
      const result = triageMaintenance(val);
      setAiSuggestion(result);
    } else {
      setAiSuggestion(null);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    addToast('Request submitted! We\'ll get back to you soon.', 'success');
    setTimeout(() => {
      setShowForm(false);
      setDescription('');
      setAiSuggestion(null);
      setSubmitted(false);
    }, 2000);
  };

  return (
    <motion.div key="requests" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-4">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold font-heading text-text-primary">Maintenance Requests</h1>
        <AnimatedButton size="sm" icon={<Plus size={16} />} onClick={() => setShowForm(true)}>New</AnimatedButton>
      </div>

      {/* New Request Form */}
      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-5">
          <GlassCard variant="elevated">
            {submitted ? (
              <motion.div className="text-center py-6" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                <div className="w-16 h-16 rounded-full bg-accent-emerald/15 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle size={32} className="text-accent-emerald" />
                </div>
                <p className="text-lg font-semibold text-text-primary">Request Submitted!</p>
                <p className="text-sm text-text-secondary mt-1">Tracking ID: MR-{Date.now().toString().slice(-4)}</p>
              </motion.div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-text-primary">Describe your issue</h3>
                  <button className="text-text-tertiary" onClick={() => setShowForm(false)}><X size={18} /></button>
                </div>

                <textarea
                  placeholder="E.g., The bathroom tap is leaking since yesterday..."
                  value={description}
                  onChange={(e) => handleDescriptionChange(e.target.value)}
                  rows={3}
                  className="w-full p-3 rounded-xl bg-surface border border-glass-border text-sm text-text-primary placeholder-text-ghost resize-none outline-none focus:border-accent-blue/40 transition-colors mb-3"
                />

                {/* AI Suggestion */}
                {aiSuggestion && (
                  <motion.div
                    className="p-3 rounded-xl bg-accent-blue/5 border border-accent-blue/20 mb-3"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles size={14} className="text-accent-blue-light" />
                      <span className="text-xs font-semibold text-accent-blue-light">AI Detected</span>
                      <span className="text-[10px] text-text-ghost ml-auto">{aiSuggestion.confidence}% confidence</span>
                    </div>
                    <p className="text-xs text-text-secondary">{aiSuggestion.suggestion}</p>
                    <div className="flex gap-2 mt-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg border text-[10px] font-semibold bg-gradient-to-r ${categoryColors[aiSuggestion.category]}`}>
                        {categoryIcons[aiSuggestion.category]}
                        {aiSuggestion.category.charAt(0).toUpperCase() + aiSuggestion.category.slice(1)}
                      </span>
                      <StatusBadge status={aiSuggestion.priority === 'urgent' ? 'overdue' : aiSuggestion.priority === 'high' ? 'open' : 'pending'} />
                    </div>
                  </motion.div>
                )}

                <div className="flex gap-2">
                  <button className="p-2.5 rounded-xl glass border border-glass-border text-text-secondary hover:text-text-primary transition-colors">
                    <Camera size={18} />
                  </button>
                  <AnimatedButton fullWidth disabled={description.length < 10} onClick={handleSubmit}>
                    Submit Request
                  </AnimatedButton>
                </div>
              </>
            )}
          </GlassCard>
        </motion.div>
      )}

      {/* Request List */}
      <div className="space-y-3">
        {mockMaintenanceRequests.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <GlassCard hover padding="md">
              <div className="flex items-start gap-3">
                <div className={`p-2.5 rounded-xl bg-gradient-to-br flex-shrink-0 ${categoryColors[r.category].split(' ').slice(0, 2).join(' ')}`}>
                  {categoryIcons[r.category]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-semibold text-text-primary">{r.title}</h3>
                    <StatusBadge status={r.status} />
                  </div>
                  <p className="text-xs text-text-tertiary line-clamp-1 mb-1">{r.description}</p>
                  <p className="text-[10px] text-text-ghost">
                    {new Date(r.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    {r.resolvedAt && ` · Resolved ${new Date(r.resolvedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}`}
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ── Payments Page ──
export function TenantPayments() {
  return (
    <motion.div key="payments" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-4">
      <h1 className="text-xl font-bold font-heading text-text-primary mb-5">Payment History</h1>
      <div className="space-y-3">
        {['May 2026', 'Apr 2026', 'Mar 2026', 'Feb 2026', 'Jan 2026'].map((month, i) => {
          const isPaid = i > 0;
          return (
            <motion.div key={month} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <GlassCard>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-primary">{month}</p>
                    <p className="text-xs text-text-tertiary">₹8,500 · Room 101</p>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={isPaid ? 'paid' : 'paid'} />
                    <p className="text-[10px] text-text-ghost mt-1">{isPaid ? `Paid via UPI` : 'Paid via UPI'}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ── Tenant Profile ──
export function TenantProfile() {
  const { user, logout } = useAuthStore();
  return (
    <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-4">
      <h1 className="text-xl font-bold font-heading text-text-primary mb-5">Profile</h1>
      <GlassCard variant="elevated" className="text-center mb-5">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-emerald to-accent-cyan mx-auto mb-3 flex items-center justify-center text-2xl font-bold text-white">
          {user?.name?.split(' ').map(w => w[0]).join('') || 'RK'}
        </div>
        <h2 className="text-lg font-bold text-text-primary">{user?.name}</h2>
        <p className="text-sm text-text-secondary">{user?.phone}</p>
        <p className="text-xs text-text-tertiary mt-1">Sunrise Heights · Room 101</p>
      </GlassCard>
      <GlassCard>
        <div className="space-y-3">
          {[
            { label: 'Monthly Rent', value: '₹8,500' },
            { label: 'Move-in Date', value: '15 Jan 2026' },
            { label: 'Advance Paid', value: '₹17,000' },
            { label: 'Advance Balance', value: '₹17,000' },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between py-2 border-b border-glass-border last:border-0">
              <span className="text-sm text-text-secondary">{item.label}</span>
              <span className="text-sm font-semibold text-text-primary">{item.value}</span>
            </div>
          ))}
        </div>
      </GlassCard>
      <div className="mt-5">
        <AnimatedButton variant="danger" fullWidth onClick={logout}>Sign Out</AnimatedButton>
      </div>
    </motion.div>
  );
}
