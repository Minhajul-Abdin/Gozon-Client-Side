import { serverFetch, protectedFetch } from "@/lib/core/server";

export const getBookingsByBooker = async (bookingId) => {
  return protectedFetch(`/api/bookings?bookerId=${bookingId}`);
};
