export type RequestStatus = 'Submitted' | 'Accepted' | 'In Progress' | 'Completed';
export type EventStatus = 'Reserved' | 'Confirmed' | 'Completed' | 'Cancelled';
export type TransportStatus = 'Active' | 'Completed' | 'Cancelled';
export type VehicleType = 'Economy' | 'Standard' | 'Premium';
export type Priority = 'Normal' | 'High' | 'Very High';

export interface RoomRequest {
  id: string;
  category: string;
  categoryIcon: string;
  subject: string;
  description: string;
  priority: Priority;
  status: RequestStatus;
  submittedAt: string;
  estimatedTime: string;
  staffName?: string;
  completedAt?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  prepTime: number;
  category: string;
  categoryIcon: string;
  ingredients: string[];
  rating: number;
  popular: boolean;
  image: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  notes: string;
}

export interface Event {
  id: string;
  title: string;
  category: string;
  categoryIcon: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  venue: string;
  remainingSeats: number;
  price: number;
  image: string;
  dressCode: string;
  ageRestriction: string;
  organizer: string;
  includedServices: string[];
}

export interface EventReservation {
  id: string;
  eventId: string;
  eventTitle: string;
  eventImage: string;
  date: string;
  time: string;
  guests: number;
  status: EventStatus;
  reservationNumber: string;
  notes: string;
}

export interface Location {
  id: string;
  name: string;
  category: string;
  categoryIcon: string;
  description: string;
  coordinates: string;
  distance: string;
  travelTime: string;
  openingHours: string;
  recommendedDuration: string;
  image: string;
  nearbyAttractions: string[];
}

export interface Vehicle {
  type: VehicleType;
  passengerCapacity: number;
  luggageCapacity: number;
  estimatedArrival: string;
  priceEstimate: number;
  features: string[];
  image: string;
}

export interface TransportReservation {
  id: string;
  reservationNumber: string;
  destination: string;
  vehicleType: VehicleType;
  pickupPoint: string;
  date: string;
  time: string;
  passengerCount: number;
  estimatedPrice: number;
  status: TransportStatus;
}

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Main: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  RequestCenter: undefined;
  RequestForm: { category: RequestCategory };
  RequestConfirm: { requestId: string };
  RequestTracking: { requestId: string };
};

export type GuestStackParamList = {
  Guest: undefined;
  FullBarcode: undefined;
};

export type EventsStackParamList = {
  Events: undefined;
  EventDetail: { event: Event };
  EventReserve: { event: Event };
  EventConfirm: { reservationNumber: string; event: Event };
  MyEventReservations: undefined;
  CategoryEvents: { category: string; categoryIcon: string };
};

export type DiningStackParamList = {
  Dining: undefined;
  FoodCategory: { category: string; categoryIcon: string };
  FoodDetail: { item: MenuItem };
  Cart: undefined;
  Checkout: undefined;
  OrderConfirm: { orderNumber: string };
};

export type ExploreStackParamList = {
  Explore: undefined;
  LocationDetail: { location: Location };
};

export type TransportStackParamList = {
  Transport: undefined;
  TransportConfirm: { reservation: TransportReservation };
  MyTransport: undefined;
};

export interface RequestCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  estimatedTime: string;
}
