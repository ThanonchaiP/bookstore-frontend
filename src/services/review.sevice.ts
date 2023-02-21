import { ReviewPayload } from "@/models/review";
import { httpClient } from "utils/http-client";

export const createReview = async (payload: ReviewPayload) => {
  const result = await httpClient.post(`/reviews`, payload);
  return result.data;
};

export const getReview = async (reviewId: number) => {
  const result = await httpClient.get(`/reviews/${reviewId}`);
  return result.data;
};

export const getReviews = async (bookId: string) => {
  const result = await httpClient.get(`/reviews/books/${bookId}`);
  return result.data;
};

export const updateReview = async (reviewId: number, payload: ReviewPayload) => {
  const result = await httpClient.patch(`/reviews/${reviewId}`, payload);
  return result.data;
};
