import { motion } from 'framer-motion';
import { GlassCard, MetricCard, StatusBadge, Avatar, AnimatedButton, ProgressRing } from '../../components/ui';
import { mockDashboardMetrics, mockBuildings, mockRentCycles, mockActivity, mockRevenueData } from '../../lib/mock/data';
import { Building2, TrendingUp, AlertCircle, IndianRupee, Bell, Plus, UserPlus, CreditCard, Sparkles, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useUIStore } from '../../store';

const m = mockDashboardMetrics;

export function ManagerDashboard() {
  const { addToast } = useUIStore();

  const overdueCycles = mockRentCycles.filter(c => c.status === 'overdue' || c.status === 'partial');

  return (
    <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Header */}
      <div className="mb-6">
        <motion.h1
          className="text-2xl md:text-3xl font-bold font-heading text-text-primary"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, Arjun
        </motion.h1>
        <motion.p
          className="text-text-secondary text-sm mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Here's what's happening across your properties today
        </motion.p>
      </div>

      {/* AI Insight Banner */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <GlassCard variant="glow" className="flex items-start gap-3 border-accent-blue/20">
          <div className="p-2 rounded-xl bg-accent-blue/15 flex-shrink-0">
            <Sparkles size={18} className="text-accent-blue-light" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary">AI Insight</p>
            <p className="text-xs text-text-secondary mt-0.5">
              Occupancy is up <span className="text-accent-emerald font-medium">12%</span> this quarter. 
              3 rooms in Sunrise Heights may vacate next month based on typical tenure patterns. 
              Consider listing them early.
            </p>
          </div>
        </GlassCard>
      </motion.div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        <MetricCard
          label="Buildings" value={m.totalBuildings} icon={<Building2 size={22} />}
          color="blue" delay={0.1} trend={0}
        />
        <MetricCard
          label="Occupancy" value={m.occupancyRate} suffix="%" icon={<TrendingUp size={22} />}
          color="emerald" delay={0.15} trend={5}
        />
        <MetricCard
          label="Collected" value={m.monthlyCollected} prefix="₹" icon={<IndianRupee size={22} />}
          color="amber" delay={0.2} trend={8}
        />
        <MetricCard
          label="Overdue" value={m.overdueAmount} prefix="₹" icon={<AlertCircle size={22} />}
          color="coral" delay={0.25} trend={-15}
        />
      </div>

      {/* Building Chips */}
      <div className="mb-6">
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          <motion.button
            className="px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap bg-accent-blue/15 border border-accent-blue/30 text-accent-blue-light"
            whileTap={{ scale: 0.95 }}
          >
            All Properties
          </motion.button>
          {mockBuildings.map((b, i) => (
            <motion.button
              key={b.id}
              className="px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap glass border border-glass-border text-text-secondary hover:text-text-primary transition-colors"
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
            >
              {b.name}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2">
          <GlassCard delay={0.3}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-text-primary">Revenue Overview</h3>
                <p className="text-xs text-text-tertiary mt-0.5">Last 6 months · Collected vs Expected</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-[10px] text-text-tertiary">
                  <span className="w-2 h-2 rounded-full bg-accent-blue" /> Collected
                </span>
                <span className="flex items-center gap-1.5 text-[10px] text-text-tertiary">
                  <span className="w-2 h-2 rounded-full bg-accent-purple/40" /> Expected
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={mockRevenueData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCollected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorExpected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6B7BA5', fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7BA5', fontSize: 10 }}
                  tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ background: 'rgba(20,27,45,0.95)', border: '1px solid rgba(148,163,200,0.15)', borderRadius: 12, fontSize: 12, color: '#F0F2F8' }}
                  formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, '']}
                  labelStyle={{ color: '#94A3C8' }}
                />
                <Area type="monotone" dataKey="expected" stroke="#8B5CF680" strokeWidth={2} fill="url(#colorExpected)" strokeDasharray="5 5" />
                <Area type="monotone" dataKey="collected" stroke="#3B82F6" strokeWidth={2.5} fill="url(#colorCollected)" />
              </AreaChart>
            </ResponsiveContainer>
          </GlassCard>
        </div>

        {/* Occupancy Ring */}
        <GlassCard delay={0.35}>
          <h3 className="text-sm font-semibold text-text-primary mb-4">Occupancy</h3>
          <div className="flex flex-col items-center">
            <ProgressRing value={m.occupancyRate} size={120} strokeWidth={8} color="#10B981" label="occupied" />
            <div className="grid grid-cols-2 gap-4 mt-5 w-full">
              <div className="text-center">
                <p className="text-lg font-bold text-text-primary">{m.occupiedRooms}</p>
                <p className="text-[10px] text-text-tertiary uppercase">Occupied</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-text-primary">{m.totalRooms - m.occupiedRooms}</p>
                <p className="text-[10px] text-text-tertiary uppercase">Vacant</p>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Overdue + Activity Row */}
      <div className="grid lg:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">
        {/* Overdue Tenants */}
        <GlassCard delay={0.4}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-text-primary">Overdue Rent</h3>
            <StatusBadge status="overdue" />
          </div>
          {overdueCycles.length === 0 ? (
            <p className="text-sm text-text-tertiary text-center py-6">No overdue payments 🎉</p>
          ) : (
            <div className="space-y-3">
              {overdueCycles.map((cycle, i) => (
                <motion.div
                  key={cycle.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-surface/50 border border-glass-border"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 + i * 0.05 }}
                >
                  <div className="flex items-center gap-3">
                    <Avatar name={cycle.tenantName || 'Tenant'} size="sm" />
                    <div>
                      <p className="text-sm font-medium text-text-primary">{cycle.tenantName}</p>
                      <p className="text-[11px] text-text-tertiary">Room {cycle.roomNumber} · ₹{(cycle.amountDue - cycle.amountPaid).toLocaleString('en-IN')} due</p>
                    </div>
                  </div>
                  <AnimatedButton
                    size="sm" variant="ghost"
                    icon={<Bell size={14} />}
                    onClick={() => addToast(`Reminder sent to ${cycle.tenantName}`, 'success')}
                  >
                    Remind
                  </AnimatedButton>
                </motion.div>
              ))}
            </div>
          )}
        </GlassCard>

        {/* Activity Feed */}
        <GlassCard delay={0.45}>
          <h3 className="text-sm font-semibold text-text-primary mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {mockActivity.slice(0, 6).map((item, i) => {
              const icons: Record<string, React.ReactNode> = {
                rent_paid: <CreditCard size={14} className="text-accent-emerald" />,
                tenant_added: <UserPlus size={14} className="text-accent-blue-light" />,
                complaint: <AlertCircle size={14} className="text-accent-amber" />,
                room_updated: <Building2 size={14} className="text-accent-purple-light" />,
                reminder_sent: <Bell size={14} className="text-accent-cyan" />,
              };
              return (
                <motion.div
                  key={item.id}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.04 }}
                >
                  <div className="p-1.5 rounded-lg bg-surface/80 flex-shrink-0 mt-0.5">
                    {icons[item.type] || <Clock size={14} className="text-text-tertiary" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-text-secondary leading-relaxed">{item.message}</p>
                    <p className="text-[10px] text-text-ghost mt-0.5">
                      {new Date(item.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      {' · '}
                      {new Date(item.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </GlassCard>
      </div>

      {/* Quick Actions FAB (mobile) */}
      <div className="fixed bottom-20 right-4 md:bottom-6 md:right-8 z-20">
        <motion.button
          className="w-14 h-14 rounded-2xl bg-gradient-primary shadow-xl shadow-accent-blue/30 flex items-center justify-center text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => addToast('Quick actions coming soon!', 'info')}
        >
          <Plus size={24} />
        </motion.button>
      </div>
    </motion.div>
  );
}
