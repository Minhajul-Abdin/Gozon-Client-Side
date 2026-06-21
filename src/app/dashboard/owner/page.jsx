"use client";
import React from "react";
import { useSession, signOut } from "@/lib/auth-client";
import { Spinner } from "@heroui/react";
import { House, SealCheck, CircleDollar } from "@gravity-ui/icons";
import { DashboardStats } from "@/components/dashboard/dashboardstats";

const ownerDashboard = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    <div className="flex flex-col items-center gap-2">
      <Spinner size="xl" />
    </div>;
  }

  const ownerStats = [
    { title: "Total Earnings", value: "18$", icon: CircleDollar },
    { title: "Total Properties", value: "48", icon: House },
    { title: "Total Bookings", value: "32", icon: SealCheck },
  ];

  const user = session?.user;
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-100 p-4 md:p-6 relative overflow-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Background Mesh Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

      <h2 className="text-2xl font-bold p-4">Welcome Back, {user?.name}</h2>
      <DashboardStats statsData={ownerStats} />
    </div>
  );
};

export default ownerDashboard;
