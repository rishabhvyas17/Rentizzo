import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const letterSpacing = useTransform(scrollYProgress, [0, 0.3], ['-0.02em', '0.08em']);
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.8], [0.35, 0.1]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #08090D 0%, #0C1220 40%, #111827 100%)' }}
    >
      {/* Ambient gradient orbs */}
      <motion.div
        className="glow-orb w-[500px] h-[500px] -top-32 -left-48"
        style={{
          background: 'radial-gradient(circle, rgba(30,58,138,0.4) 0%, transparent 70%)',
          scale: orbScale,
          opacity: orbOpacity,
        }}
      />
      <motion.div
        className="glow-orb w-[400px] h-[400px] top-1/2 -right-32"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)',
          scale: orbScale,
          opacity: orbOpacity,
        }}
      />
      <motion.div
        className="glow-orb w-[300px] h-[300px] bottom-32 left-1/3"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)',
          scale: orbScale,
          opacity: orbOpacity,
        }}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        style={{ y: titleY, opacity: titleOpacity }}
      >
        {/* Pill badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 md:mb-10"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-medium text-slate-400 tracking-wide">
            Now live in 25+ cities across India
          </span>
        </motion.div>

        {/* Brand name — the hero IS the brand */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <motion.span
            className="block text-7xl sm:text-8xl md:text-9xl lg:text-[160px] font-bold tracking-tight text-white leading-none"
            style={{
              fontFamily: 'var(--font-display)',
              letterSpacing,
            }}
          >
            Rentizzo
          </motion.span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg sm:text-xl md:text-2xl font-light tracking-wide mb-4 max-w-2xl mx-auto"
          style={{
            fontFamily: 'var(--font-modern)',
            color: 'rgba(255,255,255,0.6)',
          }}
        >
          Rentals, Reimagined.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          style={{ opacity: subtitleOpacity }}
          className="text-sm md:text-base text-slate-500 mb-10 max-w-lg mx-auto leading-relaxed"
        >
          The all-in-one operating system for the Indian rental ecosystem.
          Manage properties · Pay rent · Discover homes · Find roommates.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            onClick={() => navigate('/login')}
            className="group inline-flex items-center gap-2.5 px-8 py-4 text-base font-semibold text-white rounded-2xl shadow-2xl shadow-blue-500/20 transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 50%, #1E40AF 100%)',
            }}
            whileHover={{ scale: 1.04, boxShadow: '0 25px 50px -12px rgba(37,99,235,0.35)' }}
            whileTap={{ scale: 0.97 }}
          >
            Explore the Ecosystem
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </motion.button>

          <motion.button
            onClick={() => {
              const el = document.querySelector('#ecosystem');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-4 text-sm font-medium rounded-2xl transition-all duration-300"
            style={{
              color: 'rgba(255,255,255,0.6)',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.03)',
            }}
            whileHover={{
              borderColor: 'rgba(255,255,255,0.2)',
              color: 'rgba(255,255,255,0.9)',
              background: 'rgba(255,255,255,0.06)',
            }}
            whileTap={{ scale: 0.97 }}
          >
            See How It Works
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{ opacity: subtitleOpacity }}
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-600">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} className="text-slate-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}
