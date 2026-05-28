import { type ReactNode, type HTMLAttributes } from 'react';
import { motion, type MotionProps } from 'framer-motion';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'subtle' | 'glow' | 'glow-emerald' | 'glow-amber' | 'glow-coral';
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  animate?: boolean;
  delay?: number;
}

const paddings = { none: '', sm: 'p-3', md: 'p-4 md:p-5', lg: 'p-5 md:p-6' };

const variants = {
  default: 'glass',
  elevated: 'glass-elevated',
  subtle: 'glass-subtle',
  glow: 'glass border-accent-blue/20 bg-surface/85 shadow-md',
  'glow-emerald': 'glass border-accent-emerald/20 bg-surface/85 shadow-md',
  'glow-amber': 'glass border-accent-amber/20 bg-surface/85 shadow-md',
  'glow-coral': 'glass border-accent-coral/20 bg-surface/85 shadow-md',
};

export function GlassCard({
  children, variant = 'default', hover = false, padding = 'md',
  animate = true, delay = 0, className = '', ...props
}: GlassCardProps) {
  const classes = `${variants[variant]} ${paddings[padding]} ${hover ? 'interactive' : ''} ${className}`.trim();

  if (!animate) return <div className={classes} {...props}>{children}</div>;

  return (
    <motion.div
      className={classes}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.1, 0.25, 1] }}
      {...(props as MotionProps)}
    >
      {children}
    </motion.div>
  );
}

// ── Animated Button ──

interface AnimatedButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

const btnVariants = {
  primary: 'bg-gradient-primary text-white shadow-md hover:brightness-110',
  secondary: 'glass border border-glass-border text-text-primary hover:bg-glass-hover',
  ghost: 'text-text-secondary hover:text-text-primary hover:bg-glass-hover',
  danger: 'bg-gradient-danger text-white shadow-md hover:brightness-110',
  success: 'bg-gradient-success text-white shadow-md hover:brightness-110',
};

const btnSizes = {
  sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
  md: 'px-4 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-6 py-3.5 text-base rounded-xl gap-2.5',
};

export function AnimatedButton({
  children, variant = 'primary', size = 'md', fullWidth = false,
  loading = false, disabled = false, icon, className = '', type = 'button', ...props
}: AnimatedButtonProps) {
  return (
    <motion.button
      type={type}
      className={`inline-flex items-center justify-center font-semibold transition-all focus-ring
        ${btnVariants[variant]} ${btnSizes[size]} ${fullWidth ? 'w-full' : ''}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}`}
      whileHover={!disabled && !loading ? { scale: 1.02 } : undefined}
      whileTap={!disabled && !loading ? { scale: 0.97 } : undefined}
      disabled={disabled || loading}
      {...(props as unknown as MotionProps)}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : icon}
      {children}
    </motion.button>
  );
}

// ── Metric Card ──

interface MetricCardProps {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  trend?: number;
  icon: ReactNode;
  color?: 'blue' | 'emerald' | 'amber' | 'coral' | 'purple';
  delay?: number;
}

const metricColors = {
  blue: { bg: 'from-accent-blue/15 to-accent-blue/5', text: 'text-accent-blue-light', ring: 'ring-accent-blue/20' },
  emerald: { bg: 'from-accent-emerald/15 to-accent-emerald/5', text: 'text-accent-emerald-light', ring: 'ring-accent-emerald/20' },
  amber: { bg: 'from-accent-amber/15 to-accent-amber/5', text: 'text-accent-amber-light', ring: 'ring-accent-amber/20' },
  coral: { bg: 'from-accent-coral/15 to-accent-coral/5', text: 'text-accent-coral-light', ring: 'ring-accent-coral/20' },
  purple: { bg: 'from-accent-purple/15 to-accent-purple/5', text: 'text-accent-purple-light', ring: 'ring-accent-purple/20' },
};

