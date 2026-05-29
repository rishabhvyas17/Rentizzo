import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building2, Users, MapPin, Star } from 'lucide-react';

const stats = [
  { value: 10000, suffix: '+', label: 'Properties Managed', icon: <Building2 size={20} /> },
  { value: 50000, suffix: '+', label: 'Happy Tenants', icon: <Users size={20} /> },
  { value: 25, suffix: '+', label: 'Cities Covered', icon: <MapPin size={20} /> },
  { value: 4.8, suffix: '', label: 'Average Rating', icon: <Star size={20} />, decimals: 1 },
];

const testimonials = [
  {
    quote: "Rentizzo completely transformed how I manage my 3 properties. Rent collection is now on autopilot.",
    name: 'Vikram Sharma',
    role: 'Property Owner, Delhi',
    rating: 5,
  },
  {
    quote: "Finding a PG was always stressful. With Rentizzo, I found a verified place and a roommate within a week.",
    name: 'Priya Nair',
    role: 'Software Engineer, Bangalore',
    rating: 5,
  },
  {
    quote: "The maintenance tracking alone is worth it. My tenants are happier and complaints are resolved 3x faster.",
    name: 'Arjun Mehta',
    role: 'Building Manager, Mumbai',
    rating: 5,
  },
  {
    quote: "I moved to a new city for work and Rentizzo made the entire process seamless. The roommate matching is genius.",
    name: 'Sneha Gupta',
    role: 'Marketing Manager, Pune',
    rating: 5,
  },
  {
    quote: "As a broker, the verified badge brings me more leads. The platform is clean and professional.",
    name: 'Rajesh Kumar',
    role: 'RERA Verified Broker, Hyderabad',
    rating: 4,
  },
  {
    quote: "Paying rent with one tap, getting receipts instantly — this is how it should always have been.",
    name: 'Ananya Desai',
    role: 'Tenant, Chennai',
    rating: 5,
  },
];

function AnimatedCounter({
  value,
  suffix = '',
  decimals = 0,
  isInView,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const duration = 2000;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      start = eased * end;

      setCount(start);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, value]);

  const formatted = decimals > 0
    ? count.toFixed(decimals)
    : Math.floor(count).toLocaleString('en-IN');

  return (
    <span className="counter-value">
      {formatted}{suffix}
    </span>
  );
}

export function SocialProof() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="social-proof" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, var(--color-void) 0%, #F0F4FF 50%, var(--color-void) 100%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.3em] text-accent-blue-light mb-4">
            Trusted by Thousands
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4"
            style={{ fontFamily: 'var(--font-modern)' }}
          >
            Numbers Don't Lie
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-20 md:mb-24">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-accent-blue/8 text-accent-blue-light mb-4">
                {stat.icon}
              </div>
              <p
                className="text-4xl md:text-5xl font-bold text-text-primary mb-2"
                style={{ fontFamily: 'var(--font-modern)' }}
              >
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                  isInView={isInView}
                />
              </p>
              <p className="text-sm text-text-secondary font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials marquee */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-[#F0F4FF] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-[#F0F4FF] to-transparent z-10 pointer-events-none" />

          {/* Scrolling row */}
          <div className="overflow-hidden">
            <div className="flex gap-4 animate-marquee" style={{ width: 'max-content' }}>
              {[...testimonials, ...testimonials].map((t, i) => (
                <TestimonialCard key={i} testimonial={t} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: (typeof testimonials)[number] }) {
  return (
    <div className="w-[320px] md:w-[380px] flex-shrink-0 glass-landing p-5 md:p-6">
      {/* Stars */}
      <div className="flex items-center gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}
          />
        ))}
      </div>

      {/* Quote */}
      <p className="text-sm text-text-primary leading-relaxed mb-4 line-clamp-3" style={{ minHeight: '3.6em' }}>
        "{testimonial.quote}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          {testimonial.name.split(' ').map(w => w[0]).join('')}
        </div>
        <div>
          <p className="text-sm font-semibold text-text-primary">{testimonial.name}</p>
          <p className="text-[11px] text-text-tertiary">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}
