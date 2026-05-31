/* ======================================================================== */
/* Rentizzo — Type Definitions                                               */
/* ======================================================================== */

export type UserRole = 'owner' | 'manager' | 'tenant' | 'seeker' | 'broker';
export type Gender = 'male' | 'female' | 'other';
export type BuildingType = 'hostel' | 'pg' | 'apartment' | 'independent';
export type RoomType = 'single' | 'double' | 'triple' | 'dormitory';
export type RoomStatus = 'vacant' | 'occupied' | 'maintenance' | 'reserved';
export type Furnishing = 'furnished' | 'semi' | 'unfurnished';
export type TenantStatus = 'active' | 'moved_out' | 'notice_period';
export type RentStatus = 'pending' | 'paid' | 'partial' | 'overdue' | 'waived';
export type PaymentMethod = 'cash' | 'upi' | 'card' | 'netbanking';
export type PaymentStatus = 'pending' | 'success' | 'failed' | 'refunded';
export type ReminderChannel = 'whatsapp' | 'sms' | 'in_app';
export type ReminderStatus = 'scheduled' | 'sent' | 'failed' | 'cancelled';
export type ListingType = 'hostel' | 'pg' | 'apartment' | 'house' | 'shared_flat';
export type ListingStatus = 'active' | 'paused' | 'filled';
export type GenderPref = 'any' | 'male' | 'female';
export type TenantPref = 'any' | 'student' | 'working' | 'family';
export type EnquiryStatus = 'new' | 'contacted' | 'converted' | 'rejected';
export type MaintenanceCategory = 'housekeeping' | 'plumber' | 'electrician' | 'other';
export type MaintenancePriority = 'low' | 'normal' | 'high' | 'urgent';
export type MaintenanceStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type Duration = 'short_term' | 'long_term' | 'flexible';
export type SleepSchedule = 'early_bird' | 'night_owl' | 'flexible';
export type Cleanliness = 'very_clean' | 'moderate' | 'relaxed';
export type Occupation = 'student' | 'working' | 'other';
export type MatchInterest = 'none' | 'interested' | 'passed';

export interface User {
  id: string;
  phone: string;
  name: string;
  email?: string;
  gender?: Gender;
  role: UserRole;
  isVerified: boolean;
  profilePhotoUrl?: string;
  createdAt: string;
}

export interface Organisation {
  id: string;
  name: string;
  ownerId: string;
  plan: 'free' | 'growth' | 'pro';
  gstin?: string;
  logoUrl?: string;
}

export interface Building {
  id: string;
  orgId: string;
  name: string;
  addressLine1: string;
  city: string;
  state: string;
  pinCode: string;
  type: BuildingType;
  totalFloors: number;
  amenities: string[];
  isActive: boolean;
  photoUrl?: string;
  totalRooms?: number;
  occupiedRooms?: number;
}

export interface Room {
  id: string;
  buildingId: string;
  roomNumber: string;
  floor: number;
  type: RoomType;
  rentAmount: number;
  depositAmount: number;
  furnishing: Furnishing;
  sizeSqft?: number;
  status: RoomStatus;
  photoUrls?: string[];
  tenantName?: string;
  tenantId?: string;
}

export interface Tenant {
  id: string;
  userId: string;
  roomId: string;
  orgId: string;
  name: string;
  phone: string;
  email?: string;
  monthlyRent: number;
  advancePaid: number;
  advanceBalance: number;
  moveInDate: string;
  moveOutDate?: string;
  status: TenantStatus;
  profilePhotoUrl?: string;
  roomNumber?: string;
  buildingName?: string;
}

export interface RentCycle {
  id: string;
  tenantId: string;
  dueDate: string;
  amountDue: number;
  amountPaid: number;
  status: RentStatus;
  notes?: string;
  tenantName?: string;
  roomNumber?: string;
}

export interface Payment {
  id: string;
  rentCycleId: string;
  tenantId: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  paidAt?: string;
  receiptUrl?: string;
}

export interface Reminder {
  id: string;
  orgId: string;
  tenantId?: string;
  channel: ReminderChannel;
  messageBody: string;
  status: ReminderStatus;
  scheduledAt: string;
  sentAt?: string;
}

export interface Listing {
  id: string;
  orgId?: string;
  brokerId?: string;
  buildingId?: string;
  title: string;
  description: string;
  type: ListingType;
  city: string;
  locality: string;
  lat?: number;
  lng?: number;
  rentMin: number;
  rentMax: number;
  deposit?: number;
  genderPref: GenderPref;
  tenantPref: TenantPref;
  amenities: string[];
  rules: string[];
  photoUrls: string[];
  status: ListingStatus;
  isVerified: boolean;
  createdAt: string;
  brokerName?: string;
}

export interface Enquiry {
  id: string;
  listingId: string;
  seekerId: string;
  message: string;
  status: EnquiryStatus;
  createdAt: string;
  seekerName?: string;
}

export interface RoommateProfile {
  id: string;
  userId: string;
  name: string;
  age: number;
  city: string;
  localities?: string[];
  budgetMin: number;
  budgetMax: number;
  moveInFrom: string;
  duration: Duration;
  genderPref: GenderPref;
  gender: Gender;
  sleepSchedule?: SleepSchedule;
  cleanliness?: Cleanliness;
  occupation?: Occupation;
  about?: string;
  isActive: boolean;
  smoking?: boolean;
  cooking?: boolean;
  pets?: boolean;
  vegetarian?: boolean;
}

export interface RoommateMatch {
  id: string;
  profileA: RoommateProfile;
  profileB: RoommateProfile;
  score: number;
  statusA: MatchInterest;
  statusB: MatchInterest;
  matchedAt?: string;
  reasons: string[];
}

export interface Broker {
  id: string;
  userId: string;
  name: string;
  reraNumber?: string;
  isVerified: boolean;
  cities: string[];
  languages: string[];
  avgRating: number;
  totalReviews: number;
  responseRate: number;
  profilePhotoUrl?: string;
  activeListings: number;
}

export interface BrokerReview {
  id: string;
  brokerId: string;
  reviewerName: string;
  rating: number;
  reviewText?: string;
  createdAt: string;
}

export interface MaintenanceRequest {
  id: string;
  tenantId: string;
  roomId: string;
  orgId: string;
  category: MaintenanceCategory;
  title: string;
  description?: string;
  photoUrls?: string[];
  priority: MaintenancePriority;
  status: MaintenanceStatus;
  createdAt: string;
  resolvedAt?: string;
  notes?: string;
  tenantName?: string;
  roomNumber?: string;
}

export interface ActivityItem {
  id: string;
  type: 'rent_paid' | 'tenant_added' | 'complaint' | 'room_updated' | 'reminder_sent';
  message: string;
  timestamp: string;
  icon?: string;
}

export interface DashboardMetrics {
  totalBuildings: number;
  occupancyRate: number;
  monthlyCollected: number;
  overdueAmount: number;
  totalRooms: number;
  occupiedRooms: number;
  totalTenants: number;
  overdueTenants: number;
}
