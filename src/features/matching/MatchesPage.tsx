import { Heart, MapPin, MessageCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { mockMatches } from '@/lib/mockData';
import { formatDate } from '@/lib/utils';
import { DEV_MODE } from '@/lib/constants';

export function MatchesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Matches</h1>
        <p className="text-gray-600">People you've connected with</p>
      </div>

      {DEV_MODE && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-yellow-800">
            Showing sample matches for demonstration purposes
          </p>
        </div>
      )}

      {mockMatches.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockMatches.map((match) => {
            const otherProfile = match.profiles[1];
            return (
              <Card key={match.id} variant="bordered" className="hover:shadow-lg transition-shadow">
                <div className="relative aspect-[4/5] bg-gray-200 rounded-lg overflow-hidden mb-4">
                  <img
                    src={otherProfile.photos[0]?.url}
                    alt={`${otherProfile.firstName}'s profile`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1.5 bg-white/90 backdrop-blur rounded-full text-sm font-semibold text-accent-600">
                    {otherProfile.compatibility?.overall}% Match
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {otherProfile.firstName}, {otherProfile.age}
                </h3>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <MapPin className="h-4 w-4" />
                  <span>{otherProfile.location.city}</span>
                </div>

                <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                  {otherProfile.bio}
                </p>

                <div className="text-xs text-gray-500 mb-4">
                  Matched {formatDate(match.createdAt)}
                </div>

                <Link to={`/messages/${match.id}`}>
                  <Button fullWidth variant="primary">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </Link>
              </Card>
            );
          })}
        </div>
      )}
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
          No matches yet
        </h3>
        <p className="text-gray-600 mb-6">
          Start discovering profiles to find your first match!
        </p>
        <Link to="/discover">
          <Button variant="primary">Start Discovering</Button>
        </Link>
      </div>
    </Card>
  );
}
