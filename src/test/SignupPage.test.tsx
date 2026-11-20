import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { SignupPage } from '@/features/auth/SignupPage';
import { AuthProvider } from '@/features/auth/AuthContext';

describe('SignupPage', () => {
  it('renders signup form', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <SignupPage />
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });

  it('shows password requirements when typing', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <AuthProvider>
          <SignupPage />
        </AuthProvider>
      </BrowserRouter>
    );

    const passwordInput = screen.getByLabelText(/^password$/i);
    await user.type(passwordInput, 'test');

    expect(screen.getByText(/at least 8 characters/i)).toBeInTheDocument();
    expect(screen.getByText(/one uppercase letter/i)).toBeInTheDocument();
    expect(screen.getByText(/one lowercase letter/i)).toBeInTheDocument();
    expect(screen.getByText(/one number/i)).toBeInTheDocument();
  });

  it('requires age confirmation', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <SignupPage />
        </AuthProvider>
      </BrowserRouter>
    );

    const ageCheckbox = screen.getByRole('checkbox', { name: /18 years of age or older/i });
    expect(ageCheckbox).toBeInTheDocument();
    expect(ageCheckbox).not.toBeChecked();
  });

  it('requires terms acceptance', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <SignupPage />
        </AuthProvider>
      </BrowserRouter>
    );

    const termsCheckbox = screen.getByRole('checkbox', { name: /terms of service/i });
    expect(termsCheckbox).toBeInTheDocument();
    expect(termsCheckbox).not.toBeChecked();
  });

  it('has links to Terms of Service and Privacy Policy', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <SignupPage />
        </AuthProvider>
      </BrowserRouter>
    );

    const termsLink = screen.getByRole('link', { name: /terms of service/i });
    const privacyLink = screen.getByRole('link', { name: /privacy policy/i });

    expect(termsLink).toBeInTheDocument();
    expect(privacyLink).toBeInTheDocument();
  });
});
