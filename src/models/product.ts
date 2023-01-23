import { Meta } from "./meta";

export interface ProductResponse {
  statusCode: number;
  message: string;
  data: Product[];
  meta: Meta;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  author: Author;
  category: Category;
  publisher: Author;
  image: string;
}

interface Category {
  id: number;
  name: string;
}

interface Author {
  id: string;
  name: string;
}

export interface ProductParams {
  search?: string | URLSearchParams;
  category: number[];
  authorId?: string;
  publisherId?: string;
  price?: { min: number; max: number };
  sort?: { id: number; orderBy: string; op: string };
  page: number;
  limit: number;
}
