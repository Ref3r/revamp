'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function GoogleCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState('Processing Google authentication...');
  const [isError, setIsError] = useState(false);
  const { checkAuth } = useAuth();

  useEffect(() => {
    const processAuth = async () => {
      // Get params directly from the URL
      const error = searchParams.get('error');
      const isNewUser = searchParams.get('isNewUser') === 'true';
      const userId = searchParams.get('userId');

      console.log('[GoogleOAuth-Frontend] Processing callback', { 
        error,
        isNewUser,
        userId
      });

      if (error) {
        console.error('[GoogleOAuth-Frontend] Error from redirect', error);
        setMessage(`Authentication error: ${decodeURIComponent(error)}`);
        setIsError(true);
        return;
      }

      try {
        // Check if we're authenticated by making a request to the server
        // The cookie should be automatically included in the request
        await checkAuth();

        setMessage('Authentication successful! Redirecting...');
        console.log('[GoogleOAuth-Frontend] Authentication successful');

        // Redirect based on whether this is a new user
        if (isNewUser) {
          console.log('[GoogleOAuth-Frontend] Redirecting to create profile');
          router.push('/onboarding');
        } else {
          console.log('[GoogleOAuth-Frontend] Redirecting to dashboard');
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('[GoogleOAuth-Frontend] Authentication error:', error);
        setMessage(
          error instanceof Error
            ? `Authentication error: ${error.message}`
            : 'Authentication failed'
        );
        setIsError(true);
      }
    };

    processAuth();
  }, [searchParams, router, checkAuth]);

  return (
    <div className="min-h-screen bg-[#0E0E0E] flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <div className="text-center">
          <h1 className="text-[#FFFFFF] text-4xl font-semibold mb-6">
            Google Authentication
          </h1>
          
          <div
            className={`p-4 rounded-lg ${
              isError
                ? 'bg-red-500/10 border border-red-500 text-red-500'
                : 'bg-[#FFFFFF10] text-white'
            }`}
          >
            {message}
          </div>

          {isError && (
            <button
              onClick={() => router.push('/sign-up')}
              className="mt-6 text-[#00B24E] hover:text-[#00A047]"
            >
              Return to Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 