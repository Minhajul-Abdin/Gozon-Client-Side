"use server";
import { serverMutation } from "../core/server";
import { revalidatePath } from "next/cache";

export const creatProperty = async (newPropertyData) => {
  return serverMutation("/api/properties", newPropertyData);
};

export const updateProperty = async (id, data) => {
  serverMutation(`/api/properties/${id}`, data, "PATCH");
  revalidatePath("/dashboard/admin/allProperties");
};
