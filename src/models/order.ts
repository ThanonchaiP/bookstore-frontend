import { Meta } from "./meta";
import { Review } from "./review";

export type CreateOrderPayload = {
  cartId: string;
  shippingFee: number;
  totalQty: number;
  totalPrice: number;
  orderDate: Date;
  items: OrderItemPayload[];
};

type OrderItemPayload = {
  book: { id: string };
  quantity: number;
};

export interface OrderResponse {
  statusCode: number;
  message: string;
  data: Order[];
  meta: Meta;
}

interface Order {
  id: string;
  orderId: number;
  transactionStatus: string;
  shippingFee: string;
  totalQty: number;
  totalPrice: string;
  orderDate: string;
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItem[];
}

export interface OrderItem {
  id: string;
  quantity: number;
  book: Book;
  review: Review | null;
}

interface Book {
  id: string;
  name: string;
  price: string;
  quantity: number;
  image: string;
}
