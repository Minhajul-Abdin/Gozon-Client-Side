"use server";
import { serverMutation } from "../core/server";

export const submitReview = async (newReviewData) => {
  return serverMutation("/api/review", newReviewData);
};
