import { httpClient } from "utils/http-client";
import { FavoritePayload, FavoriteResponse } from "@/models/favorite";

export const getFavorites = async () => {
  const result = await httpClient.get<FavoriteResponse>(`/favorites/me`);
  return result.data;
};

export const addFavorite = async (payload: FavoritePayload) => {
  const result = await httpClient.post(`/favorites`, payload);
  return result.data;
};

export const removeFavorite = async (favoriteId: string) => {
  const result = await httpClient.delete(`/favorites/${favoriteId}`);
  return result.data;
};