export function MetricCard({ label, value, prefix = '', suffix = '', trend, icon, color = 'blue', delay = 0 }: MetricCardProps) {
  const c = metricColors[color];
  return (
    <GlassCard delay={delay} className="relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${c.bg} pointer-events-none`} />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-1">{label}</p>
          <motion.p
            className="text-2xl md:text-3xl font-bold text-text-primary"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.2, duration: 0.5 }}
          >
            {prefix}{typeof value === 'number' ? value.toLocaleString('en-IN') : value}{suffix}
          </motion.p>
          {trend !== undefined && (
            <p className={`text-xs mt-1 font-medium ${trend >= 0 ? 'text-accent-emerald' : 'text-accent-coral'}`}>
              {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% vs last month
            </p>
          )}
        </div>
        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${c.bg} ring-1 ${c.ring}`}>
          <div className={c.text}>{icon}</div>
        </div>
      </div>
    </GlassCard>
  );
}

// ── Status Badge ──

interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'dot';
  size?: 'sm' | 'md';
}

const statusColors: Record<string, string> = {
  paid: 'bg-accent-emerald/15 text-accent-emerald border-accent-emerald/30',
  active: 'bg-accent-emerald/15 text-accent-emerald border-accent-emerald/30',
  success: 'bg-accent-emerald/15 text-accent-emerald border-accent-emerald/30',
  resolved: 'bg-accent-emerald/15 text-accent-emerald border-accent-emerald/30',
  vacant: 'bg-accent-emerald/15 text-accent-emerald border-accent-emerald/30',
  occupied: 'bg-accent-blue/15 text-accent-blue-light border-accent-blue/30',
  pending: 'bg-accent-amber/15 text-accent-amber border-accent-amber/30',
  scheduled: 'bg-accent-amber/15 text-accent-amber border-accent-amber/30',
  reserved: 'bg-accent-purple/15 text-accent-purple-light border-accent-purple/30',
  partial: 'bg-accent-amber/15 text-accent-amber border-accent-amber/30',
  overdue: 'bg-accent-coral/15 text-accent-coral border-accent-coral/30',
  open: 'bg-accent-coral/15 text-accent-coral border-accent-coral/30',
  in_progress: 'bg-accent-blue/15 text-accent-blue-light border-accent-blue/30',
  maintenance: 'bg-accent-amber/15 text-accent-amber border-accent-amber/30',
  new: 'bg-accent-cyan/15 text-accent-cyan border-accent-cyan/30',
  contacted: 'bg-accent-blue/15 text-accent-blue-light border-accent-blue/30',
  converted: 'bg-accent-emerald/15 text-accent-emerald border-accent-emerald/30',
  rejected: 'bg-accent-coral/15 text-accent-coral border-accent-coral/30',
  verified: 'bg-accent-emerald/15 text-accent-emerald border-accent-emerald/30',
  sent: 'bg-accent-emerald/15 text-accent-emerald border-accent-emerald/30',
  failed: 'bg-accent-coral/15 text-accent-coral border-accent-coral/30',
};

const dotColors: Record<string, string> = {
  paid: 'bg-accent-emerald', active: 'bg-accent-emerald', success: 'bg-accent-emerald', vacant: 'bg-accent-emerald',
  occupied: 'bg-accent-blue', pending: 'bg-accent-amber', reserved: 'bg-accent-purple',
  overdue: 'bg-accent-coral', open: 'bg-accent-coral', in_progress: 'bg-accent-blue',
  maintenance: 'bg-accent-amber', new: 'bg-accent-cyan',
};

export function StatusBadge({ status, variant = 'default', size = 'sm' }: StatusBadgeProps) {
  const colorClass = statusColors[status] || 'bg-muted/20 text-text-secondary border-muted/30';
  const label = status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  if (variant === 'dot') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary">
        <span className={`w-2 h-2 rounded-full ${dotColors[status] || 'bg-muted'} ${status === 'overdue' || status === 'open' ? 'animate-pulse-soft' : ''}`} />
        {label}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 ${size === 'sm' ? 'text-[10px]' : 'text-xs'} font-semibold rounded-full border ${colorClass} uppercase tracking-wider`}>
      {label}
    </span>
  );
}

// ── Avatar ──

interface AvatarProps {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showRing?: boolean;
}

const avatarSizes = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-12 h-12 text-base', xl: 'w-16 h-16 text-lg' };

const avatarGradients = [
  'from-slate-600 to-slate-800',
  'from-blue-900 to-slate-800',
  'from-emerald-900 to-slate-800',
  'from-amber-900 to-slate-800',
  'from-indigo-950 to-slate-800',
];

