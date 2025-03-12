"use client";

import Dashboard from "@/components/Dashboard";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function UserDashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>; // Show a loading spinner
  }

  // if (!session) {
  //   redirect("/login");
  // }

  return (
    <Dashboard/>

  );
}