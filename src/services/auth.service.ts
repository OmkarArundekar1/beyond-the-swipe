import type { User, Profile, LoginCredentials, SignupCredentials } from '@/types';

/**
 * DEVELOPMENT ONLY - Mock Authentication Service
 * This simulates authentication flow for UI development
 * Will be replaced with Supabase authentication in production
 */

const MOCK_USER: User = {
  id: 'current-user',
  email: 'demo@beyondtheswipe.com',
  createdAt: new Date().toISOString(),
};

const MOCK_PROFILE: Profile = {
  id: 'profile-current',
  userId: 'current-user',
  firstName: 'Alex',
  lastName: 'Smith',
  age: 27,
  gender: 'male',
  bio: 'Software developer who loves hiking and trying new restaurants.',
  location: {
    city: 'San Francisco',
    state: 'CA',
    country: 'USA',
  },
  photos: [
    { id: 'p0', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d', order: 1, isMain: true },
  ],
  interests: ['Technology', 'Hiking', 'Food', 'Music', 'Travel'],
  relationshipIntention: 'long-term',
  dealbreakers: ['smoking'],
  values: [
    { category: 'Core Values', name: 'Honesty', importance: 'high' },
    { category: 'Core Values', name: 'Ambition', importance: 'high' },
  ],
  lifestyle: {
    smokingAttitude: 'never',
    drinkingFrequency: 'socially',
    exerciseFrequency: 'regularly',
    dietaryPreferences: [],
    petPreference: 'dog-lover',
    wantsChildren: 'maybe',
    hasChildren: 'no',
  },
};

class AuthService {
  async login(credentials: LoginCredentials): Promise<{ user: User; profile: Profile }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Basic validation
    if (!credentials.email || !credentials.password) {
      throw new Error('Email and password are required');
    }

    // Mock successful login
    return {
      user: MOCK_USER,
      profile: MOCK_PROFILE,
    };
  }

  async signup(credentials: SignupCredentials): Promise<{ user: User }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Basic validation
    if (!credentials.email || !credentials.password) {
      throw new Error('Email and password are required');
    }

    if (credentials.password !== credentials.confirmPassword) {
      throw new Error('Passwords do not match');
    }

    // Mock successful signup
    return {
      user: MOCK_USER,
    };
  }

  async logout(): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // Clear any stored auth state
    localStorage.removeItem('auth_token');
  }

  async getCurrentUser(): Promise<User | null> {
    // In dev mode, check localStorage for mock auth
    const hasAuth = localStorage.getItem('auth_token');
    if (hasAuth === 'dev_authenticated') {
      return MOCK_USER;
    }
    return null;
  }

  async getCurrentProfile(): Promise<Profile | null> {
    const user = await this.getCurrentUser();
    if (user) {
      return MOCK_PROFILE;
    }
    return null;
  }

  setDevAuthenticated(authenticated: boolean): void {
    if (authenticated) {
      localStorage.setItem('auth_token', 'dev_authenticated');
    } else {
      localStorage.removeItem('auth_token');
    }
  }
}

export const authService = new AuthService();
