"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await signOut();
  };

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "All Properties", href: "/properties" },
  ];

  const dashboardLinks = {
    tenant: "/dashboard/tenant",
    owner: "/dashboard/owner",
  };

  if (user?.email) {
    menuItems.push({
      label: "Dashboard",
      href: dashboardLinks[user?.role || "tenant"],
    });
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-[#c7ccd2] backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative">
        {/* Mobile Menu Button - Left Aligned */}
        <div className="flex sm:hidden">
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:bg-gray-100/60 focus:outline-none"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? (
              // Close X Icon
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Hamburger Menu Icon
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Brand / Logo - Left aligned on desktop, centered absolutely on mobile */}
        <div className="max-sm:absolute max-sm:left-1/2 max-sm:-translate-x-1/2 flex-shrink-0">
          <Link
            href="/"
            className="font-black text-xl tracking-[0.2em] text-black uppercase select-none"
          >
            GOZON
          </Link>
        </div>

        {/* Desktop Middle Navigation - HTML5 nav element */}
        <nav className="hidden sm:flex items-center space-x-4 absolute left-1/2 -translate-x-1/2">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-gray-700 hover:text-black transition-colors px-3 py-1.5 rounded-md hover:bg-gray-100/60"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Right Actions */}

        {user ? (
          <div className="hidden sm:flex items-center space-x-3">
            <Button
              className="inline-flex items-center justify-center text-sm font-medium text-red-700 hover:text-black hover:bg-gray-100/60 transition-colors px-4 py-2 rounded-md"
              variant="ghost"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </div>
        ) : (
          <div className="hidden sm:flex items-center space-x-3">
            <Link
              href="/auth/signin"
              className="inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-100/60 transition-colors px-4 py-2 rounded-md"
            >
              Login
            </Link>
            <Link
              href="/auth/registration"
              className="inline-flex items-center justify-center bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors px-4 py-2 rounded-md"
            >
              Register
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Dropdown Panel - Fullwidth Canvas overlaying content */}
      {isMenuOpen && (
        <nav className="sm:hidden absolute top-16 left-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg px-6 py-4 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-200">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="w-full text-gray-800 font-medium py-2 text-lg border-b border-gray-100 block"
            >
              {item.label}
            </Link>
          ))}

          {/* Mobile Auth CTAs */}

          {user ? (
            <div className="hidden sm:flex items-center space-x-3">
              <Button
                className="inline-flex items-center justify-center text-sm font-medium text-red-700 hover:text-black hover:bg-gray-100/60 transition-colors px-4 py-2 rounded-md"
                variant="ghost"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="pt-4 flex flex-col gap-3">
              <Link
                href="/auth/signin"
                onClick={() => setIsMenuOpen(false)}
                className="w-full inline-flex items-center justify-center border border-gray-300 text-gray-800 font-medium py-2.5 rounded-md text-center"
              >
                Login
              </Link>
              <Link
                href="/auth/registration"
                onClick={() => setIsMenuOpen(false)}
                className="w-full inline-flex items-center justify-center bg-black text-white font-medium py-2.5 rounded-md text-center"
              >
                Register
              </Link>
            </div>
          )}
        </nav>
      )}
    </header>
  );
}
