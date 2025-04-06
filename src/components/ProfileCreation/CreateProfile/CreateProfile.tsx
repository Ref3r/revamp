"use client";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import ProgressBarComponent from "../ProgressBar/ProgressBar";
import SocialConnect from "@/components/ProfileCreation/SocialConnect/SocilaConnect";
import InstagramTemplates from "@/components/ProfileCreation/SocialTemplates/Templates";
import CommunityList from "@/components/ProfileCreation/SocialTribes/SocilaTribes";
import { useRouter } from "next/navigation";
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@lemonsqueezy/wedges";
import ProfileCreationLoader from "../loader/ProfileCreationLoader";

// We'll keep this for other API calls, but not use it directly for profile update
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function CreateProfile() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [availableNiches, setAvailableNiches] = useState<string[]>([]);
  const [isNichesLoading, setIsNichesLoading] = useState(false);
  const [nichesError, setNichesError] = useState("");
  const [updateError, setUpdateError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    website: "",
    niche: [] as string[],
    profilePicture: null as File | null,
  });

  // Fetch available niches when component mounts
  useEffect(() => {
    const fetchNiches = async () => {
      setIsNichesLoading(true);
      setNichesError("");
      try {
        const response = await fetch(
          `${API_URL}/api/v1/users/niches/available`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch niches");
        }
        const data = await response.json();
        setAvailableNiches(data.niches || []);
      } catch (error) {
        console.error("Error fetching niches:", error);
        setNichesError("Failed to load niches. Please try again later.");
        // Set some default niches as fallback
        setAvailableNiches([
          "Travel",
          "Finance",
          "Web3/crypto",
          "Education",
          "Tech",
          "Blogging",
        ]);
      } finally {
        setIsNichesLoading(false);
      }
    };

    fetchNiches();
  }, []);

  const stepTitles = [
    "Create your profile",
    "Bring your socials to Ref3r",
    "Select templates for your Socials",
    "Follow your tribe",
  ];

  const uploadProfilePicture = async (file: File): Promise<string> => {
    // TODO: Implement actual file upload to your storage service
    // This is a placeholder that returns a dummy URL
    // You should implement proper file upload to your storage service (S3, etc.)
    return new Promise((resolve) => {
      // Simulating file upload delay
      setTimeout(() => {
        resolve("https://example.com/profile.jpg");
      }, 1000);
    });
  };

  const updateUserProfile = async () => {
    try {
      setUpdateError("");
      let profilePictureUrl = "";

      // Upload profile picture if exists
      if (formData.profilePicture) {
        profilePictureUrl = await uploadProfilePicture(formData.profilePicture);
      }

      // Debug: Check if token exists
      const authToken = localStorage.getItem("auth_token");
      console.log("Auth token exists:", !!authToken);

      if (!authToken) {
        setUpdateError(
          "You are not logged in. Please log in to update your profile."
        );
        throw new Error("Authentication token is missing");
      }

      // Use our proxy API instead of directly calling the backend
      const response = await fetch("/api/proxy/updateProfile", {
        method: "POST", // Changed from PUT to POST to match our proxy API
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          name: formData.name,
          bio: formData.bio,
          profilePicture: profilePictureUrl,
          websiteUrl: formData.website,
          niches: formData.niche,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error("Profile update API error:", responseData);
        throw new Error(responseData.message || "Failed to update profile");
      }

      return responseData;
    } catch (error) {
      console.error("Profile update error:", error);
      setUpdateError(
        error instanceof Error ? error.message : "Failed to update profile"
      );
      throw error;
    }
  };

  const handleNext = async () => {
    if (step < 4) {
      const newStep = step + 1;
      setStep(newStep);

      switch (newStep) {
        case 2:
          setProgress(40);
          break;
        case 3:
          setProgress(70);
          break;
        case 4:
          setProgress(100);
          break;
      }
    } else if (step === 4) {
      setIsLoading(true);
      try {
        await updateUserProfile();
        // Redirect to dashboard after successful profile update
        router.push("/dashboard");
      } catch (error) {
        setIsLoading(false);
        // Error is already set in updateUserProfile
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      const newStep = step - 1;
      setStep(newStep);

      switch (newStep) {
        case 1:
          setProgress(10);
          break;
        case 2:
          setProgress(40);
          break;
        case 3:
          setProgress(70);
          break;
      }
    }
  };

  const handleFileChange = (e: any) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const file = target.files[0];
      setFormData({ ...formData, profilePicture: file });

      console.log("Selected File:", {
        name: file.name,
        type: file.type,
        size: file.size,
      });
    }
  };

  const renderStepContent = () => {
    if (isLoading) {
      return <ProfileCreationLoader />;
    }

    switch (step) {
      case 1:
        return (
          <div className="max-w-md mx-auto space-y-8">
            <div className="mb-12">
              <h2 className="text-[#FFFFFF] text-base mb-4 text-left">
                Upload your PFP
              </h2>
              <div className="flex items-center gap-6">
                <div className="relative w-32 h-32">
                  <Input
                    id="fileInput"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleFileChange}
                    className="hidden"
                    required={true}
                  />
                  <div
                    className="absolute inset-0 rounded-full border border-dashed border-[#333333] flex items-center justify-center flex-col cursor-pointer bg-[#111111] hover:bg-[#1a1a1a] transition-colors"
                    onClick={() =>
                      document.getElementById("fileInput")?.click()
                    }
                  >
                    {formData.profilePicture ? (
                      <img
                        src={URL.createObjectURL(formData.profilePicture)}
                        alt="Selected"
                        className="rounded-full w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-[#4D4D4D] text-sm text-center">
                        PNGs, JPGs
                      </span>
                    )}
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="bg-white text-black hover:bg-gray-100 rounded-lg px-6 py-2 text-sm border-0"
                  onClick={() => document.getElementById("fileInput")?.click()}
                >
                  Select Image
                </Button>
              </div>
            </div>

            <div className="space-y-6 text-left">
              <div>
                <Label htmlFor="name" className="text-[#FFFFFF] mb-2 block">
                  Name
                </Label>
                <Input
                  required
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: (e.target as HTMLInputElement).value,
                    })
                  }
                  placeholder="John Doe"
                  className="w-full bg-[#111111] border border-[#333333] text-white py-3 px-4 rounded-lg focus:ring-[#0BA360] focus:border-[#0BA360]"
                />
              </div>

              <div>
                <Label htmlFor="bio" className="text-[#FFFFFF] mb-2 block">
                  Your Bio
                </Label>
                <Textarea
                  required
                  id="bio"
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bio: (e.target as HTMLInputElement).value,
                    })
                  }
                  placeholder="Write some interesting stuff about you"
                  className="w-full bg-[#111111] border border-[#333333] text-white py-3 px-4 rounded-lg min-h-[120px] resize-none focus:ring-[#0BA360] focus:border-[#0BA360]"
                />
              </div>

              <div>
                <Label htmlFor="website" className="text-[#FFFFFF] mb-2 block">
                  Website URL
                </Label>
                <Input
                  required
                  type="text"
                  id="website"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      website: (e.target as HTMLInputElement).value,
                    })
                  }
                  placeholder="http://www.example.com"
                  className="w-full bg-[#111111] border border-[#333333] text-white py-3 px-4 rounded-lg focus:ring-[#0BA360] focus:border-[#0BA360]"
                />
              </div>

              <div>
                <Label htmlFor="niche" className="text-[#FFFFFF] mb-2 block">
                  Your niche
                </Label>
                {nichesError && (
                  <div className="text-red-500 text-sm mb-2">{nichesError}</div>
                )}
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, niche: [value] })
                  }
                  disabled={isNichesLoading}
                >
                  <SelectTrigger className="w-full py-3 px-4 bg-[#111111] border border-[#333333] text-[#FFFFFF] rounded-lg flex justify-between items-center">
                    <SelectValue
                      placeholder={
                        isNichesLoading ? "Loading..." : "Select your niche"
                      }
                    />
                    <ChevronDown className="h-5 w-5" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1E1E1E] border border-[#333333] rounded-lg text-white">
                    <SelectGroup>
                      {availableNiches.map((item) => (
                        <SelectItem
                          key={item}
                          value={item}
                          className="text-white"
                        >
                          {item}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
      case 2:
        return <SocialConnect onConnect={() => setProgress(40)} />;
      case 3:
        return <InstagramTemplates onSelect={() => setProgress(70)} />;
      case 4:
        return <CommunityList onFollow={() => setProgress(100)} />;
      default:
        return null;
    }
  };

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

          <div className="max-w-md mx-auto flex flex-col gap-5 mt-6">
            <Button
              className="w-full bg-gradient-to-r from-[#0BA360] to-[#27A980] hover:from-[#27A980] hover:to-[#0BA360] text-white py-3 rounded-lg"
              onClick={handleNext}
              disabled={isLoading}
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
                disabled={isLoading}
              >
                Go Back
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
