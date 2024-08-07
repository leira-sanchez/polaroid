import { NextResponse } from "next/server";

const BEEHIIV_PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID;
const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY;

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    console.log("Attempting to subscribe:", email);

    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${BEEHIIV_API_KEY}`,
        },
        body: JSON.stringify({ email }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Beehiiv API error:", errorData);
      throw new Error(`Failed to subscribe: ${JSON.stringify(errorData)}`);
    }

    const responseData = await response.json();
    console.log("Beehiiv API response:", responseData);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Subscription error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe", details: error.message },
      { status: 500 }
    );
  }
}
