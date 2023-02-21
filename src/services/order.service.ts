import useSWR from "swr";
import { httpClient } from "utils/http-client";
import { CreateOrderPayload, OrderResponse } from "@/models/order";

export const createOrder = async (payload: CreateOrderPayload) => {
  const result = await httpClient.post(`/orders`, payload);
  return result.data;
};

export const getOrders = (page = 1) => {
  const { data, isLoading, mutate } = useSWR<OrderResponse>(`/orders/me?page=${page}`);
  return { data, isLoading, mutate };
};
