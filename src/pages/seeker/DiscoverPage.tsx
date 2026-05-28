import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard, AnimatedButton, ChipFilter } from '../../components/ui';
import { mockListings } from '../../lib/mock/data';
import { parseSearchQuery } from '../../lib/ai/classifiers';
import type { Listing } from '../../types';
  Search, Sparkles, MapPin, IndianRupee, Shield, Heart, Wifi, Car,
  Utensils, Dumbbell, Waves, Zap, X, Send, Verified
} from 'lucide-react';
import { useUIStore } from '../../store';

const amenityIcons: Record<string, React.ReactNode> = {
  wifi: <Wifi size={12} />, parking: <Car size={12} />, meals: <Utensils size={12} />,
  mess: <Utensils size={12} />, gym: <Dumbbell size={12} />, pool: <Waves size={12} />,
  ac: <Zap size={12} />, security: <Shield size={12} />,
};

export function DiscoverPage() {
  const [query, setQuery] = useState('');
  const [aiParsed, setAiParsed] = useState<ReturnType<typeof parseSearchQuery> | null>(null);
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const { addToast } = useUIStore();

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.length > 5) {
      const parsed = parseSearchQuery(value);
      setAiParsed(parsed);
    } else {
      setAiParsed(null);
    }
  };

  const filteredListings = useMemo(() => {
    let result = [...mockListings];
    if (aiParsed) {
      if (aiParsed.locality) result = result.filter(l => l.locality.toLowerCase().includes(aiParsed.locality!.toLowerCase()));
      if (aiParsed.maxBudget) result = result.filter(l => l.rentMin <= aiParsed.maxBudget!);
      if (aiParsed.propertyType) result = result.filter(l => l.type === aiParsed.propertyType);
      if (aiParsed.genderPref) result = result.filter(l => l.genderPref === aiParsed.genderPref || l.genderPref === 'any');
    }
    if (typeFilter.length > 0) {
      const typeMap: Record<string, string> = { 'PG': 'pg', 'Apartment': 'apartment', 'Hostel': 'hostel', 'Shared Flat': 'shared_flat', 'House': 'house' };
      result = result.filter(l => typeFilter.some(t => typeMap[t] === l.type));
    }
    return result;
  }, [aiParsed, typeFilter]);

  const toggleSave = (id: string) => {
    setSavedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); addToast('Removed from saved', 'info'); }
      else { next.add(id); addToast('Listing saved!', 'success'); }
      return next;
    });
  };

  return (
    <motion.div key="discover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-4">
      <motion.h1
        className="text-2xl font-bold font-heading text-text-primary mb-1"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Discover Your Next Home
      </motion.h1>
      <p className="text-sm text-text-secondary mb-4">Browse verified PGs, apartments, and hostels</p>

      {/* AI Search Bar */}
      <motion.div className="mb-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="relative">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-ghost" />
          <input
            type="text"
            placeholder='Try: "PG under 10k in Koramangala with meals"'
            value={query}
            onChange={e => handleSearch(e.target.value)}
            className="w-full pl-10 pr-10 py-3 rounded-2xl glass-elevated border border-glass-border text-sm text-text-primary placeholder-text-ghost bg-transparent outline-none focus:border-accent-blue/40 transition-colors"
          />
          {query && (
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-text-ghost hover:text-text-primary" onClick={() => { setQuery(''); setAiParsed(null); }}>
              <X size={16} />
            </button>
          )}
        </div>

        {/* AI Parse Feedback */}
        {aiParsed && (aiParsed.locality || aiParsed.maxBudget || aiParsed.propertyType) && (
          <motion.div
            className="mt-2 px-3 py-2 rounded-xl bg-accent-blue/5 border border-accent-blue/15 flex items-center gap-2 flex-wrap"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <Sparkles size={14} className="text-accent-blue-light flex-shrink-0" />
            <span className="text-[11px] text-text-tertiary">AI understood:</span>
            {aiParsed.locality && <span className="px-2 py-0.5 rounded-md bg-accent-blue/10 text-[10px] font-medium text-accent-blue-light">📍 {aiParsed.locality}</span>}
            {aiParsed.maxBudget && <span className="px-2 py-0.5 rounded-md bg-accent-emerald/10 text-[10px] font-medium text-accent-emerald">💰 Under ₹{(aiParsed.maxBudget / 1000).toFixed(0)}k</span>}
            {aiParsed.propertyType && <span className="px-2 py-0.5 rounded-md bg-accent-purple/10 text-[10px] font-medium text-accent-purple-light">🏠 {aiParsed.propertyType.toUpperCase()}</span>}
            {aiParsed.amenities.length > 0 && aiParsed.amenities.map(a => (
              <span key={a} className="px-2 py-0.5 rounded-md bg-accent-amber/10 text-[10px] font-medium text-accent-amber">✨ {a}</span>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Filter Chips */}
      <div className="mb-4">
        <ChipFilter
          options={['PG', 'Apartment', 'Hostel', 'Shared Flat', 'House']}
          selected={typeFilter}
          onChange={setTypeFilter}
        />
      </div>

      {/* Results Count */}
      <p className="text-xs text-text-ghost mb-3">{filteredListings.length} properties found</p>

      {/* Listing Cards */}
      <div className="space-y-3">
        {filteredListings.map((listing, i) => (
          <motion.div
            key={listing.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <GlassCard hover padding="none" className="cursor-pointer overflow-hidden" onClick={() => setSelectedListing(listing)}>
              {/* Photo placeholder */}
              <div className={`h-36 relative overflow-hidden ${
                listing.type === 'pg' ? 'bg-gradient-to-br from-accent-purple/20 to-accent-blue/10' :
                listing.type === 'apartment' ? 'bg-gradient-to-br from-accent-emerald/20 to-accent-cyan/10' :
                listing.type === 'hostel' ? 'bg-gradient-to-br from-accent-amber/20 to-accent-coral/10' :
                'bg-gradient-to-br from-accent-blue/20 to-accent-purple/10'
              }`}>
                {/* Badges */}
                <div className="absolute top-2.5 left-2.5 flex gap-1.5">
                  {listing.isVerified && (
                    <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-accent-emerald/20 backdrop-blur border border-accent-emerald/30 text-[10px] font-semibold text-accent-emerald">
                      <Verified size={10} /> Verified
                    </span>
                  )}
                  {listing.genderPref === 'female' && (
                    <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-accent-coral/20 backdrop-blur border border-accent-coral/30 text-[10px] font-semibold text-accent-coral">
                      ♀ Girls Only
                    </span>
                  )}
                </div>
                {/* Save Button */}
                <button
                  className="absolute top-2.5 right-2.5 p-2 rounded-full bg-black/30 backdrop-blur"
                  onClick={(e) => { e.stopPropagation(); toggleSave(listing.id); }}
                >
                  <Heart size={16} className={savedIds.has(listing.id) ? 'text-accent-coral fill-accent-coral' : 'text-white/70'} />
                </button>
                {/* Type badge */}
                <div className="absolute bottom-2.5 left-2.5">
                  <span className="px-2 py-1 rounded-lg bg-black/40 backdrop-blur text-[10px] font-semibold uppercase text-white">
                    {listing.type.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <div className="p-3.5">
                <h3 className="text-sm font-semibold text-text-primary line-clamp-1 mb-1">{listing.title}</h3>
                <p className="text-xs text-text-tertiary flex items-center gap-1 mb-2">
                  <MapPin size={12} /> {listing.locality}, {listing.city}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-base font-bold text-text-primary flex items-center gap-0.5">
                    <IndianRupee size={14} />{listing.rentMin.toLocaleString('en-IN')}
                    {listing.rentMin !== listing.rentMax && <span className="text-text-tertiary font-normal text-xs"> – ₹{listing.rentMax.toLocaleString('en-IN')}</span>}
                    <span className="text-text-ghost font-normal text-xs">/mo</span>
                  </p>
                  <div className="flex gap-1">
                    {listing.amenities.slice(0, 3).map((a: string) => (
                      <span key={a} className="p-1 rounded-md bg-surface/50 text-text-tertiary">
                        {amenityIcons[a] || null}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Listing Detail Bottom Sheet */}
      <AnimatePresence>
        {selectedListing && (
          <>
            <motion.div className="fixed inset-0 bg-black/50 z-40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedListing(null)} />
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-50 glass-elevated rounded-t-3xl max-h-[85vh] overflow-y-auto"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            >
              <div className="w-12 h-1.5 bg-muted rounded-full mx-auto mt-3 mb-2" />
              <div className="px-5 pb-8">
                {/* Header */}
                <div className={`h-48 rounded-2xl mb-4 relative overflow-hidden ${
                  selectedListing.type === 'pg' ? 'bg-gradient-to-br from-accent-purple/20 to-accent-blue/10' :
                  'bg-gradient-to-br from-accent-emerald/20 to-accent-cyan/10'
                }`}>
                  <div className="absolute top-3 left-3 flex gap-2">
                    {selectedListing.isVerified && <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-accent-emerald/20 backdrop-blur border border-accent-emerald/30 text-[10px] font-semibold text-accent-emerald"><Verified size={10} /> Verified</span>}
                    {selectedListing.genderPref === 'female' && <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-accent-coral/20 backdrop-blur border border-accent-coral/30 text-[10px] font-semibold text-accent-coral">♀ Girls Only</span>}
                  </div>
                  <button className="absolute top-3 right-3 p-2 rounded-full bg-black/30 backdrop-blur text-white" onClick={() => setSelectedListing(null)}>
                    <X size={18} />
                  </button>
                </div>

                <h2 className="text-lg font-bold text-text-primary mb-1">{selectedListing.title}</h2>
                <p className="text-sm text-text-tertiary flex items-center gap-1 mb-3">
                  <MapPin size={14} /> {selectedListing.locality}, {selectedListing.city}
                </p>

                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-2xl font-bold text-text-primary">₹{selectedListing.rentMin.toLocaleString('en-IN')}</span>
                  {selectedListing.rentMin !== selectedListing.rentMax && <span className="text-text-secondary"> – ₹{selectedListing.rentMax.toLocaleString('en-IN')}</span>}
                  <span className="text-text-ghost text-sm">/month</span>
                  {selectedListing.deposit && <span className="text-xs text-text-ghost ml-2">· Deposit: ₹{selectedListing.deposit.toLocaleString('en-IN')}</span>}
                </div>

                <p className="text-sm text-text-secondary leading-relaxed mb-4">{selectedListing.description}</p>

                {/* Amenities */}
                <h3 className="text-xs font-semibold text-text-ghost uppercase tracking-wider mb-2">Amenities</h3>
                <div className="flex gap-2 flex-wrap mb-4">
                  {selectedListing.amenities.map(a => (
                    <span key={a} className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-surface/60 border border-glass-border text-xs text-text-secondary">
                      {amenityIcons[a]} {a.charAt(0).toUpperCase() + a.slice(1).replace('_', ' ')}
                    </span>
                  ))}
                </div>

                {/* Rules */}
                {selectedListing.rules.length > 0 && (
                  <>
                    <h3 className="text-xs font-semibold text-text-ghost uppercase tracking-wider mb-2">House Rules</h3>
                    <div className="space-y-1.5 mb-5">
                      {selectedListing.rules.map((r, i) => (
                        <p key={i} className="text-xs text-text-secondary">• {r}</p>
                      ))}
                    </div>
                  </>
                )}

                {/* Enquiry Button */}
                <AnimatedButton fullWidth size="lg" icon={<Send size={16} />}
                  onClick={() => { setSelectedListing(null); addToast('Enquiry sent! The owner will contact you.', 'success'); }}>
                  Send Enquiry
                </AnimatedButton>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
