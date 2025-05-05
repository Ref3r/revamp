"use client";
import { Button, Input, Label } from "@lemonsqueezy/wedges";
import { useState, FormEvent } from "react";
import { useAuth } from "@/contexts/AuthContext";
import FormContainer from "./FormContainer";

interface ForgotPasswordComponentProps {
  onBackToLogin: () => void;
}

export default function ForgotPasswordComponent({
  onBackToLogin,
}: ForgotPasswordComponentProps) {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Handle forgot password submission
  const handleForgotPassword = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await forgotPassword({ email });

      if (response.success) {
        setSuccessMessage(response.message || "Password reset email sent!");
        // Switch back to login mode after a delay
        setTimeout(() => {
          onBackToLogin();
        }, 3000);
      } else {
        setError(response.message || "Failed to send reset email");
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
    <FormContainer
      title="Reset Password"
      error={error}
      successMessage={successMessage}
    >
      <form className="space-y-6" onSubmit={handleForgotPassword}>
        <div>
          <Label
            htmlFor="email"
            className="text-[#FFFFFF] mb-2 block text-md"
          >
            Email
          </Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
            placeholder="your@email.com"
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
          {isLoading ? "Sending..." : "Send Reset Link"}
        </Button>

        <div className="text-center mt-4">
          <Button
            type="button"
            className="text-white"
            onClick={onBackToLogin}
          >
            Back to Login
          </Button>
        </div>
      </form>
    </FormContainer>
  );
} 