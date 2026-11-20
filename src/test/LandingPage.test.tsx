import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LandingPage } from '@/features/auth/LandingPage';
import { AuthProvider } from '@/features/auth/AuthContext';

describe('LandingPage', () => {
  it('renders the landing page with main heading', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <LandingPage />
        </AuthProvider>
      </BrowserRouter>
    );

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/Dating that goes/i);
    expect(heading).toHaveTextContent(/beyond the swipe/i);
  });

  it('displays Get Started button', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <LandingPage />
        </AuthProvider>
      </BrowserRouter>
    );

    const getStartedButtons = screen.getAllByRole('button', { name: /get started/i });
    expect(getStartedButtons.length).toBeGreaterThan(0);
  });

  it('displays compatibility example section', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <LandingPage />
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(/How Compatibility Works/i)).toBeInTheDocument();
    expect(screen.getByText(/87%/)).toBeInTheDocument();
  });

  it('displays all feature cards', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <LandingPage />
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(/Compatibility First/i)).toBeInTheDocument();
    expect(screen.getByText(/Meaningful Matches/i)).toBeInTheDocument();
    expect(screen.getByText(/Safe & Respectful/i)).toBeInTheDocument();
    expect(screen.getByText(/Real Connections/i)).toBeInTheDocument();
  });
});
