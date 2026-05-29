import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Smartphone, UserCheck, Sparkles } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Sign Up in 30 Seconds',
    description: 'Just your phone number and an OTP. No forms, no friction, no passwords to remember. We believe in zero-barrier onboarding.',
    icon: <Smartphone size={24} />,
    accentColor: '#3B82F6',
  },
  {
    number: '02',
    title: 'Tell Us Who You Are',
    description: 'Owner, Manager, Tenant, or Seeker — select your role and we customize the entire experience for your needs. One app, infinite possibilities.',
    icon: <UserCheck size={24} />,
    accentColor: '#8B5CF6',
  },
  {
    number: '03',
    title: 'Start Living Better',
    description: 'Your personalized dashboard is ready. Manage properties, pay rent, or discover your next home — all from day one, all in one place.',
    icon: <Sparkles size={24} />,
    accentColor: '#10B981',
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section id="how-it-works" ref={sectionRef} className="relative py-24 md:py-32 bg-void overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.3em] text-accent-blue-light mb-4">
            How It Works
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4"
            style={{ fontFamily: 'var(--font-modern)' }}
          >
            Three Steps. That's It.
          </h2>
          <p className="text-base md:text-lg text-text-secondary max-w-lg mx-auto">
            We stripped away everything unnecessary so you can get started in minutes, not hours.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent hidden sm:block" />
          <motion.div
            className="absolute left-6 md:left-8 top-0 w-px bg-gradient-to-b from-blue-500 via-violet-500 to-emerald-500 hidden sm:block"
            initial={{ height: 0 }}
            animate={isInView ? { height: '100%' } : {}}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          />

          {/* Steps */}
          <div className="space-y-12 md:space-y-16">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                className="relative flex gap-6 md:gap-10"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Step number node */}
                <div className="relative flex-shrink-0">
                  <motion.div
                    className="w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center relative z-10"
                    style={{
                      background: `linear-gradient(135deg, ${step.accentColor}15, ${step.accentColor}08)`,
                      border: `1px solid ${step.accentColor}25`,
                    }}
                    whileInView={{
                      boxShadow: `0 0 0 4px ${step.accentColor}08, 0 8px 25px -5px ${step.accentColor}15`,
                    }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.2 }}
                  >
                    <span
                      className="text-lg md:text-xl font-bold"
                      style={{ color: step.accentColor, fontFamily: 'var(--font-modern)' }}
                    >
                      {step.number}
                    </span>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-1 md:pt-3">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: `${step.accentColor}10`, color: step.accentColor }}
                    >
                      {step.icon}
                    </div>
                    <h3
                      className="text-xl md:text-2xl font-bold text-text-primary"
                      style={{ fontFamily: 'var(--font-modern)' }}
                    >
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm md:text-base text-text-secondary leading-relaxed max-w-lg">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
