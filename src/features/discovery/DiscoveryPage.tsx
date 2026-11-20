import { useState } from 'react';
import { Heart, X, MapPin, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { mockProfiles } from '@/lib/mockData';
import { DEV_MODE } from '@/lib/constants';

export function DiscoveryPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCompatibility, setShowCompatibility] = useState(false);

  const currentProfile = mockProfiles[currentIndex];
  const hasMoreProfiles = currentIndex < mockProfiles.length - 1;

  const handlePass = () => {
    if (hasMoreProfiles) {
      setCurrentIndex(currentIndex + 1);
      setShowCompatibility(false);
    }
  };

  const handleLike = () => {
    // In production, this would trigger a match check
    if (hasMoreProfiles) {
      setCurrentIndex(currentIndex + 1);
      setShowCompatibility(false);
    }
  };

  if (!currentProfile) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {DEV_MODE && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-yellow-800">
            Showing sample profiles for demonstration. Real profiles will be loaded from the backend.
          </p>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-2">
          <Card variant="elevated" className="overflow-hidden">
            {/* Profile Image */}
            <div className="relative aspect-[3/4] bg-gray-200">
              <img
                src={currentProfile.photos[0]?.url}
                alt={`${currentProfile.firstName}'s profile`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Profile Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h2 className="text-3xl font-bold mb-2">
                  {currentProfile.firstName}, {currentProfile.age}
                </h2>
                <div className="flex items-center gap-2 text-sm mb-3">
                  <MapPin className="h-4 w-4" />
                  <span>{currentProfile.location.city}, {currentProfile.location.state}</span>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">About</h3>
                <p className="text-gray-700">{currentProfile.bio}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {currentProfile.interests.map((interest) => (
                    <span
                      key={interest}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Looking for</h3>
                <p className="text-gray-700 capitalize">
                  {currentProfile.relationshipIntention.replace('-', ' ')}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-6 pt-0 flex gap-4">
              <Button
                variant="outline"
                size="lg"
                fullWidth
                onClick={handlePass}
                className="group"
              >
                <X className="h-5 w-5 mr-2 group-hover:text-red-600" />
                Pass
              </Button>
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleLike}
                className="group"
              >
                <Heart className="h-5 w-5 mr-2 group-hover:fill-current" />
                Express Interest
              </Button>
            </div>
          </Card>
        </div>

        {/* Compatibility Sidebar */}
        <div className="space-y-6">
          <Card variant="bordered">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-accent-500 to-accent-700 text-white text-3xl font-bold mb-3">
                {currentProfile.compatibility?.overall}%
              </div>
              <h3 className="text-xl font-semibold">Compatibility Score</h3>
            </div>

            <button
              onClick={() => setShowCompatibility(!showCompatibility)}
              className="w-full text-accent-600 hover:text-accent-700 font-medium text-sm"
            >
              {showCompatibility ? 'Hide' : 'Show'} detailed breakdown
            </button>

            {showCompatibility && currentProfile.compatibility && (
              <div className="mt-6 space-y-4 pt-6 border-t border-gray-200">
                {currentProfile.compatibility.dimensions.map((dimension) => (
                  <div key={dimension.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        {dimension.name}
                      </span>
                      <span className="text-sm font-semibold text-accent-600">
                        {dimension.score}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent-600 rounded-full transition-all"
                        style={{ width: `${dimension.score}%` }}
                      />
                    </div>
                  </div>
                ))}

                <div className="pt-4 mt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    {currentProfile.compatibility.explanation}
                  </p>
                </div>
              </div>
            )}
          </Card>

          <Card variant="bordered" className="bg-accent-50">
            <h3 className="font-semibold text-gray-900 mb-3">
              How compatibility works
            </h3>
            <p className="text-sm text-gray-700">
              Our algorithm analyzes multiple dimensions of compatibility based on values,
              lifestyle, interests, and long-term goals to help you find meaningful connections.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <Card variant="bordered" className="text-center py-16">
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="h-10 w-10 text-gray-400" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          No more profiles
        </h3>
        <p className="text-gray-600 mb-6">
          You've seen all available profiles for now. Check back later for new matches!
        </p>
        <Button variant="primary">Adjust Preferences</Button>
      </div>
    </Card>
  );
}
