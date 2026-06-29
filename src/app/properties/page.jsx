import PropertyCard from "@/components/property/propertyCard";
import { getProperty } from "@/lib/api/property";
import SearchBar from "@/components/searchBar";
export default async function PropertyPage() {
  const properties = await getProperty();

  return (
    <div className="min-h-screen py-10 bg-[#0A0A0A] text-zinc-100 p-4 md:p-6 relative overflow-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Background Mesh Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-7xl lg:max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-5xl pt-5 font-bold tracking-tight text-neutral-100">
            Available Properties
          </h1>
          <p className="text-neutral-400 mt-2 text-sm">
            Explore premium apartments and listings.
          </p>
        </div>

        {/* shearch bar */}
        <div>
          <SearchBar />
        </div>

        {/* 3-Column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {properties &&
            properties.map((properties) => (
              <PropertyCard key={properties._id} property={properties} />
            ))}
        </div>

        {/* Empty State Fallback */}
        {(!properties || properties.length === 0) && (
          <div className="text-center py-20 border border-dashed border-neutral-800 rounded-2xl">
            <p className="text-neutral-400">
              No properties found at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
