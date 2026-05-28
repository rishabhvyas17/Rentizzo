import { useState, useRef, useEffect, type KeyboardEvent, type ClipboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../store';
import { AnimatedButton, GlassCard } from '../../components/ui';
import { Sparkles, Building2, Users, Search, Shield, ArrowRight, ArrowLeft } from 'lucide-react';

type Step = 'welcome' | 'phone' | 'otp' | 'role';

export function LoginPage() {
  const [step, setStep] = useState<Step>('welcome');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const navigate = useNavigate();
  const { loginAsManager, loginAsTenant, loginAsSeeker, sendOtp } = useAuthStore();
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handlePhoneSubmit = () => {
    if (phone.length >= 10) {
      sendOtp(phone);
      setStep('otp');
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
    if (newOtp.every(d => d !== '')) {
      setTimeout(() => setStep('role'), 300);
    }
  };

  const handleOtpKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (text.length === 6) {
      setOtp(text.split(''));
      otpRefs.current[5]?.focus();
      setTimeout(() => setStep('role'), 300);
    }
  };

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setTimeout(() => {
      if (role === 'manager' || role === 'owner') { loginAsManager(); navigate('/manager'); }
      else if (role === 'tenant') { loginAsTenant(); navigate('/tenant'); }
      else { loginAsSeeker(); navigate('/seeker'); }
    }, 400);
  };

  useEffect(() => {
    if (step === 'otp') otpRefs.current[0]?.focus();
  }, [step]);

  const roles = [
    { id: 'owner', label: 'Owner', desc: 'I own rental properties', icon: <Building2 size={28} />, gradient: 'from-accent-amber to-accent-coral' },
    { id: 'manager', label: 'Manager', desc: 'I manage properties for owners', icon: <Users size={28} />, gradient: 'from-accent-blue to-accent-purple' },
    { id: 'tenant', label: 'Tenant', desc: 'I am renting a room or flat', icon: <Shield size={28} />, gradient: 'from-accent-emerald to-accent-cyan' },
    { id: 'seeker', label: 'Looking for a place', desc: 'I want to find a room, PG, or flat', icon: <Search size={28} />, gradient: 'from-accent-purple to-accent-coral' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-mesh-dark relative overflow-hidden">
      <div className="gradient-mesh" />

      {/* Decorative orbs */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-accent-blue/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-72 h-72 bg-accent-purple/8 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-emerald/5 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        <AnimatePresence mode="wait">
          {/* ── Welcome ── */}
          {step === 'welcome' && (
            <motion.div key="welcome" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center">
              <motion.div
                className="w-20 h-20 rounded-2xl bg-gradient-primary mx-auto mb-8 flex items-center justify-center shadow-xl shadow-accent-blue/20"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              >
                <Sparkles size={36} className="text-white" />
              </motion.div>

              <motion.h1
                className="text-4xl md:text-5xl font-extrabold font-heading mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-gradient">NestEase</span>
              </motion.h1>
              <motion.p
                className="text-text-secondary text-base mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                The rental ecosystem, reimagined.
              </motion.p>
              <motion.p
                className="text-text-tertiary text-sm mb-10 max-w-xs mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Manage properties · Pay rent · Discover homes · Find roommates
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <AnimatedButton size="lg" fullWidth onClick={() => setStep('phone')} icon={<ArrowRight size={18} />}>
                  Get Started
                </AnimatedButton>
              </motion.div>

              {/* Quick demo access */}
              <motion.div
                className="mt-8 pt-6 border-t border-glass-border"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <p className="text-text-ghost text-xs mb-3">Quick Demo Access</p>
                <div className="flex gap-2 justify-center flex-wrap">
                  <button
                    className="px-3 py-1.5 rounded-lg text-xs font-medium glass border border-accent-blue/20 text-accent-blue-light hover:bg-accent-blue/10 transition-colors"
                    onClick={() => { loginAsManager(); navigate('/manager'); }}
                  >
                    Manager Demo
                  </button>
                  <button
                    className="px-3 py-1.5 rounded-lg text-xs font-medium glass border border-accent-emerald/20 text-accent-emerald-light hover:bg-accent-emerald/10 transition-colors"
                    onClick={() => { loginAsTenant(); navigate('/tenant'); }}
                  >
                    Tenant Demo
                  </button>
                  <button
                    className="px-3 py-1.5 rounded-lg text-xs font-medium glass border border-accent-purple/20 text-accent-purple-light hover:bg-accent-purple/10 transition-colors"
                    onClick={() => { loginAsSeeker(); navigate('/seeker'); }}
                  >
                    Seeker Demo
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* ── Phone Input ── */}
          {step === 'phone' && (
            <motion.div key="phone" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
              <button className="mb-6 p-2 text-text-tertiary hover:text-text-primary transition-colors" onClick={() => setStep('welcome')}>
                <ArrowLeft size={20} />
              </button>
              <h2 className="text-2xl font-bold font-heading text-text-primary mb-2">Enter your mobile number</h2>
              <p className="text-text-secondary text-sm mb-8">We'll send you a verification code via SMS</p>

              <GlassCard variant="elevated">
                <label className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-2 block">Mobile Number</label>
                <div className="flex items-center gap-3">
                  <span className="text-text-secondary font-medium text-lg">+91</span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    onKeyDown={(e) => e.key === 'Enter' && handlePhoneSubmit()}
                    placeholder="98765 43210"
                    className="flex-1 bg-transparent text-2xl font-semibold text-text-primary outline-none placeholder-text-ghost tracking-wider"
                    autoFocus
                  />
                </div>
              </GlassCard>

              <div className="mt-6">
                <AnimatedButton size="lg" fullWidth disabled={phone.length < 10} onClick={handlePhoneSubmit}>
                  Send OTP
                </AnimatedButton>
              </div>
            </motion.div>
          )}

          {/* ── OTP Verification ── */}
          {step === 'otp' && (
            <motion.div key="otp" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
              <button className="mb-6 p-2 text-text-tertiary hover:text-text-primary transition-colors" onClick={() => setStep('phone')}>
                <ArrowLeft size={20} />
              </button>
              <h2 className="text-2xl font-bold font-heading text-text-primary mb-2">Verify your number</h2>
              <p className="text-text-secondary text-sm mb-8">
                Enter the 6-digit code sent to <span className="text-text-primary font-medium">+91 {phone}</span>
              </p>

              <div className="flex gap-3 justify-center mb-8">
                {otp.map((digit, i) => (
                  <motion.input
                    key={i}
                    ref={(el) => { otpRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    onPaste={i === 0 ? handleOtpPaste : undefined}
                    className={`w-12 h-14 text-center text-2xl font-bold rounded-xl bg-surface border-2 text-text-primary outline-none transition-all
                      ${digit ? 'border-accent-blue shadow-glow-blue' : 'border-glass-border focus:border-accent-blue/50'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  />
                ))}
              </div>

              <p className="text-center text-sm text-text-tertiary">
                Didn't receive code? <button className="text-accent-blue-light font-medium hover:underline">Resend</button>
              </p>
              <p className="text-center text-[11px] text-text-ghost mt-3">
                💡 Demo: Enter any 6 digits to continue
              </p>
            </motion.div>
          )}

          {/* ── Role Selection ── */}
          {step === 'role' && (
            <motion.div key="role" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
              <h2 className="text-2xl font-bold font-heading text-text-primary mb-2">How will you use NestEase?</h2>
              <p className="text-text-secondary text-sm mb-6">Select your primary role</p>

              <div className="grid gap-3">
                {roles.map((role, i) => (
                  <motion.button
                    key={role.id}
                    className={`w-full text-left glass p-4 rounded-2xl border transition-all
                      ${selectedRole === role.id
                        ? 'border-accent-blue/40 bg-accent-blue/5 shadow-glow-blue'
                        : 'border-glass-border hover:border-glass-border hover:bg-glass-hover'
                      }`}
                    onClick={() => handleRoleSelect(role.id)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${role.gradient} flex items-center justify-center text-white flex-shrink-0`}>
                        {role.icon}
                      </div>
                      <div>
                        <p className="text-base font-semibold text-text-primary">{role.label}</p>
                        <p className="text-sm text-text-secondary">{role.desc}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
