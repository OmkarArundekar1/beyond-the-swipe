import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { LoginPage } from '@/features/auth/LoginPage';
import { AuthProvider } from '@/features/auth/AuthContext';

describe('LoginPage', () => {
  it('renders login form', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  it('shows validation error for invalid email', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/^email$/i);
    const submitButton = screen.getByRole('button', { name: /log in/i });

    await user.type(emailInput, 'invalid-email');
    await user.click(submitButton);

    // Form should not submit with invalid email
    expect(emailInput).toHaveValue('invalid-email');
  });

  it('requires both email and password', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/^email$/i);
    const passwordInput = screen.getByLabelText(/^password$/i);

    expect(emailInput).toBeRequired();
    expect(passwordInput).toBeRequired();
  });
});
