import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard, AnimatedButton, ProgressRing } from '../../components/ui';
import { mockRoommateMatches } from '../../lib/mock/data';
import type { RoommateProfile, RoommateMatch } from '../../types';
import { Shield, Sun, Moon, Clock, Sparkles, Heart, X, MessageCircle, MapPin, Briefcase, GraduationCap, Cigarette, Leaf, PawPrint, CookingPot } from 'lucide-react';
import { useUIStore } from '../../store';

export function RoommateFinder() {
  const { addToast } = useUIStore();
  const [matches, setMatches] = useState<RoommateMatch[]>(mockRoommateMatches);
  const [mutualMatch, setMutualMatch] = useState<RoommateProfile | null>(null);

  const handleInterest = (matchId: string) => {
    setMatches(prev => prev.map(m => {
      if (m.id === matchId) {
        // Simulate mutual match on 3rd card
        if (matchId === 'rm-003') {
          setTimeout(() => setMutualMatch(m.profileB), 400);
          return { ...m, statusA: 'interested', statusB: 'interested', matchedAt: new Date().toISOString() };
        }
        return { ...m, statusA: 'interested' };
      }
      return m;
    }));
    addToast('Interest expressed! Waiting for them to respond.', 'success');
  };

  const handlePass = (matchId: string) => {
    setMatches(prev => prev.filter(m => m.id !== matchId));
  };

  const scheduleIcons: Record<string, React.ReactNode> = {
    early_bird: <Sun size={12} />, night_owl: <Moon size={12} />, flexible: <Clock size={12} />,
  };

  return (
    <motion.div key="roommates" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-4">
      <h1 className="text-2xl font-bold font-heading text-text-primary mb-1">Find a Roommate</h1>
      <p className="text-sm text-text-secondary mb-4">AI-matched profiles based on your preferences</p>

      {/* Privacy Banner */}
      <GlassCard variant="subtle" className="flex items-center gap-3 mb-5">
        <Shield size={18} className="text-accent-emerald flex-shrink-0" />
        <p className="text-xs text-text-secondary">
          <span className="text-text-primary font-medium">Your privacy is protected.</span> Phone numbers are shared only after mutual interest. Profiles are never public.
        </p>
      </GlassCard>

      {/* Match Cards */}
      <div className="space-y-4">
        {matches.map((match, i) => {
          const profile = match.profileB;
          const isMatched = match.statusA === 'interested' && match.statusB === 'interested';
          const isInterested = match.statusA === 'interested';

          return (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              layout
            >
              <GlassCard
                variant={isMatched ? 'glow-emerald' : 'elevated'}
                className={isMatched ? 'animate-border-glow' : ''}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {/* Avatar with initials */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold
                      ${profile.gender === 'female'
                        ? 'bg-gradient-to-br from-accent-coral/30 to-accent-purple/20 text-accent-coral-light'
                        : 'bg-gradient-to-br from-accent-blue/30 to-accent-cyan/20 text-accent-blue-light'
                      }`}>
                      {profile.name[0]}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-text-primary">{profile.name}, {profile.age}</h3>
                      <p className="text-xs text-text-tertiary flex items-center gap-1">
                        {profile.occupation === 'working' ? <Briefcase size={11} /> : <GraduationCap size={11} />}
                        {profile.occupation === 'working' ? 'Working Professional' : 'Student'}
                      </p>
                    </div>
                  </div>
                  <ProgressRing value={match.score} size={48} strokeWidth={4}
                    color={match.score > 80 ? '#10B981' : match.score > 60 ? '#3B82F6' : '#F59E0B'} />
                </div>

                {/* Details */}
                <div className="flex items-center gap-1.5 text-[11px] text-text-tertiary mb-3">
                  <MapPin size={11} /> {profile.localities?.join(', ') || profile.city}
                  <span className="mx-1">·</span>
                  <IndianRupeeIcon /> ₹{(profile.budgetMin / 1000).toFixed(0)}k–{(profile.budgetMax / 1000).toFixed(0)}k
                </div>

                {/* Lifestyle Tags */}
                <div className="flex gap-1.5 flex-wrap mb-3">
                  {profile.sleepSchedule && (
                    <Tag icon={scheduleIcons[profile.sleepSchedule]} label={profile.sleepSchedule.replace('_', ' ')} />
                  )}
                  {profile.cleanliness && <Tag icon={<Sparkles size={11} />} label={profile.cleanliness.replace('_', ' ')} />}
                  {profile.vegetarian && <Tag icon={<Leaf size={11} />} label="Vegetarian" />}
                  {profile.cooking && <Tag icon={<CookingPot size={11} />} label="Cooks" />}
                  {!profile.smoking && <Tag icon={<Cigarette size={11} />} label="Non-smoker" />}
                  {!profile.pets && <Tag icon={<PawPrint size={11} />} label="No pets" />}
                </div>

                {/* AI Match Reasons */}
                {match.reasons.length > 0 && (
                  <div className="p-2.5 rounded-xl bg-accent-blue/5 border border-accent-blue/15 mb-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Sparkles size={12} className="text-accent-blue-light" />
                      <span className="text-[10px] font-semibold text-accent-blue-light">Why you match</span>
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                      {match.reasons.map((r, ri) => (
                        <span key={ri} className="text-[10px] text-text-secondary px-1.5 py-0.5 rounded bg-surface/50">
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {profile.about && (
                  <p className="text-xs text-text-secondary mb-3 italic">"{profile.about}"</p>
                )}

                {/* Actions */}
                {isMatched ? (
                  <AnimatedButton fullWidth variant="success" icon={<MessageCircle size={16} />}>
                    It's a Match! Start Chat
                  </AnimatedButton>
                ) : isInterested ? (
                  <p className="text-center text-xs text-accent-blue-light font-medium py-2">✨ Interest sent — waiting for response</p>
                ) : (
                  <div className="flex gap-2">
                    <AnimatedButton variant="ghost" className="flex-1" icon={<X size={16} />} onClick={() => handlePass(match.id)}>
                      Pass
                    </AnimatedButton>
                    <AnimatedButton className="flex-1" icon={<Heart size={16} />} onClick={() => handleInterest(match.id)}>
                      Interested
                    </AnimatedButton>
                  </div>
                )}
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      {/* Mutual Match Celebration */}
      <AnimatePresence>
        {mutualMatch && (
          <>
            <motion.div className="fixed inset-0 bg-black/60 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMutualMatch(null)} />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <GlassCard variant="elevated" className="max-w-sm w-full text-center">
                <motion.div
                  className="text-5xl mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                >
                  🎉
                </motion.div>
                <h2 className="text-xl font-bold text-text-primary mb-2">It's a Match!</h2>
                <p className="text-sm text-text-secondary mb-5">
                  You and <span className="text-text-primary font-medium">{mutualMatch.name}</span> are both interested. You can now chat and decide if you'd make good roommates!
                </p>
                <AnimatedButton fullWidth icon={<MessageCircle size={16} />} onClick={() => setMutualMatch(null)}>
                  Start Chatting
                </AnimatedButton>
                <button className="mt-3 text-xs text-text-ghost hover:text-text-secondary" onClick={() => setMutualMatch(null)}>
                  Maybe later
                </button>
              </GlassCard>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Tag({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-surface/60 border border-glass-border text-[10px] text-text-secondary capitalize">
      {icon} {label}
    </span>
  );
}

function IndianRupeeIcon() {
  return <span className="text-[10px]">₹</span>;
}
