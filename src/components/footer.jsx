"use client";
import React from "react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-zinc-950 text-zinc-50 border-t border-zinc-900/80 font-sans mt-auto relative overflow-hidden">
      {/* Neon Lighting Effects */}
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-amber-500/[0.03] blur-[120px] rounded-full pointer-events-none" />

      {/* Upper Section: Core Links and Branding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
          {/* Column 1: Brand Pitch */}
          <div className="space-y-4">
            <Link
              href="/"
              className="font-black text-xl tracking-[0.2em] text-white uppercase block hover:text-emerald-400 transition-colors duration-300 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]"
            >
              GOZON
            </Link>
            <p className="text-zinc-400 text-sm max-w-xs leading-relaxed font-light">
              A premium, streamlined marketplace bridging property owners and
              tenants without the noise. Find your home. Post your space.
            </p>
          </div>

          {/* Column 2: Discover Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4 font-mono">
              Discover
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/properties"
                  className="text-sm font-medium text-zinc-400 hover:text-emerald-400 hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.5)] transition-all duration-200"
                >
                  All Properties
                </Link>
              </li>
              <li>
                <Link
                  href="/features"
                  className="text-sm font-medium text-zinc-400 hover:text-emerald-400 hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.5)] transition-all duration-200"
                >
                  Featured Houses
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Portals */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4 font-mono">
              Portals
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/login"
                  className="text-sm font-medium text-zinc-400 hover:text-amber-400 hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.5)] transition-all duration-200"
                >
                  Tenant Portal
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-sm font-medium text-zinc-400 hover:text-amber-400 hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.5)] transition-all duration-200"
                >
                  List Your Property
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-sm font-medium text-zinc-400 hover:text-amber-400 hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.5)] transition-all duration-200"
                >
                  Trust & Safety
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Box */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 font-mono">
              Stay Updated
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed font-light">
              Signup to receive updates on premium spaces matching your
              criteria.
            </p>
            <div className="pt-2">
              <Link
                href={"/register"}
                className="inline-block bg-zinc-900 text-zinc-100 border border-zinc-800 px-5 py-2.5 text-sm font-medium rounded-md hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-300 shrink-0"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Section: Legalities & Fine Print */}
      <div className="border-t border-zinc-900/60 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 relative z-10">
          {/* Copyright */}
          <div className="font-light">
            &copy; {currentYear}{" "}
            <span className="text-zinc-400 font-medium">RENTAL Inc.</span> All
            rights reserved.
          </div>

          {/* Micro Footer Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link
              href="/privacy"
              className="hover:text-zinc-300 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-zinc-300 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="hover:text-zinc-300 transition-colors"
            >
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
