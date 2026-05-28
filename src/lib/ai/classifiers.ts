/**
 * NestEase AI — Maintenance Triage Classifier
 * Auto-categorizes and prioritizes maintenance requests from natural language.
 */

import type { MaintenanceCategory, MaintenancePriority } from '../../types';

interface TriageResult {
  category: MaintenanceCategory;
  priority: MaintenancePriority;
  confidence: number;
  suggestion: string;
}

const categoryKeywords: Record<MaintenanceCategory, string[]> = {
  plumber: ['leak', 'tap', 'water', 'pipe', 'drain', 'flush', 'toilet', 'bathroom', 'shower', 'geyser', 'tank', 'overflow', 'clog', 'blocked', 'drip', 'faucet', 'sewer', 'plumbing'],
  electrician: ['fan', 'light', 'bulb', 'switch', 'wire', 'socket', 'plug', 'electric', 'power', 'ac', 'inverter', 'generator', 'fuse', 'mcb', 'short circuit', 'voltage', 'current', 'buzzing'],
  housekeeping: ['clean', 'dust', 'sweep', 'mop', 'garbage', 'trash', 'pest', 'cockroach', 'ant', 'rat', 'mouse', 'mosquito', 'smell', 'stain', 'dirty', 'wash', 'sanitize'],
  other: ['door', 'lock', 'key', 'window', 'glass', 'paint', 'wall', 'ceiling', 'roof', 'floor', 'tile', 'crack', 'furniture', 'cupboard', 'bed', 'mattress'],
};

const urgencyKeywords: Record<MaintenancePriority, string[]> = {
  urgent: ['flood', 'fire', 'smoke', 'gas', 'leak', 'overflow', 'short circuit', 'sparking', 'emergency', 'dangerous', 'unsafe', 'broken glass', 'no water', 'no electricity'],
  high: ['not working', 'broken', 'stopped', 'no power', 'leaking', 'dripping', 'blocked drain', 'no hot water'],
  normal: ['noisy', 'slow', 'weak', 'flickering', 'loose', 'needs repair', 'replace'],
  low: ['clean', 'paint', 'polish', 'upgrade', 'improve', 'would like', 'request'],
};

export function triageMaintenance(description: string): TriageResult {
  const lower = description.toLowerCase();

  // Category scoring
  const categoryScores: Record<MaintenanceCategory, number> = { plumber: 0, electrician: 0, housekeeping: 0, other: 0 };
  for (const [cat, keywords] of Object.entries(categoryKeywords)) {
    for (const kw of keywords) {
      if (lower.includes(kw)) categoryScores[cat as MaintenanceCategory] += kw.length > 4 ? 2 : 1;
    }
  }
  const bestCategory = (Object.entries(categoryScores).sort(([, a], [, b]) => b - a)[0][0]) as MaintenanceCategory;
  const catScore = categoryScores[bestCategory];

  // Priority scoring
  let priority: MaintenancePriority = 'normal';
  for (const [pri, keywords] of Object.entries(urgencyKeywords)) {
    for (const kw of keywords) {
      if (lower.includes(kw)) { priority = pri as MaintenancePriority; break; }
    }
    if (priority !== 'normal' || pri === 'normal') break;
  }

  const confidence = Math.min(95, 40 + catScore * 12);

  const categoryLabels: Record<MaintenanceCategory, string> = {
    plumber: 'Plumbing Issue', electrician: 'Electrical Issue',
    housekeeping: 'Housekeeping', other: 'General Maintenance'
  };

  return {
    category: bestCategory,
    priority,
    confidence,
    suggestion: `This looks like a ${categoryLabels[bestCategory]}${priority === 'urgent' || priority === 'high' ? ' — marked as ' + priority + ' priority' : ''}.`
  };
}

/**
 * NestEase AI — Natural Language Search Parser
 * Parses queries like "2BHK under 15k in Koramangala with AC" into structured filters.
 */

export interface ParsedSearch {
  roomType?: string;
  maxBudget?: number;
  minBudget?: number;
  locality?: string;
  city?: string;
  amenities: string[];
  genderPref?: string;
  tenantPref?: string;
  propertyType?: string;
}

