import React from "react";
import { Magnifier, LayoutCells, Calendar, Person } from "@gravity-ui/icons";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Magnifier className="w-6 h-6 text-indigo-400" />,
      title: "Easy Property Discovery",
      description:
        "Tenants can quickly browse and find rental homes that match their needs and budget.",
    },
    {
      icon: <LayoutCells className="w-6 h-6 text-indigo-400" />,
      title: "Simplified Property Management",
      description:
        "Owners can upload, edit, and manage all their properties from a single dashboard.",
    },
    {
      icon: <Calendar className="w-6 h-6 text-indigo-400" />,
      title: "Transparent Booking System",
      description:
        "Real-time availability and booking updates reduce confusion and double bookings.",
    },
    {
      icon: <Person className="w-6 h-6 text-indigo-400" />,
      title: "Organized User Dashboards",
      description:
        "Both tenants and owners get dedicated dashboards to track bookings, payments, and activity in one place.",
    },
  ];

  return (
    <section className="bg-zinc-950 text-zinc-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Why Choose Our Platform
          </h2>
          <p className="text-zinc-400 text-lg">
            We simplify the rental process for everyone. Whether you are
            searching for your next home or managing a portfolio, we have got
            you covered.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 hover:bg-zinc-900 hover:border-zinc-700 transition-all duration-300 ease-in-out flex flex-col sm:flex-row gap-5 items-start"
            >
              {/* Icon Container */}
              <div className="flex items-center justify-center p-3 bg-zinc-800/50 border border-zinc-700/30 rounded-xl group-hover:bg-indigo-950/40 group-hover:border-indigo-500/30 transition-colors duration-300 shrink-0">
                {feature.icon}
              </div>

              {/* Text Content */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-zinc-100 group-hover:text-white transition-colors duration-200">
                  {feature.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
