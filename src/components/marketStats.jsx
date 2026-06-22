import React from "react";
import {
  ChartBar,
  ShieldCheck,
  ThunderboltFill,
  Ticket,
} from "@gravity-ui/icons";

export default function MarketStats() {
  const stats = [
    {
      icon: <ChartBar className="w-5 h-5 text-emerald-400" />,
      value: "2,400+",
      label: "Active Listings",
      caption: "Updated 5m ago",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      value: "100%",
      label: "Verified Owners",
      caption: "Zero ghost ads",
    },
    {
      icon: <ThunderboltFill className="w-5 h-5 text-emerald-400" />,
      value: "48hrs",
      label: "Avg. Match Time",
      caption: "From search to key",
    },
    {
      icon: <Ticket className="w-5 h-5 text-emerald-400" />,
      value: "0%",
      label: "Double Bookings",
      caption: "Guaranteed sync",
    },
  ];

  return (
    <section className="bg-zinc-950 text-zinc-100 py-12 px-4 sm:px-6 lg:px-8 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto">
        {/* Simple 4-Column Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group flex flex-col space-y-2 p-2 border-l border-zinc-800 hover:border-emerald-500/40 pl-4 transition-colors duration-300"
            >
              {/* Icon & Mini Caption */}
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-wider">
                {stat.icon}
                <span>{stat.caption}</span>
              </div>

              {/* Big Stat Value */}
              <div className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 group-hover:text-white transition-colors">
                {stat.value}
              </div>

              {/* Label */}
              <div className="text-sm text-zinc-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
