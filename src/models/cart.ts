import { Author } from "./author";

export interface CartResponse {
  statusCode: number;
  message: string;
  data: Cart;
}

export interface Cart {
  id: string;
  cartItems: CartItem[];
}

export interface CartItem {
  id: string;
  quantity: number;
  book: Book;
}

interface Book {
  id: string;
  name: string;
  price: string;
  quantity: number;
  image: string;
  author: Author;
}

export type AddToCartPayload = {
  cartId: string;
  bookId: string;
  quantity: number;
};
