import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid"; // For generating unique referral codes

export async function POST(request) {
  const { name, email, password } = await request.json();

  try {
    await connectToDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a unique referral code
    const referralCode = uuidv4().substring(0, 8); // Example: "a1b2c3d4"

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      referralCode, // Add the generated referral code
      role: "user", // Default role
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User registered successfully", referralCode },
      { status: 200 }
    );
  } catch (error) {
    console.error("Registration error:", error); // Log the error for debugging
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}