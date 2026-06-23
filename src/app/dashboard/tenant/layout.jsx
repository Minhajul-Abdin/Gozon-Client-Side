import React from "react";
import { requireRole } from "@/lib/core/session";

const Tenantlayout = async ({ children }) => {
  await requireRole("tenant");
  return children;
};

export default Tenantlayout;
