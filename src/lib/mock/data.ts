import type {
  User, Organisation, Building, Room, Tenant, RentCycle,
  Payment, Listing, RoommateProfile, RoommateMatch, Broker,
  BrokerReview, MaintenanceRequest, ActivityItem, DashboardMetrics, Enquiry, Reminder
} from '../../types';

// ── Users ──
export const mockCurrentUser: User = {
  id: 'u-001', phone: '+919876543210', name: 'Arjun Mehta',
  email: 'arjun@nestease.in', gender: 'male', role: 'manager',
  isVerified: true, createdAt: '2025-12-01T10:00:00Z'
};

export const mockTenantUser: User = {
  id: 'u-010', phone: '+919123456789', name: 'Rahul Kumar',
  email: 'rahul.k@gmail.com', gender: 'male', role: 'tenant',
  isVerified: true, createdAt: '2026-01-15T10:00:00Z'
};

// ── Organisation ──
export const mockOrg: Organisation = {
  id: 'org-001', name: 'Mehta Properties', ownerId: 'u-001',
  plan: 'growth', gstin: '29AABCU9603R1ZM'
};

// ── Buildings ──
export const mockBuildings: Building[] = [
  {
    id: 'b-001', orgId: 'org-001', name: 'Sunrise Heights',
    addressLine1: '42, 5th Cross, Koramangala', city: 'Bangalore', state: 'Karnataka',
    pinCode: '560034', type: 'pg', totalFloors: 4,
    amenities: ['wifi', 'cctv', 'laundry', 'parking', 'generator', 'security', 'mess'],
    isActive: true, totalRooms: 24, occupiedRooms: 18
  },
  {
    id: 'b-002', orgId: 'org-001', name: 'Green Valley Residency',
    addressLine1: '88, HSR Layout Sector 3', city: 'Bangalore', state: 'Karnataka',
    pinCode: '560102', type: 'apartment', totalFloors: 6,
    amenities: ['wifi', 'lift', 'parking', 'generator', 'gym', 'cctv'],
    isActive: true, totalRooms: 36, occupiedRooms: 31
  },
  {
    id: 'b-003', orgId: 'org-001', name: 'Pearl PG for Women',
    addressLine1: '15, Indiranagar 2nd Stage', city: 'Bangalore', state: 'Karnataka',
    pinCode: '560038', type: 'pg', totalFloors: 3,
    amenities: ['wifi', 'cctv', 'laundry', 'mess', 'security', 'ro'],
    isActive: true, totalRooms: 18, occupiedRooms: 16
  }
];

// ── Rooms ──
const generateRooms = (buildingId: string, floors: number, roomsPerFloor: number, baseRent: number): Room[] => {
  const rooms: Room[] = [];
  const types: Room['type'][] = ['single', 'double', 'triple'];
  const furnishings: Room['furnishing'][] = ['furnished', 'semi', 'unfurnished'];
  const statuses: Room['status'][] = ['occupied', 'occupied', 'occupied', 'vacant', 'maintenance', 'reserved'];
  const names = [
    'Rahul Kumar', 'Priya Sharma', 'Amit Patel', 'Sneha Reddy', 'Vikram Singh',
    'Ananya Iyer', 'Karan Malhotra', 'Divya Nair', 'Rohan Gupta', 'Meera Joshi',
    'Aditya Rao', 'Neha Kapoor', 'Siddharth Das', 'Pooja Bhat', 'Nikhil Verma',
    'Sakshi Chauhan', 'Arjun Pillai', 'Kavya Menon', 'Ravi Teja', 'Ishita Agarwal'
  ];
  let nameIdx = 0;
  for (let f = 0; f < floors; f++) {
    for (let r = 1; r <= roomsPerFloor; r++) {
      const roomNum = `${f + 1}${String(r).padStart(2, '0')}`;
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      rooms.push({
        id: `r-${buildingId}-${roomNum}`, buildingId, roomNumber: roomNum,
        floor: f, type: types[r % 3], rentAmount: baseRent + (r % 3) * 1500,
        depositAmount: baseRent * 2, furnishing: furnishings[r % 3],
        sizeSqft: 120 + (r % 3) * 80, status,
        tenantName: status === 'occupied' ? names[nameIdx++ % names.length] : undefined,
        tenantId: status === 'occupied' ? `t-${nameIdx}` : undefined
      });
    }
  }
  return rooms;
};

