import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  CreditCard, Wrench, BarChart3, Building2, Heart,
  ArrowRight, Zap, Shield, Bell
} from 'lucide-react';

const features = [
  {
    title: 'Smart Rent Collection',
    description: 'Automated reminders, UPI/card payments, and real-time tracking. Never chase a payment again.',
    icon: <CreditCard size={24} />,
    span: 'col-span-2 row-span-2',
    gradient: 'from-blue-600/8 to-indigo-600/4',
    accentColor: '#3B82F6',
    visual: 'payment-timeline',
  },
  {
    title: 'Roommate Matching',
    description: 'AI-powered compatibility scores based on lifestyle, budget, and preferences.',
    icon: <Heart size={24} />,
    span: 'col-span-2 row-span-1',
    gradient: 'from-rose-500/8 to-pink-500/4',
    accentColor: '#F43F5E',
    visual: 'compatibility',
  },
  {
    title: 'Verified Broker Network',
    description: 'RERA-verified brokers rated by real tenants. Transparent and trustworthy.',
    icon: <Shield size={24} />,
    span: 'col-span-2 row-span-1',
    gradient: 'from-emerald-500/8 to-teal-500/4',
    accentColor: '#10B981',
    visual: 'brokers',
  },
  {
    title: 'Instant Maintenance',
    description: 'Raise requests, track resolution, and rate service — all in real time.',
    icon: <Wrench size={24} />,
    span: 'col-span-1 row-span-1',
    gradient: 'from-amber-500/8 to-orange-500/4',
    accentColor: '#F59E0B',
    visual: 'status',
  },
  {
    title: 'Multi-Property Control',
    description: 'Manage buildings, floors, and rooms from a single unified dashboard.',
    icon: <Building2 size={24} />,
    span: 'col-span-1 row-span-1',
    gradient: 'from-violet-500/8 to-purple-500/4',
    accentColor: '#8B5CF6',
    visual: 'grid',
  },
  {
    title: 'Analytics & Insights',
    description: 'Revenue trends, occupancy rates, and collection efficiency at a glance.',
    icon: <BarChart3 size={24} />,
    span: 'col-span-2 row-span-1',
    gradient: 'from-cyan-500/8 to-sky-500/4',
    accentColor: '#06B6D4',
    visual: 'chart',
  },
];

export function FeaturesGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section id="features" ref={sectionRef} className="relative py-24 md:py-32 bg-void overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-accent-blue/3 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.3em] text-accent-blue-light mb-4">
            Features
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-6"
            style={{ fontFamily: 'var(--font-modern)' }}
          >
            Built{' '}
            <span className="relative inline-block">
              Different
              <motion.span
                className="absolute -bottom-1 left-0 h-1 rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
                initial={{ width: 0 }}
                animate={isInView ? { width: '100%' } : {}}
                transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </span>
          </h2>
          <p className="text-base md:text-lg text-text-secondary">
            Every feature is crafted to solve a real problem in the Indian rental ecosystem.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="bento-grid">
          {features.map((feature, i) => (
            <FeatureCell key={feature.title} feature={feature} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCell({
  feature,
  index,
  isInView,
}: {
  feature: (typeof features)[number];
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      className={`${feature.span} group relative glass-landing overflow-hidden cursor-default`}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
    >
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-100 group-hover:opacity-150 transition-opacity duration-500`} />

      <div className="relative h-full p-6 flex flex-col">
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
          style={{
            background: `${feature.accentColor}12`,
            color: feature.accentColor,
          }}
        >
          {feature.icon}
        </div>

        {/* Text */}
        <h3 className="text-lg font-bold text-text-primary mb-2" style={{ fontFamily: 'var(--font-modern)' }}>
          {feature.title}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed mb-4">
          {feature.description}
        </p>

        {/* Visual element */}
        <div className="mt-auto">
          <FeatureVisual type={feature.visual} accentColor={feature.accentColor} />
        </div>

        {/* Learn more on hover */}
        <motion.div
          className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: `${feature.accentColor}12` }}
          >
            <ArrowRight size={14} style={{ color: feature.accentColor }} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function FeatureVisual({ type, accentColor }: { type: string; accentColor: string }) {
  switch (type) {
    case 'payment-timeline':
      return (
        <div className="flex items-center gap-2 mt-2">
          {['Sent', 'Reminded', 'Paid'].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <motion.div
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
                style={{
                  background: i === 2 ? `${accentColor}15` : 'rgba(148,163,200,0.08)',
                  border: `1px solid ${i === 2 ? `${accentColor}30` : 'rgba(148,163,200,0.12)'}`,
                }}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.15 }}
              >
                {i === 0 && <Bell size={10} className="text-slate-400" />}
                {i === 1 && <Zap size={10} className="text-amber-400" />}
                {i === 2 && <CreditCard size={10} style={{ color: accentColor }} />}
                <span className={`text-[10px] font-medium ${i === 2 ? '' : 'text-slate-500'}`} style={i === 2 ? { color: accentColor } : {}}>
                  {step}
                </span>
              </motion.div>
              {i < 2 && (
                <motion.div
                  className="w-6 h-px"
                  style={{ background: `${accentColor}30` }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.15 }}
                />
              )}
            </div>
          ))}
        </div>
      );

    case 'compatibility':
      return (
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {['V', 'A', 'S'].map((l, i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-white"
                style={{ background: ['#F43F5E', '#8B5CF6', '#3B82F6'][i], zIndex: 3 - i }}
              >
                {l}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <motion.div
              className="h-2 rounded-full"
              style={{ background: accentColor, width: 0 }}
              whileInView={{ width: 60 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            />
            <span className="text-[10px] font-bold" style={{ color: accentColor }}>87%</span>
          </div>
        </div>
      );

    case 'brokers':
      return (
        <div className="flex items-center gap-2">
          {[4.8, 4.6, 4.9].map((rating, i) => (
            <div key={i} className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/80 border border-slate-100">
              <Shield size={8} style={{ color: accentColor }} />
              <span className="text-[9px] font-semibold text-slate-700">★ {rating}</span>
            </div>
          ))}
        </div>
      );

    case 'status':
      return (
        <div className="flex items-center gap-2">
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ background: accentColor }}
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-[10px] font-medium text-amber-600">In Progress</span>
          <div className="flex-1 h-1.5 bg-slate-100 rounded-full ml-1">
            <motion.div
              className="h-full rounded-full"
              style={{ background: accentColor }}
              initial={{ width: '0%' }}
              whileInView={{ width: '65%' }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 1 }}
            />
          </div>
        </div>
      );

    case 'grid':
      return (
        <div className="grid grid-cols-4 gap-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="h-4 rounded-sm"
              style={{
                background: i < 6 ? `${accentColor}${i < 4 ? '25' : '15'}` : 'rgba(148,163,200,0.1)',
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.04 }}
            />
          ))}
        </div>
      );

    case 'chart':
      return (
        <div className="flex items-end gap-0.5 h-8">
          {[20, 35, 25, 45, 30, 55, 40, 65, 50, 75, 55, 80].map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-sm"
              style={{ height: `${h}%`, background: `${accentColor}${i >= 8 ? '' : '40'}` }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.03 }}
            />
          ))}
        </div>
      );

    default:
      return null;
  }
}
