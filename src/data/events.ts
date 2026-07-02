import { Event, EventReservation } from '../types';

export const events: Event[] = [
  {
    id: 'e1', title: 'Jazz Night Under The Stars', category: 'Live Music & Concert Nights', categoryIcon: '🎤',
    description: 'Experience an unforgettable evening with Toronto\'s finest jazz ensemble performing timeless classics and contemporary pieces in our grand ballroom.',
    date: 'Jul 2, 2026', time: '8:00 PM', duration: '3 hours', venue: 'Grand Ballroom',
    remainingSeats: 24, price: 85, image: 'LiveMusicConcertNights',
    dressCode: 'Smart Casual', ageRestriction: '19+', organizer: 'Woodbine Entertainment',
    includedServices: ['Welcome cocktail', 'Complimentary snacks', 'VIP table access'],
  },
  {
    id: 'e2', title: 'Comedy Spectacular', category: 'Theatre & Comedy Shows', categoryIcon: '🎭',
    description: 'An evening of laughter featuring three of Canada\'s top stand-up comedians for a night you won\'t forget.',
    date: 'Jul 3, 2026', time: '7:30 PM', duration: '2.5 hours', venue: 'Encore Theatre',
    remainingSeats: 12, price: 65, image: 'TheatreComedyShows',
    dressCode: 'Casual', ageRestriction: '18+', organizer: 'Comedy Works TO',
    includedServices: ['One welcome drink', 'Preferred seating'],
  },
  {
    id: 'e3', title: 'High Stakes Poker Tournament', category: 'Casino Tournaments & Gaming Events', categoryIcon: '🎰',
    description: 'Join our prestigious annual poker tournament featuring $50,000 in prizes and competing alongside the best card players in the region.',
    date: 'Jul 4, 2026', time: '6:00 PM', duration: '4 hours', venue: 'Diamond Gaming Floor',
    remainingSeats: 8, price: 250, image: 'CasinoTournamentsGamingEvents',
    dressCode: 'Business Formal', ageRestriction: '19+', organizer: 'Woodbine Casino',
    includedServices: ['Starting chips included', 'Dinner buffet', 'VIP lounge access'],
  },
  {
    id: 'e4', title: 'Sommelier Wine Experience', category: 'Wine Tastings & Gourmet Experiences', categoryIcon: '🍷',
    description: 'A guided tasting of 12 curated wines from around the world, paired with artisanal charcuterie and gourmet cheese selections.',
    date: 'Jul 5, 2026', time: '5:00 PM', duration: '2 hours', venue: 'The Cellar Lounge',
    remainingSeats: 18, price: 120, image: 'WineTastingsGourmetExperiences',
    dressCode: 'Smart Casual', ageRestriction: '19+', organizer: 'Sommelier Guild of Toronto',
    includedServices: ['12 wine tastings', 'Gourmet pairings', 'Take-home tasting notes'],
  },
  {
    id: 'e5', title: 'VIP New Year\'s Eve Party', category: 'VIP Lounge & Exclusive Parties', categoryIcon: '🥂',
    description: 'Ring in 2026 at our exclusive New Year\'s Eve celebration featuring live DJs, champagne toast at midnight, and a spectacular fireworks viewing.',
    date: 'Jul 4, 2026', time: '9:00 PM', duration: '5 hours', venue: 'Skyline Rooftop',
    remainingSeats: 5, price: 350, image: 'VIPLoungeExclusiveParties',
    dressCode: 'Black Tie', ageRestriction: '21+', organizer: 'Woodbine Hospitality',
    includedServices: ['Open bar', 'Gourmet dinner', 'Midnight champagne', 'Gift bag'],
  },
  {
    id: 'e6', title: 'Queen\'s Plate Race Day', category: 'Horse Racing & Track Events', categoryIcon: '🐎',
    description: 'Experience the thrill of live Thoroughbred racing with premium trackside viewing, expert commentary, and exclusive hospitality services.',
    date: 'Jul 8, 2026', time: '12:00 PM', duration: '6 hours', venue: 'Woodbine Track',
    remainingSeats: 30, price: 95, image: 'HorseRacingTrackEvents',
    dressCode: 'Smart Casual', ageRestriction: 'All Ages', organizer: 'Woodbine Horse Racing',
    includedServices: ['Premium trackside seat', 'Race program', 'Complimentary bet tokens'],
  },
  {
    id: 'e7', title: 'Kids Magic & Wonder Show', category: 'Family Entertainment & Kids Activities', categoryIcon: '👨‍👩‍👧‍👦',
    description: 'An enchanting afternoon of magic, illusions, and interactive performances perfect for the whole family.',
    date: 'Jul 6, 2026', time: '3:00 PM', duration: '2 hours', venue: 'Crystal Ballroom',
    remainingSeats: 40, price: 45, image: 'FamilyEntertainmentKidsActivities',
    dressCode: 'Casual', ageRestriction: 'All Ages', organizer: 'Wonder Productions',
    includedServices: ['Front-row seating', 'Kids activity bag', 'Post-show meet & greet'],
  },
  {
    id: 'e8', title: 'New Year Festival Gala', category: 'Seasonal Festivals & Holiday Celebrations', categoryIcon: '🎉',
    description: 'Celebrate the holiday season at our spectacular winter gala featuring festive entertainment, seasonal cuisine, and live performances.',
    date: 'Jul 1, 2026', time: '7:00 PM', duration: '4 hours', venue: 'Grand Hall',
    remainingSeats: 22, price: 175, image: 'SeasonalFestivalsHolidayCelebrations',
    dressCode: 'Formal', ageRestriction: '18+', organizer: 'Woodbine Events',
    includedServices: ['3-course dinner', 'Live entertainment', 'Holiday gift'],
  },
  {
    id: 'e9', title: 'Luxury Brand Networking Summit', category: 'Business Conferences & Networking Events', categoryIcon: '💼',
    description: 'Connect with top industry leaders and entrepreneurs at our prestigious annual networking summit with keynote speakers and workshops.',
    date: 'Jul 7, 2026', time: '10:00 AM', duration: '8 hours', venue: 'Conference Centre',
    remainingSeats: 15, price: 299, image: 'BusinessConferencesNetworkingEvents',
    dressCode: 'Business Formal', ageRestriction: '21+', organizer: 'Toronto Business Guild',
    includedServices: ['Lunch included', 'Workshop materials', 'Networking reception'],
  },
  {
    id: 'e10', title: 'Salsa & Latin Fever Night', category: 'Dance Nights & Themed Parties', categoryIcon: '💃',
    description: 'Dance the night away at our spectacular Latin-themed party featuring professional dancers, live salsa music, and signature cocktails.',
    date: 'Jul 9, 2026', time: '9:00 PM', duration: '4 hours', venue: 'Havana Ballroom',
    remainingSeats: 28, price: 75, image: 'DanceNightsThemedParties',
    dressCode: 'Festive Casual', ageRestriction: '19+', organizer: 'Woodbine Entertainment',
    includedServices: ['1 welcome cocktail', 'Dance lesson at 9PM', 'Salsa performance at 11PM'],
  },
];

