import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@/lib/db";
import User from "@/models/User";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" }, // Role to differentiate between user and admin
      },
      async authorize(credentials) {
        await connectToDB();

        const { email, password, role } = credentials;

        // Validate role
        if (role !== "user" && role !== "admin") {
          throw new Error("Invalid role");
        }

        // Determine which model to use based on role
        const model = role === "admin" ? Admin : User;

        // Find user/admin by email
        const user = await model.findOne({ email });
        if (!user) {
          throw new Error("No user/admin found with this email");
        }

        // Check password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          throw new Error("Invalid password");
        }

        // Return user/admin object with role
        return { id: user._id, name: user.name, email: user.email, role: role };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role; // Add role to the token
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role; // Add role to the session
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login", // Default login page (optional)
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };