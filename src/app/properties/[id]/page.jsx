"use server";
import React from "react";
import { redirect } from "next/navigation";
import { getPropertyById } from "@/lib/api/property";
import { getUserSession } from "@/lib/core/session";
import { getRewiews } from "@/lib/api/property";
import BookingButton from "@/components/property/bookingBtn";
import ReviewForm from "@/components/reviewForm";
import ReviewCardList from "@/components/ReviewCard";

export default async function PropertyDetailsPage({ params }) {
  const { id } = await params;
  const review = await getRewiews(id);
  const property = await getPropertyById(id);

  const user = await getUserSession();

  if (!property) {
    return (
      <div className="min-h-screen bg-[#0d0d12] text-white flex items-center justify-center">
        <p className="text-neutral-400">Property not found.</p>
      </div>
    );
  }

  if (!user) {
    redirect(`/auth/signin?redirect=/properties/${id}`);
  }

  {
    /*if (user?.role !== "tenant") {
    return (
      <div className="w-full min-h-screen bg-zinc-950 flex flex-col justify-center items-center text-white p-6 text-3xl">
        Sorry Only Tenants Can Book. Sign In With an Tenant Account
      </div>
    );
  }*/
  }

  // Fallback if selectedAmenities is missing or empty
  const allAmenities = property.selectedAmenities?.length
    ? property.selectedAmenities
    : [property.amenities].filter(Boolean);

  return (
    <div className="min-h-screen py-20 bg-[#0A0A0A] text-zinc-100 relative overflow-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Background Mesh Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Main Image Showcase */}
        <div className="relative h-[400px] w-full overflow-hidden rounded-2xl border border-neutral-800 bg-[#111115]">
          <img
            src={property?.images || "https://via.placeholder.com/1200x800"}
            alt={property?.propertyTitle}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-emerald-500/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-sm">
            {property?.status}
          </div>
        </div>

        {/* Two Column Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <span className="text-xs uppercase font-semibold text-neutral-400 tracking-wider">
                {property?.propertyType} • For Rent ({property?.rentType})
              </span>
              <h1 className="text-3xl font-bold tracking-tight text-neutral-100 mt-1">
                {property?.propertyTitle}
              </h1>
              <p className="text-neutral-400 mt-1">{property?.location}</p>
            </div>

            {/* Core Specs Grid */}
            <div className="grid grid-cols-3 gap-4 p-4 border border-neutral-800 rounded-xl bg-[#111115]/50 text-center">
              <div>
                <p className="text-xs text-neutral-500">Bedrooms</p>
                <p className="text-lg font-semibold text-neutral-200">
                  {property?.bedrooms}
                </p>
              </div>
              <div>
                <p className="text-xs text-neutral-500">Bathrooms</p>
                <p className="text-lg font-semibold text-neutral-200">
                  {property?.bathrooms}
                </p>
              </div>
              <div>
                <p className="text-xs text-neutral-500">Size</p>
                <p className="text-lg font-semibold text-neutral-200">
                  {property?.propertySize} sqft
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-neutral-200">
                About this place
              </h3>
              <p className="text-neutral-400 leading-relaxed text-sm">
                {property?.description}
              </p>
            </div>

            {/* Amenities & Extras */}
            <div className="border-t border-neutral-800 pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-neutral-300 mb-2">
                  Amenities
                </h4>
                <div className="flex flex-wrap gap-2">
                  {allAmenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="text-xs bg-neutral-800/60 text-neutral-300 px-2.5 py-1 rounded-md"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              {property?.extraFeatures && (
                <div>
                  <h4 className="text-sm font-semibold text-neutral-300 mb-2">
                    Extra Features
                  </h4>
                  <span className="text-xs bg-indigo-950/40 text-indigo-300 border border-indigo-900/50 px-2.5 py-1 rounded-md inline-block">
                    {property?.extraFeatures}
                  </span>
                </div>
              )}
            </div>

            {/* Review Section */}
            <div className="border-t border-neutral-800 pt-6 space-y-4">
              <h3 className="text-lg font-semibold text-neutral-200">
                Reviews & Ratings
              </h3>

              <ReviewForm propertyId={property?._id} />
            </div>

            {/*Review showcase section */}
            <div>
              <ReviewCardList review={review} />
            </div>
          </div>

          {/* Right Column: Pricing & Booking Card */}
          <div className="border border-neutral-800 rounded-2xl bg-[#111115] p-6 space-y-6 sticky top-6">
            <div>
              <p className="text-xs text-neutral-400">Rent Price</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-bold tracking-tight text-neutral-100">
                  ৳{Number(property?.rentPrice).toLocaleString()}
                </span>
                <span className="text-sm text-neutral-400">
                  /{property?.rentType.toLowerCase()}
                </span>
              </div>
            </div>

            {/* Interactive Booking Component */}
            <BookingButton
              propertyId={property?._id}
              property={property}
              user={user}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
