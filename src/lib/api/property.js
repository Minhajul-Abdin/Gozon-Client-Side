import { serverFetch } from "@/lib/core/server";

export const getProperty = async () => {
  return serverFetch(`/api/properties`);
};

export const getPropertyById = async (propertyId) => {
  return serverFetch(`/api/properties/${propertyId}`);
};

export const getMyproperties = async (ownerId, status = "pending") => {
  return serverFetch(`/api/properties?ownerId=${ownerId}`);
};
