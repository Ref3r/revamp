import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function POST(request: NextRequest) {
  try {
    // Get the auth token from the request headers
    const authToken = request.headers.get("Authorization");
    console.log(
      "Proxy received auth header:",
      authToken ? "Present" : "Missing"
    );

    // TEMPORARY WORKAROUND - REMOVE IN PRODUCTION
    // For debugging only - allows us to test without a valid token
    const useToken = authToken || "Bearer dummy-token-for-testing";

    if (!authToken) {
      return NextResponse.json(
        { message: "Authentication token is required" },
        { status: 401 }
      );
    }

    // Get the profile data from the request body
    const profileData = await request.json();
    console.log(
      "Forwarding profile update to backend:",
      Object.keys(profileData)
    );

    // Forward the request to the actual backend API
    const response = await fetch(`${API_URL}/api/v1/users/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: useToken,
      },
      body: JSON.stringify(profileData),
    });

    // Log the response status
    console.log("Backend API response status:", response.status);

    // Get the response data
    const data = await response.json();

    // Return the response with the appropriate status
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Failed to update profile",
      },
      { status: 500 }
    );
  }
}
