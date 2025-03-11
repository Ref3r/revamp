"use client";
import { Button, Input, Label, Textarea } from "@lemonsqueezy/wedges";
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
import { CalendarIcon } from "lucide-react";

interface CollaborationFormProps {
  isFromChat?: boolean; // Flag to determine if opened from chat window
}

const CollaborationForm = ({ isFromChat = false }: CollaborationFormProps) => {
  const [brandName, setBrandName] = useState("");
  const [brandDescription, setBrandDescription] = useState("");
  const [collaborationRequest, setCollaborationRequest] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false); // Calendar open state

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
      (prevSelected) =>
        prevSelected.includes(value)
          ? prevSelected.filter((item) => item !== value) // Remove if already selected
          : [...prevSelected, value] // Add if not selected
    );
  };

  // Dynamic heading based on where the form is opened from
  const formHeading = isFromChat
    ? "Send the Proposal"
    : "Send a Collaboration Request";

  return (
    <div className="bg-[#0E0E0E] text-[#FFFFFF] p-0 max-w-lg mx-auto rounded-lg shadow-md backdrop-blur-sm">
      {/* Remove the heading here since it's now handled in the parent component */}

      {/* Brand Name Input */}
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

      {/* Brand Description Input */}
      <Label className="block text-sm mt-4 mb-2" htmlFor="brandDescription">
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

      {/* Collaboration Request Input */}
      <Label className="block text-sm mt-4 mb-2" htmlFor="collaborationRequest">
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

      {/* Collab Type Dropdown */}
      <div>
        <Label className="block text-sm mt-4 mb-2">Select Collab Types</Label>
        <Select
          value={selectedTypes[0] || ""}
          onValueChange={(value) => toggleSelection(value)}
        >
          <SelectTrigger className="w-full p-2 bg-transparent border border-[#FFFFFF33] rounded-lg outline-none focus:ring-2 focus:ring-[#FFFFFF33] text-white group">
            {/* Display selected values or placeholder */}
            {selectedTypes.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {selectedTypes.map((type) => (
                  <span
                    key={type}
                    className="bg-[#333333] px-2 py-1 rounded-full text-sm"
                  >
                    {collabTypes.find((t) => t.value === type)?.label}
                  </span>
                ))}
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
                    <input
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

      {/* Price Input */}
      <Label className="block text-sm mt-4 mb-2">Price</Label>
      <div className="flex items-center w-full space-x-2">
        <div className="relative w-full">
          {/* Dollar sign positioned inside the input */}
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            $
          </span>
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pr-5">
            USD
          </span>

          {/* Input field */}
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice((e.target as HTMLInputElement).value)}
            className="w-full pl-10 p-2.5 bg-transparent border border-gray-600 rounded-lg text-white outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="0.00"
            style={{ paddingLeft: "2.5rem" }}
          />
        </div>
      </div>

      {/* Deadline Input */}
      <Label className="block text-sm mt-4 mb-2">Set a deadline</Label>
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
        >
          <CalendarIcon className="w-6 h-6" />
        </button>

        {/* Calendar Component */}
        {isCalendarOpen && (
          <div className="absolute  bottom-full mb-2 bg-[#1E1E1E] border border-[#FFFFFF33] rounded-md shadow-lg z-10 w-full max-w-[250px]">
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

      <Button
        className="mt-6 w-full p-3 bg-gradient-to-r from-[#0BA360] to-[#27A980]  text-white rounded-lg shadow-lg hover:bg-gradient-to-r hover:from-[#27A980] hover:to-[#0BA360] transition duration-300 ease-in-out"
        onClick={() => alert("Collaboration Request Sent")}
      >
        Send that request!
      </Button>
    </div>
  );
};

export default CollaborationForm;
