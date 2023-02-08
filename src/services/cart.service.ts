import { AddToCartPayload, CartResponse } from "@/models/cart";
import { httpClient } from "utils/http-client";

export const getCart = async (userId: string) => {
  const result = await httpClient.get<CartResponse>(`/cart/user/${userId}`);
  return result.data;
};

export const addToCart = async (payload: AddToCartPayload) => {
  const result = await httpClient.post<CartResponse>(`/cart-item`, payload);
  return result.data;
};

export const updateCartItem = async (cartItemId: string, quantity: number) => {
  const result = await httpClient.patch(`/cart-item/${cartItemId}`, { quantity });
  return result.data;
};

export const removeCartItem = async (cartItemId: string) => {
  const result = await httpClient.delete(`/cart-item/${cartItemId}`);
  return result.data;
};
