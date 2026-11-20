import type { Profile, Match, Message } from '@/types';

/**
 * DEVELOPMENT ONLY - Mock data for UI development
 * This will be replaced with real API calls in production
 */

export const mockProfiles: Profile[] = [
  {
    id: '1',
    userId: 'user-1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    age: 28,
    gender: 'female',
    bio: 'Adventure seeker and coffee enthusiast. Love exploring new places and deep conversations about life, philosophy, and everything in between.',
    location: {
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
    },
    photos: [
      { id: 'p1', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330', order: 1, isMain: true },
    ],
    interests: ['Travel', 'Reading', 'Coffee', 'Hiking', 'Photography'],
    relationshipIntention: 'long-term',
    dealbreakers: ['smoking'],
    values: [
      { category: 'Core Values', name: 'Honesty', importance: 'high' },
      { category: 'Lifestyle', name: 'Adventure', importance: 'high' },
    ],
    lifestyle: {
      smokingAttitude: 'never',
      drinkingFrequency: 'socially',
      exerciseFrequency: 'regularly',
      dietaryPreferences: ['vegetarian'],
      petPreference: 'dog-lover',
      wantsChildren: 'yes',
      hasChildren: 'no',
    },
    compatibility: {
      overall: 87,
      dimensions: [
        { name: 'Values Alignment', score: 92, weight: 0.3, description: 'Strong alignment' },
        { name: 'Lifestyle Compatibility', score: 85, weight: 0.25, description: 'Very compatible' },
        { name: 'Communication Style', score: 88, weight: 0.2, description: 'Great match' },
        { name: 'Interests Overlap', score: 80, weight: 0.15, description: 'Good overlap' },
        { name: 'Long-term Goals', score: 90, weight: 0.1, description: 'Aligned goals' },
      ],
      explanation: 'You both prioritize honesty and adventure, with compatible lifestyle choices and strong communication alignment.',
    },
  },
  {
    id: '2',
    userId: 'user-2',
    firstName: 'Emily',
    lastName: 'Chen',
    age: 26,
    gender: 'female',
    bio: 'Tech professional by day, aspiring chef by night. Looking for someone who appreciates good food and meaningful conversations.',
    location: {
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
    },
    photos: [
      { id: 'p2', url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80', order: 1, isMain: true },
    ],
    interests: ['Cooking', 'Technology', 'Food', 'Wine', 'Travel'],
    relationshipIntention: 'long-term',
    dealbreakers: [],
    values: [
      { category: 'Core Values', name: 'Ambition', importance: 'high' },
      { category: 'Lifestyle', name: 'Stability', importance: 'medium' },
    ],
    lifestyle: {
      smokingAttitude: 'never',
      drinkingFrequency: 'occasionally',
      exerciseFrequency: 'sometimes',
      dietaryPreferences: [],
      petPreference: 'cat-lover',
      wantsChildren: 'maybe',
      hasChildren: 'no',
    },
    compatibility: {
      overall: 82,
      dimensions: [
        { name: 'Values Alignment', score: 85, weight: 0.3, description: 'Good alignment' },
        { name: 'Lifestyle Compatibility', score: 78, weight: 0.25, description: 'Compatible' },
        { name: 'Communication Style', score: 82, weight: 0.2, description: 'Good match' },
        { name: 'Interests Overlap', score: 75, weight: 0.15, description: 'Some overlap' },
        { name: 'Long-term Goals', score: 88, weight: 0.1, description: 'Similar goals' },
      ],
      explanation: 'You share similar ambitions and communication styles, with good lifestyle compatibility.',
    },
  },
  {
    id: '3',
    userId: 'user-3',
    firstName: 'Jessica',
    lastName: 'Martinez',
    age: 30,
    gender: 'female',
    bio: 'Yoga instructor and wellness advocate. Passionate about mindful living, nature, and helping others find their balance.',
    location: {
      city: 'Oakland',
      state: 'CA',
      country: 'USA',
    },
    photos: [
      { id: 'p3', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb', order: 1, isMain: true },
    ],
    interests: ['Yoga', 'Meditation', 'Hiking', 'Volunteering', 'Reading'],
    relationshipIntention: 'long-term',
    dealbreakers: ['smoking', 'excessive-drinking'],
    values: [
      { category: 'Core Values', name: 'Kindness', importance: 'high' },
      { category: 'Lifestyle', name: 'Minimalism', importance: 'high' },
    ],
    lifestyle: {
      smokingAttitude: 'never',
      drinkingFrequency: 'rarely',
      exerciseFrequency: 'daily',
      dietaryPreferences: ['vegan'],
      petPreference: 'any',
      wantsChildren: 'yes',
      hasChildren: 'no',
    },
    compatibility: {
      overall: 75,
      dimensions: [
        { name: 'Values Alignment', score: 80, weight: 0.3, description: 'Good alignment' },
        { name: 'Lifestyle Compatibility', score: 70, weight: 0.25, description: 'Some differences' },
        { name: 'Communication Style', score: 78, weight: 0.2, description: 'Compatible' },
        { name: 'Interests Overlap', score: 65, weight: 0.15, description: 'Moderate overlap' },
        { name: 'Long-term Goals', score: 82, weight: 0.1, description: 'Aligned goals' },
      ],
      explanation: 'You share core values of kindness and wellness, though lifestyle preferences differ in some areas.',
    },
  },
];

export const mockMatches: Match[] = [
  {
    id: 'm1',
    profiles: [mockProfiles[0], mockProfiles[1]],
    compatibility: mockProfiles[0].compatibility!,
    status: 'active',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    lastMessageAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
];

export const mockMessages: Message[] = [
  {
    id: 'msg1',
    matchId: 'm1',
    senderId: 'user-1',
    content: 'Hi! I noticed we both love coffee. Have you tried that new cafe on Valencia?',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
  {
    id: 'msg2',
    matchId: 'm1',
    senderId: 'current-user',
    content: 'Not yet! I\'ve been meaning to check it out. Would you like to go together?',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
];

export const DEV_AUTH_NOTICE = '⚠️ Development Mode: Authentication is mocked';
