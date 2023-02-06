import { UserResponse } from "@/models/user";
import { httpClient } from "utils/http-client";

export const getCurrentUser = async (userId: string) => {
  const result = await httpClient.get<UserResponse>(`/users/${userId}`);
  return result.data;
};
