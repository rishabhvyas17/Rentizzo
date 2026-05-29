import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Building2, UserCheck, Briefcase, ArrowRight, CheckCircle } from 'lucide-react';

const roles = [
  {
    icon: <Building2 size={22} />,
    title: 'Property Owners',
    description: 'List your PG, hostel, or rental property for free. Get direct leads from verified students and working professionals.',
    benefits: ['Free listing', 'Direct tenant contact', 'Rent collection tools', 'Occupancy tracking'],
    cta: 'List Your Property',
    gradient: 'from-[#1E3A8A] to-[#2563EB]',
  },
  {
    icon: <UserCheck size={22} />,
    title: 'Property Managers',
    description: 'Manage multiple buildings from one dashboard. Track rooms, tenants, payments, and complaints — all in one place.',
    benefits: ['Multi-property dashboard', 'Tenant management', 'Automated reminders', 'Reports & analytics'],
    cta: 'Start Managing',
    gradient: 'from-[#047857] to-[#059669]',
  },
  {
    icon: <Briefcase size={22} />,
    title: 'Brokers',
    description: 'Get verified on Rentizzo and connect with genuine seekers. Build your reputation with ratings and reviews.',
    benefits: ['Verified broker badge', 'Lead generation', 'Review & rating system', 'Listing management'],
    cta: 'Join as Broker',
    gradient: 'from-[#6D28D9] to-[#7C3AED]',
  },
];

export function ListProperty() {
  const navigate = useNavigate();

  return (
    <section id="list-property" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 font-heading mb-2">
            For property owners, managers & brokers
          </h2>
          <p className="text-sm sm:text-base text-slate-500 max-w-xl">
            Rentizzo isn't just for tenants. List your property, manage your portfolio, or grow your broker business — all from one platform.
          </p>
        </div>

        {/* Role cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5" id="for-brokers">
          {roles.map((role, i) => (
            <motion.div
              key={role.title}
              className="relative bg-white rounded-xl border border-slate-100 overflow-hidden group hover:border-slate-200 hover:shadow-md transition-all"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
            >
              {/* Top accent bar */}
              <div className={`h-1 bg-gradient-to-r ${role.gradient}`} />

              <div className="p-5 sm:p-6">
                {/* Icon + title */}
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${role.gradient} flex items-center justify-center text-white mb-3`}>
                  {role.icon}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-2">
                  {role.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4">
                  {role.description}
                </p>

                {/* Benefits */}
                <ul className="space-y-1.5 mb-5">
                  {role.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                      <CheckCircle size={13} className="text-emerald-500 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => navigate('/login')}
                  className={`w-full inline-flex items-center justify-center gap-1.5 bg-gradient-to-r ${role.gradient} text-white text-sm font-semibold py-2.5 rounded-lg hover:opacity-90 transition-opacity`}
                >
                  {role.cta}
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
