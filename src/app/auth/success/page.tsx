import { use } from "react";

export default function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const params = use(searchParams)
  const email = params.email;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0E0E0E] text-white">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="mb-6">
          <span className="inline-block p-4 rounded-full bg-green-500/10 text-green-400 text-4xl">
            ✓
          </span>
        </div>
        <h1 className="text-4xl font-bold mb-4">You're all set! 🎉</h1>
        <p className="text-gray-400 mb-2">
          Your email has been verified:
        </p>
        <p className="text-white font-medium mb-8">
          {email}
        </p>
        <p className="text-gray-400 mb-8">
          We'll notify you as soon as we're ready to welcome you in.
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