export const eventReservations: EventReservation[] = [
  {
    id: 'r1', eventId: 'e5', eventTitle: 'VIP New Year\'s Eve Party',
    eventImage: 'VIPLoungeExclusiveParties', date: 'Jul 4, 2026', time: '9:00 PM',
    guests: 2, status: 'Confirmed', reservationNumber: 'EVT-2026-00291', notes: 'Window table preferred',
  },
  {
    id: 'r2', eventId: 'e1', eventTitle: 'Jazz Night Under The Stars',
    eventImage: 'LiveMusicConcertNights', date: 'Jul 2, 2026', time: '8:00 PM',
    guests: 2, status: 'Reserved', reservationNumber: 'EVT-2026-00188', notes: '',
  },
];

export const eventCategories = [
  { name: 'Live Music & Concert Nights', icon: '🎤', image: 'LiveMusicConcertNights' },
  { name: 'Theatre & Comedy Shows', icon: '🎭', image: 'TheatreComedyShows' },
  { name: 'Casino Tournaments & Gaming Events', icon: '🎰', image: 'CasinoTournamentsGamingEvents' },
  { name: 'Wine Tastings & Gourmet Experiences', icon: '🍷', image: 'WineTastingsGourmetExperiences' },
  { name: 'VIP Lounge & Exclusive Parties', icon: '🥂', image: 'VIPLoungeExclusiveParties' },
  { name: 'Horse Racing & Track Events', icon: '🐎', image: 'HorseRacingTrackEvents' },
  { name: 'Family Entertainment & Kids Activities', icon: '👨‍👩‍👧‍👦', image: 'FamilyEntertainmentKidsActivities' },
  { name: 'Seasonal Festivals & Holiday Celebrations', icon: '🎉', image: 'SeasonalFestivalsHolidayCelebrations' },
  { name: 'Business Conferences & Networking Events', icon: '💼', image: 'BusinessConferencesNetworkingEvents' },
  { name: 'Dance Nights & Themed Parties', icon: '💃', image: 'DanceNightsThemedParties' },
];
