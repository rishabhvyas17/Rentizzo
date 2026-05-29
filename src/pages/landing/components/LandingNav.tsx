import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

export function LandingNav() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: 'Find a Room', href: '#search' },
    { label: 'Browse Areas', href: '#areas' },
    { label: 'List Property', href: '#list-property' },
    { label: 'For Brokers', href: '#for-brokers' },
  ];

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 nav-blur border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <a
              href="/"
              className="flex items-center gap-2"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              <div className="w-8 h-8 rounded-lg bg-[#1E3A8A] flex items-center justify-center">
                <span className="text-white font-bold text-sm font-heading">R</span>
              </div>
              <span className="text-base font-bold text-slate-900 font-heading tracking-tight">
                Rentizzo
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="text-[13px] font-medium text-slate-500 hover:text-slate-900 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => navigate('/login')}
                className="text-[13px] font-medium text-slate-600 hover:text-slate-900 px-3 py-2 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/login')}
                className="text-[13px] font-semibold text-white bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5"
              >
                Get Started
                <ArrowRight size={13} />
              </button>
            </div>

            {/* Mobile menu */}
            <button
              className="md:hidden p-2 text-slate-600"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/20 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed top-14 left-0 right-0 bg-white z-50 md:hidden border-b border-slate-100 shadow-lg"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
            >
              <nav className="flex flex-col p-3 gap-1">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => scrollTo(link.href)}
                    className="text-left px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
                <div className="border-t border-slate-100 mt-2 pt-2 flex gap-2">
                  <button
                    onClick={() => { setMobileOpen(false); navigate('/login'); }}
                    className="flex-1 text-sm font-medium text-slate-600 border border-slate-200 px-3 py-2.5 rounded-lg"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => { setMobileOpen(false); navigate('/login'); }}
                    className="flex-1 text-sm font-semibold text-white bg-[#1E3A8A] px-3 py-2.5 rounded-lg"
                  >
                    Get Started
                  </button>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
