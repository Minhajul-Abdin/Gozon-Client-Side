"use server";
import { serverMutation } from "../core/server";

export const submitFav = async (newBookingData) => {
  return serverMutation("/api/favourite", newBookingData);
};
