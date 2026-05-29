import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  BarChart3, TrendingUp, Users, CreditCard, Bell,
  Search, MapPin, Heart, Star, Shield, Wifi, Coffee,
  Building2, CheckCircle2, ArrowUpRight
} from 'lucide-react';

const ecosystemPanels = [
  {
    id: 'manager',
    title: 'For Owners & Managers',
    subtitle: 'Your entire portfolio. One dashboard.',
    description: 'Track occupancy, automate rent collection, manage complaints, and generate reports — all from a single, elegant command center.',
    gradient: 'from-[#0F172A] to-[#1E3A8A]',
    accentColor: '#3B82F6',
    content: 'dashboard',
  },
  {
    id: 'tenant',
    title: 'For Tenants',
    subtitle: 'Your home life, simplified.',
    description: 'Pay rent with one tap, raise maintenance requests instantly, and never miss a payment deadline again.',
    gradient: 'from-[#064E3B] to-[#047857]',
    accentColor: '#10B981',
    content: 'tenant',
  },
  {
    id: 'seeker',
    title: 'For Seekers',
    subtitle: 'Find your next home. Effortlessly.',
    description: 'Browse verified listings, match with compatible roommates, and connect with trusted brokers — all in one place.',
    gradient: 'from-[#4C1D95] to-[#6D28D9]',
    accentColor: '#8B5CF6',
    content: 'seeker',
  },
];

