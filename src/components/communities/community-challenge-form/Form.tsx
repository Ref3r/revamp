"use client";
import React from "react";
import { Button, Label, Textarea } from "@lemonsqueezy/wedges";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  SelectValue,
} from "@lemonsqueezy/wedges";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Input } from "@lemonsqueezy/wedges";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FormProps {
  isFromChat?: boolean;
}

const Form = ({ isFromChat = false }: FormProps) => {
  const [brandName, setChallengeName] = useState("");
  const [brandDescription, setChallengeDescription] = useState("");
  const [CollaborationRequestDescription, setCollaborationRequestDescription] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const creators = [
    { image: "invitecreator1.svg", name: "Creator 1", description: "We live and breathe twitter!" }
  ];

  return (
    <div className="w-full bg-[#0E0E0E] p-4 sm:p-6 md:p-8 lg:p-12 rounded-lg">
      <div className="max-w-3xl mx-auto">
        <div className="space-y-6">
          <div>
            <h1 className="text-white font-bold text-xl sm:text-2xl">
              Community Challenge
            </h1>
          </div>

          <div>
            <Label className="block text-sm mb-2 text-white" htmlFor="brandName">
              Challenge Name
            </Label>
            <Input
              type="text"
              id="brandName"
              value={brandName}
              onChange={(e) =>
                setChallengeName((e.target as HTMLInputElement).value)
              }
              className="w-full p-2 bg-transparent border border-[#FFFFFF33] rounded-lg outline-none focus:ring-2 focus:ring-[#FFFFFF33] text-white"
              placeholder="Design Challenge"
            />
          </div>

          <div>
            <Label className="block text-sm mb-2 text-white" htmlFor="challengeDescription">
              Challenge Description
            </Label>
            <Textarea
              id="challengeDescription"
              value={brandDescription}
              onChange={(e) =>
                setChallengeDescription((e.target as HTMLTextAreaElement).value)
              }
              className="w-full p-2 bg-transparent border border-[#FFFFFF33] rounded-lg outline-none focus:ring-2 focus:ring-[#FFFFFF33] text-white"
              rows={3}
              placeholder="Write some interesting shit about your challenge"
            />
          </div>

          <div>
            <Label className="block text-sm mb-2 text-white" htmlFor="collaborationRequest">
              Collaboration request
            </Label>
            <Textarea
              id="collaborationRequest"
              value={CollaborationRequestDescription}
              onChange={(e) =>
                setCollaborationRequestDescription((e.target as HTMLTextAreaElement).value)
              }
              className="w-full p-2 bg-transparent border border-[#FFFFFF33] rounded-lg outline-none focus:ring-2 focus:ring-[#FFFFFF33] text-white"
              rows={3}
              placeholder="Write some interesting shit about why they should work with you"
            />
          </div>

          <div>
            <Label className="block text-sm mb-2 text-white">Set a deadline</Label>
            <div className="relative w-full">
              <Input
                type="text"
                value={date?.toLocaleDateString()}
                readOnly
                className="w-full p-2 pl-4 bg-transparent border border-[#FFFFFF33] rounded-lg outline-none focus:ring-2 focus:ring-[#FFFFFF33] text-white"
              />
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-transparent border-none text-white focus:outline-none"
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              >
                <CalendarIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {isCalendarOpen && (
                <div className="absolute bottom-full mb-2 bg-[#1E1E1E] border border-[#FFFFFF33] rounded-md shadow-lg z-10 w-full max-w-[300px] text-white left-1/2 transform -translate-x-1/2">
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

          <div>
            <div className="mb-4">
              <div className="flex items-center gap-2 bg-transparent border border-[#FFFFFF3D] px-3 py-2 rounded-md ">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFFFFF7A]" />
                <input
                  type="search"
                  placeholder="Search for creators to add"
                  className="w-full bg-transparent text-[#FFFFFF5A] outline-none focus:ring-0 placeholder:text-[#FFFFFF7A] text-xs sm:text-sm text-white"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {creators.map((creator, index) => (
              <div key={index} className="flex items-center justify-between gap-4 bg-[#1A1919] p-4 rounded-lg">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="flex-shrink-0">
                    <Image width={48} height={48} src={creator.image} alt={creator.name} className="rounded-full" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-white font-medium text-sm truncate">{creator.name}</h2>
                    <p className="text-white/70 text-xs truncate">{creator.description}</p>
                  </div>
                </div>
                <Button className="bg-white hover:bg-white/90 transition-colors rounded-md shrink-0">
                  <span className="text-black px-4 sm:px-6 py-1">Add</span>
                </Button>
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-6">
            <Button className="bg-gradient-to-r from-[#0BA360] to-[#27A980] rounded-md w-full sm:w-auto">
              <span className="block py-2 px-8 sm:px-16">Create Challenge</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;