
import { redirect } from "next/navigation";
import { verifyToken } from "@/functions/waitlist";
import { Suspense } from "react";
import { use } from 'react'
 
function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0E0E0E] text-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
        <h2 className="text-xl font-medium">Verifying your email...</h2>
      </div>
    </div>
  );
}

function ErrorState() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0E0E0E] text-white">
      <div className="text-center max-w-md mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Verification Failed</h1>
        <p className="text-gray-400 mb-6">
          The verification link has expired or is invalid. Please request a new
          one.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 rounded-lg bg-white text-black hover:bg-gray-100 transition-colors"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}

async function VerifyContent({ token }: { token: string }) {
  const result = await verifyToken(token);

  console.log(result)

  if (!result.success) {
    return <ErrorState />;
  }

  redirect(`/auth/success?email=${encodeURIComponent(result.email)}`);
}

export default function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const params = use(searchParams)

  const token = params.token;

  if (!token) {
    redirect("/");
  }

  return (
    <Suspense fallback={<LoadingState />}>
      <VerifyContent token={token} />
    </Suspense>
  );
}
