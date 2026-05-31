import { motion } from 'framer-motion';
import { GlassCard, Avatar } from '../../components/ui';
import { mockBrokers, mockBrokerReviews } from '../../lib/mock/data';
import { Star, TrendingUp, MessageSquare, ThumbsUp } from 'lucide-react';

const broker = mockBrokers[0];
const brokerReviews = mockBrokerReviews.filter(r => r.brokerId === broker.id);

// Extended mock reviews for a fuller page
const allReviews = [
  ...brokerReviews,
  { id: 'brev-extra-1', brokerId: broker.id, reviewerName: 'Manish T.', rating: 5, reviewText: 'Very prompt and professional. Helped me find a great 1BHK within my budget in just 3 days.', createdAt: '2026-03-15T10:00:00Z' },
  { id: 'brev-extra-2', brokerId: broker.id, reviewerName: 'Swati K.', rating: 4, reviewText: 'Good experience overall. Communication was clear and honest about the properties.', createdAt: '2026-02-20T10:00:00Z' },
  { id: 'brev-extra-3', brokerId: broker.id, reviewerName: 'Rahul M.', rating: 5, reviewText: 'Best broker experience I have had. No hidden charges, transparent dealings.', createdAt: '2026-02-05T10:00:00Z' },
  { id: 'brev-extra-4', brokerId: broker.id, reviewerName: 'Nisha P.', rating: 3, reviewText: 'Decent service but took a while to respond to some of my messages.', createdAt: '2026-01-18T10:00:00Z' },
];

export function BrokerReviews() {
  const avgRating = broker.avgRating;
  const totalReviews = broker.totalReviews;

  // Rating distribution
  const ratingDist = [5, 4, 3, 2, 1].map(r => ({
    rating: r,
    count: allReviews.filter(rev => rev.rating === r).length,
    pct: (allReviews.filter(rev => rev.rating === r).length / allReviews.length) * 100,
  }));

  return (
    <motion.div key="broker-reviews" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-heading text-text-primary">Reviews & Ratings</h1>
        <p className="text-sm text-text-secondary mt-1">See what seekers say about you</p>
      </div>

      {/* Summary Card */}
      <GlassCard variant="elevated" className="mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Big rating */}
          <div className="text-center flex-shrink-0">
            <p className="text-5xl font-bold text-text-primary">{avgRating}</p>
            <div className="flex items-center gap-0.5 justify-center mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className={i < Math.floor(avgRating) ? 'text-accent-amber fill-accent-amber' : 'text-muted'} />
              ))}
            </div>
            <p className="text-xs text-text-tertiary mt-1">{totalReviews} total reviews</p>
          </div>

          {/* Bar breakdown */}
          <div className="flex-1 w-full space-y-2">
            {ratingDist.map(({ rating, count, pct }) => (
              <div key={rating} className="flex items-center gap-2.5">
                <span className="text-xs text-text-secondary w-4 text-right font-medium">{rating}</span>
                <Star size={11} className="text-accent-amber fill-accent-amber flex-shrink-0" />
                <div className="flex-1 h-2 bg-surface rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-accent-amber"
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ delay: 0.3 + rating * 0.05, duration: 0.6 }}
                  />
                </div>
                <span className="text-xs text-text-ghost w-5 text-right">{count}</span>
              </div>
            ))}
          </div>

          {/* Quick stats */}
          <div className="flex sm:flex-col gap-4 sm:gap-3 flex-shrink-0">
            <div className="text-center p-3 rounded-xl bg-surface/50">
              <div className="flex items-center justify-center gap-1 text-accent-emerald mb-0.5">
                <TrendingUp size={14} />
                <span className="text-sm font-bold">{broker.responseRate}%</span>
              </div>
              <p className="text-[9px] text-text-tertiary uppercase">Response Rate</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-surface/50">
              <div className="flex items-center justify-center gap-1 text-accent-blue-light mb-0.5">
                <ThumbsUp size={14} />
                <span className="text-sm font-bold">92%</span>
              </div>
              <p className="text-[9px] text-text-tertiary uppercase">Recommend</p>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* All Reviews */}
      <h3 className="text-sm font-semibold text-text-primary mb-3">All Reviews</h3>
      <div className="space-y-3">
        {allReviews.map((review, i) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
          >
            <GlassCard hover>
              <div className="flex items-start gap-3">
                <Avatar name={review.reviewerName} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold text-text-primary">{review.reviewerName}</p>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <Star key={si} size={11} className={si < review.rating ? 'text-accent-amber fill-accent-amber' : 'text-muted'} />
                      ))}
                    </div>
                  </div>
                  {review.reviewText && (
                    <p className="text-xs text-text-secondary leading-relaxed mb-1.5">{review.reviewText}</p>
                  )}
                  <p className="text-[10px] text-text-ghost">
                    {new Date(review.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
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
