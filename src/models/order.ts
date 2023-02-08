export type CreateOrderPayload = {
  cartId: string;
  totalQty: number;
  totalPrice: number;
  items: OrderItem[];
};

type OrderItem = {
  book: { id: string };
  quantity: number;
};
