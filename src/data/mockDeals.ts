
import { Deal } from '@/types/deal';

export const mockDeals: Deal[] = [
  {
    id: 'deal-1',
    title: 'Dinner for Two with Wine at Italian Bistro',
    description: 'Enjoy an authentic Italian dinner for two at one of the city\'s most beloved bistros. Package includes appetizers, two main courses, dessert, and a bottle of select wine.',
    highlights: [
      'Fine dining experience for two',
      'Includes appetizer, main course, and dessert',
      'Bottle of red or white wine included',
      'Valid any day of the week'
    ],
    fineprint: 'Must present voucher at time of redemption. Reservation required. Cannot be combined with other offers. Tip not included. Expires 6 months after purchase.',
    imageUrl: 'https://images.unsplash.com/photo-1579684947550-22e945225d9a?auto=format&fit=crop&w=600&q=80',
    currentPrice: 79.99,
    originalPrice: 120.00,
    merchant: 'Italian Bistro',
    category: 'restaurants',
    location: 'Downtown',
    rating: 4.7,
    reviewCount: 253,
    sold: 1245,
    expiresAt: '2023-12-31',
    redemptionLocation: '123 Main St, New York, NY 10001'
  },
  {
    id: 'deal-2',
    title: 'Full-Day Spa Package with Massage, Facial, and Manicure',
    description: 'Treat yourself to a day of relaxation with this complete spa package. Includes a 60-minute massage, custom facial, and manicure service.',
    highlights: [
      '60-minute Swedish or deep tissue massage',
      'Customized facial treatment',
      'Professional manicure with polish',
      'Access to spa facilities for the full day'
    ],
    fineprint: 'By appointment only. 24-hour cancellation notice required. Not valid on holidays. Gratuity not included.',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    currentPrice: 129.00,
    originalPrice: 220.00,
    merchant: 'Serenity Spa',
    category: 'beauty',
    location: 'Midtown',
    rating: 4.9,
    reviewCount: 512,
    sold: 3460,
    expiresAt: '2023-11-30',
    redemptionLocation: '450 Park Ave, New York, NY 10022'
  },
  {
    id: 'deal-3',
    title: 'Two-Night Beachfront Hotel Stay',
    description: 'Escape to the beach with this two-night stay at an oceanfront hotel. Package includes breakfast, parking, and resort credits.',
    highlights: [
      'Two-night stay in ocean view room',
      'Daily breakfast for two',
      'Free parking',
      '$50 resort credit'
    ],
    fineprint: 'Subject to availability. Blackout dates may apply. Not valid during holidays or special events. Taxes not included.',
    imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80',
    currentPrice: 299.00,
    originalPrice: 450.00,
    merchant: 'Ocean View Resort',
    category: 'travel',
    location: 'Miami Beach',
    rating: 4.5,
    reviewCount: 832,
    sold: 2198,
    expiresAt: '2024-05-31',
    redemptionLocation: '789 Ocean Drive, Miami Beach, FL 33139'
  },
  {
    id: 'deal-4',
    title: 'Zipline Adventure Tour for Two',
    description: 'Get your adrenaline pumping with this zipline adventure tour for two. Experience breathtaking views as you soar through the forest canopy.',
    highlights: [
      'Full zipline course with 8 lines',
      'Professional guides and equipment',
      'Training session included',
      'Digital photo package'
    ],
    fineprint: 'Must be at least 10 years old and weigh between 70-250 lbs. Weather permitting. 72-hour cancellation policy.',
    imageUrl: 'https://images.unsplash.com/photo-1581447109200-bf2769823dde?auto=format&fit=crop&w=600&q=80',
    currentPrice: 119.99,
    originalPrice: 180.00,
    merchant: 'Adventure Zone',
    category: 'activities',
    location: 'Mountain Valley',
    rating: 4.8,
    reviewCount: 345,
    sold: 1876,
    expiresAt: '2023-10-31',
    redemptionLocation: '1200 Adventure Rd, Mountain Valley, NY 12345'
  },
  {
    id: 'deal-5',
    title: 'Wireless Noise-Cancelling Headphones',
    description: 'Premium wireless headphones featuring advanced noise-cancellation technology, 30-hour battery life, and crystal clear sound quality.',
    highlights: [
      'Active noise cancellation',
      '30-hour battery life',
      'Bluetooth 5.0 connectivity',
      'Comfortable over-ear design'
    ],
    fineprint: 'One-year manufacturer warranty. Returns accepted within 30 days of purchase with original packaging.',
    imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80',
    currentPrice: 159.99,
    originalPrice: 249.99,
    merchant: 'TechGoods',
    category: 'products',
    location: 'Online',
    rating: 4.6,
    reviewCount: 1289,
    sold: 5432
  },
  {
    id: 'deal-6',
    title: 'House Cleaning Service - 3 Hours',
    description: 'Professional house cleaning service for homes up to 2,500 sq ft. Includes dusting, vacuuming, mopping, and bathroom cleaning.',
    highlights: [
      '3-hour professional cleaning',
      'Eco-friendly cleaning products',
      'Trained and background-checked cleaners',
      'Satisfaction guarantee'
    ],
    fineprint: 'Valid for residences within service area. Additional fee for homes larger than 2,500 sq ft. Cancellation requires 24-hour notice.',
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
    currentPrice: 89.00,
    originalPrice: 120.00,
    merchant: 'CleanPro Services',
    category: 'home',
    location: 'NYC Metro Area',
    rating: 4.7,
    reviewCount: 739,
    sold: 4231,
    redemptionLocation: 'Service provided at customer address'
  },
  {
    id: 'deal-7',
    title: 'Oil Change and Vehicle Inspection',
    description: 'Complete oil change service including up to 5 quarts of oil, new oil filter, and 21-point vehicle inspection.',
    highlights: [
      'Oil change with premium oil',
      'New oil filter installation',
      'Tire pressure check and adjustment',
      'Comprehensive 21-point inspection'
    ],
    fineprint: 'Valid for most vehicles. Additional charges may apply for synthetic oil or specialty filters. By appointment only.',
    imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=600&q=80',
    currentPrice: 39.99,
    originalPrice: 69.99,
    merchant: 'Express Auto Service',
    category: 'auto',
    location: 'Various Locations',
    rating: 4.5,
    reviewCount: 512,
    sold: 2876,
    redemptionLocation: 'Multiple locations - see redemption page'
  },
  {
    id: 'deal-8',
    title: 'Teeth Whitening Treatment',
    description: 'Professional-grade teeth whitening treatment that provides visible results in just one session. Performed by licensed dental professionals.',
    highlights: [
      'Professional-strength whitening gel',
      'LED accelerator light',
      'Results visible after one session',
      'Treatment takes 60 minutes'
    ],
    fineprint: 'Consultation required. Not recommended for pregnant women or children under 18. Results may vary.',
    imageUrl: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=600&q=80',
    currentPrice: 99.00,
    originalPrice: 199.00,
    merchant: 'BrightSmile Dental',
    category: 'wellness',
    location: 'Eastside',
    rating: 4.6,
    reviewCount: 287,
    sold: 1483,
    expiresAt: '2023-12-15',
    redemptionLocation: '555 Dental Way, New York, NY 10017'
  }
];

