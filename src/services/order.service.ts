import { CreateOrderPayload } from "@/models/order";
import { httpClient } from "utils/http-client";

export const createOrder = async (payload: CreateOrderPayload) => {
  const result = await httpClient.post(`/orders`, payload);
  return result.data;
};
