import { motion } from 'framer-motion';
import { ShieldCheck, PhoneCall, CreditCard, Wrench, BarChart3, Users } from 'lucide-react';

const valueProps = [
  {
    icon: <ShieldCheck size={24} />,
    title: 'Verified Listings Only',
    description: 'Every property is checked before going live. No fake photos, no misleading prices, no bait-and-switch.',
    color: '#1E3A8A',
    bgColor: 'bg-blue-50',
  },
  {
    icon: <PhoneCall size={24} />,
    title: 'Direct Owner Contact',
    description: 'Connect directly with PG owners and property managers. No middlemen fees, no unnecessary broker charges.',
    color: '#047857',
    bgColor: 'bg-emerald-50',
  },
  {
    icon: <CreditCard size={24} />,
    title: 'Pay Rent Online',
    description: 'Already living somewhere? Pay monthly rent via UPI, card, or netbanking. Get instant digital receipts.',
    color: '#7C3AED',
    bgColor: 'bg-violet-50',
  },
  {
    icon: <Wrench size={24} />,
    title: 'Raise Complaints Instantly',
    description: 'Plumbing issue? Electrician needed? Raise maintenance requests from the app and track resolution in real time.',
    color: '#D97706',
    bgColor: 'bg-amber-50',
  },
  {
    icon: <BarChart3 size={24} />,
    title: 'Owner Dashboard',
    description: 'Property owners and managers get a complete dashboard — track occupancy, rent collection, and tenant management.',
    color: '#0891B2',
    bgColor: 'bg-cyan-50',
  },
  {
    icon: <Users size={24} />,
    title: 'Find Roommates',
    description: 'Looking to share a flat? Match with compatible roommates based on budget, lifestyle, and location preferences.',
    color: '#DB2777',
    bgColor: 'bg-pink-50',
  },
];

export function ValueProps() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-slate-50/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 font-heading mb-2">
            Why Rentizzo
          </h2>
          <p className="text-sm sm:text-base text-slate-500 max-w-lg mx-auto">
            Built for how rentals actually work in Indore — for tenants, owners, and everyone in between.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {valueProps.map((prop, i) => (
            <motion.div
              key={prop.title}
              className="group bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg hover:border-slate-200 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
            >
              {/* Icon with colored background */}
              <div
                className={`w-12 h-12 rounded-2xl ${prop.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                style={{ color: prop.color }}
              >
                {prop.icon}
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-2">
                {prop.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {prop.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