export const mockRooms: Room[] = [
  ...generateRooms('b-001', 4, 6, 7500),
  ...generateRooms('b-002', 6, 6, 12000),
  ...generateRooms('b-003', 3, 6, 6500),
];

// ── Tenants ──
export const mockTenants: Tenant[] = [
  { id: 't-001', userId: 'u-010', roomId: 'r-b-001-101', orgId: 'org-001', name: 'Rahul Kumar', phone: '+919123456789', email: 'rahul.k@gmail.com', monthlyRent: 8500, advancePaid: 17000, advanceBalance: 17000, moveInDate: '2026-01-15', status: 'active', roomNumber: '101', buildingName: 'Sunrise Heights' },
  { id: 't-002', userId: 'u-011', roomId: 'r-b-001-102', orgId: 'org-001', name: 'Priya Sharma', phone: '+919234567890', email: 'priya.s@gmail.com', monthlyRent: 9000, advancePaid: 18000, advanceBalance: 18000, moveInDate: '2025-11-01', status: 'active', roomNumber: '102', buildingName: 'Sunrise Heights' },
  { id: 't-003', userId: 'u-012', roomId: 'r-b-001-103', orgId: 'org-001', name: 'Amit Patel', phone: '+919345678901', monthlyRent: 7500, advancePaid: 15000, advanceBalance: 12000, moveInDate: '2025-09-01', status: 'active', roomNumber: '103', buildingName: 'Sunrise Heights' },
  { id: 't-004', userId: 'u-013', roomId: 'r-b-001-201', orgId: 'org-001', name: 'Sneha Reddy', phone: '+919456789012', monthlyRent: 8500, advancePaid: 17000, advanceBalance: 17000, moveInDate: '2026-02-01', status: 'active', roomNumber: '201', buildingName: 'Sunrise Heights' },
  { id: 't-005', userId: 'u-014', roomId: 'r-b-002-101', orgId: 'org-001', name: 'Vikram Singh', phone: '+919567890123', monthlyRent: 14000, advancePaid: 28000, advanceBalance: 28000, moveInDate: '2025-08-15', status: 'active', roomNumber: '101', buildingName: 'Green Valley Residency' },
  { id: 't-006', userId: 'u-015', roomId: 'r-b-002-102', orgId: 'org-001', name: 'Ananya Iyer', phone: '+919678901234', monthlyRent: 13500, advancePaid: 27000, advanceBalance: 27000, moveInDate: '2025-10-01', status: 'active', roomNumber: '102', buildingName: 'Green Valley Residency' },
  { id: 't-007', userId: 'u-016', roomId: 'r-b-003-101', orgId: 'org-001', name: 'Divya Nair', phone: '+919789012345', monthlyRent: 6500, advancePaid: 13000, advanceBalance: 13000, moveInDate: '2026-03-01', status: 'active', roomNumber: '101', buildingName: 'Pearl PG for Women' },
  { id: 't-008', userId: 'u-017', roomId: 'r-b-003-102', orgId: 'org-001', name: 'Meera Joshi', phone: '+919890123456', monthlyRent: 8000, advancePaid: 16000, advanceBalance: 16000, moveInDate: '2025-12-01', status: 'active', roomNumber: '102', buildingName: 'Pearl PG for Women' },
];

