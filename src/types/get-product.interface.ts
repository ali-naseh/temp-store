import { Product } from "./product.interface";

export type GetProductRes = Product;

export interface GetProductReq {
  productId: number;
}
