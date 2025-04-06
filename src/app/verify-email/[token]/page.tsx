"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@lemonsqueezy/wedges";

// Base API path for auth endpoints
const AUTH_BASE_PATH = "/api/v1/auth";

export default function VerifyEmailPage({
  params,
}: {
  params: { token: string };
}) {
  const [isVerifying, setIsVerifying] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { token } = params;

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const API_URL =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
        const response = await fetch(
          `${API_URL}${AUTH_BASE_PATH}/verify-email/${token}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setIsSuccess(true);
        } else {
          setError(data.message || "Failed to verify email");
        }
      } catch (error) {
        setError("An unexpected error occurred");
        console.error("Verification error:", error);
      } finally {
        setIsVerifying(false);
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="min-h-screen bg-[#0E0E0E] flex items-center justify-center">
      <div className="w-full max-w-md p-8 text-center">
        <div className="mb-8">
          <h1 className="text-[#FFFFFF] text-4xl font-semibold">
            Email Verification
          </h1>
        </div>

        {isVerifying ? (
          <div className="text-[#FFFFFF] text-xl">Verifying your email...</div>
        ) : isSuccess ? (
          <>
            <div className="bg-green-500/10 border border-green-500 text-green-500 rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                Verification Successful!
              </h2>
              <p>Your email has been verified successfully.</p>
            </div>
            <Button
              variant="primary"
              className="bg-[#00B24E] hover:bg-[#00A047] text-white py-3 px-6 rounded-lg"
              onClick={() => router.push("/sign-up")}
            >
              Go to Login
            </Button>
          </>
        ) : (
          <>
            <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                Verification Failed
              </h2>
              <p>
                {error ||
                  "Unable to verify your email. The link may be invalid or expired."}
              </p>
            </div>
            <Button
              variant="primary"
              className="bg-[#00B24E] hover:bg-[#00A047] text-white py-3 px-6 rounded-lg"
              onClick={() => router.push("/sign-up")}
            >
              Back to Login
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
