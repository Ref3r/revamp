"use client";
import React from "react";
import { Button, Label, Textarea } from "@lemonsqueezy/wedges";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Search, X } from "lucide-react";
import { Input } from "@lemonsqueezy/wedges";
import Image from "next/image";

interface FormProps {
  isFromChat?: boolean;
  onClose?: () => void;
}

const Form = ({ isFromChat = false, onClose }: FormProps) => {
  const [brandName, setChallengeName] = useState("");
  const [brandDescription, setChallengeDescription] = useState("");
  const [collaborationRequestDescription, setCollaborationRequestDescription] =
    useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const creators = [
    {
      image: "/invitecreator1.svg",
      name: "Creator 1",
      description: "We live and breathe twitter!",
    },
  ];

  return (
    <div className="w-full bg-[#0E0E0E] text-white">
      <div className="space-y-6">
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
            className="w-full p-2 bg-[#121212] border border-[#333333] rounded-lg outline-none text-white"
            placeholder="Design Challenge"
          />
        </div>

        <div>
          <Label
            className="block text-sm mb-2 text-white"
            htmlFor="challengeDescription"
          >
            Challenge Description
          </Label>
          <Textarea
            id="challengeDescription"
            value={brandDescription}
            onChange={(e) =>
              setChallengeDescription((e.target as HTMLTextAreaElement).value)
            }
            className="w-full p-2 bg-[#121212] border border-[#333333] rounded-lg outline-none text-white min-h-[100px]"
            placeholder="Write some interesting shit about your challenge"
          />
        </div>

        <div>
          <Label
            className="block text-sm mb-2 text-white"
            htmlFor="collaborationRequest"
          >
            Collaboration request
          </Label>
          <Textarea
            id="collaborationRequest"
            value={collaborationRequestDescription}
            onChange={(e) =>
              setCollaborationRequestDescription(
                (e.target as HTMLTextAreaElement).value
              )
            }
            className="w-full p-2 bg-[#121212] border border-[#333333] rounded-lg outline-none text-white min-h-[100px]"
            placeholder="Write some interesting shit about why they should work with you"
          />
        </div>

        <div>
          <Label className="block text-sm mb-2 text-white">
            Set a deadline
          </Label>
          <div className="relative w-full">
            <Input
              type="text"
              value={date?.toLocaleDateString()}
              readOnly
              className="w-full p-2 pl-4 bg-[#121212] border border-[#333333] rounded-lg outline-none text-white pr-10"
            />
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-transparent border-none text-white focus:outline-none"
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            >
              <CalendarIcon className="w-5 h-5" />
            </button>

            {isCalendarOpen && (
              <div className="absolute bottom-full mb-2 bg-[#1E1E1E] border border-[#333333] rounded-md shadow-lg z-10 w-full max-w-[300px] text-white left-1/2 transform -translate-x-1/2">
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
          <div className="relative w-full">
            <div className="flex items-center gap-2 bg-[#121212] border border-[#333333] px-3 py-2 rounded-lg">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="search"
                placeholder="Search for creators to add"
                className="w-full bg-transparent outline-none border-none text-white text-sm"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {creators.map((creator, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4 bg-[#121212] p-3 rounded-lg"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                    <Image
                      width={40}
                      height={40}
                      src={creator.image}
                      alt={creator.name}
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="min-w-0">
                  <h2 className="text-white font-medium text-sm truncate">
                    {creator.name}
                  </h2>
                  <p className="text-gray-400 text-xs truncate">
                    {creator.description}
                  </p>
                </div>
              </div>
              <Button className="bg-white hover:bg-gray-100 text-black text-xs font-medium py-1 px-4 rounded">
                Add
              </Button>
            </div>
          ))}
        </div>

        <div className="pt-6">
          <Button className="w-full bg-[#0BA360] hover:bg-[#099556] text-white font-medium py-2.5 rounded-md transition-colors">
            Make the Challenge Live
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Form;
