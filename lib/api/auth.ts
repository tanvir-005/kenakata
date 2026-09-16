import type { LoginResponse, User } from "@/types";
import { apiClient } from "./client";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

export async function login(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  return apiClient<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export async function register(
  data: RegisterData,
): Promise<User> {
  return apiClient<User>("/users", {
    method: "POST",
    body: JSON.stringify(data),
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