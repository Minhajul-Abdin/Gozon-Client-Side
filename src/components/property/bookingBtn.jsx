"use client";

import React from "react";

export default function BookingButton({ propertyId }) {
  const handleBooking = () => {
    // You can handle modal opening, state routing, or payment API triggers here
    alert(`Initiating booking for property ID: ${propertyId}`);
  };

  return (
    <button
      onClick={handleBooking}
      className="w-full bg-white hover:bg-neutral-200 text-black font-semibold py-3 px-4 rounded-xl transition duration-200 text-sm shadow-lg hover:shadow-white/5"
    >
      Book Now
    </button>
  );
}
