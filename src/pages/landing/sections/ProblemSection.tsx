import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const painPoints = [
  {
    emoji: '🏠',
    text: 'Finding a home shouldn\'t feel like a full-time job',
    stat: '12,000+',
    statLabel: 'hours wasted searching annually per city',
    gradient: 'from-blue-500/20 to-indigo-500/10',
  },
  {
    emoji: '💰',
    text: 'Rent collection shouldn\'t mean chasing people',
    stat: '₹3.2 Cr',
    statLabel: 'overdue rent across landlords monthly',
    gradient: 'from-amber-500/20 to-orange-500/10',
  },
  {
    emoji: '🔧',
    text: 'Maintenance requests shouldn\'t disappear into a void',
    stat: '68%',
    statLabel: 'of tenant complaints go unresolved for weeks',
    gradient: 'from-rose-500/20 to-pink-500/10',
  },
];

export function ProblemSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map scroll to which pain point is visible (0, 1, 2)
  const activeIndex = useTransform(scrollYProgress, [0, 0.33, 0.34, 0.66, 0.67, 1], [0, 0, 1, 1, 2, 2]);

  return (
    <section ref={containerRef} className="relative" style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-void">
        {/* Background gradient */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#08090D] via-transparent to-transparent h-32" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-void" style={{ top: '70%' }} />
        </div>

        {/* Section label */}
        <motion.div
          className="absolute top-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-text-ghost">
            The Problem
          </span>
        </motion.div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {painPoints.map((point, i) => (
            <PainPointCard key={i} point={point} index={i} activeIndex={activeIndex} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PainPointCard({
  point,
  index,
  activeIndex,
}: {
  point: (typeof painPoints)[number];
  index: number;
  activeIndex: ReturnType<typeof useTransform>;
}) {
  const opacity = useTransform(activeIndex, (latest: number) => {
    const distance = Math.abs(latest - index);
    return distance < 0.5 ? 1 : 0;
  });

  const y = useTransform(activeIndex, (latest: number) => {
    const diff = latest - index;
    if (Math.abs(diff) > 0.5) return diff > 0 ? -60 : 60;
    return 0;
  });

  const scale = useTransform(activeIndex, (latest: number) => {
    const distance = Math.abs(latest - index);
    return distance < 0.5 ? 1 : 0.9;
  });

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center px-6"
      style={{ opacity, y, scale }}
    >
      {/* Emoji */}
      <span className="text-5xl md:text-6xl mb-8 block">{point.emoji}</span>

      {/* Pain statement */}
      <h2
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight mb-8 max-w-3xl"
        style={{ fontFamily: 'var(--font-modern)' }}
      >
        {point.text}
      </h2>

      {/* Stat */}
      <div className={`inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-r ${point.gradient}`}>
        <span
          className="text-3xl md:text-4xl font-bold text-text-primary counter-value"
          style={{ fontFamily: 'var(--font-modern)' }}
        >
          {point.stat}
        </span>
        <span className="text-sm text-text-secondary text-left max-w-[200px]">
          {point.statLabel}
        </span>
      </div>

      {/* Progress dots */}
      <div className="flex items-center gap-2 mt-10">
        {painPoints.map((_, dotIdx) => (
          <motion.div
            key={dotIdx}
            className="rounded-full transition-all duration-300"
            style={{
              width: dotIdx === index ? 24 : 8,
              height: 8,
              background: dotIdx === index
                ? 'linear-gradient(90deg, #2563EB, #7C3AED)'
                : 'rgba(148,163,200,0.2)',
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
