import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Campaign from "@/models/Campaign";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    // Get the current session (to verify admin)
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized: Admin not logged in" },
        { status: 401 }
      );
    }

    // Connect to the database
    await connectToDB();

    // Fetch all campaigns created by the admin
    const campaigns = await Campaign.find({ createdBy: session.user.id });

    return NextResponse.json(campaigns);
  } catch (error) {
    console.error("Failed to fetch campaigns:", error);
    return NextResponse.json(
      { error: "Failed to fetch campaigns" },
      { status: 500 }
    );
  }
}