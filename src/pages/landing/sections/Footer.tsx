import { useNavigate } from 'react-router-dom';

export function Footer() {
  const navigate = useNavigate();

  const scrollTo = (href: string) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-[#1E3A8A] flex items-center justify-center">
                <span className="text-white font-bold text-xs">R</span>
              </div>
              <span className="text-sm font-bold tracking-tight">Rentizzo</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4 max-w-[200px]">
              The rental platform for Indore. Find PGs, hostels, and rooms near your college.
            </p>
          </div>

          {/* Near Colleges — SEO links */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Near Colleges
            </h4>
            <ul className="space-y-2">
              {[
                'PG near Sage University',
                'PG near Medicaps',
                'PG near IPS Academy',
                'PG near DAVV',
                'Hostel near IIM Indore',
              ].map((text) => (
                <li key={text}>
                  <button
                    onClick={() => navigate('/seeker/discover')}
                    className="text-xs text-slate-500 hover:text-white transition-colors"
                  >
                    {text}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Areas — SEO links */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Popular Areas
            </h4>
            <ul className="space-y-2">
              {[
                'PG in Vijay Nagar',
                'PG in Bhawarkuan',
                'PG in Rau',
                'Hostel in Palasia',
                'Rooms in Silicon City',
              ].map((text) => (
                <li key={text}>
                  <button
                    onClick={() => navigate('/seeker/discover')}
                    className="text-xs text-slate-500 hover:text-white transition-colors"
                  >
                    {text}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Company
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'List Property', action: () => scrollTo('#list-property') },
                { label: 'For Brokers', action: () => scrollTo('#for-brokers') },
                { label: 'Privacy Policy', action: () => {} },
                { label: 'Terms of Service', action: () => {} },
                { label: 'Contact Us', action: () => {} },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={link.action}
                    className="text-xs text-slate-500 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-slate-600">
            © {new Date().getFullYear()} Rentizzo. All rights reserved.
          </p>
          <p className="text-[11px] text-slate-600">
            Made in Indore 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
}
