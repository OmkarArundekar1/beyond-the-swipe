export const APP_NAME = 'Beyond the Swipe';
export const APP_SHORT_NAME = 'BtS';
export const APP_DESCRIPTION = 'Compatibility-driven dating that goes beyond the swipe';

export const INTERESTS = [
  'Travel',
  'Reading',
  'Cooking',
  'Fitness',
  'Music',
  'Movies',
  'Art',
  'Photography',
  'Gaming',
  'Hiking',
  'Yoga',
  'Dance',
  'Sports',
  'Technology',
  'Writing',
  'Volunteering',
  'Meditation',
  'Fashion',
  'Food',
  'Coffee',
  'Wine',
  'Pets',
  'Gardening',
  'DIY',
];

export const VALUE_CATEGORIES = [
  {
    category: 'Core Values',
    values: ['Honesty', 'Loyalty', 'Kindness', 'Ambition', 'Family', 'Independence'],
  },
  {
    category: 'Lifestyle',
    values: ['Adventure', 'Stability', 'Spontaneity', 'Planning', 'Minimalism', 'Luxury'],
  },
  {
    category: 'Communication',
    values: ['Directness', 'Emotional Expression', 'Active Listening', 'Humor', 'Deep Conversations'],
  },
  {
    category: 'Social',
    values: ['Socializing', 'Quiet Time', 'Large Groups', 'One-on-One', 'Community Involvement'],
  },
];

export const RELATIONSHIP_INTENTIONS = [
  { value: 'long-term', label: 'Long-term relationship', description: 'Looking for something serious' },
  { value: 'short-term', label: 'Short-term relationship', description: 'Keeping it casual' },
  { value: 'friendship', label: 'Friendship', description: 'Making new friends first' },
  { value: 'figuring-it-out', label: 'Figuring it out', description: 'Open to seeing where things go' },
] as const;

export const COMPATIBILITY_DIMENSIONS = [
  {
    name: 'Values Alignment',
    description: 'How well your core values and life priorities align',
  },
  {
    name: 'Lifestyle Compatibility',
    description: 'Compatibility in daily habits and lifestyle choices',
  },
  {
    name: 'Communication Style',
    description: 'How your communication preferences match',
  },
  {
    name: 'Interests Overlap',
    description: 'Shared hobbies and activities',
  },
  {
    name: 'Long-term Goals',
    description: 'Alignment in future plans and aspirations',
  },
];

export const DEV_MODE = import.meta.env.DEV;
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
