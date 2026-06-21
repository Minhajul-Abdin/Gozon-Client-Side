"use client";
import React from "react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white text-black border-t border-gray-100 font-sans mt-auto">
      {/* Upper Section: Core Links and Branding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
          {/* Column 1: Brand Pitch */}
          <div className="space-y-4">
            <Link
              href="/"
              className="font-black text-xl tracking-[0.2em] text-black uppercase block"
            >
              GOZON
            </Link>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
              A premium, streamlined marketplace bridging property owners and
              tenants without the noise. Find your home. Post your space.
            </p>
          </div>

          {/* Column 2: Discover Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
              Discover
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/properties"
                  className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
                >
                  All Properties
                </Link>
              </li>
              <li>
                <Link
                  href="/features"
                  className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
                >
                  Featured Houses
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Portals */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
              Portals
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
                >
                  Tenant Portal
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
                >
                  List Your Property
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
                >
                  Trust & Safety
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Box */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Stay Updated
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Signup to receive updates on premium spaces matching your
              criteria.
            </p>
            <Link
              href={"/register"}
              className="bg-black text-white px-5 py-2 text-sm font-medium rounded-md hover:bg-gray-800 transition-colors shrink-0"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Lower Section: Legalities & Fine Print */}
      <div className="border-t border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          {/* Copyright */}
          <div>&copy; {currentYear} RENTAL Inc. All rights reserved.</div>

          {/* Micro Footer Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link
              href="/privacy"
              className="hover:text-black transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-black transition-colors">
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="hover:text-black transition-colors"
            >
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