// ── Rent Cycles ──
export const mockRentCycles: RentCycle[] = [
  { id: 'rc-001', tenantId: 't-001', dueDate: '2026-05-01', amountDue: 8500, amountPaid: 8500, status: 'paid', tenantName: 'Rahul Kumar', roomNumber: '101' },
  { id: 'rc-002', tenantId: 't-002', dueDate: '2026-05-01', amountDue: 9000, amountPaid: 0, status: 'overdue', tenantName: 'Priya Sharma', roomNumber: '102' },
  { id: 'rc-003', tenantId: 't-003', dueDate: '2026-05-01', amountDue: 7500, amountPaid: 0, status: 'overdue', tenantName: 'Amit Patel', roomNumber: '103' },
  { id: 'rc-004', tenantId: 't-004', dueDate: '2026-05-01', amountDue: 8500, amountPaid: 8500, status: 'paid', tenantName: 'Sneha Reddy', roomNumber: '201' },
  { id: 'rc-005', tenantId: 't-005', dueDate: '2026-05-01', amountDue: 14000, amountPaid: 14000, status: 'paid', tenantName: 'Vikram Singh', roomNumber: '101' },
  { id: 'rc-006', tenantId: 't-006', dueDate: '2026-05-01', amountDue: 13500, amountPaid: 5000, status: 'partial', tenantName: 'Ananya Iyer', roomNumber: '102' },
  { id: 'rc-007', tenantId: 't-007', dueDate: '2026-05-01', amountDue: 6500, amountPaid: 6500, status: 'paid', tenantName: 'Divya Nair', roomNumber: '101' },
  { id: 'rc-008', tenantId: 't-008', dueDate: '2026-05-01', amountDue: 8000, amountPaid: 0, status: 'pending', tenantName: 'Meera Joshi', roomNumber: '102' },
];

// ── Payments ──
export const mockPayments: Payment[] = [
  { id: 'p-001', rentCycleId: 'rc-001', tenantId: 't-001', amount: 8500, method: 'upi', status: 'success', paidAt: '2026-05-01T09:30:00Z' },
  { id: 'p-002', rentCycleId: 'rc-004', tenantId: 't-004', amount: 8500, method: 'card', status: 'success', paidAt: '2026-05-02T14:15:00Z' },
  { id: 'p-003', rentCycleId: 'rc-005', tenantId: 't-005', amount: 14000, method: 'upi', status: 'success', paidAt: '2026-05-01T08:00:00Z' },
  { id: 'p-004', rentCycleId: 'rc-006', tenantId: 't-006', amount: 5000, method: 'cash', status: 'success', paidAt: '2026-05-05T11:00:00Z' },
  { id: 'p-005', rentCycleId: 'rc-007', tenantId: 't-007', amount: 6500, method: 'upi', status: 'success', paidAt: '2026-05-01T10:45:00Z' },
];

