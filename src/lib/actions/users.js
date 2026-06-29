"use server";
import { auth } from "../auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { serverMutation2 } from "../core/server";

export const updateUserRole = async (userRole) => {
  serverMutation2("/api/idk", userRole);
  revalidatePath("/dashboard/admin/users");
};

// export const updateUserRol = async (userId, role) => {
//   const data = await auth.api.setRole({
//     body: {
//       userId: userId,
//       user: {
//         role: role,
//       },
//     },
//     headers: await headers(),
//   });
//   console.log("this is data", data);
//   revalidatePath("/dashboard/admin/users");
//   return data;
// };
