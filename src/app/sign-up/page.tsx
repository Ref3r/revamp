"use client";

import SignupComponent from "@/components/Auth/SignupComponent";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return <SignupComponent onToggleLogin={() => router.push("/login")} />;
}
