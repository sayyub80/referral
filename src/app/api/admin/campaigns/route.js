import { connectToDB } from "@/lib/db";
import Campaign from "@/models/Campaign";

// POST: Create a new campaign
export async function POST(request) {
  const { name, description, duration, status, rewardType, rewardFormat, discountValue, additionalNotes, aiOptimization, message, selectedMessage, createdBy } = await request.json();

  try {
    await connectToDB();


    const newCampaign = new Campaign({
      name,
      description,
      duration,
      status,
      rewardType,
      rewardFormat,
      discountValue,
      additionalNotes,
      aiOptimization,
      message,
      selectedMessage,
      createdBy,
    });

    await newCampaign.save();

    return new Response(JSON.stringify({ message: "Campaign created successfully", campaign: newCampaign }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Failed to create campaign", error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// GET: Fetch all campaigns
export async function GET() {
  try {
    await connectToDB();

    const campaigns = await Campaign.find({}).populate("createdBy", "name email");

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