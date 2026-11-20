import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { INTERESTS, RELATIONSHIP_INTENTIONS, DEV_MODE } from '@/lib/constants';
import { DEV_AUTH_NOTICE } from '@/lib/mockData';

const TOTAL_STEPS = 4;

export function OnboardingPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    bio: '',
    interests: [] as string[],
    relationshipIntention: '',
  });

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      navigate('/discover');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field: string, value: unknown) => {
    setFormData({ ...formData, [field]: value });
  };

  const toggleInterest = (interest: string) => {
    const newInterests = formData.interests.includes(interest)
      ? formData.interests.filter((i) => i !== interest)
      : [...formData.interests, interest];
    updateFormData('interests', newInterests);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName && formData.dateOfBirth;
      case 2:
        return formData.bio.length >= 50;
      case 3:
        return formData.interests.length >= 3;
      case 4:
        return formData.relationshipIntention;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {DEV_MODE && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-900">{DEV_AUTH_NOTICE}</p>
              <p className="text-sm text-yellow-700 mt-1">
                Data is stored locally and not persisted
              </p>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep} of {TOTAL_STEPS}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round((currentStep / TOTAL_STEPS) * 100)}% complete
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent-600 transition-all duration-300"
              style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Let's start with the basics
              </h2>
              <p className="text-gray-600 mb-8">Tell us a bit about yourself</p>

              <div className="space-y-5">
                <Input
                  label="First Name"
                  value={formData.firstName}
                  onChange={(e) => updateFormData('firstName', e.target.value)}
                  placeholder="Enter your first name"
                  required
                />
                <Input
                  label="Last Name"
                  value={formData.lastName}
                  onChange={(e) => updateFormData('lastName', e.target.value)}
                  placeholder="Enter your last name"
                  required
                />
                <Input
                  label="Date of Birth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Tell your story
              </h2>
              <p className="text-gray-600 mb-8">
                Write a bio that shows who you are (minimum 50 characters)
              </p>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Bio
                </label>
                <textarea
                  className="w-full h-40 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-600 resize-none"
                  placeholder="Share what makes you unique, your passions, what you're looking for..."
                  value={formData.bio}
                  onChange={(e) => updateFormData('bio', e.target.value)}
                />
                <p className="mt-2 text-sm text-gray-500">
                  {formData.bio.length} / 50 characters minimum
                </p>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                What are your interests?
              </h2>
              <p className="text-gray-600 mb-8">
                Select at least 3 interests that describe you
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {INTERESTS.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-4 py-3 rounded-lg border-2 transition-colors ${
                      formData.interests.includes(interest)
                        ? 'border-accent-600 bg-accent-50 text-accent-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                What are you looking for?
              </h2>
              <p className="text-gray-600 mb-8">
                Help us understand your relationship intentions
              </p>

              <div className="space-y-3">
                {RELATIONSHIP_INTENTIONS.map((intention) => (
                  <button
                    key={intention.value}
                    type="button"
                    onClick={() =>
                      updateFormData('relationshipIntention', intention.value)
                    }
                    className={`w-full p-4 rounded-lg border-2 text-left transition-colors ${
                      formData.relationshipIntention === intention.value
                        ? 'border-accent-600 bg-accent-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="font-semibold text-gray-900">
                      {intention.label}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {intention.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </Button>
          <Button onClick={handleNext} disabled={!isStepValid()}>
            {currentStep === TOTAL_STEPS ? 'Complete' : 'Next'}
            {currentStep < TOTAL_STEPS && <ArrowRight className="h-5 w-5 ml-2" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
