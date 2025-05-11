import { Category } from '../types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'LEGO',
    slug: 'lego',
    icon: 'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/197_Lego_logo_logos-512.png',
    bgColor: 'bg-red-100',
    subcategories: [
      { id: '1-1', name: 'LEGO City', slug: 'lego-city' },
      { id: '1-2', name: 'LEGO Technic', slug: 'lego-technic' },
      { id: '1-3', name: 'LEGO Star Wars', slug: 'lego-star-wars' },
      { id: '1-4', name: 'LEGO Friends', slug: 'lego-friends' }
    ]
  },
  {
    id: '2',
    name: 'Board Games',
    slug: 'board-games',
    icon: 'https://cdn-icons-png.flaticon.com/512/5726/5726942.png',
    bgColor: 'bg-blue-100',
    subcategories: [
      { id: '2-1', name: 'Family Games', slug: 'family-games' },
      { id: '2-2', name: 'Strategy Games', slug: 'strategy-games' },
      { id: '2-3', name: 'Card Games', slug: 'card-games' }
    ]
  },
  {
    id: '3',
    name: 'Outdoor Toys',
    slug: 'outdoor',
    icon: 'https://cdn-icons-png.flaticon.com/512/808/808439.png',
    bgColor: 'bg-green-100',
    subcategories: [
      { id: '3-1', name: 'Bikes & Ride-ons', slug: 'bikes-rideons' },
      { id: '3-2', name: 'Sports', slug: 'sports' },
      { id: '3-3', name: 'Pools & Water Toys', slug: 'pools-water' }
    ]
  },
  {
    id: '4',
    name: 'Dolls & Figures',
    slug: 'dolls-figures',
    icon: 'https://cdn-icons-png.flaticon.com/512/3313/3313485.png',
    bgColor: 'bg-pink-100',
    subcategories: [
      { id: '4-1', name: 'Fashion Dolls', slug: 'fashion-dolls' },
      { id: '4-2', name: 'Action Figures', slug: 'action-figures' },
      { id: '4-3', name: 'Collectible Figures', slug: 'collectible-figures' }
    ]
  },
  {
    id: '5',
    name: 'Educational',
    slug: 'educational',
    icon: 'https://cdn-icons-png.flaticon.com/512/2436/2436855.png',
    bgColor: 'bg-yellow-100',
    subcategories: [
      { id: '5-1', name: 'Science Kits', slug: 'science-kits' },
      { id: '5-2', name: 'STEM Toys', slug: 'stem-toys' },
      { id: '5-3', name: 'Learning Toys', slug: 'learning-toys' }
    ]
  },
  {
    id: '6',
    name: 'Video Games',
    slug: 'video-games',
    icon: 'https://cdn-icons-png.flaticon.com/512/686/686589.png',
    bgColor: 'bg-purple-100',
    subcategories: [
      { id: '6-1', name: 'Nintendo', slug: 'nintendo' },
      { id: '6-2', name: 'PlayStation', slug: 'playstation' },
      { id: '6-3', name: 'Xbox', slug: 'xbox' }
    ]
  },
  {
    id: '7',
    name: 'Baby & Toddler',
    slug: 'baby-toddler',
    icon: 'https://cdn-icons-png.flaticon.com/512/2201/2201581.png',
    bgColor: 'bg-indigo-100',
    subcategories: [
      { id: '7-1', name: 'Activity Toys', slug: 'activity-toys' },
      { id: '7-2', name: 'Plush Toys', slug: 'plush-toys' },
      { id: '7-3', name: 'Push & Pull Toys', slug: 'push-pull-toys' }
    ]
  },
  {
    id: '8',
    name: 'Puzzles',
    slug: 'puzzles',
    icon: 'https://cdn-icons-png.flaticon.com/512/2534/2534333.png',
    bgColor: 'bg-orange-100',
    subcategories: [
      { id: '8-1', name: 'Jigsaw Puzzles', slug: 'jigsaw-puzzles' },
      { id: '8-2', name: '3D Puzzles', slug: '3d-puzzles' },
      { id: '8-3', name: 'Brain Teasers', slug: 'brain-teasers' }
    ]
  }
];