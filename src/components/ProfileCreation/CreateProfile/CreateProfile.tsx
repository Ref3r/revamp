"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ProgressBarComponent from "../ProgressBar/ProgressBar";
import SocialConnect from "@/components/ProfileCreation/SocialConnect/SocilaConnect";
import InstagramTemplates from "@/components/ProfileCreation/SocialTemplates/Templates";
import CommunityList from "@/components/ProfileCreation/SocialTribes/SocilaTribes";
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

export default function CreateProfile() {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    website: "",
    niche: [] as string[],
    profilePicture: null as File | null,
  });

  const stepTitles = [
    "Create your profile",
    "Bring your socials to Ref3r",
    "Select templates for your Socials",
    "Follow your tribe",
  ];

  const handleNext = () => {
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
      console.log("Form Data:", formData);

      setIsLoading(true);
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
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, niche: [value] })
                  }
                >
                  <SelectTrigger className="w-full py-3 px-4 bg-[#111111] border border-[#333333] text-[#FFFFFF] rounded-lg flex justify-between items-center">
                    <SelectValue placeholder="Select" />
                    <ChevronDown className="h-5 w-5" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1E1E1E] border border-[#333333] rounded-lg text-white">
                    <SelectGroup>
                      {[
                        "Travel",
                        "Finance",
                        "Web3/crypto",
                        "Education",
                        "Tech",
                        "Blogging",
                      ].map((item) => (
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
        // @ts-ignore
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

          {renderStepContent()}

          <div className="max-w-md mx-auto flex flex-col gap-5 mt-6">
            <Button
              className="w-full bg-gradient-to-r from-[#0BA360] to-[#27A980] hover:from-[#27A980] hover:to-[#0BA360] text-white py-3 rounded-lg"
              onClick={handleNext}
            >
              Next
            </Button>

            {step > 1 && (
              <Button
                className="w-full bg-[#262626] hover:bg-[#4D4D4D] text-white py-3 rounded-lg"
                onClick={handleBack}
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
