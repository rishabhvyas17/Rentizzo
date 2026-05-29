import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const navigate = useNavigate();

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Dark cinematic background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #08090D 0%, #0C1220 40%, #111827 70%, #0F172A 100%)',
        }}
      />

      {/* Ambient orbs */}
      <div className="glow-orb w-[500px] h-[500px] -top-40 -right-40" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)' }} />
      <div className="glow-orb w-[400px] h-[400px] -bottom-32 -left-32" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)' }} />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        {/* Pill */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-medium text-slate-400">Free to start · No credit card required</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          style={{ fontFamily: 'var(--font-modern)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Ready to change{' '}
          <br className="hidden sm:block" />
          how you{' '}
          <span
            className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text"
            style={{ WebkitTextFillColor: 'transparent' }}
          >
            rent
          </span>
          ?
        </motion.h2>

        <motion.p
          className="text-base md:text-lg text-slate-400 mb-10 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Join thousands of owners, tenants, and seekers who've already made the switch to a smarter rental experience.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.button
            onClick={() => navigate('/login')}
            className="group inline-flex items-center gap-2.5 px-8 py-4 text-base font-semibold text-white rounded-2xl shadow-2xl transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 50%, #7C3AED 100%)',
              boxShadow: '0 20px 40px -10px rgba(79,70,229,0.3)',
            }}
            whileHover={{ scale: 1.04, boxShadow: '0 25px 50px -10px rgba(79,70,229,0.45)' }}
            whileTap={{ scale: 0.97 }}
          >
            Get Started Free
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
            Watch Demo
          </motion.button>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 text-slate-500 text-xs"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {[
            'Works on any device',
            'Setup in 2 minutes',
            'Bank-grade security',
          ].map((text) => (
            <span key={text} className="flex items-center gap-1.5">
              <Check size={12} className="text-emerald-500" />
              {text}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
