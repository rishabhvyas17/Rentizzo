import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard, StatusBadge, AnimatedButton, ProgressRing } from '../../components/ui';
import { mockBuildings } from '../../lib/mock/data';
import { Building2, MapPin, Plus, Wifi, Car, Shield, Utensils, Dumbbell, ChevronRight, TrendingUp, IndianRupee } from 'lucide-react';

const amenityIcons: Record<string, React.ReactNode> = {
  wifi: <Wifi size={14} />, parking: <Car size={14} />, security: <Shield size={14} />,
  mess: <Utensils size={14} />, meals: <Utensils size={14} />, gym: <Dumbbell size={14} />,
};

// Mock revenue per building
const buildingRevenue: Record<string, number> = {
  'b-001': 85500,
  'b-002': 112000,
  'b-003': 46000,
};

export function OwnerProperties() {
  return (
    <motion.div key="owner-properties" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold font-heading text-text-primary">My Properties</h1>
          <p className="text-sm text-text-secondary mt-1">{mockBuildings.length} properties in your portfolio</p>
        </div>
        <AnimatedButton size="sm" icon={<Plus size={16} />}>Add Property</AnimatedButton>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockBuildings.map((b, i) => {
          const occupancy = b.occupiedRooms && b.totalRooms ? Math.round((b.occupiedRooms / b.totalRooms) * 100) : 0;
          const revenue = buildingRevenue[b.id] || 0;
          return (
            <GlassCard
              key={b.id} hover delay={i * 0.08} padding="none"
              className="cursor-pointer overflow-hidden"
            >
              {/* Building Photo Placeholder */}
              <div className={`h-32 relative overflow-hidden ${
                b.type === 'pg' ? 'bg-gradient-to-br from-accent-purple/20 to-accent-blue/10' :
                b.type === 'apartment' ? 'bg-gradient-to-br from-accent-emerald/20 to-accent-cyan/10' :
                'bg-gradient-to-br from-accent-amber/20 to-accent-coral/10'
              }`}>
                <Building2 size={48} className="absolute bottom-3 right-3 text-white/10" />
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 rounded-lg text-[10px] font-semibold uppercase bg-black/30 backdrop-blur text-white">
                    {b.type}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <ProgressRing value={occupancy} size={44} strokeWidth={4} color={occupancy > 80 ? '#059669' : occupancy > 50 ? '#D97706' : '#BE123C'} />
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="text-base font-semibold text-text-primary">{b.name}</h3>
                  <StatusBadge status={b.isActive ? 'active' : 'maintenance'} />
                </div>
                <p className="text-xs text-text-tertiary flex items-center gap-1 mb-3">
                  <MapPin size={12} /> {b.addressLine1}, {b.city}
                </p>

                {/* Revenue highlight */}
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-accent-emerald/5 border border-accent-emerald/15 mb-3">
                  <IndianRupee size={14} className="text-accent-emerald" />
                  <span className="text-sm font-bold text-text-primary">₹{revenue.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] text-text-tertiary">/month</span>
                  <span className="ml-auto flex items-center gap-0.5 text-[10px] text-accent-emerald font-medium">
                    <TrendingUp size={10} /> +5%
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div className="text-center flex-1 py-2 rounded-lg bg-surface/50">
                    <p className="text-lg font-bold text-text-primary">{b.totalRooms}</p>
                    <p className="text-[9px] text-text-tertiary uppercase">Rooms</p>
                  </div>
                  <div className="text-center flex-1 py-2 rounded-lg bg-surface/50">
                    <p className="text-lg font-bold text-accent-emerald">{b.occupiedRooms}</p>
                    <p className="text-[9px] text-text-tertiary uppercase">Occupied</p>
                  </div>
                  <div className="text-center flex-1 py-2 rounded-lg bg-surface/50">
                    <p className="text-lg font-bold text-accent-amber">{(b.totalRooms || 0) - (b.occupiedRooms || 0)}</p>
                    <p className="text-[9px] text-text-tertiary uppercase">Vacant</p>
                  </div>
                </div>

                <div className="flex gap-1.5 flex-wrap">
                  {b.amenities.slice(0, 5).map((a: string) => (
                    <span key={a} className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-surface/50 text-[10px] text-text-tertiary">
                      {amenityIcons[a] || null} {a}
                    </span>
                  ))}
                  {b.amenities.length > 5 && (
                    <span className="px-2 py-1 rounded-md bg-surface/50 text-[10px] text-text-ghost">+{b.amenities.length - 5}</span>
                  )}
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </motion.div>
  );
}