// ── Listings ──
export const mockListings: Listing[] = [
  {
    id: 'l-001', orgId: 'org-001', title: 'Cozy PG in Koramangala with Meals & WiFi',
    description: 'Fully furnished PG rooms in the heart of Koramangala, walking distance to major tech parks. Homely meals included. CCTV security, 24/7 water supply, and laundry service.',
    type: 'pg', city: 'Bangalore', locality: 'Koramangala',
    lat: 12.9352, lng: 77.6245, rentMin: 7500, rentMax: 10500, deposit: 15000,
    genderPref: 'any', tenantPref: 'working',
    amenities: ['wifi', 'meals', 'laundry', 'cctv', 'parking'],
    rules: ['No smoking', 'No pets', 'Gate closes at 11 PM'],
    photoUrls: [], status: 'active', isVerified: true, createdAt: '2026-04-10T10:00:00Z'
  },
  {
    id: 'l-002', title: 'Girls-Only PG in Indiranagar — Safe & Premium',
    description: 'Premium women-only PG with CCTV, biometric entry, and female security staff. Homestyle vegetarian meals, RO water, and high-speed WiFi.',
    type: 'pg', city: 'Bangalore', locality: 'Indiranagar',
    lat: 12.9784, lng: 77.6408, rentMin: 6500, rentMax: 9000, deposit: 13000,
    genderPref: 'female', tenantPref: 'any',
    amenities: ['wifi', 'meals', 'cctv', 'laundry', 'security', 'ro', 'geyser'],
    rules: ['No smoking', 'No male visitors after 8 PM', 'Quiet hours after 10 PM'],
    photoUrls: [], status: 'active', isVerified: true, createdAt: '2026-04-15T10:00:00Z'
  },
  {
    id: 'l-003', title: 'Spacious 2BHK in HSR Layout — Semi-Furnished',
    description: 'Bright and airy 2BHK apartment in a gated community. Semi-furnished with modular kitchen, wardrobe, and balcony. Gym and pool access included.',
    type: 'apartment', city: 'Bangalore', locality: 'HSR Layout',
    lat: 12.9121, lng: 77.6446, rentMin: 18000, rentMax: 22000, deposit: 40000,
    genderPref: 'any', tenantPref: 'family',
    amenities: ['wifi', 'gym', 'pool', 'parking', 'lift', 'generator', 'cctv'],
    rules: ['No pets', 'Maintenance: ₹3,000/month', 'Society rules apply'],
    photoUrls: [], status: 'active', isVerified: false, createdAt: '2026-04-20T10:00:00Z'
  },
  {
    id: 'l-004', brokerId: 'br-001', title: 'Budget-Friendly Shared Flat near Silk Board',
    description: 'Looking for flatmates! Shared 3BHK near Silk Board junction. Well-connected by metro. AC rooms, common kitchen, and washing machine.',
    type: 'shared_flat', city: 'Bangalore', locality: 'BTM Layout',
    lat: 12.9166, lng: 77.6101, rentMin: 5000, rentMax: 8000, deposit: 10000,
    genderPref: 'male', tenantPref: 'working',
    amenities: ['wifi', 'ac', 'washing_machine', 'parking'],
    rules: ['Non-vegetarian cooking allowed', 'No smoking inside', 'Shared cleaning'],
    photoUrls: [], status: 'active', isVerified: false, createdAt: '2026-05-01T10:00:00Z',
    brokerName: 'Rajesh Properties'
  },
  {
    id: 'l-005', title: 'Premium 1BHK Studio in Whitefield — Fully Furnished',
    description: 'Modern studio apartment in a premium gated community. Fully furnished with queen bed, study table, sofa, and smart TV. Walking distance to ITPL.',
    type: 'apartment', city: 'Bangalore', locality: 'Whitefield',
    lat: 12.9698, lng: 77.7500, rentMin: 15000, rentMax: 15000, deposit: 30000,
    genderPref: 'any', tenantPref: 'working',
    amenities: ['wifi', 'ac', 'gym', 'pool', 'parking', 'lift', 'cctv', 'generator'],
    rules: ['No pets', 'No subletting'],
    photoUrls: [], status: 'active', isVerified: true, createdAt: '2026-05-05T10:00:00Z'
  },
  {
    id: 'l-006', title: 'Hostel Rooms near Christ University — Students Only',
    description: 'Affordable hostel rooms walking distance from Christ University. Triple sharing and dormitory options. Mess facility with breakfast and dinner.',
    type: 'hostel', city: 'Bangalore', locality: 'Dairy Circle',
    lat: 12.9353, lng: 77.6053, rentMin: 4500, rentMax: 7000, deposit: 9000,
    genderPref: 'any', tenantPref: 'student',
    amenities: ['wifi', 'meals', 'laundry', 'cctv'],
    rules: ['Gate closes at 10 PM', 'No alcohol', 'Study hours 9-11 PM'],
    photoUrls: [], status: 'active', isVerified: true, createdAt: '2026-05-10T10:00:00Z'
  },
];

