import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';

// Auth
import { LandingPage } from '@/features/auth/LandingPage';
import { LoginPage } from '@/features/auth/LoginPage';
import { SignupPage } from '@/features/auth/SignupPage';

// Onboarding
import { OnboardingPage } from '@/features/onboarding/OnboardingPage';

// Discovery
import { DiscoveryPage } from '@/features/discovery/DiscoveryPage';

// Matching
import { MatchesPage } from '@/features/matching/MatchesPage';

// Messaging
import { MessagesPage } from '@/features/messaging/MessagesPage';

// Profile
import { ProfilePage } from '@/features/profiles/ProfilePage';
import { SettingsPage } from '@/features/profiles/SettingsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/onboarding',
    element: (
      <ProtectedRoute>
        <OnboardingPage />
      </ProtectedRoute>
    ),
  },
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/discover',
        element: <DiscoveryPage />,
      },
      {
        path: '/matches',
        element: <MatchesPage />,
      },
      {
        path: '/messages',
        element: <MessagesPage />,
      },
      {
        path: '/messages/:matchId',
        element: <MessagesPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/settings',
        element: <SettingsPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
