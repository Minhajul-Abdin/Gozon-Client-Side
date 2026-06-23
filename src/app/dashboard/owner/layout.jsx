import React from "react";
import { requireRole } from "@/lib/core/session";

const Ownerlayout = async ({ children }) => {
  await requireRole("owner");
  return children;
};

export default Ownerlayout;
