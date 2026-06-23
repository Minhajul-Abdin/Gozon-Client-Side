import React from "react";

const ReviewCardList = ({ review }) => {
  console.log(review);
  // Empty State: If there are no reviews, show this section instead
  if (!review || review.length === 0) {
    return (
      <div className="p-8 border border-neutral-800 border-dashed rounded-xl bg-[#111115]/10 text-center space-y-2">
        <p className="text-sm font-medium text-neutral-400">No reviews yet</p>
        <p className="text-xs text-neutral-600">
          Be the first to share your experience staying here!
        </p>
      </div>
    );
  }

  // Multiple Reviews State: Map through the array and render each review
  return (
    <div className="space-y-4">
      {review.map((reviewData) => {
        const {
          _id,
          reviewerName,
          reviewerEmail,
          reviewerImg,
          rating,
          review,
          createdAt,
        } = reviewData;

        // Format the date beautifully (e.g., "June 22, 2026")
        const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        return (
          <div
            key={_id}
            className="p-5 border border-neutral-800 rounded-xl bg-[#111115]/30 space-y-4"
          >
            {/* Header Section: Profile Pic, Name, Email, and Date */}
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                {/* Little profile pic */}
                <img
                  src={reviewerImg || "https://via.placeholder.com/40"}
                  alt={reviewerName}
                  className="w-10 h-10 rounded-full object-cover border border-neutral-700/50"
                />
                <div>
                  {/* Name */}
                  <h4 className="text-sm font-semibold text-neutral-200">
                    {reviewerName}
                  </h4>
                  {/* Email */}
                  <p className="text-xs text-neutral-500">{reviewerEmail}</p>
                </div>
              </div>

              {/* Date */}
              <span className="text-xs text-neutral-500">{formattedDate}</span>
            </div>

            {/* Rating Section */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                const isFilled = starValue <= parseInt(rating || "0", 10);
                return (
                  <svg
                    key={index}
                    className={`w-4 h-4 ${
                      isFilled
                        ? "text-indigo-400 fill-current"
                        : "text-neutral-700 fill-current"
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                );
              })}
              <span className="text-xs font-medium text-neutral-400 ml-1">
                ({rating}/5)
              </span>
            </div>

            {/* Comment Section */}
            <p className="text-sm text-neutral-300 leading-relaxed bg-[#111115]/40 p-3 rounded-lg border border-neutral-800/60">
              {review}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewCardList;