const localityAliases: Record<string, string> = {
  kormangala: 'Koramangala', koramangala: 'Koramangala',
  indiranagar: 'Indiranagar', indranagar: 'Indiranagar',
  hsr: 'HSR Layout', 'hsr layout': 'HSR Layout',
  btm: 'BTM Layout', 'btm layout': 'BTM Layout',
  whitefield: 'Whitefield', marathahalli: 'Marathahalli',
  'electronic city': 'Electronic City', 'e city': 'Electronic City',
  andheri: 'Andheri', bandra: 'Bandra',
  hinjewadi: 'Hinjewadi', 'dairy circle': 'Dairy Circle',
};

export function parseSearchQuery(query: string): ParsedSearch {
  const lower = query.toLowerCase().trim();
  const result: ParsedSearch = { amenities: [] };

  // Room type
  const roomMatch = lower.match(/(\d)\s*bhk/);
  if (roomMatch) result.roomType = `${roomMatch[1]}BHK`;
  if (lower.includes('studio')) result.roomType = 'Studio';
  if (lower.includes('single')) result.roomType = 'Single';

  // Budget
  const budgetMatch = lower.match(/(?:under|below|less than|max|upto|up to|within)\s*(?:₹|rs\.?|inr)?\s*(\d+)\s*k?/i);
  if (budgetMatch) {
    let val = parseInt(budgetMatch[1]);
    if (val < 200) val *= 1000; // "15k" → 15000
    result.maxBudget = val;
  }
  const minBudgetMatch = lower.match(/(?:above|over|more than|min|from)\s*(?:₹|rs\.?|inr)?\s*(\d+)\s*k?/i);
  if (minBudgetMatch) {
    let val = parseInt(minBudgetMatch[1]);
    if (val < 200) val *= 1000;
    result.minBudget = val;
  }
  const rangeMatch = lower.match(/(\d+)\s*k?\s*(?:-|to)\s*(\d+)\s*k/);
  if (rangeMatch) {
    result.minBudget = parseInt(rangeMatch[1]) * (parseInt(rangeMatch[1]) < 200 ? 1000 : 1);
    result.maxBudget = parseInt(rangeMatch[2]) * (parseInt(rangeMatch[2]) < 200 ? 1000 : 1);
  }

  // Locality
  for (const [alias, canonical] of Object.entries(localityAliases)) {
    if (lower.includes(alias)) { result.locality = canonical; break; }
  }
  const inMatch = lower.match(/(?:in|near|around|at)\s+([a-z\s]+?)(?:\s+(?:under|below|with|for)|$)/);
  if (!result.locality && inMatch) {
    const loc = inMatch[1].trim();
    result.locality = localityAliases[loc] || loc.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }

  // Amenities
  const amenityMap: Record<string, string> = {
    ac: 'ac', 'air condition': 'ac', wifi: 'wifi', 'wi-fi': 'wifi',
    parking: 'parking', gym: 'gym', pool: 'pool', 'swimming': 'pool',
    meals: 'meals', food: 'meals', mess: 'mess', laundry: 'laundry',
    furnished: 'furnished', lift: 'lift', elevator: 'lift',
  };
  for (const [kw, amenity] of Object.entries(amenityMap)) {
    if (lower.includes(kw) && !result.amenities.includes(amenity)) result.amenities.push(amenity);
  }

  // Gender/tenant preference
  if (lower.includes('girls') || lower.includes('women') || lower.includes('female')) result.genderPref = 'female';
  if (lower.includes('boys') || lower.includes('male only')) result.genderPref = 'male';
  if (lower.includes('student')) result.tenantPref = 'student';
  if (lower.includes('family')) result.tenantPref = 'family';

  // Property type
  if (lower.includes('pg')) result.propertyType = 'pg';
  if (lower.includes('hostel')) result.propertyType = 'hostel';
  if (lower.includes('apartment') || lower.includes('flat')) result.propertyType = 'apartment';
  if (lower.includes('shared')) result.propertyType = 'shared_flat';

  return result;
}
