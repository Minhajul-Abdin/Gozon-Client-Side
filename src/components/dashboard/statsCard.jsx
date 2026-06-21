import React from "react";
import { Card } from "@heroui/react";

export const StatCard = ({ title, value, icon: Icon, className = "" }) => {
  return (
    <Card
      className={`bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-2 shadow-[0_4px_30px_rgba(0,0,0,0.4)] ${className}`}
    >
      <Card.Content className="flex flex-col gap-6 justify-between p-4">
        {/* Icon Wrapper - Now using an emerald-to-teal transition on card hover */}
        {Icon && (
          <div className="w-full flex justify-center items-center">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-800/50 border border-zinc-700/30 text-zinc-400 transition-all duration-300 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20">
              <Icon width={20} height={20} />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-center font-medium uppercase tracking-wider text-zinc-500">
            {title}
          </span>
          {/* Premium text gradient now flows from white to a soft mint slate */}
          <span className="text-3xl text-center font-bold tracking-tight text-white bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
            {value}
          </span>
        </div>
      </Card.Content>
    </Card>
  );
};