// ── Roommate Profiles ──
export const mockRoommateProfiles: RoommateProfile[] = [
  { id: 'rp-001', userId: 'u-020', name: 'Aditya', age: 25, city: 'Bangalore', localities: ['Koramangala', 'HSR Layout'], budgetMin: 6000, budgetMax: 10000, moveInFrom: '2026-06-01', duration: 'long_term', genderPref: 'male', gender: 'male', sleepSchedule: 'early_bird', cleanliness: 'very_clean', occupation: 'working', about: 'Software engineer at a startup. Love cooking and weekend treks.', isActive: true, smoking: false, cooking: true, pets: false, vegetarian: true },
  { id: 'rp-002', userId: 'u-021', name: 'Kavya', age: 23, city: 'Bangalore', localities: ['Indiranagar', 'Koramangala'], budgetMin: 7000, budgetMax: 12000, moveInFrom: '2026-06-15', duration: 'long_term', genderPref: 'female', gender: 'female', sleepSchedule: 'night_owl', cleanliness: 'moderate', occupation: 'working', about: 'Designer who loves cats and late-night movies.', isActive: true, smoking: false, cooking: false, pets: true, vegetarian: false },
  { id: 'rp-003', userId: 'u-022', name: 'Rohan', age: 24, city: 'Bangalore', localities: ['BTM Layout', 'HSR Layout'], budgetMin: 5000, budgetMax: 8000, moveInFrom: '2026-06-01', duration: 'flexible', genderPref: 'any', gender: 'male', sleepSchedule: 'flexible', cleanliness: 'moderate', occupation: 'student', about: 'MBA student. Quiet and studious. Weekends are for football.', isActive: true, smoking: false, cooking: true, pets: false, vegetarian: false },
  { id: 'rp-004', userId: 'u-023', name: 'Ishita', age: 26, city: 'Bangalore', localities: ['Whitefield', 'Marathahalli'], budgetMin: 8000, budgetMax: 14000, moveInFrom: '2026-07-01', duration: 'long_term', genderPref: 'female', gender: 'female', sleepSchedule: 'early_bird', cleanliness: 'very_clean', occupation: 'working', about: 'Product manager. Yoga mornings and reading evenings.', isActive: true, smoking: false, cooking: true, pets: false, vegetarian: true },
  { id: 'rp-005', userId: 'u-024', name: 'Nikhil', age: 27, city: 'Bangalore', localities: ['Koramangala', 'Indiranagar'], budgetMin: 10000, budgetMax: 18000, moveInFrom: '2026-06-01', duration: 'long_term', genderPref: 'any', gender: 'male', sleepSchedule: 'night_owl', cleanliness: 'moderate', occupation: 'working', about: 'Music producer. Have a home studio setup. Night sessions common.', isActive: true, smoking: false, cooking: false, pets: false, vegetarian: false },
];

// ── Roommate Matches (pre-computed) ──
export const mockRoommateMatches: RoommateMatch[] = [
  { id: 'rm-001', profileA: mockRoommateProfiles[0], profileB: mockRoommateProfiles[2], score: 78, statusA: 'none', statusB: 'none', reasons: ['Similar budget range', 'Both enjoy cooking', 'Overlapping localities'] },
  { id: 'rm-002', profileA: mockRoommateProfiles[0], profileB: mockRoommateProfiles[4], score: 62, statusA: 'none', statusB: 'none', reasons: ['Overlapping localities', 'Both non-smokers'] },
  { id: 'rm-003', profileA: mockRoommateProfiles[1], profileB: mockRoommateProfiles[3], score: 85, statusA: 'none', statusB: 'none', reasons: ['Both women-only preference', 'Similar budget', 'Both working professionals'] },
];

// ── Brokers ──
export const mockBrokers: Broker[] = [
  { id: 'br-001', userId: 'u-030', name: 'Rajesh Kumar', reraNumber: 'KA/REG/2023/001234', isVerified: true, cities: ['Bangalore'], languages: ['English', 'Hindi', 'Kannada'], avgRating: 4.7, totalReviews: 42, responseRate: 94, activeListings: 18 },
  { id: 'br-002', userId: 'u-031', name: 'Sunita Devi', reraNumber: 'KA/REG/2023/005678', isVerified: true, cities: ['Bangalore', 'Mysore'], languages: ['English', 'Kannada'], avgRating: 4.2, totalReviews: 28, responseRate: 87, activeListings: 12 },
  { id: 'br-003', userId: 'u-032', name: 'Mohammed Farhan', isVerified: false, cities: ['Bangalore'], languages: ['English', 'Hindi', 'Urdu'], avgRating: 3.8, totalReviews: 15, responseRate: 72, activeListings: 8 },
];

