import { connectToDB } from "@/lib/db";
import User from "@/models/User";

// GET: Fetch all users
export async function GET() {
  try {
    await connectToDB();

    const users = await User.find({});

    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Failed to fetch users", error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}