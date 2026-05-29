import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, ArrowRight, Building2, TrendingUp } from 'lucide-react';

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
  { name: 'Vijay Nagar', listings: 22, tag: 'Most Popular', color: '#1E3A8A' },
  { name: 'Bhawarkuan', listings: 18, tag: 'Student Hub', color: '#047857' },
  { name: 'Palasia', listings: 13, tag: 'City Center', color: '#7C3AED' },
  { name: 'Saket Nagar', listings: 9, tag: 'Residential', color: '#D97706' },
];

export function LocationBrowse() {
  const navigate = useNavigate();

  const handleAreaClick = (_area: string) => {
    navigate('/seeker/discover');
  };

  return (
    <section id="areas" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section heading with illustration */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 font-heading mb-2">
              PGs & Hostels near top Indore colleges
            </h2>
            <p className="text-sm sm:text-base text-slate-500">
              Browse verified listings grouped by proximity to your college.
            </p>
          </div>
          <button
            onClick={() => navigate('/seeker/discover')}
            className="text-sm font-medium text-[#1E3A8A] hover:text-[#1E3A8A]/80 flex items-center gap-1 flex-shrink-0 transition-colors"
          >
            View all areas <ArrowRight size={14} />
          </button>
        </div>

        {/* Popular areas — horizontal cards with tags */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
          {POPULAR_AREAS.map((area, i) => (
            <motion.button
              key={area.name}
              onClick={() => handleAreaClick(area.name)}
              className="group relative bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 text-left hover:shadow-lg hover:border-slate-200 transition-all duration-300 overflow-hidden"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
            >
              {/* Decorative corner */}
              <div
                className="absolute top-0 right-0 w-16 h-16 rounded-bl-[40px] opacity-[0.06]"
                style={{ background: area.color }}
              />

              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 size={16} style={{ color: area.color }} />
                  <span
                    className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded"
                    style={{ color: area.color, background: `${area.color}10` }}
                  >
                    {area.tag}
                  </span>
                </div>
                <p className="text-base sm:text-lg font-semibold text-slate-800 group-hover:text-[#1E3A8A] transition-colors">
                  {area.name}
                </p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <TrendingUp size={11} className="text-emerald-500" />
                  <span className="text-xs text-slate-500">{area.listings} listings</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* College-grouped areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {COLLEGE_AREAS.map((group, gi) => (
            <motion.div
              key={group.college}
              className="bg-gradient-to-br from-slate-50/80 to-white rounded-2xl border border-slate-100 p-5 sm:p-6 hover:shadow-md transition-shadow duration-300"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: gi * 0.06 }}
            >
              {/* College name */}
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-xl bg-[#1E3A8A]/8 flex items-center justify-center flex-shrink-0">
                  <GraduationCap size={16} className="text-[#1E3A8A]" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-800">
                  Near {group.college}
                </h3>
              </div>

              {/* Locality cards */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {group.localities.map((loc) => (
                  <button
                    key={loc.name}
                    onClick={() => handleAreaClick(loc.name)}
                    className="group/card bg-white rounded-xl border border-slate-100 p-3 text-left hover:border-[#1E3A8A]/20 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center gap-1 mb-2">
                      <MapPin size={11} className="text-[#1E3A8A]/60 flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-semibold text-slate-700 truncate group-hover/card:text-[#1E3A8A] transition-colors">
                        {loc.name}
                      </span>
                    </div>
                    <p className="text-[11px] text-emerald-600 font-medium">
                      {loc.listings} listings
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {loc.priceRange}
                    </p>
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
