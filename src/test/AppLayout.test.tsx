import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { AuthProvider } from '@/features/auth/AuthContext';

describe('AppLayout', () => {
  it('renders main navigation', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<AppLayout />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    );

    // Check for navigation items
    expect(screen.getByText(/Beyond the Swipe/i)).toBeInTheDocument();
  });

  it('displays mobile navigation items', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<AppLayout />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    );

    // Check for mobile nav items
    const discoverLinks = screen.getAllByText(/discover/i);
    const matchesLinks = screen.getAllByText(/matches/i);
    const messagesLinks = screen.getAllByText(/messages/i);
    const profileLinks = screen.getAllByText(/profile/i);

    expect(discoverLinks.length).toBeGreaterThan(0);
    expect(matchesLinks.length).toBeGreaterThan(0);
    expect(messagesLinks.length).toBeGreaterThan(0);
    expect(profileLinks.length).toBeGreaterThan(0);
  });
});
