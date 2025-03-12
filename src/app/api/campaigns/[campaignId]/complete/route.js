import { connectToDB } from "@/lib/db";
import Campaign from "@/models/Campaign";

// POST: Complete the task and generate a discount code
export async function POST(request, { params }) {
  try {
    await connectToDB();

    const { campaignId } = params;
    const { name, email } = await request.json();

    // Find the campaign
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      throw new Error("Campaign not found");
    }

    // Generate a discount code (example logic)
    const discountCode = `DISCOUNT-${Math.floor(Math.random() * 1000000)}`;

    // Save the task completion (you can store this in the database if needed)
    console.log(`Task completed by ${name} (${email}) for campaign ${campaignId}. Discount code: ${discountCode}`);

    return new Response(JSON.stringify({ discountCode }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Failed to complete the task", error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}