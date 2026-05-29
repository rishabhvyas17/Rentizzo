import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, X } from 'lucide-react';

type PropertyType = 'pg' | 'hostel' | 'room' | 'flat';
type Gender = 'any' | 'boys' | 'girls';

const COLLEGES_AND_AREAS = [
  { label: 'Sage University', type: 'college' as const },
  { label: 'Medicaps University', type: 'college' as const },
  { label: 'IPS Academy', type: 'college' as const },
  { label: 'DAVV (Devi Ahilya University)', type: 'college' as const },
  { label: 'IIM Indore', type: 'college' as const },
  { label: 'Prestige Institute', type: 'college' as const },
  { label: 'Acropolis Institute', type: 'college' as const },
  { label: 'Silicon City', type: 'area' as const },
  { label: 'Vijay Nagar', type: 'area' as const },
  { label: 'Bhawarkuan', type: 'area' as const },
  { label: 'Rau', type: 'area' as const },
  { label: 'Rajendra Nagar', type: 'area' as const },
  { label: 'Palasia', type: 'area' as const },
  { label: 'Sudama Nagar', type: 'area' as const },
  { label: 'Pigdamber', type: 'area' as const },
  { label: 'Vaishali Nagar', type: 'area' as const },
  { label: 'Geeta Bhawan', type: 'area' as const },
  { label: 'Saket Nagar', type: 'area' as const },
  { label: 'New Palasia', type: 'area' as const },
  { label: 'AB Road', type: 'area' as const },
];

const QUICK_LINKS = [
  'Sage University',
  'Medicaps',
  'IPS Academy',
  'Bhawarkuan',
  'Vijay Nagar',
  'Rau',
];

export function HeroSection() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [activeType, setActiveType] = useState<PropertyType>('pg');
  const [gender, setGender] = useState<Gender>('any');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return COLLEGES_AND_AREAS.filter((item) =>
      item.label.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [query]);

  const handleSearch = (searchQuery?: string) => {
    const q = searchQuery || query;
    setShowSuggestions(false);
    // Navigate to discover page — in a real app this would pass filters
    navigate('/seeker/discover');
    console.log('Search:', { query: q, type: activeType, gender });
  };

  const handleSelectSuggestion = (label: string) => {
    setQuery(label);
    setShowSuggestions(false);
    handleSearch(label);
  };

  const handleQuickLink = (label: string) => {
    setQuery(label);
    handleSearch(label);
  };

  const propertyTypes: { id: PropertyType; label: string }[] = [
    { id: 'pg', label: 'PG' },
    { id: 'hostel', label: 'Hostel' },
    { id: 'room', label: 'Room' },
    { id: 'flat', label: 'Flat' },
  ];

  const genderOptions: { id: Gender; label: string }[] = [
    { id: 'any', label: 'Any' },
    { id: 'boys', label: 'Boys' },
    { id: 'girls', label: 'Girls' },
  ];

  return (
    <section
      id="search"
      className="relative bg-gradient-to-b from-[#F0F4FF] via-[#F7F8FC] to-white pt-8 pb-12 sm:pt-12 sm:pb-16 md:pt-16 md:pb-20"
    >
      {/* Subtle decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-indigo-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
        {/* Heading — SEO h1 */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 font-heading leading-tight mb-3">
            Find PGs, Hostels & Rooms
            <br />
            <span className="text-[#1E3A8A]">in Indore</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-500 max-w-md mx-auto">
            Verified listings near Sage, Medicaps, IPS Academy and all major colleges. Starting ₹4,000/month.
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/60 border border-slate-100 p-4 sm:p-5">
          {/* Property type tabs */}
          <div className="flex gap-1 mb-4 bg-slate-50 rounded-lg p-1">
            {propertyTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                className={`flex-1 text-xs sm:text-sm font-medium py-2 rounded-md transition-all ${
                  activeType === type.id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Search input */}
          <div className="relative mb-3">
            <div className="flex items-center gap-2 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-[#1E3A8A]/40 focus-within:ring-2 focus-within:ring-[#1E3A8A]/10 transition-all">
              <Search size={18} className="text-slate-400 ml-3 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search by college, area or locality..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => query.trim() && setShowSuggestions(true)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1 bg-transparent py-3 sm:py-3.5 text-sm sm:text-base text-slate-900 placeholder-slate-400 outline-none"
              />
              {query && (
                <button
                  onClick={() => { setQuery(''); inputRef.current?.focus(); }}
                  className="p-1.5 mr-1 text-slate-400 hover:text-slate-600"
                >
                  <X size={16} />
                </button>
              )}
              <button
                onClick={() => handleSearch()}
                className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white text-sm font-semibold px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg mr-1.5 transition-colors flex-shrink-0"
              >
                Search
              </button>
            </div>

            {/* Autocomplete dropdown */}
            <AnimatePresence>
              {showSuggestions && suggestions.length > 0 && (
                <motion.div
                  className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-slate-200 shadow-xl z-30 overflow-hidden"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.12 }}
                >
                  {suggestions.map((s) => (
                    <button
                      key={s.label}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors"
                      onClick={() => handleSelectSuggestion(s.label)}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      <MapPin size={14} className={s.type === 'college' ? 'text-[#1E3A8A]' : 'text-slate-400'} />
                      <span className="flex-1">{s.label}</span>
                      <span className="text-[11px] text-slate-400 font-medium uppercase">
                        {s.type === 'college' ? 'College' : 'Area'}
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Filters row */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Gender filter */}
            <div className="flex items-center gap-1 bg-slate-50 rounded-lg p-0.5">
              {genderOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setGender(opt.id)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-md transition-all ${
                    gender === opt.id
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Budget hint */}
            <span className="text-xs text-slate-400 hidden sm:inline">
              Budget: ₹4,000 – ₹18,000/mo
            </span>
          </div>
        </div>

        {/* Quick search links */}
        <div className="mt-4 flex items-center gap-2 flex-wrap justify-center">
          <span className="text-xs text-slate-400 font-medium">Popular:</span>
          {QUICK_LINKS.map((label) => (
            <button
              key={label}
              onClick={() => handleQuickLink(label)}
              className="text-xs font-medium text-[#1E3A8A]/80 hover:text-[#1E3A8A] bg-[#1E3A8A]/5 hover:bg-[#1E3A8A]/10 px-2.5 py-1 rounded-full transition-colors"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Close suggestions on click outside */}
      {showSuggestions && (
        <div className="fixed inset-0 z-20" onClick={() => setShowSuggestions(false)} />
      )}
    </section>
  );
}
