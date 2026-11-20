import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { Heart, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/hooks/useAuth';
import { APP_NAME, DEV_MODE } from '@/lib/constants';
import { DEV_AUTH_NOTICE } from '@/lib/mockData';

export function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/discover" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login({ email, password });
      navigate('/discover');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
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
                  Use any email and password to log in
                </p>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
            <p className="text-gray-600 mb-6">Log in to continue your journey</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
              />

              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
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

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                fullWidth
                size="lg"
                variant="primary"
                isLoading={isLoading}
              >
                Log In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="text-accent-600 hover:text-accent-700 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
