import { Category } from "./category";

export interface BookResponse {
  statusCode: number;
  message: string;
  data: Book;
}

export interface Book {
  id: string;
  name: string;
  price: string;
  quantity: number;
  description: string;
  pageNumber: number;
  image: string;
  publishedDate: string;
  sold: number;
  createdAt: string;
  updatedAt: string;
  author: Author;
  category: Category;
  publisher: Author;
}

interface Author {
  id: string;
  name: string;
}
