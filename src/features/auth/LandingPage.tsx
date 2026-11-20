import { Link, Navigate } from 'react-router-dom';
import { Heart, Target, Shield, Sparkles, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { APP_NAME, APP_DESCRIPTION } from '@/lib/constants';

export function LandingPage() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/discover" replace />;
  }

  const scrollToCompatibility = () => {
    const section = document.getElementById('compatibility-section');
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <header className="px-4 py-6 sm:px-6 lg:px-8">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-accent-600" />
            <span className="text-2xl font-bold text-gray-900">{APP_NAME}</span>
          </div>
          <div className="flex gap-3">
            <Link to="/login">
              <Button variant="ghost">Log In</Button>
            </Link>
            <Link to="/signup">
              <Button variant="primary">Sign Up</Button>
            </Link>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 leading-tight">
              Dating that goes
              <span className="block text-accent-600">beyond the swipe</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-6 max-w-3xl mx-auto leading-relaxed">
              {APP_DESCRIPTION}. Find meaningful connections based on what truly matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/signup" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  variant="primary" 
                  className="w-full sm:w-auto"
                >
                  Get Started
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto"
                onClick={scrollToCompatibility}
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Compatibility Preview */}
        <section id="compatibility-section" className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-10 border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                How Compatibility Works
              </h2>
              <p className="text-gray-600 text-lg">
                We go beyond surface-level matching to analyze what truly matters
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-6">
              {/* Left: Profile Preview */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Target className="h-5 w-5 text-accent-600" />
                    Shared Interests
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {['Hiking', 'Coffee', 'Travel', 'Reading', 'Music'].map((interest) => (
                      <span
                        key={interest}
                        className="px-3 py-1.5 bg-accent-50 text-accent-700 rounded-full text-sm font-medium border border-accent-100"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-accent-600" />
                    Core Values
                  </h3>
                  <div className="space-y-2">
                    {['Honesty', 'Ambition', 'Kindness'].map((value) => (
                      <div key={value} className="flex items-center gap-2 text-gray-700">
                        <Check className="h-5 w-5 text-accent-600 font-bold" />
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Heart className="h-5 w-5 text-accent-600" />
                    Relationship Goals
                  </h3>
                  <p className="text-gray-700 font-medium">Both seeking a long-term relationship</p>
                </div>
              </div>

              {/* Right: Compatibility Score */}
              <div className="flex flex-col justify-center items-center bg-gradient-to-br from-accent-50 via-primary-50 to-accent-50 rounded-xl p-8">
                <div className="text-center">
                  {/* Circular Progress Indicator */}
                  <div className="relative inline-flex items-center justify-center mb-4">
                    <svg className="w-40 h-40 transform -rotate-90">
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="#f95980"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray="440"
                        strokeDashoffset="57"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-5xl font-bold text-gray-900">87%</span>
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    Compatibility Score
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                    Strong alignment in values and lifestyle, with shared interests and compatible long-term goals
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center text-sm text-gray-500 italic pt-4 border-t border-gray-200">
              * Illustrative example showing how our compatibility algorithm works
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={Target}
              title="Compatibility First"
              description="Our algorithm focuses on deep compatibility across values, lifestyle, and goals."
            />
            <FeatureCard
              icon={Sparkles}
              title="Meaningful Matches"
              description="Connect with people who align with what you're truly looking for."
            />
            <FeatureCard
              icon={Shield}
              title="Safe & Respectful"
              description="Built with safety and respect at the core of every interaction."
            />
            <FeatureCard
              icon={Heart}
              title="Real Connections"
              description="Move past surface-level and find relationships that matter."
            />
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-white py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-12">
              <Step
                number="1"
                title="Share Your Values"
                description="Tell us what matters most to you in a relationship and what you're looking for."
              />
              <Step
                number="2"
                title="Discover Compatible Matches"
                description="We'll show you profiles with detailed compatibility scores and explanations."
              />
              <Step
                number="3"
                title="Connect Meaningfully"
                description="Express interest in profiles that resonate, and start conversations that matter."
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="bg-primary-800 rounded-2xl p-10 sm:p-12 text-center text-white shadow-xl">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to find your match?</h2>
            <p className="text-lg sm:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of people finding meaningful connections
            </p>
            <Link to="/signup">
              <Button 
                size="lg" 
                className="bg-white text-primary-800 hover:bg-gray-100 font-semibold px-8"
              >
                Create Your Profile
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="h-6 w-6" />
              <span className="text-xl font-semibold">{APP_NAME}</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2024 {APP_NAME}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-100 mb-4">
        <Icon className="h-8 w-8 text-accent-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent-600 text-white font-bold text-xl mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
