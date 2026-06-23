"use server";
import { serverMutation } from "../core/server";

export const creatProperty = async (newPropertyData) => {
  return serverMutation("/api/properties", newPropertyData);
};

export const updateProperty = async (id, data) => {
  return serverMutation(`/api/properties/${id}`, data, "PATCH");
};
