"use client";
import { Button } from "@lemonsqueezy/wedges";
import Image from "next/image";
import { useState, useEffect } from "react";


export default function GoogleAuthComponent() {
  const [isLoading, setIsLoading] = useState(false);

  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

  const handleGoogleLogin = () => {
    window.location.href = `${apiBaseUrl.replace("/api/v1", "")}/auth/google`;

    setIsLoading(true);
  };

  return (
    <div>
      <div className="relative flex items-center justify-center gap-4 my-8">
        <div className="h-[1px] bg-[#FFFFFF4D] flex-1" />
        <span className="text-[#FFFFFF]">Or</span>
        <div className="h-[1px] bg-[#FFFFFF4D] flex-1" />
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className="w-full bg-[#0E0E0E] border border-[#FFFFFF] text-white hover:bg-[#FFFFFF0D] py-2 flex items-center justify-center gap-3 rounded-lg"
      >
        <div className="flex gap-3">
          <Image
            src="/google.svg"
            alt="Google logo"
            width={20}
            height={20}
            className="object-contain"
          />
          <span>{isLoading ? "Processing..." : "Sign in with Google"}</span>
        </div>
      </Button>
    </div>
  );
}
