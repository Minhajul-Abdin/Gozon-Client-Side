import React from "react";
import PropertyCard from "@/components/property/propertyCard";
import { getFeaturedProperty } from "@/lib/api/property";
import Link from "next/link";
import AnimatedGridList from "./AnimatedGridList"; // Imported below

export default async function FeaturedProperties() {
  const properties = await getFeaturedProperty();

  return (
    <section className="relative overflow-hidden bg-zinc-950 text-zinc-50 py-24 px-6 sm:px-12 lg:px-24">
      {/* Subtle Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-zinc-800/60 pb-8">
          <div className="max-w-2xl">
            {/* Modern Eyebrow Tag */}
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-mono uppercase tracking-wider mb-4">
              Featured Collections
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Find Your Perfect Space
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed font-light">
              From cozy apartments to luxurious villas, explore featured
              properties designed to feel like home from the very first step.
            </p>
          </div>

          {/* Optional Action/Decorative Link for modern aesthetics */}
          <div className="shrink-0">
            <Link
              href={"/properties"}
              className="group flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-amber-500 transition-colors duration-300"
            >
              Explore All Properties
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7 7.5M21 12H3" // Cleaned up syntax typo from original code (7x.5 -> 7)
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Properties Grid with Framer Motion Integration */}
        {properties && properties.length > 0 ? (
          <AnimatedGridList properties={properties} />
        ) : (
          <div className="text-center py-12 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/20">
            <p className="text-zinc-500">
              No featured properties available at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
