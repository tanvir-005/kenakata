import type { LoginResponse, User } from "@/types";
import { apiClient } from "./client";

interface LoginCredentials {
  email: string;
  password: string;
}

export async function login(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  return apiClient<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export async function getProfile(
  accessToken: string,
): Promise<User> {
  return apiClient<User>("/auth/profile", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}