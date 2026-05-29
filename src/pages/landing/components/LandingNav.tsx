import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

export function LandingNav() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const bgOpacity = useTransform(scrollY, [0, 100], [0, 1]);

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (v) => setScrolled(v > 50));
    return () => unsubscribe();
  }, [scrollY]);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Testimonials', href: '#social-proof' },
  ];

  const scrollToSection = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="absolute inset-0 nav-blur border-b"
          style={{
            opacity: bgOpacity,
            backgroundColor: 'rgba(255,255,255,0.85)',
            borderColor: scrolled ? 'rgba(226,232,240,0.6)' : 'transparent',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.a
              href="#"
              className="flex items-center gap-2.5 relative z-10"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0F172A] to-[#1E3A8A] flex items-center justify-center shadow-lg shadow-blue-900/20">
                <span className="text-white font-bold text-sm" style={{ fontFamily: 'var(--font-display)' }}>R</span>
              </div>
              <span
                className="text-lg font-bold tracking-tight"
                style={{
                  fontFamily: 'var(--font-modern)',
                  color: scrolled ? '#0F172A' : '#0F172A',
                }}
              >
                Rentizzo
              </span>
            </motion.a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-blue-light rounded-full transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => navigate('/login')}
                className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors px-4 py-2"
              >
                Sign In
              </button>
              <motion.button
                onClick={() => navigate('/login')}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-[#0F172A] to-[#1E3A8A] shadow-lg shadow-blue-900/20 hover:shadow-xl hover:shadow-blue-900/30 transition-shadow"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Get Started
                <ArrowRight size={14} />
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden relative z-10 p-2 text-text-primary"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/30 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-72 bg-white z-50 md:hidden shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            >
              <div className="flex flex-col h-full pt-20 pb-8 px-6">
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link, i) => (
                    <motion.button
                      key={link.label}
                      onClick={() => scrollToSection(link.href)}
                      className="text-left px-4 py-3 text-base font-medium text-text-secondary hover:text-text-primary hover:bg-slate-50 rounded-xl transition-colors"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {link.label}
                    </motion.button>
                  ))}
                </nav>
                <div className="mt-auto flex flex-col gap-3">
                  <button
                    onClick={() => { setMobileOpen(false); navigate('/login'); }}
                    className="w-full px-4 py-3 text-sm font-medium text-text-secondary border border-glass-border rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => { setMobileOpen(false); navigate('/login'); }}
                    className="w-full px-4 py-3 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-[#0F172A] to-[#1E3A8A] shadow-lg"
                  >
                    Get Started Free
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
