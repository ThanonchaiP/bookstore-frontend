import { Meta } from "./meta";

export type CreateOrderPayload = {
  cartId: string;
  shippingFee: number;
  totalQty: number;
  totalPrice: number;
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
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItem[];
}

interface OrderItem {
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
}
