"use client";
import { Button, Input, Label } from "@lemonsqueezy/wedges";
import { useRouter } from "next/navigation";
import { useState, FormEvent, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import FormContainer from "./FormContainer";
import GoogleAuthComponent from "./GoogleAuthComponent";

interface SignupComponentProps {
  onToggleLogin: () => void;
}

export default function SignupComponent({
  onToggleLogin,
}: SignupComponentProps) {
  const router = useRouter();
  const { signUp, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  // Handle signup submission
  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await signUp({ email, password });

      if (response.success) {
        setSuccessMessage(response.message || "Account created successfully!");

        // If we have a token, we're already authenticated
        if (response.token) {
          console.log("Auth token received and saved");
          // Redirect to create profile page after successful registration
          router.push("/create-profile");
        } else {
          // Otherwise try to login
          const loginResponse = await login({ email, password });
          if (loginResponse.success) {
            router.push("/create-profile");
          } else {
            setError(
              "Account created but login failed. Please try logging in manually."
            );
          }
        }
      } else {
        setError(response.message || "Registration failed");
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
      title="Create Account"
      error={error}
      successMessage={successMessage}
    >
      <form className="space-y-6" onSubmit={handleSignUp}>
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

        <div>
          <Label
            htmlFor="password"
            className="text-[#FFFFFF] mb-2 block text-md"
          >
            Password
          </Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
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
            onChange={(e) => setConfirmPassword((e.target as HTMLInputElement).value)}
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
          {isLoading ? "Processing..." : "Create Account"}
        </Button>

        <div className="text-center mt-4">
          <span className="text-[#FFFFFF80]">Already have an account?</span>
          <Button
            type="button"
            className="text-white ml-2"
            onClick={onToggleLogin}
          >
            Login
          </Button>
        </div>

        <GoogleAuthComponent  />
      </form>
    </FormContainer>
  );
} 