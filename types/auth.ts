import type { User } from "./user";

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export interface AuthSession {
  user: User;
  accessToken: string;
}