import { Building2 } from 'lucide-react';

const footerLinks = {
  product: [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Pricing', href: '#' },
    { label: 'API', href: '#' },
  ],
  company: [
    { label: 'About Us', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Press', href: '#' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'RERA Compliance', href: '#' },
  ],
  support: [
    { label: 'Help Center', href: '#' },
    { label: 'Contact Us', href: '#' },
    { label: 'Status', href: '#' },
    { label: 'Community', href: '#' },
  ],
};

export function Footer() {
  const scrollToSection = (href: string) => {
    if (href === '#') return;
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#08090D] text-white overflow-hidden">
      {/* Top gradient line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 md:gap-12">
          {/* Brand column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1E3A8A] to-[#2563EB] flex items-center justify-center shadow-lg shadow-blue-500/10">
                <span className="text-white font-bold text-sm" style={{ fontFamily: 'var(--font-display)' }}>R</span>
              </div>
              <span className="text-lg font-bold tracking-tight" style={{ fontFamily: 'var(--font-modern)' }}>
                Rentizzo
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed mb-6 max-w-xs">
              The all-in-one operating system for the Indian rental ecosystem. Manage, pay, discover — all in one place.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {['X', 'In', 'Ig', 'Yt'].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400 mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-sm text-slate-500 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Rentizzo. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Building2 size={12} />
            <span>Made with precision in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
