import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, ArrowRight, Building2, Home } from 'lucide-react';

interface CollegeArea {
  college: string;
  localities: {
    name: string;
    listings: number;
    priceRange: string;
  }[];
}

const COLLEGE_AREAS: CollegeArea[] = [
  {
    college: 'Sage University',
    localities: [
      { name: 'Silicon City', listings: 14, priceRange: '₹5K – ₹9K' },
      { name: 'Rau', listings: 11, priceRange: '₹4K – ₹8K' },
      { name: 'NYC Residency', listings: 6, priceRange: '₹6K – ₹11K' },
    ],
  },
  {
    college: 'Medicaps University',
    localities: [
      { name: 'Pigdamber', listings: 9, priceRange: '₹4K – ₹7K' },
      { name: 'Rau', listings: 11, priceRange: '₹4K – ₹8K' },
      { name: 'AB Road', listings: 7, priceRange: '₹5K – ₹10K' },
    ],
  },
  {
    college: 'IPS Academy',
    localities: [
      { name: 'Rajendra Nagar', listings: 12, priceRange: '₹5K – ₹10K' },
      { name: 'Vaishali Nagar', listings: 8, priceRange: '₹4.5K – ₹9K' },
      { name: 'Sudama Nagar', listings: 6, priceRange: '₹4K – ₹8K' },
    ],
  },
  {
    college: 'DAVV',
    localities: [
      { name: 'Bhawarkuan', listings: 18, priceRange: '₹4K – ₹9K' },
      { name: 'Geeta Bhawan', listings: 10, priceRange: '₹4.5K – ₹8K' },
      { name: 'New Palasia', listings: 8, priceRange: '₹5K – ₹11K' },
    ],
  },
];

const POPULAR_AREAS = [
  { name: 'Vijay Nagar', listings: 22, icon: <Building2 size={16} /> },
  { name: 'Bhawarkuan', listings: 18, icon: <Building2 size={16} /> },
  { name: 'Palasia', listings: 13, icon: <Building2 size={16} /> },
  { name: 'Saket Nagar', listings: 9, icon: <Home size={16} /> },
];

export function LocationBrowse() {
  const navigate = useNavigate();

  const handleAreaClick = (_area: string) => {
    navigate('/seeker/discover');
  };

  return (
    <section id="areas" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section heading — SEO h2 */}
        <div className="mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 font-heading mb-2">
            PGs & Hostels near top Indore colleges
          </h2>
          <p className="text-sm sm:text-base text-slate-500">
            Browse verified listings grouped by proximity to your college.
          </p>
        </div>

        {/* College-grouped areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-10 sm:mb-12">
          {COLLEGE_AREAS.map((group, gi) => (
            <motion.div
              key={group.college}
              className="bg-slate-50/70 rounded-xl border border-slate-100 p-4 sm:p-5"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: gi * 0.06 }}
            >
              {/* College name */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-[#1E3A8A]/8 flex items-center justify-center flex-shrink-0">
                  <GraduationCap size={14} className="text-[#1E3A8A]" />
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-slate-800">
                  Near {group.college}
                </h3>
              </div>

              {/* Locality cards */}
              <div className="grid grid-cols-3 gap-2">
                {group.localities.map((loc) => (
                  <button
                    key={loc.name}
                    onClick={() => handleAreaClick(loc.name)}
                    className="group bg-white rounded-lg border border-slate-100 p-2.5 sm:p-3 text-left hover:border-[#1E3A8A]/20 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center gap-1 mb-1.5">
                      <MapPin size={10} className="text-slate-400 flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-medium text-slate-700 truncate group-hover:text-[#1E3A8A] transition-colors">
                        {loc.name}
                      </span>
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-slate-400">
                      {loc.listings} listings
                    </p>
                    <p className="text-[10px] sm:text-[11px] font-medium text-slate-500">
                      {loc.priceRange}
                    </p>
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Popular areas */}
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-slate-800 font-heading mb-4">
            Popular areas in Indore
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {POPULAR_AREAS.map((area, i) => (
              <motion.button
                key={area.name}
                onClick={() => handleAreaClick(area.name)}
                className="group flex items-center gap-3 bg-slate-50 hover:bg-[#1E3A8A]/5 border border-slate-100 hover:border-[#1E3A8A]/15 rounded-xl p-3.5 transition-all text-left"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <div className="w-9 h-9 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#1E3A8A] transition-colors flex-shrink-0">
                  {area.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-700 group-hover:text-[#1E3A8A] transition-colors truncate">
                    {area.name}
                  </p>
                  <p className="text-[11px] text-slate-400">{area.listings} listings</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* View all link */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/seeker/discover')}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1E3A8A] hover:text-[#1E3A8A]/80 transition-colors"
          >
            View all areas in Indore
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
