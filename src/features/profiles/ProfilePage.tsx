import { MapPin, Edit, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';

export function ProfilePage() {
  const navigate = useNavigate();
  const { profile, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!profile) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card variant="bordered" className="text-center py-16">
          <p className="text-gray-600">Loading profile...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate('/settings')}>
            <Settings className="h-5 w-5 mr-2" />
            Settings
          </Button>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-5 w-5 mr-2" />
            Log Out
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Photo */}
        <div className="lg:col-span-1">
          <Card variant="bordered" className="overflow-hidden">
            <div className="aspect-[3/4] bg-gray-200 relative">
              <img
                src={profile.photos[0]?.url}
                alt={`${profile.firstName}'s profile`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <Button fullWidth variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Change Photo
              </Button>
            </div>
          </Card>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card variant="bordered">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {profile.firstName} {profile.lastName}, {profile.age}
                </h2>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {profile.location.city}, {profile.location.state}
                  </span>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">About</h3>
                <p className="text-gray-900">{profile.bio}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Looking for
                </h3>
                <p className="text-gray-900 capitalize">
                  {profile.relationshipIntention.replace('-', ' ')}
                </p>
              </div>
            </div>
          </Card>

          <Card variant="bordered">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Interests</h3>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </Card>

          <Card variant="bordered">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Values</h3>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
            <div className="space-y-3">
              {profile.values.map((value, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <span className="text-sm font-medium text-gray-900">
                      {value.name}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">
                      ({value.category})
                    </span>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${value.importance === 'high'
                        ? 'bg-red-100 text-red-700'
                        : value.importance === 'medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                  >
                    {value.importance}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card variant="bordered">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Lifestyle</h3>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Smoking:</span>
                <span className="ml-2 text-gray-900 font-medium">
                  {profile.lifestyle.smokingAttitude}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Drinking:</span>
                <span className="ml-2 text-gray-900 font-medium">
                  {profile.lifestyle.drinkingFrequency}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Exercise:</span>
                <span className="ml-2 text-gray-900 font-medium">
                  {profile.lifestyle.exerciseFrequency}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Pets:</span>
                <span className="ml-2 text-gray-900 font-medium">
                  {profile.lifestyle.petPreference}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Wants children:</span>
                <span className="ml-2 text-gray-900 font-medium">
                  {profile.lifestyle.wantsChildren}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Has children:</span>
                <span className="ml-2 text-gray-900 font-medium">
                  {profile.lifestyle.hasChildren}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
