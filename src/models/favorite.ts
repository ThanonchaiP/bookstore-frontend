import { Meta } from "./meta";

export interface FavoriteResponse {
  statusCode: number;
  message: string;
  data: Favorite[];
  meta: Meta;
}

export interface Favorite {
  id: string;
  book: Book;
}

export type FavoritePayload = {
  bookId: string;
  userId: string;
};

interface Book {
  id: string;
  name: string;
  price: string;
  image: string;
  author: Author;
  publisher: Author;
  category: Category;
}

interface Category {
  id: number;
  name: string;
  image: string;
}

interface Author {
  id: string;
  name: string;
}
