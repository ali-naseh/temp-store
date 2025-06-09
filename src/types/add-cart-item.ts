import { Cart } from "./cart.interface";

export type AddCartItemReq = Omit<Cart, "id" | "date">;

export type AddCartItemRes = Cart;
