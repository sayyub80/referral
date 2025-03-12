"use client";

import { useEffect, useState } from "react";
import { connectToDB } from "@/lib/db";
import User from "@/models/User";

export default function Dashboard() {
  const [totalReferrals, setTotalReferrals] = useState(0);
  const [totalRewards, setTotalRewards] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await connectToDB(); // Connect to the database

        // Fetch the current user's data (replace with actual user ID from session)
        const userId = "your-user-id"; // Replace with the logged-in user's ID
        const user = await User.findById(userId).populate("referredUsers");

        if (user) {
          // Calculate total referrals
          const referrals = user.referralCount || 0;
          setTotalReferrals(referrals);

          // Calculate total rewards
          const rewards = user.rewards || 0;
          setTotalRewards(rewards);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading dashboard...</p>; // Show a loading state
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Referrals Card */}
        <div className="p-6 bg-blue-50 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-700">Total Referrals</h2>
          <p className="text-3xl font-bold text-blue-900">{totalReferrals}</p>
        </div>

        {/* Total Rewards Card */}
        <div className="p-6 bg-green-50 rounded-lg">
          <h2 className="text-lg font-semibold text-green-700">Total Rewards</h2>
          <p className="text-3xl font-bold text-green-900">${totalRewards}</p>
        </div>
      </div>
    </div>
  );
}