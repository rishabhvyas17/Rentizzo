import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard, AnimatedButton, Avatar } from '../../components/ui';
import { mockBrokers, mockBrokerReviews } from '../../lib/mock/data';
import type { Broker } from '../../types';
import { Star, MapPin, ChevronRight, X, Verified, Send, Globe } from 'lucide-react';
import { useUIStore, useAuthStore } from '../../store';

export function BrokerDirectory() {
  const [selectedBroker, setSelectedBroker] = useState<Broker | null>(null);
  const { addToast } = useUIStore();

  return (
    <motion.div key="brokers" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-4">
      <h1 className="text-2xl font-bold font-heading text-text-primary mb-1">Broker Directory</h1>
      <p className="text-sm text-text-secondary mb-5">Verified and rated property brokers in your city</p>

      <div className="space-y-3">
        {mockBrokers.map((broker, i) => (
          <motion.div
            key={broker.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <GlassCard hover padding="md" className="cursor-pointer" onClick={() => setSelectedBroker(broker)}>
              <div className="flex items-start gap-3">
                <Avatar name={broker.name} size="lg" showRing={broker.isVerified} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm font-semibold text-text-primary">{broker.name}</h3>
                    {broker.isVerified && (
                      <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-accent-emerald/15 text-[9px] font-semibold text-accent-emerald">
                        <Verified size={9} /> RERA
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-text-tertiary flex items-center gap-1 mb-2">
                    <MapPin size={11} /> {broker.cities.join(', ')}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-xs text-text-secondary">
                      <Star size={12} className="text-accent-amber fill-accent-amber" />
                      <span className="font-semibold">{broker.avgRating}</span>
                      <span className="text-text-ghost">({broker.totalReviews})</span>
                    </span>
                    <span className="text-xs text-text-tertiary">
                      {broker.responseRate}% response
                    </span>
                    <span className="text-xs text-text-tertiary">
                      {broker.activeListings} listings
                    </span>
                  </div>
                </div>
                <ChevronRight size={18} className="text-text-ghost flex-shrink-0 mt-2" />
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Broker Detail Bottom Sheet */}
      <AnimatePresence>
        {selectedBroker && (
          <>
            <motion.div className="fixed inset-0 bg-black/50 z-40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedBroker(null)} />
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-50 glass-elevated rounded-t-3xl max-h-[85vh] overflow-y-auto"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            >
              <div className="w-12 h-1.5 bg-muted rounded-full mx-auto mt-3 mb-4" />
              <div className="px-5 pb-8">
                {/* Header */}
                <div className="flex items-start gap-4 mb-5">
                  <Avatar name={selectedBroker.name} size="xl" showRing={selectedBroker.isVerified} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-text-primary">{selectedBroker.name}</h2>
                      {selectedBroker.isVerified && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-accent-emerald/15 text-[10px] font-semibold text-accent-emerald">
                          <Verified size={10} /> Verified
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-text-tertiary flex items-center gap-1 mt-0.5">
                      <MapPin size={12} /> {selectedBroker.cities.join(', ')}
                    </p>
                    {selectedBroker.languages.length > 0 && (
                      <p className="text-xs text-text-ghost flex items-center gap-1 mt-1">
                        <Globe size={11} /> {selectedBroker.languages.join(', ')}
                      </p>
                    )}
                  </div>
                  <button className="p-1.5 text-text-tertiary" onClick={() => setSelectedBroker(null)}><X size={20} /></button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  <div className="text-center py-3 rounded-xl bg-surface/50">
                    <div className="flex items-center justify-center gap-1 text-lg font-bold text-text-primary">
                      <Star size={16} className="text-accent-amber fill-accent-amber" />
                      {selectedBroker.avgRating}
                    </div>
                    <p className="text-[9px] text-text-tertiary uppercase">{selectedBroker.totalReviews} reviews</p>
                  </div>
                  <div className="text-center py-3 rounded-xl bg-surface/50">
                    <p className="text-lg font-bold text-text-primary">{selectedBroker.responseRate}%</p>
                    <p className="text-[9px] text-text-tertiary uppercase">Response</p>
                  </div>
                  <div className="text-center py-3 rounded-xl bg-surface/50">
                    <p className="text-lg font-bold text-text-primary">{selectedBroker.activeListings}</p>
                    <p className="text-[9px] text-text-tertiary uppercase">Listings</p>
                  </div>
                </div>

                {selectedBroker.reraNumber && (
                  <p className="text-xs text-text-ghost mb-4">RERA: {selectedBroker.reraNumber}</p>
                )}

                {/* Enquiry */}
                <AnimatedButton fullWidth size="lg" icon={<Send size={16} />}
                  onClick={() => { setSelectedBroker(null); addToast(`Enquiry sent to ${selectedBroker.name}!`, 'success'); }}>
                  Contact Broker
                </AnimatedButton>

                {/* Reviews */}
                <h3 className="text-sm font-semibold text-text-primary mt-6 mb-3">Recent Reviews</h3>
                <div className="space-y-3">
                  {mockBrokerReviews
                    .filter(r => r.brokerId === selectedBroker.id)
                    .map((review) => (
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
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Seeker Profile ──
export function SeekerProfile() {
  const { logout } = useAuthStore();
  return (
    <motion.div key="seeker-profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-4">
      <h1 className="text-xl font-bold font-heading text-text-primary mb-5">Profile</h1>
      <GlassCard variant="elevated" className="text-center mb-5">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-purple to-accent-coral mx-auto mb-3 flex items-center justify-center text-2xl font-bold text-white">
          NV
        </div>
        <h2 className="text-lg font-bold text-text-primary">Nitin Verma</h2>
        <p className="text-sm text-text-secondary">Property Seeker</p>
      </GlassCard>
      <GlassCard>
        <div className="space-y-3">
          {[
            { label: 'Saved Listings', value: '3' },
            { label: 'Enquiries Sent', value: '2' },
            { label: 'Roommate Matches', value: '5' },
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

