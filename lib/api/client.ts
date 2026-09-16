import { ApiError } from "./api-error";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") ??
  "https://api.escuelajs.co/api/v1";

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const normalizedEndpoint = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;

  const response = await fetch(`${API_URL}${normalizedEndpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    let details: unknown;

    try {
      details = await response.json();
    } catch {
      details = undefined;
    }

    throw new ApiError(
      response.status,
      `API request failed: ${response.status} ${response.statusText}`,
      details,
    );
  }

  return response.json() as Promise<T>;
}