import { connectToDB } from "@/lib/db";
import User from "@/models/User";

// GET: Fetch the current user's referral code
export async function GET() {
  try {
    await connectToDB();

    // Fetch the current user's data (replace with actual user ID from session)
    const userId = "your-user-id"; // Replace with the logged-in user's ID
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return new Response(JSON.stringify({ referralCode: user.referralCode }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Failed to fetch referral code", error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}