// ── Broker Reviews ──
export const mockBrokerReviews: BrokerReview[] = [
  { id: 'brev-001', brokerId: 'br-001', reviewerName: 'Karthik S.', rating: 5, reviewText: 'Rajesh helped me find the perfect flat in Koramangala within a week. Very professional and responsive!', createdAt: '2026-04-20T10:00:00Z' },
  { id: 'brev-002', brokerId: 'br-001', reviewerName: 'Priyanka M.', rating: 4, reviewText: 'Good service. Showed multiple options within my budget. Slight delay in paperwork though.', createdAt: '2026-04-15T10:00:00Z' },
  { id: 'brev-003', brokerId: 'br-001', reviewerName: 'Arun D.', rating: 5, reviewText: 'Excellent broker! Found a great 2BHK near my office. No hidden charges.', createdAt: '2026-03-28T10:00:00Z' },
  { id: 'brev-004', brokerId: 'br-002', reviewerName: 'Deepa R.', rating: 4, reviewText: 'Helpful and knowledgeable about the area. Would recommend.', createdAt: '2026-04-10T10:00:00Z' },
  { id: 'brev-005', brokerId: 'br-002', reviewerName: 'Vivek K.', rating: 5, reviewText: 'Found a PG for my daughter. Very trustworthy and ensured safety features.', createdAt: '2026-03-20T10:00:00Z' },
];

// ── Maintenance Requests ──
export const mockMaintenanceRequests: MaintenanceRequest[] = [
  { id: 'mr-001', tenantId: 't-001', roomId: 'r-b-001-101', orgId: 'org-001', category: 'plumber', title: 'Bathroom tap leaking', description: 'The hot water tap in the bathroom has been dripping continuously since yesterday.', priority: 'high', status: 'in_progress', createdAt: '2026-05-25T08:30:00Z', tenantName: 'Rahul Kumar', roomNumber: '101' },
  { id: 'mr-002', tenantId: 't-003', roomId: 'r-b-001-103', orgId: 'org-001', category: 'electrician', title: 'Ceiling fan not working', description: 'The ceiling fan in the bedroom stopped working. Makes a humming sound but blades don\'t spin.', priority: 'normal', status: 'open', createdAt: '2026-05-26T10:00:00Z', tenantName: 'Amit Patel', roomNumber: '103' },
  { id: 'mr-003', tenantId: 't-005', roomId: 'r-b-002-101', orgId: 'org-001', category: 'housekeeping', title: 'Deep cleaning needed', description: 'Moving in next week and the flat needs deep cleaning. Especially bathrooms and kitchen.', priority: 'low', status: 'resolved', createdAt: '2026-05-20T14:00:00Z', resolvedAt: '2026-05-22T11:00:00Z', notes: 'Cleaning team sent. Completed on 22nd May.', tenantName: 'Vikram Singh', roomNumber: '101' },
];

