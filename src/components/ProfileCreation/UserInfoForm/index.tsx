"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
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
import useCloudinary from "@/hooks/useCloudinary";
import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "@/utils/apiClient";
import { updateProfile } from "@/services/onboardingService";
import SubmitButton from "../SubmitButton";

type Props = {
  onSuccess: () => void;
  onError: (error: any) => void;
};

export default function UserInfoForm({ onSuccess, onError }: Props) {
  const { uploadImage, isUploading } = useCloudinary();

  const { mutateAsync: handleUpdate, isPending: isUpdating } = useMutation({
    mutationFn: updateProfile,
  });

  const {
    data: availableNiches,
    error: nichesError,
    isLoading: isNichesLoading,
  } = useQuery({
    queryKey: ["niches"],
    queryFn: async () => {
      console.log("Fetching niches");
      const response = await apiClient<{ niches: string[] }>(
        `/users/niches/available`
      );
      return response.data.niches;
    },
    initialData: [],
    staleTime: 0
  });

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    website: "",
    niche: [] as string[],
    profilePicture: null as File | null,
    profilePictureUrl: "",
  });

  const handleFileChange = async (e: any) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const file = target.files[0];

      setFormData({ ...formData, profilePicture: file });

      const { url: uploadedUrl } = await uploadImage({
        file,
        folder: "profiles",
      });

      setFormData((prev) => ({
        ...prev,
        profilePictureUrl: uploadedUrl,
      }));
    }
  };

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
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              {formData.profilePictureUrl ? (
                <img
                  src={formData.profilePictureUrl}
                  alt="Selected"
                  className="rounded-full w-full h-full object-cover"
                />
              ) : formData.profilePicture ? (
                <div className="text-white text-xs text-center flex flex-col items-center">
                  <span>Uploading...</span>
                </div>
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
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Select Image"}
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
            <div className="text-red-500 text-sm mb-2">
              {nichesError.message}
            </div>
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
                  <SelectItem key={item} value={item} className="text-white">
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <SubmitButton
        isLoading={isUpdating}
        onClick={() =>
          handleUpdate(
            {
              bio: formData.bio,
              name: formData.name,
              websiteUrl: formData.website,
              niches: formData.niche,
              profilePicture: formData.profilePictureUrl,
            },
            { onSuccess, onError }
          )
        }
      />
    </div>
  );
}
