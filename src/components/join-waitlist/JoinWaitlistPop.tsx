"use client";
import React, { useState } from "react";

interface JoinWaitlistPopProps {
  isOpen: boolean;
  togglePopup: () => void;
}

const JoinWaitlistPop = ({ isOpen, togglePopup }: JoinWaitlistPopProps) => {
  const [email, setEmail] = useState("");

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-[4px] z-10">
          <div className="bg-gradient-to-b from-[#1B1B1B] via-[#1B1B1B] to-[#198F51] px-6 py-6 md:py-10 rounded-2xl flex flex-col gap-3 md:gap-6 w-[75%] md:w-[50%] justify-center items-center shadow-lg">
            <button
              onClick={togglePopup}
              className="text-[#4F4F4F] md:text-xl font-bold py-1 md:py-2 px-3 md:px-4 rounded-full bg-[#3df885]"
            >
              X
            </button>
            <h2 className="text-center text-white text-2xl md:text-5xl font-bold md:w-[75%]">
              Get Early Access and be entitled for Pioneer Bonus.
            </h2>
            <input
              type="email"
              name="joinwaitlist"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter Your Email"
              className="bg-[#ffffff36] join-bg outline-none px-4 py-1 md:py-3 rounded-lg flex justify-center w-[75%] md:w-[50%] text-white text-sm md:text-lg"
            />
            <button
              type="submit"
              className="text-black hover:text-white bg-white hover:bg-black py-1 md:py-2 rounded-lg md:rounded-xl w-[60%] md:w-[25%] text-sm md:text-lg font-medium md:font-semibold"
            >
              Join Waitlist
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinWaitlistPop;
