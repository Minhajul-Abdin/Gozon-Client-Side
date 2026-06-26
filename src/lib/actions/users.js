"use server";
import { auth } from "../auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export const updateUserRole = async (userId, role) => {
  const data = await auth.api.setRole({
    body: {
      userId: userId,
      role: role,
    },
    headers: await headers(),
  });
  revalidatePath("/dashboard/admin/users");
  return data;
};
