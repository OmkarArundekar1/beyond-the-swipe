import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { Heart, Eye, EyeOff, AlertCircle, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/hooks/useAuth';
import { validateEmail, validatePassword } from '@/lib/utils';
import { APP_NAME, DEV_MODE } from '@/lib/constants';
import { DEV_AUTH_NOTICE } from '@/lib/mockData';

export function SignupPage() {
  const navigate = useNavigate();
  const { signup, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/onboarding" replace />;
  }

  const passwordValidation = validatePassword(password);
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Validate email
    if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate password
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.errors[0];
    }

    // Validate password match
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Validate age confirmation
    if (!ageConfirmed) {
      newErrors.age = 'You must confirm you are 18 years or older';
    }

    // Validate terms acceptance
    if (!termsAccepted) {
      newErrors.terms = 'You must accept the terms and privacy policy';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      await signup({ email, password, confirmPassword });
      navigate('/onboarding');
    } catch (err) {
      setErrors({
        form: err instanceof Error ? err.message : 'Signup failed',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col">
      <header className="px-4 py-6">
        <Link to="/" className="flex items-center gap-2 w-fit">
          <Heart className="h-8 w-8 text-accent-600" />
          <span className="text-2xl font-bold text-gray-900">{APP_NAME}</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {DEV_MODE && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-900">{DEV_AUTH_NOTICE}</p>
                <p className="text-sm text-yellow-700 mt-1">
                  Password validation is active for demonstration
                </p>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h1>
            <p className="text-gray-600 mb-6">Start your journey to meaningful connections</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                error={errors.email}
                required
                autoComplete="email"
              />

              <div className="space-y-2">
                <div className="relative">
                  <Input
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    error={errors.password}
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {password.length > 0 && (
                  <div className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 space-y-1.5">
                    <p className="text-xs font-medium text-gray-700 mb-1">Password requirements:</p>
                    <PasswordRequirement
                      met={password.length >= 8}
                      text="At least 8 characters"
                    />
                    <PasswordRequirement
                      met={/[A-Z]/.test(password)}
                      text="One uppercase letter"
                    />
                    <PasswordRequirement
                      met={/[a-z]/.test(password)}
                      text="One lowercase letter"
                    />
                    <PasswordRequirement
                      met={/[0-9]/.test(password)}
                      text="One number"
                    />
                  </div>
                )}
              </div>

              <div className="relative">
                <Input
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  error={errors.confirmPassword}
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
                {confirmPassword.length > 0 && (
                  <div className="absolute right-3 bottom-[-24px]">
                    {passwordsMatch ? (
                      <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                        <Check className="h-3.5 w-3.5" /> Passwords match
                      </span>
                    ) : (
                      <span className="text-xs text-red-600 font-medium flex items-center gap-1">
                        <X className="h-3.5 w-3.5" /> Passwords do not match
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-3 pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={ageConfirmed}
                    onChange={(e) => setAgeConfirmed(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-accent-600 focus:ring-accent-500"
                    aria-describedby="age-error"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">
                    I confirm that I am 18 years of age or older
                  </span>
                </label>
                {errors.age && (
                  <p id="age-error" className="text-xs text-red-600 ml-7">{errors.age}</p>
                )}

                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-accent-600 focus:ring-accent-500"
                    aria-describedby="terms-error"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">
                    I agree to the{' '}
                    <a href="/terms" className="text-accent-600 hover:text-accent-700 underline">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="/privacy" className="text-accent-600 hover:text-accent-700 underline">
                      Privacy Policy
                    </a>
                  </span>
                </label>
                {errors.terms && (
                  <p id="terms-error" className="text-xs text-red-600 ml-7">{errors.terms}</p>
                )}
              </div>

              {errors.form && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">{errors.form}</p>
                </div>
              )}

              <Button
                type="submit"
                fullWidth
                size="lg"
                variant="primary"
                isLoading={isLoading}
              >
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-accent-600 hover:text-accent-700 font-medium">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function PasswordRequirement({ met, text }: { met: boolean; text: string }) {
  return (
    <div className="flex items-center gap-2">
      {met ? (
        <Check className="h-3.5 w-3.5 text-green-600 flex-shrink-0" />
      ) : (
        <X className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
      )}
      <span className={`text-xs ${met ? 'text-green-600' : 'text-gray-600'}`}>
        {text}
      </span>
    </div>
  );
}
