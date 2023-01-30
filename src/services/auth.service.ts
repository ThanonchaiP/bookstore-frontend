import { LoginForm, LoginResponse } from "@/models/auth";
import { httpClient } from "../utils/http-client";

export const login = async (payload: LoginForm) => {
  const result = await httpClient.post<LoginResponse>("/auth/signin", payload);
  return result.data;
};
