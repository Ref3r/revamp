"use client";
import React, { useState } from "react";
import JoinWaitlistPop from "./JoinWaitlistPop"; // Import your modal component

const JoinWaitlistButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the modal
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Button to open the modal */}
      <button
        onClick={togglePopup}
        className="bg-white text-black rounded-full px-6 py-2 hover:bg-gray-100 transition-colors border-none outline-none focus:outline-none focus:ring-0"
      >
        Join Waitlist
      </button>

      {/* JoinWaitlistPop modal component */}
      <JoinWaitlistPop isOpen={isOpen} togglePopup={togglePopup} />
    </div>
  );
};

export default JoinWaitlistButton;
