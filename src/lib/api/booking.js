import { serverFetch } from "@/lib/core/server";

export const getBookingsByBooker = async (bookingId) => {
  return serverFetch(`/api/bookings?bookerId=${bookingId}`);
};
