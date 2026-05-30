import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard, StatusBadge, AnimatedButton } from '../../components/ui';
import { mockListings } from '../../lib/mock/data';
import { Plus, MapPin, IndianRupee, Eye, MessageSquare, Pause, Play, Edit, Wifi, Car, Utensils, Dumbbell, Shield, Zap } from 'lucide-react';
import { useUIStore } from '../../store';

const amenityIcons: Record<string, React.ReactNode> = {
  wifi: <Wifi size={12} />, parking: <Car size={12} />, meals: <Utensils size={12} />,
  mess: <Utensils size={12} />, gym: <Dumbbell size={12} />, security: <Shield size={12} />,
  ac: <Zap size={12} />,
};

// Simulate broker's own listings (all listings for demo)
const brokerListings = mockListings.map(l => ({
  ...l,
  views: Math.floor(Math.random() * 200) + 50,
  enquiries: Math.floor(Math.random() * 15) + 2,
}));

export function BrokerListings() {
  const { addToast } = useUIStore();
  const [listings, setListings] = useState(brokerListings);

  const toggleStatus = (id: string) => {
    setListings(prev => prev.map(l => {
      if (l.id === id) {
        const newStatus = l.status === 'active' ? 'paused' : 'active';
        addToast(`Listing ${newStatus === 'active' ? 'activated' : 'paused'}`, newStatus === 'active' ? 'success' : 'info');
        return { ...l, status: newStatus as any };
      }
      return l;
    }));
  };

  const activeCount = listings.filter(l => l.status === 'active').length;
  const pausedCount = listings.filter(l => l.status === 'paused').length;

  return (
    <motion.div key="broker-listings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold font-heading text-text-primary">My Listings</h1>
          <p className="text-sm text-text-secondary mt-1">
            {activeCount} active · {pausedCount} paused
          </p>
        </div>
        <AnimatedButton size="sm" icon={<Plus size={16} />}>Add Listing</AnimatedButton>
      </div>

      <div className="space-y-3">
        {listings.map((listing, i) => (
          <motion.div
            key={listing.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <GlassCard hover padding="none" className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* Left — Image placeholder */}
                <div className={`h-32 md:h-auto md:w-48 relative overflow-hidden flex-shrink-0 ${
                  listing.type === 'pg' ? 'bg-gradient-to-br from-accent-purple/20 to-accent-blue/10' :
                  listing.type === 'apartment' ? 'bg-gradient-to-br from-accent-emerald/20 to-accent-cyan/10' :
                  listing.type === 'hostel' ? 'bg-gradient-to-br from-accent-amber/20 to-accent-coral/10' :
                  'bg-gradient-to-br from-accent-blue/20 to-accent-purple/10'
                }`}>
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2 py-1 rounded-lg bg-black/30 backdrop-blur text-[10px] font-semibold uppercase text-white">
                      {listing.type.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="absolute bottom-2.5 right-2.5">
                    <StatusBadge status={listing.status} />
                  </div>
                </div>

                {/* Right — Content */}
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-sm font-semibold text-text-primary line-clamp-1">{listing.title}</h3>
                      <p className="text-xs text-text-tertiary flex items-center gap-1 mt-0.5">
                        <MapPin size={11} /> {listing.locality}, {listing.city}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <p className="text-base font-bold text-text-primary flex items-center gap-0.5 mb-2">
                    <IndianRupee size={14} />{listing.rentMin.toLocaleString('en-IN')}
                    {listing.rentMin !== listing.rentMax && <span className="text-text-tertiary font-normal text-xs"> – ₹{listing.rentMax.toLocaleString('en-IN')}</span>}
                    <span className="text-text-ghost font-normal text-xs">/mo</span>
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-3">
                    <span className="flex items-center gap-1.5 text-xs text-text-secondary">
                      <Eye size={12} className="text-text-tertiary" />
                      {listing.views} views
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-text-secondary">
                      <MessageSquare size={12} className="text-text-tertiary" />
                      {listing.enquiries} enquiries
                    </span>
                  </div>

                  {/* Amenities */}
                  <div className="flex gap-1 flex-wrap mb-3">
                    {listing.amenities.slice(0, 4).map((a: string) => (
                      <span key={a} className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-surface/60 text-[10px] text-text-tertiary">
                        {amenityIcons[a]} {a}
                      </span>
                    ))}
                    {listing.amenities.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded bg-surface/60 text-[10px] text-text-ghost">+{listing.amenities.length - 4}</span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <AnimatedButton
                      variant="ghost" size="sm"
                      icon={listing.status === 'active' ? <Pause size={14} /> : <Play size={14} />}
                      onClick={() => toggleStatus(listing.id)}
                    >
                      {listing.status === 'active' ? 'Pause' : 'Activate'}
                    </AnimatedButton>
                    <AnimatedButton variant="ghost" size="sm" icon={<Edit size={14} />}>
                      Edit
                    </AnimatedButton>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
