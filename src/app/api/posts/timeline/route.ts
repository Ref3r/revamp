import { NextResponse } from "next/server";
import { headers } from "next/headers";

const API_URL = process.env.INTERNAL_API_URL || "http://localhost:4000/api/v1";

export async function GET(request: Request) {
  try {
    const headersList = headers();
    const token = headersList.get("Authorization");

    if (!token) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }

    console.log("Proxying timeline request to:", `${API_URL}/posts/timeline`);

    const response = await fetch(`${API_URL}/posts/timeline`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Timeline proxy error:", response.status, data);
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Timeline proxy error:", error);
    return NextResponse.json(
      { message: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
