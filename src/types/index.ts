// User and Profile Types
export interface User {
  id: string;
  email: string;
  createdAt: string;
}

export interface Profile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: Gender;
  bio: string;
  location: Location;
  photos: Photo[];
  interests: string[];
  relationshipIntention: RelationshipIntention;
  dealbreakers: string[];
  values: ProfileValue[];
  lifestyle: LifestylePreferences;
  compatibility?: CompatibilityScore;
}

export type Gender = 'male' | 'female' | 'non-binary' | 'other' | 'prefer-not-to-say';

export type RelationshipIntention = 
  | 'long-term' 
  | 'short-term' 
  | 'friendship' 
  | 'figuring-it-out';

export interface Location {
  city: string;
  state: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

export interface Photo {
  id: string;
  url: string;
  order: number;
  isMain: boolean;
}

export interface ProfileValue {
  category: string;
  name: string;
  importance: 'low' | 'medium' | 'high';
}

export interface LifestylePreferences {
  smokingAttitude: string;
  drinkingFrequency: string;
  exerciseFrequency: string;
  dietaryPreferences: string[];
  petPreference: string;
  wantsChildren: string;
  hasChildren: string;
}

// Compatibility Types
export interface CompatibilityScore {
  overall: number;
  dimensions: CompatibilityDimension[];
  explanation: string;
}

export interface CompatibilityDimension {
  name: string;
  score: number;
  weight: number;
  description: string;
}

// Matching Types
export interface Match {
  id: string;
  profiles: [Profile, Profile];
  compatibility: CompatibilityScore;
  status: MatchStatus;
  createdAt: string;
  lastMessageAt?: string;
}

export type MatchStatus = 'pending' | 'active' | 'expired' | 'unmatched';

// Messaging Types
export interface Message {
  id: string;
  matchId: string;
  senderId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  matchId: string;
  otherProfile: Profile;
  lastMessage?: Message;
  unreadCount: number;
}

// Onboarding Types
export interface OnboardingState {
  currentStep: number;
  totalSteps: number;
  completed: boolean;
  data: Partial<OnboardingData>;
}

export interface OnboardingData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: Gender;
  location: Location;
  bio: string;
  interests: string[];
  relationshipIntention: RelationshipIntention;
  photos: File[];
  values: ProfileValue[];
  lifestyle: LifestylePreferences;
}

// Auth Types
export interface AuthState {
  user: User | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  confirmPassword: string;
}

// API Response Types
export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  success: boolean;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}
