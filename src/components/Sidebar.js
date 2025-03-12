"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname(); // Get the current route

  // Sidebar links
  const links = [
    { href: "/user/dashboard", label: "Dashboard" },
    { href: "/user/campaign", label: "Campaigns" },
   
  ];

  return (
    <div className="text-black h-screen bg-white w-52 border-r">
      <div className="p-4">
        {/* Logo */}
        <div className="font-bold ml-2 text-lg">RefferalHub</div>
        <br />

        {/* Sidebar Links */}
        <nav>
          <ul>
            {links.map((link) => (
              <li key={link.href} className="mb-4">
                <Link
                  href={link.href}
                  className={`flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded ${
                    pathname === link.href ? "bg-gray-200" : ""
                  }`}
                >
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
