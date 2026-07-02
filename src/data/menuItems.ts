import { MenuItem } from '../types';

export const menuItems: MenuItem[] = [
  // Ocean & Sushi
  {
    id: 's1', name: 'Signature Salmon Roll', category: 'Ocean & Sushi Delights', categoryIcon: '🍣',
    description: 'Fresh Atlantic salmon roll with creamy avocado, cucumber, and cream cheese.',
    price: 24, prepTime: 20, rating: 4.9, popular: true,
    ingredients: ['Atlantic salmon', 'Sushi rice', 'Nori', 'Avocado', 'Cucumber', 'Cream cheese', 'Sesame seeds'],
    image: 'SignatureSalmonRoll',
  },
  {
    id: 's2', name: 'Dragon Tempura Roll', category: 'Ocean & Sushi Delights', categoryIcon: '🍣',
    description: 'Crispy shrimp tempura roll topped with avocado and sweet eel sauce.',
    price: 28, prepTime: 25, rating: 4.8, popular: true,
    ingredients: ['Shrimp tempura', 'Sushi rice', 'Nori', 'Avocado', 'Cucumber', 'Eel sauce', 'Sesame seeds'],
    image: 'DragonTempuraRoll',
  },
  {
    id: 's3', name: 'Tuna Sashimi Deluxe', category: 'Ocean & Sushi Delights', categoryIcon: '🍣',
    description: 'Premium sliced bluefin tuna served with traditional Japanese condiments.',
    price: 30, prepTime: 15, rating: 4.9, popular: false,
    ingredients: ['Bluefin tuna', 'Wasabi', 'Pickled ginger', 'Soy sauce'],
    image: 'TunaSashimiDeluxe',
  },
  {
    id: 's4', name: 'Rainbow Sushi Set', category: 'Ocean & Sushi Delights', categoryIcon: '🍣',
    description: 'Colorful assortment of handcrafted sushi topped with fresh seafood.',
    price: 36, prepTime: 30, rating: 4.7, popular: true,
    ingredients: ['Salmon', 'Tuna', 'Shrimp', 'Sushi rice', 'Nori', 'Avocado', 'Cucumber'],
    image: 'RainbowSushiSet',
  },
  {
    id: 's5', name: 'Crispy Ebi Maki', category: 'Ocean & Sushi Delights', categoryIcon: '🍣',
    description: 'Crunchy shrimp roll finished with spicy mayo and crispy flakes.',
    price: 26, prepTime: 20, rating: 4.6, popular: false,
    ingredients: ['Shrimp', 'Sushi rice', 'Nori', 'Cream cheese', 'Cucumber', 'Spicy mayonnaise'],
    image: 'CrispyEbiMaki',
  },

  // Luxury Seafood
  {
    id: 'l1', name: 'Butter Lobster Tail', category: 'Luxury Seafood Collection', categoryIcon: '🦞',
    description: 'Oven-roasted lobster tail served with garlic herb butter.',
    price: 58, prepTime: 35, rating: 4.9, popular: true,
    ingredients: ['Lobster tail', 'Butter', 'Garlic', 'Parsley', 'Lemon'],
    image: 'ButterLobsterTail',
  },
  {
    id: 'l2', name: 'Atlantic Grilled Salmon', category: 'Luxury Seafood Collection', categoryIcon: '🦞',
    description: 'Grilled Atlantic salmon served with seasonal vegetables.',
    price: 39, prepTime: 30, rating: 4.8, popular: true,
    ingredients: ['Atlantic salmon', 'Asparagus', 'Zucchini', 'Olive oil', 'Lemon'],
    image: 'AtlanticGrilledSalmon',
  },
  {
    id: 'l3', name: 'Garlic Shrimp Platter', category: 'Luxury Seafood Collection', categoryIcon: '🦞',
    description: 'Tiger shrimp sautéed in creamy garlic butter sauce.',
    price: 34, prepTime: 25, rating: 4.7, popular: false,
    ingredients: ['Tiger shrimp', 'Garlic', 'Butter', 'Cream', 'Parsley'],
    image: 'GarlicShrimpPlatter',
  },
  {
    id: 'l4', name: 'Seafood Risotto Royale', category: 'Luxury Seafood Collection', categoryIcon: '🦞',
    description: 'Creamy Italian risotto with a selection of premium seafood.',
    price: 37, prepTime: 35, rating: 4.8, popular: true,
    ingredients: ['Arborio rice', 'Shrimp', 'Mussels', 'Squid', 'Parmesan cheese'],
    image: 'SeafoodRisottoRoyale',
  },
  {
    id: 'l5', name: 'King Crab Feast', category: 'Luxury Seafood Collection', categoryIcon: '🦞',
    description: 'Steamed king crab legs served with lemon butter and vegetables.',
    price: 62, prepTime: 40, rating: 4.9, popular: false,
    ingredients: ['King crab', 'Butter', 'Lemon', 'Broccoli', 'Carrots'],
    image: 'KingCrabFeast',
  },

  // Street Food Premium
  {
    id: 'f1', name: 'Wagyu Beef Burger', category: 'Street Food Premium Edition', categoryIcon: '🌮',
    description: 'Juicy Wagyu beef burger with cheddar cheese and signature sauce.',
    price: 27, prepTime: 20, rating: 4.8, popular: true,
    ingredients: ['Brioche bun', 'Wagyu beef', 'Cheddar cheese', 'Lettuce', 'Tomato', 'Signature sauce'],
    image: 'WagyuBeefBurger',
  },
  {
    id: 'f2', name: 'Korean BBQ Tacos', category: 'Street Food Premium Edition', categoryIcon: '🌮',
    description: 'Soft tacos filled with marinated Korean BBQ beef and fresh slaw.',
    price: 23, prepTime: 20, rating: 4.7, popular: true,
    ingredients: ['Flour tortillas', 'BBQ beef', 'Cabbage slaw', 'Kimchi mayo', 'Cilantro'],
    image: 'KoreanBBQTacos',
  },
  {
    id: 'f3', name: 'Crispy Chicken Sliders', category: 'Street Food Premium Edition', categoryIcon: '🌮',
    description: 'Mini crispy chicken burgers with spicy aioli and pickles.',
    price: 21, prepTime: 18, rating: 4.6, popular: false,
    ingredients: ['Chicken fillet', 'Slider buns', 'Lettuce', 'Pickles', 'Spicy aioli'],
    image: 'CrispyChickenSliders',
  },
  {
    id: 'f4', name: 'Loaded Truffle Fries', category: 'Street Food Premium Edition', categoryIcon: '🌮',
    description: 'Crispy fries topped with parmesan, truffle oil, and fresh herbs.',
    price: 16, prepTime: 15, rating: 4.8, popular: true,
    ingredients: ['French fries', 'Parmesan cheese', 'Truffle oil', 'Parsley', 'Sea salt'],
    image: 'LoadedTruffleFries',
  },
  {
    id: 'f5', name: 'Gourmet Beef Hot Dog', category: 'Street Food Premium Edition', categoryIcon: '🌮',
    description: 'Premium beef hot dog topped with caramelized onions and cheese sauce.',
    price: 18, prepTime: 15, rating: 4.5, popular: false,
    ingredients: ['Beef sausage', 'Artisan bun', 'Caramelized onions', 'Cheddar cheese sauce', 'Mustard'],
    image: 'GourmetBeefHotDog',
  },
];

export const diningCategories = [
  { name: 'Ocean & Sushi Delights', icon: '🍣', featured: 'SignatureSalmonRoll' },
  { name: 'Luxury Seafood Collection', icon: '🦞', featured: 'ButterLobsterTail' },
  { name: 'Street Food Premium Edition', icon: '🌮', featured: 'WagyuBeefBurger' },
];
