"use client";
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
import React from "react";
import { Input } from "@lemonsqueezy/wedges";
import Image from "next/image";
import Link from "next/link";

const Makeyourcommunity = () => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [brandName, setCommunityName] = useState("");
  const [brandDescription, setCommunityDescription] = useState("");

  const collabTypes = [
    { value: "lifestyle", label: "Lifestyle" },
    { value: "tech", label: "Tech" }, 
    { value: "fitness", label: "Fitness" },
    { value: "fashion", label: "Fashion" },
  ];

  const creators = [
    { image: "invitecreator1.svg", name: "Creator 1" },
    { image: "invitecreator2.svg", name: "Creator 2" },
    { image: "invitecreator3.svg", name: "Creator 3" },
  ];

  const toggleSelection = (value: string) => {
    setSelectedTypes(
      prevSelected => prevSelected.includes(value)
        ? prevSelected.filter(item => item !== value)
        : [...prevSelected, value]
    );
  };

  return (
    <div className="w-full  p-6 rounded-lg">
      <h1 className="text-xl sm:text-2xl text-[#FFFFFF] font-bold mb-6">
        Or make your own Community
      </h1>

      <div className="space-y-6 text-white">
        <div>
          <Label className="block text-sm mb-2 text-white" htmlFor="brandName">
            Community Name
          </Label>
          <Input
            type="text"
            id="brandName"
            value={brandName}
            onChange={(e) => setCommunityName((e.target as HTMLInputElement).value)}
            className="w-full p-2 bg-transparent border border-[#FFFFFF33] rounded-lg outline-none focus:ring-2 focus:ring-[#FFFFFF33]"
            placeholder="Twitter community"
          />
        </div>

        <div>
          <Label className="block text-sm mb-2 text-white" htmlFor="brandDescription">
            Community Description
          </Label>
          <Textarea
            id="brandDescription"
            value={brandDescription}
            onChange={(e) => setCommunityDescription((e.target as HTMLTextAreaElement).value)}
            className="w-full p-2 bg-transparent border border-[#FFFFFF33] rounded-lg outline-none focus:ring-2 focus:ring-[#FFFFFF33]"
            rows={3}
            placeholder="Write some interesting shit about your community"
          />
        </div>

        <div>
          <Label className="block text-sm mb-2 text-white">Community niches</Label>
          <Select
            value={selectedTypes[0] || ""}
            onValueChange={(value) => toggleSelection(value)}
          >
            <SelectTrigger className="w-full p-2 bg-transparent border border-[#FFFFFF33] rounded-lg outline-none focus:ring-2 focus:ring-[#FFFFFF33] text-white group">
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
        
        <div>
          <h2 className="text-white font-medium text-sm mb-4">Invite folks to your community</h2>
          <div className="space-y-4">
            {creators.map((creator, index) => (
              <div key={index} className="flex items-center justify-between gap-4 bg-[#0E0E0E] p-4 rounded-lg">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="flex-shrink-0">
                    <Image width={48} height={48} src={creator.image} alt={creator.name} className="rounded-full" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-white font-medium text-sm truncate">{creator.name}</h3>
                    <p className="text-white/70 text-xs truncate">We live and breathe twitter!</p>
                  </div>
                </div>
                <Button className="bg-white hover:bg-white/90 transition-colors rounded-md shrink-0">
                  <span className="text-black px-4 sm:px-6 py-1">Invite</span>
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center pt-6">
          <Button className="bg-gradient-to-r from-[#0BA360] to-[#27A980] rounded-md w-full sm:w-auto">
            <span className="block py-2 px-8 sm:px-16">Start building that community!</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Makeyourcommunity;