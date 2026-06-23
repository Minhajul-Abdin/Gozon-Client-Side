import { serverFetch } from "@/lib/core/server";

export const getRewiews = async (propertyId) => {
  return serverFetch(`/api/review?propertyId=${propertyId}`);
};

export const getFeaturedProperty = async () => {
  return serverFetch(`/api/featured/properties`);
};

export const getProperty = async () => {
  return serverFetch(`/api/properties`);
};

export const getAllProperty = async () => {
  return serverFetch(`/api/allProperties`);
};

export const getPropertyById = async (propertyId) => {
  return serverFetch(`/api/properties/${propertyId}`);
};

export const getMyproperties = async (ownerId, status = "pending") => {
  return serverFetch(`/api/properties?ownerId=${ownerId}`);
};

export const getMyBookings = async (userId, status = "pending") => {
  return serverFetch(`/api/bookings?bookerId=${userId}`);
};
