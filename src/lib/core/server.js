"use server";

import { getUserToken } from "./session";
import { redirect } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const authHeaders = async () => {
  const token = await getUserToken();
  const header = token
    ? {
        authorization: `Bearer ${token}`,
      }
    : {};
  return header;
};

export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`);
  return handlestatusCode(res);
};

export const protectedFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`, {
    headers: await authHeaders(),
  });
  return res.json();
};

export const serverMutation = async (path, data, method = "POST") => {
  console.log(path, data, "this is path and data info");
  const res = await fetch(`${baseUrl}${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...(await authHeaders()),
    },
    body: JSON.stringify(data),
  });

  return handlestatusCode();
};

const handlestatusCode = (res) => {
  if (res.status === 401) {
    redirect("/unauthorized");
  } else if (res.status === 401) {
    redirect("/unauthorized");
  }
  return res.json();
};
