import { httpClient } from "utils/http-client";
import { LoginForm, LoginResponse, RegisterForm } from "@/models/auth";

export const login = async (payload: LoginForm) => {
  const result = await httpClient.post<LoginResponse>("/auth/signin", payload);
  return result.data;
};

export const signUp = async (payload: RegisterForm) => {
  const result = await httpClient.post("/auth/signup", payload);
  return result.data;
};
