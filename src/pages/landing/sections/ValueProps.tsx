import { motion } from 'framer-motion';
import { ShieldCheck, PhoneCall, CreditCard, Wrench, BarChart3, Users } from 'lucide-react';

const valueProps = [
  {
    icon: <ShieldCheck size={22} />,
    title: 'Verified Listings Only',
    description: 'Every property is checked before going live. No fake photos, no misleading prices, no bait-and-switch.',
  },
  {
    icon: <PhoneCall size={22} />,
    title: 'Direct Owner Contact',
    description: 'Connect directly with PG owners and property managers. No middlemen fees, no unnecessary broker charges.',
  },
  {
    icon: <CreditCard size={22} />,
    title: 'Pay Rent Online',
    description: 'Already living somewhere? Pay monthly rent via UPI, card, or netbanking. Get instant digital receipts.',
  },
  {
    icon: <Wrench size={22} />,
    title: 'Raise Complaints Instantly',
    description: 'Plumbing issue? Electrician needed? Raise maintenance requests from the app and track resolution in real time.',
  },
  {
    icon: <BarChart3 size={22} />,
    title: 'Owner Dashboard',
    description: 'Property owners and managers get a complete dashboard — track occupancy, rent collection, and tenant management.',
  },
  {
    icon: <Users size={22} />,
    title: 'Find Roommates',
    description: 'Looking to share a flat? Match with compatible roommates based on budget, lifestyle, and location preferences.',
  },
];

export function ValueProps() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-slate-50/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 font-heading mb-2">
            Why Rentizzo
          </h2>
          <p className="text-sm sm:text-base text-slate-500">
            Built for how rentals actually work in Indore — for tenants, owners, and everyone in between.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {valueProps.map((prop, i) => (
            <motion.div
              key={prop.title}
              className="bg-white rounded-xl border border-slate-100 p-5 sm:p-6"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
            >
              <div className="w-10 h-10 rounded-xl bg-[#1E3A8A]/6 flex items-center justify-center text-[#1E3A8A] mb-3">
                {prop.icon}
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-slate-800 mb-1.5">
                {prop.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {prop.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
