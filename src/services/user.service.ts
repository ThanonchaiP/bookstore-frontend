import { PasswordForm, UpdateUserPayload, UserResponse } from "@/models/user";
import { httpClient } from "utils/http-client";

export const getCurrentUser = async (userId: string) => {
  const result = await httpClient.get<UserResponse>(`/users/${userId}`);
  return result.data;
};

export const updateUser = async (userId: string, payload: UpdateUserPayload) => {
  const result = await httpClient.patch(`/users/${userId}`, payload);
  return result.data;
};

export const updatePassword = async (payload: PasswordForm) => {
  const result = await httpClient.patch(`/users/password`, payload);
  return result.data;
};
