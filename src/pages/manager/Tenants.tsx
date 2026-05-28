import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard, Avatar, StatusBadge, AnimatedButton, ChipFilter } from '../../components/ui';
import { mockTenants, mockRentCycles, mockMaintenanceRequests } from '../../lib/mock/data';
import { Search, Phone, Mail, Calendar, IndianRupee, ChevronRight, UserPlus } from 'lucide-react';

export function TenantsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string[]>([]);

  const filteredTenants = mockTenants.filter(t => {
    const matchesSearch = !searchQuery || t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.phone.includes(searchQuery);
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(t.status);
    return matchesSearch && matchesStatus;
  });

  return (
    <motion.div key="tenants" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold font-heading text-text-primary">Tenants</h1>
          <p className="text-sm text-text-secondary mt-1">{mockTenants.length} active tenants across all properties</p>
        </div>
        <AnimatedButton size="sm" icon={<UserPlus size={16} />}>Add Tenant</AnimatedButton>
      </div>

      {/* Search & Filters */}
      <div className="mb-5 space-y-3">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-ghost" />
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl glass border border-glass-border text-sm text-text-primary placeholder-text-ghost bg-transparent outline-none focus:border-accent-blue/40 transition-colors"
          />
        </div>
        <ChipFilter
          options={['Active', 'Notice Period', 'Moved Out']}
          selected={statusFilter}
          onChange={setStatusFilter}
        />
      </div>

      {/* Tenant Cards */}
      <div className="space-y-3">
        {filteredTenants.map((tenant, i) => {
          const rentCycle = mockRentCycles.find(r => r.tenantId === tenant.id);
          const request = mockMaintenanceRequests.find(r => r.tenantId === tenant.id && r.status !== 'resolved');
          return (
            <motion.div
              key={tenant.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <GlassCard hover padding="md" className="cursor-pointer">
                <div className="flex items-start gap-3">
                  <Avatar name={tenant.name} size="lg" showRing={!!request} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-semibold text-text-primary">{tenant.name}</h3>
                      <StatusBadge status={rentCycle?.status || 'pending'} />
                    </div>
                    <p className="text-xs text-text-tertiary mb-2">
                      {tenant.buildingName} · Room {tenant.roomNumber}
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <InfoChip icon={<IndianRupee size={12} />} label={`₹${tenant.monthlyRent.toLocaleString('en-IN')}/mo`} />
                      <InfoChip icon={<Calendar size={12} />} label={new Date(tenant.moveInDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })} />
                      <InfoChip icon={<Phone size={12} />} label={tenant.phone.slice(-4)} />
                      {tenant.email && <InfoChip icon={<Mail size={12} />} label={tenant.email.split('@')[0]} />}
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-text-ghost flex-shrink-0 mt-2" />
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

function InfoChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-surface/50 text-[10px] text-text-tertiary truncate">
      {icon} {label}
    </span>
  );
}
