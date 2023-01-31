import useSWR from "swr";
import { BannerResponse } from "models/banner";

export const getBanners = () => {
  const { data, isLoading } = useSWR<BannerResponse>(`/banners`);
  return { data, isLoading };
};
