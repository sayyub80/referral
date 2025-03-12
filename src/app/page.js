"use client"; // Mark this as a Client Component

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession(); // Get the session data

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Welcome to the Home Page</h1>

      {session ? (
        // If user is logged in
        <div>
          {session.user.role === "admin" ? (
            // Admin-specific content
            <div>
              <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
              <p className="text-gray-700">
                Welcome, Admin! You have access to all administrative features.
              </p>
              <ul className="list-disc list-inside mt-4">
                <li>Manage Users</li>
                <li>View Reports</li>
                <li>Configure Settings</li>
              </ul>
            </div>
          ) : (
            // User-specific content
            <div>
              <h2 className="text-2xl font-semibold mb-4">User Dashboard</h2>
              <p className="text-gray-700">
                Welcome, User! Here are your personalized features.
              </p>
              <ul className="list-disc list-inside mt-4">
                <li>View Profile</li>
                <li>Check Notifications</li>
                <li>Access Resources</li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        // If user is not logged in
        <div>
          <h2 className="text-2xl font-semibold mb-4">Welcome, Guest!</h2>
          <p className="text-gray-700">
            Please log in to access your dashboard.
          </p>
        </div>
      )}
    </div>
  );
}