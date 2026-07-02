const images: Record<string, any> = {
  // Food — Sushi
  SignatureSalmonRoll: require('./wood-room-hub-signature-salmon-roll.png'),
  DragonTempuraRoll: require('./wood-room-hub-dragon-tempura-roll.png'),
  TunaSashimiDeluxe: require('./wood-room-hub-tuna-sashimi-deluxe.png'),
  RainbowSushiSet: require('./wood-room-hub-rainbow-sushi-set.png'),
  CrispyEbiMaki: require('./wood-room-hub-crispy-ebi-maki.png'),
  // Food — Seafood
  ButterLobsterTail: require('./wood-room-hub-butter-lobster-tail.png'),
  AtlanticGrilledSalmon: require('./wood-room-hub-atlantic-grilled-salmon.png'),
  GarlicShrimpPlatter: require('./wood-room-hub-garlic-shrimp-platter.png'),
  SeafoodRisottoRoyale: require('./wood-room-hub-seafood-risotto-royale.png'),
  KingCrabFeast: require('./wood-room-hub-king-crab-feast.png'),
  // Food — Street
  WagyuBeefBurger: require('./wood-room-hub-wagyu-beef-burger.png'),
  KoreanBBQTacos: require('./wood-room-hub-korean-bbq-tacos.png'),
  CrispyChickenSliders: require('./wood-room-hub-crispy-chicken-sliders.png'),
  LoadedTruffleFries: require('./wood-room-hub-loaded-truffle-fries.png'),
  GourmetBeefHotDog: require('./wood-room-hub-gourmet-beef-hot-dog.png'),
  // Events
  LiveMusicConcertNights: require('./wood-room-hub-live-music-concert-nights.png'),
  TheatreComedyShows: require('./wood-room-hub-theatre-comedy-shows.png'),
  CasinoTournamentsGamingEvents: require('./wood-room-hub-casino-tournaments-gaming-events.png'),
  WineTastingsGourmetExperiences: require('./wood-room-hub-wine-tastings-gourmet-experiences.png'),
  VIPLoungeExclusiveParties: require('./wood-room-hub-vip-lounge-exclusive-parties.png'),
  HorseRacingTrackEvents: require('./wood-room-hub-horse-racing-track-events.png'),
  FamilyEntertainmentKidsActivities: require('./wood-room-hub-family-entertainment-kids-activities.png'),
  SeasonalFestivalsHolidayCelebrations: require('./wood-room-hub-seasonal-festivals-holiday-celebrations.png'),
  BusinessConferencesNetworkingEvents: require('./wood-room-hub-business-conferences-networking-events.png'),
  DanceNightsThemedParties: require('./wood-room-hub-dance-nights-themed-parties.png'),
  // Locations — Iconic
  CNTower: require('./wood-room-hub-cn-tower.png'),
  RipleysAquariumofCanada: require('./wood-room-hub-ripleys-aquariumof-canada.png'),
  RoyalOntarioMuseum: require('./wood-room-hub-royal-ontario-museum.png'),
  CasaLoma: require('./wood-room-hub-casa-loma.png'),
  DistilleryHistoricDistrict: require('./wood-room-hub-distillery-historic-district.png'),
  TorontoIslands: require('./wood-room-hub-toronto-islands.png'),
  // Locations — Nightlife
  MasseyHall: require('./wood-room-hub-massey-hall.png'),
  MeridianHall: require('./wood-room-hub-meridian-hall.png'),
  TheDanforthMusicHall: require('./wood-room-hub-the-danforth-music-hall.png'),
  BudweiserStage: require('./wood-room-hub-budweiser-stage.png'),
  SecondCityToronto: require('./wood-room-hub-second-city-toronto.png'),
  TheRecRoomToronto: require('./wood-room-hub-the-rec-room-toronto.png'),
  // Locations — Adventure
  CanadasWonderland: require('./wood-room-hub-canadas-wonderland.png'),
  CentrevilleAmusementPark: require('./wood-room-hub-centreville-amusement-park.png'),
  HighParkZoo: require('./wood-room-hub-high-park-zoo.png'),
  PursuitOCR: require('./wood-room-hub-pursuit-ocr.png'),
  BATLAxeThrowing: require('./wood-room-hub-batl-axe-throwing.png'),
  DownsviewPark: require('./wood-room-hub-downsview-park.png'),
  loader_bg: require('./wood-room-hub-loader-bg.png'),
  loader_icon: require('./wood-room-hub-loader-icon.png'),
};

export const getImage = (name: string): any => images[name] ?? null;
