import { motion } from 'framer-motion';
import { GlassCard, MetricCard, ProgressRing } from '../../components/ui';
import { mockRevenueData, mockOccupancyData, mockDashboardMetrics, mockRentCycles } from '../../lib/mock/data';
import { IndianRupee, TrendingUp, Users, AlertTriangle, Download, Sparkles } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const m = mockDashboardMetrics;

export function ReportsPage() {
  const paidCount = mockRentCycles.filter(c => c.status === 'paid').length;
  const totalCount = mockRentCycles.length;
  const collectionRate = Math.round((paidCount / totalCount) * 100);

  const statusBreakdown = [
    { name: 'Paid', value: mockRentCycles.filter(c => c.status === 'paid').length, color: '#10B981' },
    { name: 'Pending', value: mockRentCycles.filter(c => c.status === 'pending').length, color: '#F59E0B' },
    { name: 'Overdue', value: mockRentCycles.filter(c => c.status === 'overdue').length, color: '#F43F5E' },
    { name: 'Partial', value: mockRentCycles.filter(c => c.status === 'partial').length, color: '#8B5CF6' },
  ];

  return (
    <motion.div key="reports" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold font-heading text-text-primary">Financial Reports</h1>
          <p className="text-sm text-text-secondary mt-1">May 2026 · All Properties</p>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 rounded-xl glass border border-glass-border text-xs font-medium text-text-secondary hover:text-text-primary transition-colors">
          <Download size={14} /> Export
        </button>
      </div>

      {/* AI Prediction */}
      <GlassCard variant="glow" className="mb-6 flex items-start gap-3 border-accent-blue/20">
        <div className="p-2 rounded-xl bg-accent-blue/15 flex-shrink-0">
          <Sparkles size={18} className="text-accent-blue-light" />
        </div>
        <div>
          <p className="text-sm font-medium text-text-primary">AI Forecast</p>
          <p className="text-xs text-text-secondary mt-0.5">
            Expected collection for June: <span className="text-accent-emerald font-bold">₹2,58,000</span> (87% confidence).
            Revenue trending upward at <span className="text-accent-blue-light font-medium">+5.2% MoM</span>.
          </p>
        </div>
      </GlassCard>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <MetricCard label="Total Revenue" value={m.monthlyCollected} prefix="₹" icon={<IndianRupee size={22} />} color="emerald" delay={0.1} trend={8} />
        <MetricCard label="Collection Rate" value={collectionRate} suffix="%" icon={<TrendingUp size={22} />} color="blue" delay={0.15} />
        <MetricCard label="Active Tenants" value={m.totalTenants} icon={<Users size={22} />} color="purple" delay={0.2} />
        <MetricCard label="Overdue Amount" value={m.overdueAmount} prefix="₹" icon={<AlertTriangle size={22} />} color="coral" delay={0.25} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2">
          <GlassCard delay={0.3}>
            <h3 className="text-sm font-semibold text-text-primary mb-4">Revenue Trend (6 Months)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={mockRevenueData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6B7BA5', fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7BA5', fontSize: 10 }} tickFormatter={(v: number) => `₹${(v / 1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ background: 'rgba(20,27,45,0.95)', border: '1px solid rgba(148,163,200,0.15)', borderRadius: 12, fontSize: 12, color: '#F0F2F8' }} formatter={(v: any) => [`₹${Number(v).toLocaleString('en-IN')}`, '']} />
                <Area type="monotone" dataKey="collected" stroke="#10B981" strokeWidth={2.5} fill="url(#revGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </GlassCard>
        </div>

        {/* Collection Breakdown */}
        <GlassCard delay={0.35}>
          <h3 className="text-sm font-semibold text-text-primary mb-4">Collection Status</h3>
          <div className="flex justify-center mb-4">
            <ProgressRing value={collectionRate} size={100} strokeWidth={8} color="#10B981" label="collected" />
          </div>
          <div className="space-y-2">
            {statusBreakdown.map(s => (
              <div key={s.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs text-text-secondary">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                  {s.name}
                </span>
                <span className="text-xs font-semibold text-text-primary">{s.value}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Occupancy Trend */}
      <div className="mt-4 md:mt-6">
        <GlassCard delay={0.4}>
          <h3 className="text-sm font-semibold text-text-primary mb-4">Occupancy Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={mockOccupancyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6B7BA5', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7BA5', fontSize: 10 }} domain={[0, 100]} tickFormatter={(v: number) => `${v}%`} />
              <Tooltip contentStyle={{ background: 'rgba(20,27,45,0.95)', border: '1px solid rgba(148,163,200,0.15)', borderRadius: 12, fontSize: 12, color: '#F0F2F8' }} formatter={(v: any) => [`${v}%`, 'Occupancy']} />
              <Bar dataKey="rate" radius={[6, 6, 0, 0]}>
                {mockOccupancyData.map((entry, i) => (
                  <Cell key={i} fill={entry.rate > 80 ? '#10B981' : entry.rate > 60 ? '#F59E0B' : '#F43F5E'} fillOpacity={0.7} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
    </motion.div>
  );
}