export function EcosystemSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="ecosystem" ref={sectionRef} className="relative py-24 md:py-32 bg-void overflow-hidden">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16 md:mb-24">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.3em] text-accent-blue-light mb-4">
            The Ecosystem
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-modern)' }}
          >
            Three Worlds.{' '}
            <span className="text-gradient">One Platform.</span>
          </h2>
          <p className="text-base md:text-lg text-text-secondary max-w-xl mx-auto">
            Whether you own, rent, or search — Rentizzo adapts to your journey and makes it seamless.
          </p>
        </motion.div>
      </div>

      {/* Panels */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {ecosystemPanels.map((panel, i) => (
            <EcosystemPanel key={panel.id} panel={panel} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EcosystemPanel({
  panel,
  index,
  isInView,
}: {
  panel: (typeof ecosystemPanels)[number];
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      className="group relative rounded-3xl overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Card background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${panel.gradient} opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500`} />

      <div className="glass-landing p-6 md:p-8 h-full flex flex-col relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-3"
              style={{
                background: `${panel.accentColor}12`,
                color: panel.accentColor,
                border: `1px solid ${panel.accentColor}20`,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: panel.accentColor }} />
              {panel.title}
            </div>
            <h3
              className="text-xl md:text-2xl font-bold text-text-primary mb-2"
              style={{ fontFamily: 'var(--font-modern)' }}
            >
              {panel.subtitle}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              {panel.description}
            </p>
          </div>
        </div>

        {/* Live preview mockup */}
        <div className="flex-1 mt-2">
          {panel.content === 'dashboard' && <DashboardPreview accentColor={panel.accentColor} />}
          {panel.content === 'tenant' && <TenantPreview accentColor={panel.accentColor} />}
          {panel.content === 'seeker' && <SeekerPreview accentColor={panel.accentColor} />}
        </div>

        {/* Hover arrow */}
        <motion.div
          className="absolute top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{ background: `${panel.accentColor}15` }}
        >
          <ArrowUpRight size={14} style={{ color: panel.accentColor }} />
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ── Dashboard Preview (Manager) ── */
function DashboardPreview({ accentColor }: { accentColor: string }) {
  const metrics = [
    { label: 'Occupancy', value: '92%', icon: <Building2 size={12} />, trend: '+5%' },
    { label: 'Collected', value: '₹4.2L', icon: <TrendingUp size={12} />, trend: '+12%' },
    { label: 'Tenants', value: '128', icon: <Users size={12} />, trend: '+8' },
  ];

  return (
    <div className="rounded-2xl bg-slate-50/80 border border-slate-200/60 p-4 space-y-3">
      {/* Mini metric cards */}
      <div className="grid grid-cols-3 gap-2">
        {metrics.map((m) => (
          <motion.div
            key={m.label}
            className="bg-white rounded-xl p-2.5 border border-slate-100"
            whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
          >
            <div className="flex items-center gap-1 mb-1">
              <span style={{ color: accentColor }}>{m.icon}</span>
              <span className="text-[9px] text-slate-500">{m.label}</span>
            </div>
            <p className="text-sm font-bold text-slate-900">{m.value}</p>
            <span className="text-[9px] text-emerald-600 font-medium">{m.trend}</span>
          </motion.div>
        ))}
      </div>

      {/* Mini chart */}
      <div className="bg-white rounded-xl p-3 border border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-medium text-slate-500">Revenue Trend</span>
          <BarChart3 size={12} className="text-slate-400" />
        </div>
        <div className="flex items-end gap-1 h-12">
          {[35, 50, 42, 65, 55, 78, 60, 85, 70, 90, 75, 95].map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-sm"
              style={{ height: `${h}%`, background: i >= 10 ? accentColor : `${accentColor}30` }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03, duration: 0.4 }}
            />
          ))}
        </div>
      </div>

      {/* Activity feed */}
      <div className="space-y-1.5">
        {[
          { text: 'Rent received from Room 204', time: '2m ago', color: '#10B981' },
          { text: 'New tenant added to Block A', time: '1h ago', color: accentColor },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2 bg-white rounded-lg px-2.5 py-2 border border-slate-100">
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
            <span className="text-[10px] text-slate-700 flex-1 truncate">{item.text}</span>
            <span className="text-[9px] text-slate-400">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Tenant Preview ── */
function TenantPreview({ accentColor }: { accentColor: string }) {
  return (
    <div className="rounded-2xl bg-slate-50/80 border border-slate-200/60 p-4 space-y-3">
      {/* Rent card */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-20 h-20 rounded-full -mr-6 -mt-6 opacity-10"
          style={{ background: accentColor }}
        />
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">Monthly Rent</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">₹12,500</p>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-emerald-50 rounded-full">
            <CheckCircle2 size={10} className="text-emerald-600" />
            <span className="text-[9px] font-semibold text-emerald-700">PAID</span>
          </div>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5">
          <motion.div
            className="h-full rounded-full"
            style={{ background: accentColor }}
            initial={{ width: '0%' }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <p className="text-[9px] text-slate-400 mt-1.5">Due date: June 1, 2026</p>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { icon: <CreditCard size={14} />, label: 'Pay Rent' },
          { icon: <Bell size={14} />, label: 'Requests' },
          { icon: <Shield size={14} />, label: 'Agreement' },
        ].map((action) => (
          <motion.div
            key={action.label}
            className="bg-white rounded-xl p-3 border border-slate-100 text-center"
            whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}
          >
            <div className="mx-auto w-7 h-7 rounded-lg flex items-center justify-center mb-1.5" style={{ background: `${accentColor}10`, color: accentColor }}>
              {action.icon}
            </div>
            <span className="text-[9px] font-medium text-slate-600">{action.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Notification */}
      <motion.div
        className="bg-white rounded-xl px-3 py-2.5 border border-slate-100 flex items-center gap-2.5"
        initial={{ x: 40, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
          <span className="text-sm">🔧</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-medium text-slate-800 truncate">Plumber assigned to your request</p>
          <p className="text-[9px] text-slate-400">Arriving tomorrow, 10 AM</p>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Seeker Preview ── */
function SeekerPreview({ accentColor }: { accentColor: string }) {
  return (
    <div className="rounded-2xl bg-slate-50/80 border border-slate-200/60 p-4 space-y-3">
      {/* Search bar mockup */}
      <div className="bg-white rounded-xl p-2.5 border border-slate-100 flex items-center gap-2">
        <Search size={14} className="text-slate-400" />
        <span className="text-[11px] text-slate-400">Search in Koramangala, Bangalore...</span>
        <div className="ml-auto flex items-center gap-1 px-2 py-1 rounded-lg" style={{ background: `${accentColor}10` }}>
          <MapPin size={10} style={{ color: accentColor }} />
          <span className="text-[9px] font-medium" style={{ color: accentColor }}>Nearby</span>
        </div>
      </div>

      {/* Property cards */}
      <div className="space-y-2">
        {[
          { name: 'Sunshine PG for Men', price: '₹8,500/mo', area: 'Koramangala', rating: 4.5, type: 'PG', amenities: [Wifi, Coffee] },
          { name: 'Green Valley Apartment', price: '₹15,000/mo', area: 'HSR Layout', rating: 4.8, type: 'Flat', amenities: [Shield, Wifi] },
        ].map((listing, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-xl p-3 border border-slate-100"
            whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}
          >
            <div className="flex gap-3">
              <div
                className="w-16 h-16 rounded-lg flex-shrink-0 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${accentColor}15, ${accentColor}05)`,
                }}
              >
                <Building2 size={20} style={{ color: accentColor, opacity: 0.6 }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded" style={{ background: `${accentColor}12`, color: accentColor }}>
                    {listing.type}
                  </span>
                  <div className="flex items-center gap-0.5">
                    <Star size={8} className="text-amber-400 fill-amber-400" />
                    <span className="text-[9px] text-slate-500">{listing.rating}</span>
                  </div>
                </div>
                <p className="text-xs font-semibold text-slate-800 truncate">{listing.name}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin size={8} className="text-slate-400" />
                  <span className="text-[9px] text-slate-500">{listing.area}</span>
                </div>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-xs font-bold text-slate-900">{listing.price}</span>
                  <div className="flex items-center gap-1.5">
                    {listing.amenities.map((Icon, idx) => (
                      <Icon key={idx} size={10} className="text-slate-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Roommate match */}
      <div className="bg-white rounded-xl p-2.5 border border-slate-100 flex items-center gap-2.5">
        <div className="flex -space-x-2">
          {['R', 'A', 'P'].map((initial, i) => (
            <div
              key={i}
              className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold text-white"
              style={{
                background: ['#6D28D9', '#2563EB', '#059669'][i],
                zIndex: 3 - i,
              }}
            >
              {initial}
            </div>
          ))}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-medium text-slate-700">
            <Heart size={8} className="inline text-rose-500 mr-1" />
            3 roommate matches found
          </p>
        </div>
      </div>
    </div>
  );
}
