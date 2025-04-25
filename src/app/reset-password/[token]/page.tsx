"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Label } from "@lemonsqueezy/wedges";
import { useAuth } from "@/contexts/AuthContext";

export default function ResetPasswordPage({
  params,
}: {
  params: { token: string };
}) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const { token } = params;
  const { resetPassword } = useAuth();

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await resetPassword({ token, newPassword });

      if (response.success) {
        setSuccessMessage(
          response.message ||
            "Password reset successful! You can now log in with your new password."
        );
        // Redirect to login page after a short delay
        setTimeout(() => {
          router.push("/sign-up");
        }, 3000);
      } else {
        setError(response.message || "Failed to reset password");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E] flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-[#FFFFFF] text-4xl font-semibold">
            Reset Password
          </h1>
        </div>

        {/* Error and success messages */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-3 mb-4">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-500/10 border border-green-500 text-green-500 rounded-lg p-3 mb-4">
            {successMessage}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleResetPassword}>
          <div>
            <Label
              htmlFor="newPassword"
              className="text-[#FFFFFF] mb-2 block text-md"
            >
              New Password
            </Label>
            <Input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="********"
              required
              className="w-full bg-[#0E0E0E] border border-[#FFFFFF33] text-white py-3 rounded-lg shadow-[0_1px_2px_0_rgba(18,18,23,0.05)]"
              style={{
                boxShadow: "0 1px 2px 0 rgba(18, 18, 23, 0.05)",
              }}
            />
          </div>

          <div>
            <Label
              htmlFor="confirmPassword"
              className="text-[#FFFFFF] mb-2 block text-md"
            >
              Confirm Password
            </Label>
            <Input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="********"
              required
              className="w-full bg-[#0E0E0E] border border-[#FFFFFF33] text-white py-3 rounded-lg shadow-[0_1px_2px_0_rgba(18,18,23,0.05)]"
              style={{
                boxShadow: "0 1px 2px 0 rgba(18, 18, 23, 0.05)",
              }}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            className="w-full bg-[#00B24E] hover:bg-[#00A047] text-white py-3 rounded-lg"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </div>
    </div>
  );
}
