import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard, StatusBadge, Avatar, AnimatedButton, ProgressRing } from '../../components/ui';
import { mockBuildings, mockRooms } from '../../lib/mock/data';
import type { Building, Room } from '../../types';
import { Building2, MapPin, Plus, Wifi, Car, Shield, Utensils, Dumbbell, ChevronRight, X, CreditCard, Wrench, UserPlus } from 'lucide-react';

const amenityIcons: Record<string, React.ReactNode> = {
  wifi: <Wifi size={14} />, parking: <Car size={14} />, security: <Shield size={14} />,
  mess: <Utensils size={14} />, meals: <Utensils size={14} />, gym: <Dumbbell size={14} />,
};

export function BuildingsPage() {
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);

  return (
    <motion.div key="buildings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold font-heading text-text-primary">Buildings</h1>
          <p className="text-sm text-text-secondary mt-1">{mockBuildings.length} properties under management</p>
        </div>
        <AnimatedButton size="sm" icon={<Plus size={16} />}>Add Building</AnimatedButton>
      </div>

      <AnimatePresence mode="wait">
        {selectedBuilding ? (
          <BuildingFloorGrid
            key={selectedBuilding.id}
            building={selectedBuilding}
            onBack={() => setSelectedBuilding(null)}
          />
        ) : (
          <motion.div
            key="list"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {mockBuildings.map((b, i) => {
              const occupancy = b.occupiedRooms && b.totalRooms ? Math.round((b.occupiedRooms / b.totalRooms) * 100) : 0;
              return (
                <GlassCard
                  key={b.id} hover delay={i * 0.08} padding="none"
                  className="cursor-pointer overflow-hidden"
                  onClick={() => setSelectedBuilding(b)}
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
                      <ProgressRing value={occupancy} size={44} strokeWidth={4} color={occupancy > 80 ? '#10B981' : occupancy > 50 ? '#F59E0B' : '#F43F5E'} />
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-base font-semibold text-text-primary mb-1">{b.name}</h3>
                    <p className="text-xs text-text-tertiary flex items-center gap-1 mb-3">
                      <MapPin size={12} /> {b.addressLine1}, {b.city}
                    </p>

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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Building Floor Grid ──

function BuildingFloorGrid({ building, onBack }: { building: Building; onBack: () => void }) {
  const rooms = mockRooms.filter(r => r.buildingId === building.id);
  const floors = [...new Set(rooms.map(r => r.floor))].sort((a, b) => a - b);
  const [activeFloor, setActiveFloor] = useState(floors[0] || 0);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const floorRooms = rooms.filter(r => r.floor === activeFloor);

  const statusColors: Record<string, string> = {
    vacant: 'border-accent-emerald/40 bg-accent-emerald/8 hover:bg-accent-emerald/15 hover:border-accent-emerald/60',
    occupied: 'border-accent-blue/40 bg-accent-blue/8 hover:bg-accent-blue/15 hover:border-accent-blue/60',
    maintenance: 'border-accent-amber/40 bg-accent-amber/8 hover:bg-accent-amber/15 hover:border-accent-amber/60',
    reserved: 'border-accent-purple/40 bg-accent-purple/8 hover:bg-accent-purple/15 hover:border-accent-purple/60',
  };

  const statusDots: Record<string, string> = {
    vacant: 'bg-accent-emerald',
    occupied: 'bg-accent-blue',
    maintenance: 'bg-accent-amber',
    reserved: 'bg-accent-purple',
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <button className="p-2 rounded-xl glass border border-glass-border text-text-secondary hover:text-text-primary transition-colors" onClick={onBack}>
          <ChevronRight size={18} className="rotate-180" />
        </button>
        <div className="flex-1">
          <h2 className="text-xl font-bold font-heading text-text-primary">{building.name}</h2>
          <p className="text-xs text-text-tertiary">{building.addressLine1} · {building.occupiedRooms}/{building.totalRooms} occupied</p>
        </div>
        <AnimatedButton size="sm" icon={<Plus size={16} />}>Add Room</AnimatedButton>
      </div>

      {/* Status Legend */}
      <div className="flex gap-4 mb-4 mt-4">
        {['vacant', 'occupied', 'maintenance', 'reserved'].map(s => (
          <span key={s} className="flex items-center gap-1.5 text-[11px] text-text-tertiary">
            <span className={`w-2.5 h-2.5 rounded-full ${statusDots[s]}`} />
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </span>
        ))}
      </div>

      {/* Floor Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4">
        {floors.map((f) => (
          <motion.button
            key={f}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap border transition-all
              ${activeFloor === f
                ? 'bg-accent-blue/15 border-accent-blue/30 text-accent-blue-light'
                : 'glass border-glass-border text-text-secondary hover:text-text-primary'
              }`}
            onClick={() => setActiveFloor(f)}
            whileTap={{ scale: 0.95 }}
          >
            Floor {f === 0 ? 'G' : f}
          </motion.button>
        ))}
      </div>

      {/* Room Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        {floorRooms.map((room, i) => (
          <motion.button
            key={room.id}
            className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${statusColors[room.status]}
              ${room.status === 'vacant' ? 'animate-breathing' : ''}`}
            onClick={() => setSelectedRoom(room)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03, type: 'spring', stiffness: 300 }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-base font-bold text-text-primary">{room.roomNumber}</span>
              <span className={`w-2 h-2 rounded-full ${statusDots[room.status]} ${room.status === 'vacant' ? 'animate-pulse-soft' : ''}`} />
            </div>
            <p className="text-[10px] text-text-tertiary uppercase font-medium mb-1">{room.type}</p>
            <p className="text-sm font-semibold text-text-primary">₹{room.rentAmount.toLocaleString('en-IN')}</p>
            {room.tenantName && (
              <p className="text-[11px] text-text-secondary mt-1.5 truncate">{room.tenantName}</p>
            )}
          </motion.button>
        ))}
      </div>

      {/* Room Detail Bottom Sheet */}
      <AnimatePresence>
        {selectedRoom && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRoom(null)}
            />
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-50 glass-elevated rounded-t-3xl max-h-[70vh] overflow-y-auto"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            >
              <div className="w-12 h-1.5 bg-muted rounded-full mx-auto mt-3 mb-4" />
              <div className="px-5 pb-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-text-primary">Room {selectedRoom.roomNumber}</h3>
                    <p className="text-sm text-text-secondary">Floor {selectedRoom.floor} · {selectedRoom.type} · {selectedRoom.furnishing}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={selectedRoom.status} />
                    <button className="p-1.5 text-text-tertiary hover:text-text-primary" onClick={() => setSelectedRoom(null)}>
                      <X size={20} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-5">
                  <div className="text-center py-3 rounded-xl bg-surface/50">
                    <p className="text-lg font-bold text-text-primary">₹{selectedRoom.rentAmount.toLocaleString('en-IN')}</p>
                    <p className="text-[9px] text-text-tertiary uppercase">Rent</p>
                  </div>
                  <div className="text-center py-3 rounded-xl bg-surface/50">
                    <p className="text-lg font-bold text-text-primary">₹{selectedRoom.depositAmount.toLocaleString('en-IN')}</p>
                    <p className="text-[9px] text-text-tertiary uppercase">Deposit</p>
                  </div>
                  <div className="text-center py-3 rounded-xl bg-surface/50">
                    <p className="text-lg font-bold text-text-primary">{selectedRoom.sizeSqft || '—'}</p>
                    <p className="text-[9px] text-text-tertiary uppercase">Sq Ft</p>
                  </div>
                </div>

                {selectedRoom.tenantName && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-surface/50 border border-glass-border mb-5">
                    <Avatar name={selectedRoom.tenantName} size="md" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text-primary">{selectedRoom.tenantName}</p>
                      <p className="text-xs text-text-tertiary">Current Tenant</p>
                    </div>
                    <ChevronRight size={16} className="text-text-ghost" />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  {selectedRoom.status === 'vacant' ? (
                    <AnimatedButton fullWidth icon={<UserPlus size={16} />}>Allot Tenant</AnimatedButton>
                  ) : (
                    <>
                      <AnimatedButton variant="secondary" fullWidth icon={<CreditCard size={16} />}>Mark Paid</AnimatedButton>
                      <AnimatedButton variant="secondary" fullWidth icon={<Wrench size={16} />}>Request</AnimatedButton>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
