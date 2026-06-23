import React from "react";
import { getAllProperty } from "@/lib/api/property";
import { getUserSession } from "@/lib/core/session";
import PropertyTable from "@/components/PropertyTable"; // Adjust path to where you saved the table snippet above

const adminAllPropertyPage = async () => {
  const properties = await getAllProperty();
  const user = await getUserSession();
  const ownerId = user?.id;
  console.log(ownerId);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-100 p-4 md:p-6 relative overflow-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Background Mesh Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="p-6 max-w-7xl mx-auto space-y-4 rounded-none relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold tracking-tight">
              Manage All Properties
            </h2>
            <p className="text-sm text-default-500">
              View, update, and manage all property postings.
            </p>
          </div>
        </div>

        {/* This Client Component handles the interactivity now */}
        <PropertyTable properties={properties} />
      </div>
    </div>
  );
};

export default adminAllPropertyPage;
