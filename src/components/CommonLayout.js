"use client";

import { useSession } from "next-auth/react";
import AdminSidebar from "@/components/admin/Sidebar"; // Admin sidebar component
import UserSidebar from "@/components/Sidebar"; // User sidebar component
import AdminNavbar from "@/components/admin/Navbar"; // Admin navbar component
import UserNavbar from "@/components/Navbar"; // User navbar component

export default function CommonLayout({ children }) {
  const { data: session, status } = useSession(); // Get session data and status

  if (status === "loading") {
    return <p>Loading...</p>; // Show a loading spinner
  }

  // Determine which sidebar and navbar to render based on the user's role
  const SidebarComponent = session?.user?.role === "admin" ? AdminSidebar : UserSidebar;
  const NavbarComponent = session?.user?.role === "admin" ? AdminNavbar : UserNavbar;

  return (
    <div className="flex h-screen text-black bg-gray-100">
      {/* Sidebar */}
      <SidebarComponent />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <NavbarComponent />

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}