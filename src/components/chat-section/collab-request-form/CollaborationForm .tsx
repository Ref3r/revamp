'use client'
import { Button, Input, Label, Popover, Textarea } from '@lemonsqueezy/wedges';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  SelectValue,
} from "@lemonsqueezy/wedges";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { CalendarIcon, X } from "lucide-react";

interface CollaborationFormProps {
  isFromChat?: boolean;
  onClose?: () => void;
  onSubmit?: (formData: CollaborationFormData) => void;
}

export interface CollaborationFormData {
  brandName: string;
  brandDescription: string;
  collaborationRequest: string;
  price: string;
  deadline: Date | undefined;
  collaborationTypes: string[];
}

const CollaborationForm = ({
  isFromChat = false,
  onClose,
  onSubmit,
}: CollaborationFormProps) => {
  const [brandName, setBrandName] = useState("");
  const [brandDescription, setBrandDescription] = useState("");
  const [collaborationRequest, setCollaborationRequest] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const collabTypes = [
    { value: "sponsored-post", label: "Sponsored Post" },
    { value: "affiliate-marketing", label: "Affiliate Marketing" },
    { value: "product-review", label: "Product Review" },
    { value: "brand-ambassador", label: "Brand Ambassador" },
    { value: "content-creation", label: "Content Creation" },
    { value: "social-media-takeover", label: "Social Media Takeover" },
  ];

  const toggleSelection = (value: string) => {
    setSelectedTypes(
      selectedTypes.includes(value)
        ? selectedTypes.filter((item) => item !== value)
        : [...selectedTypes, value]
    );
  };

  const formHeading = isFromChat
    ? "Send the Proposal"
    : "Send a Collaboration Request";

  const handleSubmit = () => {
    // Create form data object
    const formData: CollaborationFormData = {
      brandName,
      brandDescription,
      collaborationRequest,
      price,
      deadline: date,
      collaborationTypes: selectedTypes,
    };

    // If onSubmit is provided, pass the form data
    if (onSubmit) {
      onSubmit(formData);
    }

    // Close the form if onClose is provided
    if (onClose) {
      onClose();
    } else {
      // Default alert if no callback is provided
      alert("Collaboration Request Sent");
    }
  };

  return (
    <div className="bg-[#0E0E0E] text-[#FFFFFF] p-0 max-w-lg mx-auto rounded-lg shadow-md backdrop-blur-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">{formHeading}</h2>
        {onClose && (
          <button onClick={onClose} className="text-white hover:text-gray-300">
            <X size={20} />
          </button>
        )}
      </div>

      <div className="mb-4">
        <Label className="block text-sm mb-2" htmlFor="brandName">
          Brand Name
        </Label>
        <Input
          type="text"
          id="brandName"
          value={brandName}
          onChange={(e) => setBrandName((e.target as HTMLInputElement).value)}
          className="w-full p-2 bg-transparent border border-[#FFFFFF33] rounded-lg outline-none focus:ring-2 focus:ring-[#FFFFFF33]"
          placeholder="Twitter community"
        />
      </div>

      <div className="mb-4">
        <Label className="block text-sm mb-2" htmlFor="brandDescription">
          Brand Description
        </Label>
        <Textarea
          id="brandDescription"
          value={brandDescription}
          onChange={(e) =>
            setBrandDescription((e.target as HTMLTextAreaElement).value)
          }
          className="w-full p-2 bg-transparent border border-[#FFFFFF33] rounded-lg outline-none focus:ring-2 focus:ring-[#FFFFFF33]"
          rows={3}
          placeholder="Write some interesting shit about your brand"
        />
      </div>

      <div className="mb-4">
        <Label className="block text-sm mb-2" htmlFor="collaborationRequest">
          Collaboration Request
        </Label>
        <Textarea
          id="collaborationRequest"
          value={collaborationRequest}
          onChange={(e) =>
            setCollaborationRequest((e.target as HTMLTextAreaElement).value)
          }
          className="w-full p-2 bg-transparent border border-[#FFFFFF33] rounded-lg outline-none focus:ring-2 focus:ring-[#FFFFFF33]"
          rows={3}
          placeholder="Write some interesting shit about why they should work with you"
        />
      </div>

      <div className="mb-4">
        <Label className="block text-sm mb-2">Select Collab Types</Label>
        <Select
          value={selectedTypes[0] || ""}
          onValueChange={(value) => toggleSelection(value)}
        >
          <SelectTrigger className="w-full p-2 bg-transparent border border-[#FFFFFF33] rounded-lg outline-none focus:ring-2 focus:ring-[#FFFFFF33] text-white group">
            {selectedTypes.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {selectedTypes.length} selected
              </div>
            ) : (
              <SelectValue placeholder="Select..." />
            )}

            <svg
              className="w-4 h-4 ml-auto transition-transform duration-200 group-data-[state=open]:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </SelectTrigger>
          <SelectPortal>
            <SelectContent className="bg-[#1E1E1E] border border-[#FFFFFF33] rounded-lg text-white max-h-[300px] overflow-y-auto">
              <SelectGroup>
                {collabTypes.map((type) => (
                  <SelectItem
                    key={type.value}
                    value={type.value}
                    className={`p-2 hover:bg-[#333333] cursor-pointer flex items-center ${
                      selectedTypes.includes(type.value) ? "bg-[#333333]" : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleSelection(type.value);
                    }}
                  >
                    <Input
                      type="checkbox"
                      checked={selectedTypes.includes(type.value)}
                      onChange={() => toggleSelection(type.value)}
                      className="mr-2"
                    />
                    {type.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </SelectPortal>
        </Select>
      </div>

      <div className="mb-4">
        <Label className="block text-sm mb-2">Price</Label>
        <div className="relative w-full">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            $
          </span>
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice((e.target as HTMLInputElement).value)}
            className="w-full pl-8 pr-16 p-2.5 bg-transparent border border-[#FFFFFF33] rounded-lg text-white outline-none focus:ring-2 focus:ring-[#FFFFFF33]"
            placeholder="0.00"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            USD
          </span>
        </div>
      </div>

      <div className="mb-6">
        <Label className="block text-sm mb-2">Set a deadline</Label>
        <div className="relative w-full">
          <Input
            type="text"
            value={date?.toLocaleDateString()}
            readOnly
            className="w-full p-2 pl-4 bg-transparent border border-[#FFFFFF33] rounded-lg outline-none focus:ring-2 focus:ring-[#FFFFFF33]"
          />
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-transparent border-none text-white focus:outline-none"
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            type="button"
          >
            <CalendarIcon className="w-5 h-5" />
          </button>

          {isCalendarOpen && (
            <div className="absolute bottom-full mb-2 bg-[#1E1E1E] border border-[#FFFFFF33] rounded-md shadow-lg z-10 w-full max-w-[250px] right-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(selectedDate) => {
                  setDate(selectedDate);
                  setIsCalendarOpen(false);
                }}
              />
            </div>
          )}
        </div>
      </div>

      <Button
        className="w-full p-3 bg-gradient-to-r from-[#0BA360] to-[#27A980] text-white rounded-lg shadow-lg hover:bg-gradient-to-r hover:from-[#27A980] hover:to-[#0BA360] transition duration-300 ease-in-out"
        onClick={handleSubmit}
      >
        Send that request!
      </Button>
    </div>
  );
};

export default CollaborationForm;