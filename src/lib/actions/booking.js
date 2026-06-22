"use server";
import { serverMutation } from "../core/server";

export const submitBookings = async (newBookingData) => {
  return serverMutation("/api/bookings", newBookingData);
};
