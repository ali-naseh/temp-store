"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag, ArrowLeft, Loader } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ROUTES } from "@/constants/routes";
import { useGetCarts } from "@/api/get-carts";
import { useAuth } from "@/hooks/use-auth";
import { CartItemType } from "@/types";
import { useGetProducts } from "@/api/get-products";
import { CartItem } from "../cart-item";
import { useCart } from "@/hooks/use-cart";

export default function CartView() {
  const { items: cartItems, updateQuantity, removeItem } = useCart();
  const { isAuthenticated, user } = useAuth();

  // just for test
  const {
    data: carts,
    isLoading: cartsLoading,
    error: cartsError,
  } = useGetCarts({
    enabled: isAuthenticated,
    queryKey: ["get-carts"],
  });
  useEffect(() => {
    console.log(carts);
  }, [carts]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cartsError) {
    return (
      <div className="flex flex-1 content-center">
        <div className="bg-red-400 rounded[5px] p-2 ">
          <p className="text-red-500">
            {cartsError ? cartsError.message : "Something went wrong"}
          </p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0 && !cartsLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Button asChild>
            <Link href={ROUTES.main.products}>Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" asChild>
          <Link href={ROUTES.main.products}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <p className="text-gray-600">{cartItems.length} items in your cart</p>
        </div>
      </div>

      {cartsLoading ? (
        <div className="flex align-middle justify-center h-[30vh]">
          <Loader />
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <CartItem
                item={item}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
                key={item.productId}
              />
            ))}

            {/* Continue Shopping */}
            <div className="pt-4">
              <Button variant="outline" asChild>
                <Link href={ROUTES.main.products}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {shipping > 0 && (
                  <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
                    Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex-col gap-3">
                <Button className="w-full" size="lg" asChild>
                  <Link href={ROUTES.main.cart}>Proceed to Checkout</Link>
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  Secure checkout with 256-bit SSL encryption
                </p>
              </CardFooter>
            </Card>

            {/* Security Features */}
            <Card className="mt-6">
              <CardContent className="p-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Free returns within 30 days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Secure payment processing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>24/7 customer support</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
