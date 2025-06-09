"use client";

import { useProductStore } from "@/store/product-store";
import { useCallback } from "react";

export function useCart() {
  const {
    cartItems,
    cartTotal,
    cartSubtotal,
    cartItemCount,
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
    getCartItem,
    calculateCartTotals,
  } = useProductStore();

  const addItem = useCallback(
    (productId: number) => {
      const product = useProductStore.getState().getProduct(productId);
      if (!product) return;

      addToCart(product);
    },
    [addToCart]
  );

  const updateQuantity = useCallback(
    (itemId: number, quantity: number) => {
      updateCartItemQuantity(itemId, quantity);
    },
    [updateCartItemQuantity]
  );

  const removeItem = useCallback(
    (itemId: number) => {
      removeFromCart(itemId);
    },
    [removeFromCart]
  );

  const isInCart = useCallback(
    (productId: number) => {
      return !!getCartItem(productId);
    },
    [getCartItem]
  );

  const getItemQuantity = useCallback(
    (productId: number) => {
      const item = getCartItem(productId);
      return item?.quantity || 0;
    },
    [getCartItem]
  );

  return {
    items: cartItems,
    total: cartTotal,
    subtotal: cartSubtotal,
    itemCount: cartItemCount,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    isInCart,
    getItemQuantity,
    calculateTotals: calculateCartTotals,
  };
}