export const getDeals = (): Promise<Deal[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDeals);
    }, 500);
  });
};

export const getDealById = (id: string): Promise<Deal | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDeals.find(deal => deal.id === id));
    }, 300);
  });
};

export const getDealsByCategory = (category: string): Promise<Deal[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        category === 'all' 
          ? mockDeals 
          : mockDeals.filter(deal => deal.category === category)
      );
    }, 500);
  });
};

export const getFeaturedDeals = (): Promise<Deal[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Return a random selection of deals
      const shuffled = [...mockDeals].sort(() => 0.5 - Math.random());
      resolve(shuffled.slice(0, 4));
    }, 300);
  });
};

export const getTrendingDeals = (): Promise<Deal[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // For this mock, we'll just sort by sold count and return top deals
      const trending = [...mockDeals].sort((a, b) => 
        (b.sold || 0) - (a.sold || 0)
      );
      resolve(trending.slice(0, 4));
    }, 300);
  });
};

export const searchDeals = (query: string): Promise<Deal[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const normalizedQuery = query.toLowerCase().trim();
      
      if (!normalizedQuery) {
        resolve([]);
        return;
      }
      
      const results = mockDeals.filter(deal => 
        deal.title.toLowerCase().includes(normalizedQuery) ||
        deal.merchant.toLowerCase().includes(normalizedQuery) ||
        deal.category.toLowerCase().includes(normalizedQuery) ||
        deal.location.toLowerCase().includes(normalizedQuery)
      );
      
      resolve(results);
    }, 500);
  });
};
