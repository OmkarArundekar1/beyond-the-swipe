import React, { createContext, useState, useEffect } from 'react';
import type { User, Profile, LoginCredentials, SignupCredentials } from '@/types';
import { authService } from '@/services/auth.service';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing authentication on mount
    const checkAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          const currentProfile = await authService.getCurrentProfile();
          setProfile(currentProfile);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const { user: loggedInUser, profile: userProfile } = await authService.login(credentials);
      setUser(loggedInUser);
      setProfile(userProfile);
      authService.setDevAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (credentials: SignupCredentials) => {
    setIsLoading(true);
    try {
      const { user: newUser } = await authService.signup(credentials);
      setUser(newUser);
      authService.setDevAuthenticated(true);
      // Profile will be created during onboarding
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
      setProfile(null);
      authService.setDevAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    profile,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
