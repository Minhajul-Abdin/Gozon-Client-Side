import React from "react";
import { Compass, Pin } from "@gravity-ui/icons";

export default function FeaturedLocations() {
  const locations = [
    { name: "Dhaka", type: "Capital City", stats: "Primary Hub" },
    { name: "Uttara", type: "Residential Area", stats: "North Sector" },
    { name: "Dhanmondi", type: "Lake & Culture", stats: "West Sector" },
    { name: "Mirpur", type: "Sports & Transit", stats: "North-West" },
    { name: "Gulshan", type: "Diplomatic & Business", stats: "East Sector" },
  ];

  return (
    <section className="bg-slate-950 text-slate-100 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle Map Grid/Radar Lines Background Accents */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-mono uppercase tracking-wider mb-4">
            <Compass className="w-3.5 h-3.5 animate-pulse" />
            Regional Index
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
            Explore Prime Rental Hotspots
          </h2>
          <p className="text-slate-400 text-lg">
            Navigate through our top-tier sectors. Instantly filter rental
            properties based on the most connected hubs in the city.
          </p>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {locations.map((loc, index) => (
            <div
              key={index}
              className="group relative bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-xl p-5 hover:bg-slate-900 hover:border-emerald-500/40 transition-all duration-300 ease-in-out flex flex-col justify-between min-h-[140px] cursor-pointer shadow-lg"
            >
              {/* Map Accent Lines (Top and Right Borders on Hover) */}
              <div className="absolute top-0 left-0 w-0 h-[1px] bg-emerald-500/50 group-hover:w-full transition-all duration-300" />
              <div className="absolute top-0 right-0 h-0 w-[1px] bg-emerald-500/50 group-hover:h-full transition-all duration-300" />

              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-mono text-slate-500 tracking-widest block uppercase mb-1">
                    {loc.stats}
                  </span>
                  <h3 className="text-xl font-bold text-slate-100 group-hover:text-emerald-400 transition-colors duration-200">
                    {loc.name}
                  </h3>
                </div>

                {/* Map Pin Icon */}
                <div className="p-2 bg-slate-800/60 border border-slate-700/40 rounded-lg group-hover:bg-emerald-950/40 group-hover:border-emerald-500/30 transition-colors duration-300 text-slate-400 group-hover:text-emerald-400">
                  <Pin className="w-4 h-4" />
                </div>
              </div>

              {/* Card Footer info resembling map coordinates layout */}
              <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>{loc.type}</span>
                <span className="opacity-0 group-hover:opacity-100 text-emerald-400 transition-opacity duration-200 flex items-center gap-1">
                  VIEW MAP &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
