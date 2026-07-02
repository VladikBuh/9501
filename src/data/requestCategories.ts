import { RequestCategory } from '../types';

export const requestCategories: RequestCategory[] = [
  {
    id: 'housekeeping',
    title: 'Housekeeping & Cleaning',
    description: 'Room cleaning, vacuuming, dusting, and general tidying.',
    icon: 'sparkles',
    estimatedTime: '15–30 min',
  },
  {
    id: 'linen',
    title: 'Linen & Towels',
    description: 'Fresh bed linen, towel replacement, and pillows.',
    icon: 'bed.double.fill',
    estimatedTime: '10–20 min',
  },
  {
    id: 'bathroom',
    title: 'Bathroom Amenities',
    description: 'Toiletries, soap, shampoo, and bathroom essentials.',
    icon: 'shower.fill',
    estimatedTime: '10–15 min',
  },
  {
    id: 'climate',
    title: 'Room Comfort & Climate',
    description: 'Temperature, humidity, extra blankets, and fan requests.',
    icon: 'thermometer.medium',
    estimatedTime: '5–15 min',
  },
  {
    id: 'maintenance',
    title: 'Maintenance & Repairs',
    description: 'Lighting, plumbing, furniture, and technical issues.',
    icon: 'wrench.and.screwdriver.fill',
    estimatedTime: '20–45 min',
  },
  {
    id: 'food_beverage',
    title: 'Food & Beverage Service',
    description: 'In-room beverages, ice, coffee setup, and snack requests.',
    icon: 'cup.and.saucer.fill',
    estimatedTime: '15–25 min',
  },
  {
    id: 'concierge',
    title: 'Guest Assistance & Concierge',
    description: 'Local recommendations, reservations, and special requests.',
    icon: 'person.crop.circle.badge.checkmark',
    estimatedTime: '5–10 min',
  },
];
