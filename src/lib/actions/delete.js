"use server";
import { serverMutation } from "../core/server";
import { revalidatePath } from "next/cache";

export const RemoveFav = async (propetryId) => {
  serverMutation("/api/favourite", { propetryId }, "DELETE");
  revalidatePath("/dashboard/tenant/favorite");
};
