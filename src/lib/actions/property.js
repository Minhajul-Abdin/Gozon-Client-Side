"use server";
import { serverMutation } from "../core/server";

export const creatProperty = async (newPropertyData) => {
  return serverMutation("/api/properties", newPropertyData);
};
