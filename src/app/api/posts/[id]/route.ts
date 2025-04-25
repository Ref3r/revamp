import { NextResponse } from "next/server";
import { headers } from "next/headers";

const API_URL = process.env.INTERNAL_API_URL || "http://localhost:4000/api/v1";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const headersList = headers();
    const token = headersList.get("Authorization");

    if (!token) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }

    console.log("Proxying post request to:", `${API_URL}/posts/${params.id}`);

    const response = await fetch(`${API_URL}/posts/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Post proxy error:", response.status, data);
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Post proxy error:", error);
    return NextResponse.json(
      { message: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const headersList = headers();
    const token = headersList.get("Authorization");
    const { pathname } = new URL(request.url);
    const action = pathname.split("/").pop(); // Get the last part of the URL (like, unlike, comments)

    if (!token) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }

    let endpoint = `${API_URL}/posts/${params.id}`;
    if (action && ["like", "unlike", "comments"].includes(action)) {
      endpoint += `/${action}`;
    }

    console.log("Proxying post action request to:", endpoint);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: request.body ? await request.text() : null,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Post action proxy error:", response.status, data);
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Post action proxy error:", error);
    return NextResponse.json(
      { message: "Failed to process post action" },
      { status: 500 }
    );
  }
}
