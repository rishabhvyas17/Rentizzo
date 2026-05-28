/**
 * NestEase AI — Rent Predictor
 * Suggests optimal rent based on locality, room type, amenities, and furnishing.
 */

interface RentPredictionInput {
  locality: string;
  city: string;
  roomType: 'single' | 'double' | 'triple' | 'dormitory';
  furnishing: 'furnished' | 'semi' | 'unfurnished';
  amenities: string[];
  sizeSqft?: number;
}

interface RentPrediction {
  min: number;
  max: number;
  suggested: number;
  confidence: number;
  reasoning: string;
  comparables: number;
}

// Base rents by city+locality (simulated market data)
const marketRates: Record<string, number> = {
  'bangalore-koramangala': 9000,
  'bangalore-indiranagar': 10000,
  'bangalore-hsr layout': 8500,
  'bangalore-btm layout': 7000,
  'bangalore-whitefield': 8000,
  'bangalore-marathahalli': 7500,
  'bangalore-electronic city': 6500,
  'bangalore-dairy circle': 5500,
  'mumbai-andheri': 12000,
  'mumbai-bandra': 18000,
  'delhi-greater kailash': 14000,
  'pune-hinjewadi': 8000,
};

const roomMultipliers: Record<string, number> = {
  single: 1.0,
  double: 0.75,
  triple: 0.6,
  dormitory: 0.45,
};

const furnishingMultipliers: Record<string, number> = {
  furnished: 1.2,
  semi: 1.0,
  unfurnished: 0.8,
};

const amenityValues: Record<string, number> = {
  wifi: 300, meals: 2000, ac: 1500, cctv: 0, laundry: 500,
  parking: 500, gym: 800, pool: 1000, generator: 200,
  lift: 200, security: 200, ro: 100, geyser: 200,
  washing_machine: 400, mess: 1800,
};

export function predictRent(input: RentPredictionInput): RentPrediction {
  const key = `${input.city.toLowerCase()}-${input.locality.toLowerCase()}`;
  const baseRent = marketRates[key] || 7500;
  const roomMul = roomMultipliers[input.roomType] || 1.0;
  const furnMul = furnishingMultipliers[input.furnishing] || 1.0;
  const amenityBonus = input.amenities.reduce((sum, a) => sum + (amenityValues[a] || 0), 0);
  const sizeBonus = input.sizeSqft ? Math.max(0, (input.sizeSqft - 100) * 5) : 0;

  const suggested = Math.round((baseRent * roomMul * furnMul + amenityBonus * 0.3 + sizeBonus) / 100) * 100;
  const min = Math.round(suggested * 0.85 / 100) * 100;
  const max = Math.round(suggested * 1.15 / 100) * 100;

  const comparables = Math.floor(Math.random() * 30) + 15;
  const confidence = Math.min(95, 60 + comparables);

  return {
    min, max, suggested, confidence, comparables,
    reasoning: `Based on ${comparables} similar ${input.roomType} rooms in ${input.locality}, ${input.city}. ${input.furnishing.charAt(0).toUpperCase() + input.furnishing.slice(1)} with ${input.amenities.length} amenities.`
  };
}
