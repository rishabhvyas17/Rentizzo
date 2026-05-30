import { motion } from 'framer-motion';
import { GlassCard, MetricCard, StatusBadge, Avatar, ProgressRing } from '../../components/ui';
import { mockDashboardMetrics, mockBuildings, mockRevenueData } from '../../lib/mock/data';
import { Building2, TrendingUp, IndianRupee, Users, Sparkles, Crown, BarChart3 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const m = mockDashboardMetrics;

// Portfolio-level computed data
const totalPortfolioValue = mockBuildings.reduce((sum, b) => sum + (b.totalRooms || 0) * 10000, 0);
const totalMonthlyRevenue = mockRevenueData[mockRevenueData.length - 1]?.collected || 0;
const avgOccupancy = Math.round(
  mockBuildings.reduce((sum, b) => sum + ((b.occupiedRooms || 0) / (b.totalRooms || 1)) * 100, 0) / mockBuildings.length
);

const mockManagers = [
  { name: 'Arjun Mehta', buildings: 2, collectionRate: 92, tenants: 49, status: 'active' as const },
  { name: 'Priya Nair', buildings: 1, collectionRate: 88, tenants: 16, status: 'active' as const },
];

export function OwnerDashboard() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <motion.div key="owner-dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Header */}
      <div className="mb-6">
        <motion.div
          className="flex items-center gap-2 mb-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Crown size={20} className="text-accent-amber" />
          <span className="text-xs font-semibold text-accent-amber uppercase tracking-wider">Owner Dashboard</span>
        </motion.div>
        <motion.h1
          className="text-2xl md:text-3xl font-bold font-heading text-text-primary"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          {greeting}, Vikram
        </motion.h1>
        <motion.p
          className="text-text-secondary text-sm mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Your property portfolio at a glance
        </motion.p>
      </div>

      {/* AI Insight */}
      <motion.div className="mb-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <GlassCard variant="glow" className="flex items-start gap-3 border-accent-blue/20">
          <div className="p-2 rounded-xl bg-accent-blue/15 flex-shrink-0">
            <Sparkles size={18} className="text-accent-blue-light" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary">Portfolio Insight</p>
            <p className="text-xs text-text-secondary mt-0.5">
              Your properties generated <span className="text-accent-emerald font-bold">₹2.43L</span> this month.
              Green Valley Residency has the highest occupancy at <span className="text-accent-blue-light font-medium">86%</span>.
              Consider raising rents at Sunrise Heights — market rates have increased <span className="text-accent-amber font-medium">8%</span> in Koramangala this quarter.
            </p>
          </div>
        </GlassCard>
      </motion.div>

      {/* Portfolio KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        <MetricCard label="Properties" value={m.totalBuildings} icon={<Building2 size={22} />} color="blue" delay={0.1} />
        <MetricCard label="Total Rooms" value={m.totalRooms} icon={<BarChart3 size={22} />} color="purple" delay={0.15} />
        <MetricCard label="Monthly Revenue" value={totalMonthlyRevenue} prefix="₹" icon={<IndianRupee size={22} />} color="emerald" delay={0.2} trend={5} />
        <MetricCard label="Avg Occupancy" value={avgOccupancy} suffix="%" icon={<TrendingUp size={22} />} color="amber" delay={0.25} trend={3} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2">
          <GlassCard delay={0.3}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-text-primary">Portfolio Revenue</h3>
                <p className="text-xs text-text-tertiary mt-0.5">Last 6 months · All properties</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={mockRevenueData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="ownerCollected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="ownerExpected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D97706" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#D97706" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6B7BA5', fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7BA5', fontSize: 10 }}
                  tickFormatter={(v: number) => `₹${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ background: '#FFFFFF', border: '1px solid rgba(226, 232, 240, 0.8)', borderRadius: 10, fontSize: 12, color: '#0F172A', boxShadow: '0 4px 12px rgba(15, 23, 42, 0.05)' }}
                  formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, '']}
                  labelStyle={{ color: '#64748B' }}
                />
                <Area type="monotone" dataKey="expected" stroke="#D9770680" strokeWidth={2} fill="url(#ownerExpected)" strokeDasharray="5 5" />
                <Area type="monotone" dataKey="collected" stroke="#059669" strokeWidth={2.5} fill="url(#ownerCollected)" />
              </AreaChart>
            </ResponsiveContainer>
          </GlassCard>
        </div>

        {/* Portfolio Occupancy */}
        <GlassCard delay={0.35}>
          <h3 className="text-sm font-semibold text-text-primary mb-4">Portfolio Occupancy</h3>
          <div className="flex flex-col items-center">
            <ProgressRing value={avgOccupancy} size={120} strokeWidth={8} color="#059669" label="occupied" />
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

      {/* Property Cards + Manager Performance */}
      <div className="grid lg:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">
        {/* Property Breakdown */}
        <GlassCard delay={0.4}>
          <h3 className="text-sm font-semibold text-text-primary mb-4">Property Breakdown</h3>
          <div className="space-y-3">
            {mockBuildings.map((b, i) => {
              const occ = b.occupiedRooms && b.totalRooms ? Math.round((b.occupiedRooms / b.totalRooms) * 100) : 0;
              return (
                <motion.div
                  key={b.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-surface/50 border border-glass-border"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 + i * 0.05 }}
                >
                  <ProgressRing value={occ} size={44} strokeWidth={4} color={occ > 80 ? '#059669' : occ > 60 ? '#D97706' : '#BE123C'} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary">{b.name}</p>
                    <p className="text-[11px] text-text-tertiary">{b.city} · {b.type.toUpperCase()} · {b.occupiedRooms}/{b.totalRooms} rooms</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-text-primary">{occ}%</p>
                    <p className="text-[10px] text-text-tertiary">Occ.</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </GlassCard>

        {/* Manager Performance */}
        <GlassCard delay={0.45}>
          <h3 className="text-sm font-semibold text-text-primary mb-4">Manager Performance</h3>
          <div className="space-y-3">
            {mockManagers.map((mgr, i) => (
              <motion.div
                key={mgr.name}
                className="flex items-center gap-3 p-3 rounded-xl bg-surface/50 border border-glass-border"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.05 }}
              >
                <Avatar name={mgr.name} size="md" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary">{mgr.name}</p>
                  <p className="text-[11px] text-text-tertiary">{mgr.buildings} buildings · {mgr.tenants} tenants</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-accent-emerald">{mgr.collectionRate}%</p>
                  <p className="text-[10px] text-text-tertiary">Collection</p>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>
    </motion.div>
  );
}
