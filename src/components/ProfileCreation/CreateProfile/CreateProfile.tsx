"use client";
import { useEffect, useState } from "react";
import ProgressBarComponent from "../ProgressBar/ProgressBar";
import SocialConnect from "@/components/ProfileCreation/SocialConnect/SocilaConnect";
import InstagramTemplates from "@/components/ProfileCreation/SocialTemplates/Templates";
import CommunityList from "@/components/ProfileCreation/SocialTribes/SocilaTribes";
import { useRouter } from "next/navigation";
import ProfileCreationLoader from "../loader/ProfileCreationLoader";
import UserInfoForm from "../UserInfoForm";
import { useOnboardingStep } from "@/hooks/useOnboardingStep";
import { Loader } from "lucide-react";
import { ONBOARDING_STEPS } from "@/services/onboardingService";


export default function CreateProfile() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [updateError, setUpdateError] = useState("");

  const { data: onboardingStep, isLoading: isOnboardingStepLoading } = useOnboardingStep();

  const stepTitles = [
    "Create your profile",
    "Bring your socials to Ref3r",
    "Select templates for your Socials",
    "Follow your tribe",
  ];

  useEffect(() => {
    const onboardingStepTitle = onboardingStep?.onboardingStep;

    if (onboardingStepTitle === ONBOARDING_STEPS.REGISTRATION) {
      setStep(1);
    } else if (onboardingStepTitle === ONBOARDING_STEPS.PROFILE_INFO) {
      setStep(2);
    } else if (onboardingStepTitle === ONBOARDING_STEPS.SOCIAL_ACCOUNTS) {
      setStep(3);
    } else if (onboardingStepTitle === ONBOARDING_STEPS.TEMPLATE) {
      setStep(4);
    } else if (onboardingStepTitle === ONBOARDING_STEPS.FOLLOW) {
      setStep(5);
    } else if (onboardingStepTitle === ONBOARDING_STEPS.COMPLETED) {
      router.push('/dashboard');
    }
  }, [onboardingStep]);

  const getProgress = () => {
    switch (step) {
      case 1:
        return 10;
      case 2:
        return 40;
      case 3:
        return 70;
      case 4:
        return 100;
      default:
        return 0;
    }
  }

  const progress = getProgress();

  const renderStepContent = () => {
    if (isLoading) {
      return <ProfileCreationLoader />;
    }

    switch (step) {
      case 1:
        return (
          <UserInfoForm
            onSuccess={() => {
              setStep((prev) => prev + 1);
            }}
            onError={() => setUpdateError("Failed to update profile")}
          />
        );
      case 2:
        return <SocialConnect  onSuccess={() => {
          setStep((prev) => prev + 1);
        }}
        onError={() => setUpdateError("Failed to process social accounts")} />;
      case 3:
        return <InstagramTemplates   onSuccess={() => {
          setStep((prev) => prev + 1);
        }}
        onError={() => setUpdateError("Failed to select templates")} />;
      case 4:
        return <CommunityList onFollow={() => setStep(5)} />;
      default:
        return null;
    }
  };

  if (isOnboardingStepLoading) {
    return (
      <div className="min-h-screen bg-[#0E0E0E] flex flex-col items-center justify-center">
        <Loader className="animate-spin text-white text-4xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0E0E0E] flex flex-col">
      {isLoading ? (
        <ProfileCreationLoader />
      ) : (
        <div className="w-full max-w-6xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-[#FFFFFF] text-4xl font-semibold mb-6">
              {stepTitles[step - 1]}
            </h1>
            <ProgressBarComponent progress={progress} />
          </div>

          {updateError && (
            <div className="max-w-md mx-auto mb-4">
              <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-3">
                {updateError}
              </div>
            </div>
          )}

          {renderStepContent()}

          {/* <div className="max-w-md mx-auto flex flex-col gap-5 mt-6">
            <Button
              className="w-full bg-gradient-to-r from-[#0BA360] to-[#27A980] hover:from-[#27A980] hover:to-[#0BA360] text-white py-3 rounded-lg"
              onClick={handleNext}
              disabled={isLoading || isUploading}
            >
              {step === 4
                ? isLoading
                  ? "Updating Profile..."
                  : "Complete Profile"
                : "Next"}
            </Button>

            {step > 1 && (
              <Button
                className="w-full bg-[#262626] hover:bg-[#4D4D4D] text-white py-3 rounded-lg"
                onClick={handleBack}
                disabled={isLoading || isUploading}
              >
                Go Back
              </Button>
            )}
          </div> */}
        </div>
      )}
    </div>
  );
}
