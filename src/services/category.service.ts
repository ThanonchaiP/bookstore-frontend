import { httpClient } from "utils/http-client";
import { CategoryResponse } from "models/category";

export const getCategories = async () => {
  const result = await httpClient.get<CategoryResponse>("/category");
  return result.data;
};
