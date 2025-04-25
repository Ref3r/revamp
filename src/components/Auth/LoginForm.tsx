// app/components/LoginForm.tsx
"use client";
import { Button, Input, Label } from "@lemonsqueezy/wedges";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginForm() {
  const router = useRouter();
  const { login, signUp, forgotPassword } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Reset form fields when switching modes
  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
    setSuccessMessage("");
  };

  // Toggle between login and signup
  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    resetForm();
    setIsForgotPassword(false);
  };

  // Toggle forgot password mode
  const toggleForgotPassword = () => {
    setIsForgotPassword(!isForgotPassword);
    resetForm();
  };

  // Handle login submission
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await login({ email, password });

      if (response.success) {
        setSuccessMessage("Login successful!");
        router.push("/dashboard");
      } else {
        setError(response.message || "Login failed");
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
          setIsForgotPassword(false);
          resetForm();
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

  // Title based on current mode
  const getFormTitle = () => {
    if (isForgotPassword) return "Reset Password";
    return isSignUp ? "Create Account" : "Login";
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E] flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-[#FFFFFF] text-4xl font-semibold">
            {getFormTitle()}
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

        {isForgotPassword ? (
          /* Forgot Password Form */
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
                onChange={(e) => setEmail(e.target.value)}
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
                onClick={toggleForgotPassword}
              >
                Back to Login
              </Button>
            </div>
          </form>
        ) : (
          /* Login/Signup Form */
          <form
            className="space-y-6"
            onSubmit={isSignUp ? handleSignUp : handleLogin}
          >
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
                className="w-full bg-[#0E0E0E] border border-[#FFFFFF33] text-white py-3 rounded-lg shadow-[0_1px_2px_0_rgba(18,18,23,0.05)]"
                style={{
                  boxShadow: "0 1px 2px 0 rgba(18, 18, 23, 0.05)",
                }}
              />
              {!isSignUp && (
                <div className="mt-2">
                  <span className="text-[#FFFFFF80]">Forgot Password? </span>
                  <Button
                    type="button"
                    className="text-white"
                    onClick={toggleForgotPassword}
                  >
                    Click here
                  </Button>
                  <span className="text-[#FFFFFF80]"> to reset</span>
                </div>
              )}
            </div>

            {isSignUp && (
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
            )}

            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
              className="w-full bg-[#00B24E] hover:bg-[#00A047] text-white py-3 rounded-lg"
            >
              {isLoading
                ? "Processing..."
                : isSignUp
                ? "Create Account"
                : "Login"}
            </Button>

            <div className="text-center mt-4">
              <span className="text-[#FFFFFF80]">
                {isSignUp
                  ? "Already have an account?"
                  : "Don't have an account?"}
              </span>
              <Button
                type="button"
                className="text-white ml-2"
                onClick={toggleForm}
              >
                {isSignUp ? "Login" : "Sign Up"}
              </Button>
            </div>

            <div className="relative flex items-center justify-center gap-4 my-8">
              <div className="h-[1px] bg-[#FFFFFF4D] flex-1" />
              <span className="text-[#FFFFFF]">Or</span>
              <div className="h-[1px] bg-[#FFFFFF4D] flex-1" />
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full bg-[#0E0E0E border border-[#FFFFFF] text-white hover:bg-[#FFFFFF0D] py-2 flex items-center justify-center gap-3 rounded-lg"
            >
              <div className="flex gap-3">
                <Image
                  src="/google.svg"
                  alt="Google logo"
                  width={20}
                  height={20}
                  className="object-contain"
                />
                <span>Google Sign-in</span>
              </div>
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
