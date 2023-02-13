import { httpClient } from "utils/http-client";
import { CategoryParams, CategoryProductResponse, CategoryResponse } from "models/category";

function getAxiosCategoryParams(categoryParams: CategoryParams) {
  const { page, limit, sort } = categoryParams;
  const params = new URLSearchParams();

  if (sort) {
    params.append("orderBy", sort.orderBy);
    params.append("op", sort.op);
  }

  if (page) params.append("page", page.toString());
  if (limit) params.append("limit", limit.toString());

  return params;
}

export const getCategories = async () => {
  const result = await httpClient.get<CategoryResponse>("/category");
  return result.data;
};

export const getCategoryById = async (categoryId: string, CategoryParams: CategoryParams) => {
  const params = getAxiosCategoryParams(CategoryParams);
  const result = await httpClient.get<CategoryProductResponse>(`/category/${categoryId}`, { params });
  return result.data;
};
