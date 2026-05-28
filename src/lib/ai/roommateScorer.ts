/**
 * NestEase AI — Roommate Compatibility Scorer
 * Uses weighted cosine similarity on lifestyle vectors.
 */

import type { RoommateProfile } from '../../types';

interface MatchResult {
  score: number;
  reasons: string[];
}

type LifestyleVector = number[];

function profileToVector(p: RoommateProfile): LifestyleVector {
  return [
    p.sleepSchedule === 'early_bird' ? 0 : p.sleepSchedule === 'night_owl' ? 1 : 0.5,
    p.cleanliness === 'very_clean' ? 1 : p.cleanliness === 'moderate' ? 0.5 : 0,
    p.occupation === 'student' ? 0 : p.occupation === 'working' ? 1 : 0.5,
    p.smoking ? 1 : 0,
    p.cooking ? 1 : 0,
    p.pets ? 1 : 0,
    p.vegetarian ? 1 : 0,
    (p.budgetMin + p.budgetMax) / 2 / 20000, // normalize budget
  ];
}

const weights = [1.5, 1.2, 0.8, 2.0, 0.7, 1.0, 1.0, 1.5];

function weightedCosineSimilarity(a: LifestyleVector, b: LifestyleVector, w: number[]): number {
  let dotProduct = 0, magA = 0, magB = 0;
  for (let i = 0; i < a.length; i++) {
    const wa = a[i] * w[i], wb = b[i] * w[i];
    dotProduct += wa * wb;
    magA += wa * wa;
    magB += wb * wb;
  }
  if (magA === 0 || magB === 0) return 0;
  return dotProduct / (Math.sqrt(magA) * Math.sqrt(magB));
}

function generateReasons(a: RoommateProfile, b: RoommateProfile): string[] {
  const reasons: string[] = [];
  if (a.sleepSchedule && a.sleepSchedule === b.sleepSchedule) {
    const label = a.sleepSchedule === 'early_bird' ? 'early risers' : a.sleepSchedule === 'night_owl' ? 'night owls' : 'flexible sleepers';
    reasons.push(`Both are ${label}`);
  }
  if (a.cleanliness && a.cleanliness === b.cleanliness) reasons.push(`Same cleanliness standards`);
  if (!a.smoking && !b.smoking) reasons.push('Both non-smokers');
  if (a.cooking && b.cooking) reasons.push('Both enjoy cooking');
  if (a.vegetarian && b.vegetarian) reasons.push('Both vegetarian');
  if (!a.pets && !b.pets) reasons.push('Both prefer no pets');

  const overlapLocalities = a.localities?.filter(l => b.localities?.includes(l)) || [];
  if (overlapLocalities.length > 0) reasons.push(`Overlapping areas: ${overlapLocalities.join(', ')}`);

  const budgetOverlap = Math.max(0, Math.min(a.budgetMax, b.budgetMax) - Math.max(a.budgetMin, b.budgetMin));
  if (budgetOverlap > 0) reasons.push(`Compatible budget range (₹${Math.max(a.budgetMin, b.budgetMin).toLocaleString('en-IN')}–₹${Math.min(a.budgetMax, b.budgetMax).toLocaleString('en-IN')})`);

  if (a.occupation === b.occupation) {
    reasons.push(`Both are ${a.occupation === 'student' ? 'students' : 'working professionals'}`);
  }

  return reasons.slice(0, 4);
}

export function scoreCompatibility(a: RoommateProfile, b: RoommateProfile): MatchResult {
  // Gender preference check
  if (a.genderPref === 'female' && b.gender !== 'female') return { score: 0, reasons: ['Gender preference mismatch'] };
  if (b.genderPref === 'female' && a.gender !== 'female') return { score: 0, reasons: ['Gender preference mismatch'] };
  if (a.genderPref === 'male' && b.gender !== 'male') return { score: 0, reasons: ['Gender preference mismatch'] };
  if (b.genderPref === 'male' && a.gender !== 'male') return { score: 0, reasons: ['Gender preference mismatch'] };

  const vecA = profileToVector(a);
  const vecB = profileToVector(b);
  const similarity = weightedCosineSimilarity(vecA, vecB, weights);

  // Location bonus
  const locationOverlap = a.localities?.some(l => b.localities?.includes(l)) ? 0.1 : 0;

  // Budget overlap bonus
  const budgetOverlap = Math.max(0, Math.min(a.budgetMax, b.budgetMax) - Math.max(a.budgetMin, b.budgetMin));
  const budgetRange = Math.max(a.budgetMax - a.budgetMin, b.budgetMax - b.budgetMin, 1);
  const budgetBonus = Math.min(0.1, (budgetOverlap / budgetRange) * 0.1);

  const rawScore = (similarity * 0.7 + locationOverlap + budgetBonus) * 100;
  const score = Math.min(99, Math.max(10, Math.round(rawScore)));

  return { score, reasons: generateReasons(a, b) };
}
