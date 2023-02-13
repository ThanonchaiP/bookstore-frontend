import { Meta } from "./meta";
import { Product } from "./product";

export interface CategoryResponse {
  statusCode: number;
  message: string;
  data: Category[];
}

export interface Category {
  id: number;
  name: string;
  image: string;
}

export type CategoryParams = {
  page?: number;
  limit?: number;
  sort?: {
    orderBy: string;
    op: string;
  };
};

export interface CategoryProductResponse {
  statusCode: number;
  message: string;
  data: CategoryProduct;
  meta: Meta;
}

export interface CategoryProduct {
  category: {
    id: number;
    name: string;
    image: string;
  };
  book: Product[];
}
