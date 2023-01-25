import { BannerResponse } from "models/banner";
import { httpClient } from "../utils/http-client";

export const getBanners = async () => {
  const result = await httpClient.get<BannerResponse>("/banners");
  return result.data;
};
