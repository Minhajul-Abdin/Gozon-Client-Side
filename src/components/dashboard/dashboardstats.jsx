import React from "react";
import { StatCard } from "./statsCard";

export const DashboardStats = ({ statsData = [] }) => {
  return (
    // Changed selection highlights to emerald accents
    <div className=" w-full p-4 md:p-6 selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Responsive Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {statsData.map((stat, index) => (
          <StatCard
            key={stat.id || index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            // Hover effect now targets slate/teal border tints instead of purple
            className="hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-0.5 group"
          />
        ))}
      </div>
    </div>
  );
};
