import { connectToDB } from "@/lib/db";
import Campaign from "@/models/Campaign";

// GET: Fetch all active campaigns
export async function GET() {
  try {
    await connectToDB();

    const campaigns = await Campaign.find({ status: true }); // Fetch only active campaigns

    return new Response(JSON.stringify(campaigns), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Failed to fetch campaigns", error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}