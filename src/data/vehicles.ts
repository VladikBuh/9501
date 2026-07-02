import { Vehicle, TransportReservation } from '../types';

export const vehicles: Vehicle[] = [
  {
    type: 'Economy',
    passengerCapacity: 4,
    luggageCapacity: 2,
    estimatedArrival: '8 min',
    priceEstimate: 35,
    features: ['Air conditioning', 'USB charging', 'GPS navigation'],
    image: 'Economy',
  },
  {
    type: 'Standard',
    passengerCapacity: 4,
    luggageCapacity: 3,
    estimatedArrival: '12 min',
    priceEstimate: 65,
    features: ['Premium interior', 'Wi-Fi', 'USB charging', 'GPS navigation', 'Water bottles'],
    image: 'Standard',
  },
  {
    type: 'Premium',
    passengerCapacity: 4,
    luggageCapacity: 4,
    estimatedArrival: '15 min',
    priceEstimate: 120,
    features: ['Luxury SUV', 'Leather seats', 'Wi-Fi', 'Champagne service', 'GPS navigation', 'Premium audio'],
    image: 'Premium',
  },
];

export const pickupLocations = [
  { id: 'p1', name: 'Main Entrance', distance: '1 min walk', description: 'Hotel lobby front door' },
  { id: 'p2', name: 'Valet Bay', distance: '2 min walk', description: 'Underground parking level 1' },
  { id: 'p3', name: 'East Pavilion', distance: '3 min walk', description: 'Casino east side exit' },
];

export const transportReservations: TransportReservation[] = [
  {
    id: 't1', reservationNumber: 'TRN-2026-00512', destination: 'CN Tower',
    vehicleType: 'Premium', pickupPoint: 'Main Entrance', date: 'Jul 3, 2026',
    time: '7:00 PM', passengerCount: 2, estimatedPrice: 120, status: 'Active',
  },
  {
    id: 't2', reservationNumber: 'TRN-2026-00488', destination: 'Massey Hall',
    vehicleType: 'Standard', pickupPoint: 'Valet Bay', date: 'Jul 2, 2026',
    time: '6:30 PM', passengerCount: 2, estimatedPrice: 65, status: 'Completed',
  },
];
