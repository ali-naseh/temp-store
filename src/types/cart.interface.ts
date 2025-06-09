import { Product } from "./product.interface";

export interface Cart {
  id: number;
  userId: number;
  date: string;
  products: { productId: number; quantity: number }[];
}

export interface CartItemType {
  productId: number;
  quantity: number;
  product: Product | undefined;
}
