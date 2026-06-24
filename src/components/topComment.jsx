import React from "react";
import { getReviewForHome } from "@/lib/api/reviewHome";

// Sample data featuring 4 cards tailored for property/tenant context

export default async function TenantReviewSection() {
  const reviewsData = await getReviewForHome();
  console.log("this is review", reviewsData);

  const renderStars = (ratingStr) => {
    const num = parseInt(ratingStr, 10) || 0;
    return Array.from({ length: 5 }).map((_, index) => (
      <svg
        key={index}
        className={`h-4 w-4 ${index < num ? "text-amber-400 fill-amber-400" : "text-zinc-700 fill-zinc-700"}`}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  // Helper to format dates cleanly
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section className="py-30 px-4 w-full mx-auto bg-zinc-950 text-zinc-100">
      {/* Title Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Community Feedback
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-zinc-400">
          Hear from the tenants and property owners utilizing our management
          ecosystem.
        </p>
      </div>

      {/* 4-Column Layout Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {reviewsData.map((review) => (
          <div
            key={review._id}
            className="flex flex-col justify-between p-6 bg-zinc-900 border border-zinc-800/80 rounded-2xl shadow-xl hover:border-indigo-500/40 transition-all duration-300 group"
          >
            <div>
              {/* Profile details */}
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={review.reviewerImg}
                  alt={review.reviewerName}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500/20 group-hover:ring-indigo-500/50 transition-all"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-zinc-100 truncate">
                    {review.reviewerName}
                  </h3>
                  <p className="text-xs text-zinc-500 truncate">
                    {review.reviewerEmail}
                  </p>
                </div>
              </div>

              {/* Stars & Creation Date */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-0.5">
                  {renderStars(review.rating)}
                </div>
                <span className="text-xs text-zinc-500">
                  {formatDate(review.createdAt)}
                </span>
              </div>

              {/* Feedback Content */}
              <p className="text-sm text-zinc-300 leading-relaxed min-h-[60px]">
                {review.review}
              </p>
            </div>

            {/* New Property-focused Accent Badge */}
            <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-md">
                Verified Tenant
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
