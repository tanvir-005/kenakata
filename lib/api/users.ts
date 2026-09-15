import type { User } from "@/types";
import { apiClient } from "./client";

export async function getUsers(): Promise<User[]> {
  return apiClient<User[]>("/users");
}

export async function getUser(id: number): Promise<User> {
  return apiClient<User>(`/users/${id}`);
}