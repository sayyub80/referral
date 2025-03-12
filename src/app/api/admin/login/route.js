import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import { signIn } from "next-auth/react";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectToDB();

    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return NextResponse.json(
        { error: "No admin found with this email" },
        { status: 404 }
      );
    }

    // Check password
    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    // Use NextAuth.js to sign in the admin
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      return NextResponse.json(
        { error: result.error },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Admin logged in successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to log in admin:", error);
    return NextResponse.json(
      { error: "Failed to log in admin" },
      { status: 500 }
    );
  }
}