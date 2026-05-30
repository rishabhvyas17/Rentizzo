import { motion } from 'framer-motion';
import { GlassCard, MetricCard, StatusBadge, Avatar, AnimatedButton } from '../../components/ui';
import { mockBrokers, mockBrokerReviews, mockEnquiries, mockListings } from '../../lib/mock/data';
import { BarChart3, MessageSquare, Star, TrendingUp, Sparkles, Send, Clock, CheckCircle, Building2, Eye } from 'lucide-react';
import { useUIStore } from '../../store';

// Use first broker as "current" broker
const broker = mockBrokers[0];
const brokerListings = mockListings.filter(l => l.brokerId === broker.id || l.brokerName === 'Rajesh Properties');
const brokerReviews = mockBrokerReviews.filter(r => r.brokerId === broker.id);

export function BrokerDashboard() {
  const { addToast } = useUIStore();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const enquiryStatusIcons: Record<string, React.ReactNode> = {
    new: <MessageSquare size={14} className="text-accent-cyan" />,
    contacted: <Clock size={14} className="text-accent-blue-light" />,
    converted: <CheckCircle size={14} className="text-accent-emerald" />,
  };

  return (
    <motion.div key="broker-dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Header */}
      <div className="mb-6">
        <motion.h1
          className="text-2xl md:text-3xl font-bold font-heading text-text-primary"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {greeting}, {broker.name.split(' ')[0]}
        </motion.h1>
        <motion.p
          className="text-text-secondary text-sm mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Here's how your broker business is performing
        </motion.p>
      </div>

      {/* AI Insight */}
      <motion.div className="mb-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <GlassCard variant="glow" className="flex items-start gap-3 border-accent-blue/20">
          <div className="p-2 rounded-xl bg-accent-blue/15 flex-shrink-0">
            <Sparkles size={18} className="text-accent-blue-light" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary">Performance Tip</p>
            <p className="text-xs text-text-secondary mt-0.5">
              Your response rate is <span className="text-accent-emerald font-bold">{broker.responseRate}%</span> — that's above average!
              You have <span className="text-accent-blue-light font-medium">{mockEnquiries.filter(e => e.status === 'new').length} new enquiries</span> waiting.
              Respond within 2 hours to maintain your top-broker status.
            </p>
          </div>
        </GlassCard>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        <MetricCard label="Active Listings" value={broker.activeListings} icon={<Building2 size={22} />} color="blue" delay={0.1} />
        <MetricCard label="Total Enquiries" value={mockEnquiries.length} icon={<MessageSquare size={22} />} color="purple" delay={0.15} />
        <MetricCard label="Response Rate" value={broker.responseRate} suffix="%" icon={<TrendingUp size={22} />} color="emerald" delay={0.2} />
        <MetricCard label="Avg Rating" value={broker.avgRating} icon={<Star size={22} />} color="amber" delay={0.25} />
      </div>

      <div className="grid lg:grid-cols-2 gap-4 md:gap-6">
        {/* Recent Enquiries */}
        <GlassCard delay={0.3}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-text-primary">Recent Enquiries</h3>
            <StatusBadge status="new" />
          </div>
          <div className="space-y-3">
            {mockEnquiries.map((eq, i) => (
              <motion.div
                key={eq.id}
                className="flex items-start gap-3 p-3 rounded-xl bg-surface/50 border border-glass-border"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.05 }}
              >
                <div className="p-2 rounded-xl bg-surface">
                  {enquiryStatusIcons[eq.status] || <MessageSquare size={14} className="text-text-tertiary" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-text-primary">{eq.seekerName}</p>
                    <StatusBadge status={eq.status} />
                  </div>
                  <p className="text-xs text-text-secondary line-clamp-2 mb-1">{eq.message}</p>
                  <p className="text-[10px] text-text-ghost">
                    {new Date(eq.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-3">
            <AnimatedButton variant="ghost" fullWidth size="sm" onClick={() => addToast('Opening all enquiries...', 'info')}>
              View All Enquiries
            </AnimatedButton>
          </div>
        </GlassCard>

        {/* Rating Summary + Recent Reviews */}
        <GlassCard delay={0.35}>
          <h3 className="text-sm font-semibold text-text-primary mb-4">Rating Summary</h3>
          {/* Rating breakdown */}
          <div className="flex items-center gap-4 mb-5">
            <div className="text-center">
              <p className="text-3xl font-bold text-text-primary">{broker.avgRating}</p>
              <div className="flex items-center gap-0.5 justify-center mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} className={i < Math.floor(broker.avgRating) ? 'text-accent-amber fill-accent-amber' : 'text-muted'} />
                ))}
              </div>
              <p className="text-[10px] text-text-tertiary mt-1">{broker.totalReviews} reviews</p>
            </div>
            <div className="flex-1 space-y-1.5">
              {[5, 4, 3, 2, 1].map(rating => {
                const count = brokerReviews.filter(r => r.rating === rating).length;
                const pct = broker.totalReviews > 0 ? (count / broker.totalReviews) * 100 : 0;
                return (
                  <div key={rating} className="flex items-center gap-2">
                    <span className="text-[10px] text-text-tertiary w-4 text-right">{rating}</span>
                    <Star size={10} className="text-accent-amber fill-accent-amber" />
                    <div className="flex-1 h-1.5 bg-surface rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-accent-amber rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                      />
                    </div>
                    <span className="text-[10px] text-text-ghost w-4">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Latest reviews */}
          <h4 className="text-xs font-semibold text-text-ghost uppercase tracking-wider mb-2">Latest</h4>
          <div className="space-y-2.5">
            {brokerReviews.slice(0, 2).map((review) => (
              <div key={review.id} className="p-3 rounded-xl bg-surface/30 border border-glass-border">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-text-primary">{review.reviewerName}</span>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={10} className={i < review.rating ? 'text-accent-amber fill-accent-amber' : 'text-muted'} />
                    ))}
                  </div>
                </div>
                {review.reviewText && <p className="text-xs text-text-secondary leading-relaxed">{review.reviewText}</p>}
                <p className="text-[10px] text-text-ghost mt-1">
                  {new Date(review.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </motion.div>
  );
}