// ── Activity Feed ──
export const mockActivity: ActivityItem[] = [
  { id: 'a-001', type: 'rent_paid', message: 'Rahul Kumar paid ₹8,500 for Room 101', timestamp: '2026-05-28T09:30:00Z' },
  { id: 'a-002', type: 'complaint', message: 'Amit Patel raised request: Ceiling fan not working', timestamp: '2026-05-26T10:00:00Z' },
  { id: 'a-003', type: 'rent_paid', message: 'Vikram Singh paid ₹14,000 for Room 101 (GVR)', timestamp: '2026-05-25T08:00:00Z' },
  { id: 'a-004', type: 'tenant_added', message: 'Sneha Reddy allotted to Room 201 — Sunrise Heights', timestamp: '2026-05-24T15:30:00Z' },
  { id: 'a-005', type: 'reminder_sent', message: 'Rent reminder sent to 5 tenants via WhatsApp', timestamp: '2026-05-23T09:00:00Z' },
  { id: 'a-006', type: 'rent_paid', message: 'Divya Nair paid ₹6,500 for Room 101 (Pearl PG)', timestamp: '2026-05-22T10:45:00Z' },
  { id: 'a-007', type: 'room_updated', message: 'Room 305 status changed to Under Maintenance', timestamp: '2026-05-21T16:20:00Z' },
  { id: 'a-008', type: 'rent_paid', message: 'Sneha Reddy paid ₹8,500 for Room 201', timestamp: '2026-05-20T14:15:00Z' },
];

// ── Dashboard Metrics ──
export const mockDashboardMetrics: DashboardMetrics = {
  totalBuildings: 3,
  occupancyRate: 83,
  monthlyCollected: 243500,
  overdueAmount: 24500,
  totalRooms: 78,
  occupiedRooms: 65,
  totalTenants: 65,
  overdueTenants: 3,
};

// ── Enquiries ──
export const mockEnquiries: Enquiry[] = [
  { id: 'eq-001', listingId: 'l-001', seekerId: 'u-040', message: 'Hi, I am looking for a single room near Koramangala. Is there availability from June 1st?', status: 'new', createdAt: '2026-05-27T10:00:00Z', seekerName: 'Nitin Verma' },
  { id: 'eq-002', listingId: 'l-002', seekerId: 'u-041', message: 'Is this PG safe for working women? Do you have AC rooms?', status: 'contacted', createdAt: '2026-05-26T14:00:00Z', seekerName: 'Shruti Gupta' },
  { id: 'eq-003', listingId: 'l-003', seekerId: 'u-042', message: 'Interested in the 2BHK. Can we schedule a visit this weekend?', status: 'new', createdAt: '2026-05-28T08:30:00Z', seekerName: 'Ramesh Iyer' },
];

// ── Reminders ──
export const mockReminders: Reminder[] = [
  { id: 'rem-001', orgId: 'org-001', tenantId: 't-002', channel: 'whatsapp', messageBody: 'Hi Priya, your rent of ₹9,000 for Room 102 is overdue. Please pay at your earliest.', status: 'sent', scheduledAt: '2026-05-05T09:00:00Z', sentAt: '2026-05-05T09:01:00Z' },
  { id: 'rem-002', orgId: 'org-001', tenantId: 't-003', channel: 'whatsapp', messageBody: 'Hi Amit, your rent of ₹7,500 for Room 103 is overdue. Kindly clear your dues.', status: 'sent', scheduledAt: '2026-05-05T09:00:00Z', sentAt: '2026-05-05T09:01:00Z' },
  { id: 'rem-003', orgId: 'org-001', channel: 'in_app', messageBody: 'Rent due on 1st June. Please pay on time to avoid late fees.', status: 'scheduled', scheduledAt: '2026-05-29T09:00:00Z' },
];

// ── Revenue Chart Data ──
export const mockRevenueData = [
  { month: 'Dec', collected: 198000, expected: 215000 },
  { month: 'Jan', collected: 210000, expected: 225000 },
  { month: 'Feb', collected: 225000, expected: 235000 },
  { month: 'Mar', collected: 230000, expected: 242000 },
  { month: 'Apr', collected: 238000, expected: 248000 },
  { month: 'May', collected: 243500, expected: 268000 },
];

export const mockOccupancyData = [
  { month: 'Dec', rate: 72 },
  { month: 'Jan', rate: 75 },
  { month: 'Feb', rate: 78 },
  { month: 'Mar', rate: 80 },
  { month: 'Apr', rate: 82 },
  { month: 'May', rate: 83 },
];