export function Avatar({ name, src, size = 'md', showRing = false }: AvatarProps) {
  const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  const gradientIdx = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % avatarGradients.length;

  return (
    <div className={`${avatarSizes[size]} rounded-full flex items-center justify-center font-bold overflow-hidden flex-shrink-0
      ${showRing ? 'ring-2 ring-accent-blue/30 ring-offset-2 ring-offset-abyss' : ''}
      ${src ? '' : `bg-gradient-to-br ${avatarGradients[gradientIdx]} text-white`}`}>
      {src ? <img src={src} alt={name} className="w-full h-full object-cover" /> : initials}
    </div>
  );
}

// ── Skeleton ──

export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-shimmer rounded-lg ${className}`} />;
}

// ── Empty State ──

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-blue/10 to-accent-purple/10 flex items-center justify-center text-text-tertiary mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
      <p className="text-sm text-text-tertiary max-w-xs mb-6">{description}</p>
      {action}
    </motion.div>
  );
}

// ── Progress Ring ──

interface ProgressRingProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
}

export function ProgressRing({ value, size = 80, strokeWidth = 6, color = '#3B82F6', label }: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(148,163,200,0.1)" strokeWidth={strokeWidth} fill="none" />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius} stroke={color}
          strokeWidth={strokeWidth} fill="none" strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeOut' }}
          strokeDasharray={circumference}
        />
      </svg>
      <div className="absolute text-center">
        <span className="text-lg font-bold text-text-primary">{value}%</span>
        {label && <p className="text-[9px] text-text-tertiary font-medium">{label}</p>}
      </div>
    </div>
  );
}

// ── Toast Container ──

export function ToastContainer({ toasts, onRemove }: { toasts: Array<{ id: string; message: string; type: string }>; onRemove: (id: string) => void }) {
  const typeColors = {
    success: 'border-accent-emerald/40 bg-accent-emerald/10',
    error: 'border-accent-coral/40 bg-accent-coral/10',
    info: 'border-accent-blue/40 bg-accent-blue/10',
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      {toasts.map((toast) => (
        <motion.div
          key={toast.id}
          className={`glass p-3 rounded-xl border ${typeColors[toast.type as keyof typeof typeColors] || typeColors.info} cursor-pointer`}
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 50 }}
          onClick={() => onRemove(toast.id)}
        >
          <p className="text-sm text-text-primary">{toast.message}</p>
        </motion.div>
      ))}
    </div>
  );
}

// ── Chip Filter ──

interface ChipFilterProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  single?: boolean;
}

export function ChipFilter({ options, selected, onChange, single = false }: ChipFilterProps) {
  const toggle = (opt: string) => {
    if (single) {
      onChange(selected.includes(opt) ? [] : [opt]);
    } else {
      onChange(selected.includes(opt) ? selected.filter(s => s !== opt) : [...selected, opt]);
    }
  };

  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
      {options.map((opt) => (
        <motion.button
          key={opt}
          className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-all
            ${selected.includes(opt)
              ? 'bg-accent-blue/20 border-accent-blue/40 text-accent-blue-light'
              : 'bg-surface/50 border-glass-border text-text-secondary hover:text-text-primary'
            }`}
          whileTap={{ scale: 0.95 }}
          onClick={() => toggle(opt)}
        >
          {opt}
        </motion.button>
      ))}
    </div>
  );
}

// ── Tab Bar (mobile bottom nav) ──

interface TabBarProps {
  tabs: Array<{ id: string; label: string; icon: ReactNode }>;
  activeTab: string;
  onTabChange: (id: string) => void;
}

export function TabBar({ tabs, activeTab, onTabChange }: TabBarProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 glass-elevated border-t border-glass-border safe-area-bottom md:hidden">
      <div className="flex items-center justify-around px-2 py-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all relative
                ${isActive ? 'text-accent-blue-light' : 'text-text-tertiary hover:text-text-secondary'}`}
              onClick={() => onTabChange(tab.id)}
            >
              {isActive && (
                <motion.div
                  className="absolute inset-0 bg-accent-blue/10 rounded-xl"
                  layoutId="tab-indicator"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.icon}</span>
              <span className="relative z-10 text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
