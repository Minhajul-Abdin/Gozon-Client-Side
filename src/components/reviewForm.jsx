"use client";
import React from "react";
import { submitReview } from "@/lib/actions/review";
import { toast } from "react-toastify";
import { getUserSession } from "@/lib/core/session";
//import { redirect } from "next/navigation";

const ReviewForm = ({ propertyId, property }) => {
  const handleReview = async (e) => {
    e.preventDefault();

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    const data = Object.fromEntries(formData.entries());

    const user = await getUserSession();

    const payload = {
      ...data,
      reviewerName: user?.name,
      reviewerEmail: user?.email,
      reviewerImg: user?.image,
      propertyId: propertyId,
    };
    //console.log("post data: ", payload);

    const res = await submitReview(payload);
    if (res?.insertedId) {
      toast.success("Review posted successfully!");
      formElement.reset(); // Use the stored reference to reset the form safely
    }
  };

  return (
    <div className="border-t border-neutral-800 pt-6 space-y-4">
      <form
        onSubmit={handleReview}
        className="space-y-4 p-5 border border-neutral-800 rounded-xl bg-[#111115]/30"
      >
        {/* Give Rating Dropdown (0-5) */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-300">
            Give Rating
          </label>
          <div className="relative max-w-[120px]">
            <select
              name="rating"
              className="w-full bg-[#111115] border border-neutral-800 rounded-lg p-2.5 text-sm text-neutral-200 focus:outline-none focus:border-indigo-500/50 transition-colors appearance-none cursor-pointer"
              defaultValue="5"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-neutral-500">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Write Review */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-300">
            Write Review
          </label>
          <textarea
            name="review"
            rows={4}
            placeholder="Share your experience staying at this place..."
            className="w-full bg-[#111115] border border-neutral-800 rounded-lg p-3 text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-indigo-500/50 transition-colors"
          />
        </div>

        <button
          type="submit"
          className="w-full md:w-auto px-5 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-sm font-medium rounded-lg transition-colors duration-150 border border-neutral-700/50"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
