"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const userRole = user?.userRole?.toLowerCase() || "tenant";

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
    admin: "/dashboard/admin",
  };

  if (user?.email) {
    menuItems.push({
      label: "Dashboard",
      href: dashboardLinks[userRole],
    });
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-900 shadow-[0_4px_30px_rgba(0,0,0,0.4)] font-sans">
      {/* Premium System-Wide Hairline Accent Strip */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500/50 via-violet-500/50 to-amber-500/50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative">
        {/* Mobile Menu Action Trigger */}
        <div className="flex sm:hidden">
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center justify-center p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900/60 border border-transparent hover:border-zinc-800 transition-all focus:outline-none"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation matrix"
          >
            {isMenuOpen ? (
              <svg
                className="h-5 w-5"
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
              <svg
                className="h-5 w-5"
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

        {/* Tactical Brand Node Alignment */}
        <div className="max-sm:absolute max-sm:left-1/2 max-sm:-translate-x-1/2 flex-shrink-0">
          <Link
            href="/"
            className="font-mono font-black text-xl tracking-[0.25em] text-zinc-100 hover:text-white uppercase select-none transition-colors drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          >
            GOZON
          </Link>
        </div>

        {/* Center Anchored Matrix Routes */}
        <nav className="hidden sm:flex items-center space-x-1 absolute left-1/2 -translate-x-1/2">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-xs font-mono font-medium text-zinc-400 hover:text-zinc-100 transition-all px-3 py-1.5 rounded-lg border border-transparent hover:border-zinc-900/60 hover:bg-zinc-900/20"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Dashboard Profile Control Actions */}
        <div className="hidden sm:flex items-center space-x-3">
          {user ? (
            <div className="flex items-center gap-3.5">
              {/* Rich Identity Block Component */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/80 border border-zinc-800 shadow-[inset_0_0_12px_rgba(255,255,255,0.03)] font-mono text-xs text-zinc-300 select-none">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    userRole === "admin"
                      ? "bg-violet-500 shadow-[0_0_8px_#8b5cf6]"
                      : userRole === "owner"
                        ? "bg-amber-500 shadow-[0_0_8px_#f59e0b]"
                        : "bg-emerald-500 shadow-[0_0_8px_#10b85f]"
                  }`}
                />
                <span>{user.name || "Identity Stack"}</span>
              </div>

              <Button
                className="text-xs font-mono font-medium text-red-400/90 hover:text-red-400 bg-red-950/10 hover:bg-red-950/20 border border-red-900/30 rounded-xl px-4 h-9 transition-all"
                variant="flat"
                onClick={handleSignOut}
              >
                Log Out
              </Button>
            </div>
          ) : (
            <>
              <Link
                href="/auth/signin"
                className="inline-flex items-center justify-center text-xs font-mono font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/40 border border-transparent hover:border-zinc-800 transition-all px-4 h-9 rounded-lg"
              >
                Login
              </Link>
              <Link
                href="/auth/registration"
                className="inline-flex items-center justify-center bg-zinc-100 text-zinc-950 text-xs font-mono font-bold hover:bg-white transition-all px-4 h-9 rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Rich Mobile Panel Slide Overlay */}
      {isMenuOpen && (
        <nav className="sm:hidden absolute top-16 left-0 w-full bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-900 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] px-6 py-5 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="text-[10px] font-mono tracking-widest text-zinc-600 uppercase mb-1">
            Navigation Matrix
          </div>

          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="w-full text-zinc-300 font-medium py-2.5 text-base border-b border-zinc-900/60 hover:text-white flex items-center justify-between group transition-colors"
            >
              <span>{item.label}</span>
              <span className="text-zinc-700 font-mono text-xs group-hover:text-zinc-400 transition-colors">
                →
              </span>
            </Link>
          ))}

          {/* Mobile Profile Systems Blocks */}
          {user ? (
            <div className="pt-4 flex flex-col gap-3">
              <div className="flex items-center gap-2 px-3 py-3 rounded-xl bg-zinc-900/40 border border-zinc-900 font-mono text-xs text-zinc-400 shadow-[inset_0_0_10px_rgba(255,255,255,0.01)]">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    userRole === "admin"
                      ? "bg-violet-500"
                      : userRole === "owner"
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                  }`}
                />
                Security Access: {userRole.toUpperCase()}
              </div>
              <Button
                className="w-full justify-center text-sm font-mono font-medium text-red-400 bg-red-950/20 hover:bg-red-950/30 border border-red-900/40 rounded-xl py-6 tracking-wide"
                variant="flat"
                onClick={() => {
                  setIsMenuOpen(false);
                  handleSignOut();
                }}
              >
                Log Out
              </Button>
            </div>
          ) : (
            <div className="pt-4 flex flex-col gap-3 font-mono text-xs">
              <Link
                href="/auth/signin"
                onClick={() => setIsMenuOpen(false)}
                className="w-full inline-flex items-center justify-center border border-zinc-800 bg-zinc-900/20 text-zinc-300 font-medium py-3 rounded-xl text-center hover:bg-zinc-900 hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                href="/auth/registration"
                onClick={() => setIsMenuOpen(false)}
                className="w-full inline-flex items-center justify-center bg-zinc-100 text-zinc-950 font-bold py-3 rounded-xl text-center hover:bg-white transition-colors shadow-[0_0_15px_rgba(255,255,255,0.05)]"
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
