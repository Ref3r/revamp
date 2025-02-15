"use client";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const ProfileCreationLoader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#0E0E0E] fixed inset-0">
      <DotLottieReact
        src="/Animation.lottie"
        loop
        autoplay
        style={{ width: "50vw", height: "50vh" }}
      />
      <p className="text-[#FFFFFF] mt-6 text-lg md:text-xl lg:text-2xl text-center">
        Creating your Ref3r Page....
      </p>
    </div>
  );
};

export default ProfileCreationLoader;
