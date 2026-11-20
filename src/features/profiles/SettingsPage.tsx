import { ArrowLeft, User, Bell, Shield, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export function SettingsPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" onClick={() => navigate('/profile')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
      </div>

      <div className="space-y-4">
        <SettingSection
          icon={User}
          title="Account Settings"
          description="Manage your account information and preferences"
        />
        <SettingSection
          icon={Bell}
          title="Notifications"
          description="Configure how you receive notifications"
        />
        <SettingSection
          icon={Shield}
          title="Privacy & Safety"
          description="Control your privacy and safety settings"
        />
        <SettingSection
          icon={CreditCard}
          title="Subscription"
          description="Manage your subscription and billing"
          badge="Premium"
        />
      </div>

      <Card variant="bordered" className="mt-8 bg-red-50 border-red-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Danger Zone</h3>
        <p className="text-sm text-gray-600 mb-4">
          These actions are irreversible. Please be certain.
        </p>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            Deactivate Account
          </Button>
          <Button variant="destructive" size="sm">
            Delete Account
          </Button>
        </div>
      </Card>
    </div>
  );
}

function SettingSection({
  icon: Icon,
  title,
  description,
  badge,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  badge?: string;
}) {
  return (
    <Card variant="bordered" className="hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <Icon className="h-6 w-6 text-gray-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              {badge && (
                <span className="px-2 py-0.5 bg-accent-100 text-accent-700 text-xs font-medium rounded-full">
                  {badge}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
        <ArrowLeft className="h-5 w-5 text-gray-400 rotate-180" />
      </div>
    </Card>
  );
}
