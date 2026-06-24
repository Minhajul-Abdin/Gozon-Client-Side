import { serverFetch } from "@/lib/core/server";

export const getReviewForHome = async () => {
  return serverFetch(`/api/review`);
};
