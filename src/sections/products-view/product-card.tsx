import { QuantitySelector } from "@/components/quantity-selector/quantity-selector";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";
import { useCart } from "@/hooks/use-cart";
import { Product } from "@/types";
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ProductCard({ product }: { product: Product }) {
  const { addItem, isInCart, removeItem, clearCart } = useCart();
  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <CardHeader className="p-2 relative">
        <Link href={`${ROUTES.main.products}/${product.id}`}>
          <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={300}
            className="w-full h-48 object-contain rounded-t-lg group-hover:scale-105 transition-transform"
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4">
        <Link href={`${ROUTES.main.products}/${product.id}`}>
          <h3 className="font-semibold mb-2 line-clamp-2 hover:text-blue-600">
            {product.title}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating.rate)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">
            ({product.rating.count})
          </span>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold">${product.price}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <QuantitySelector productId={product.id} />
      </CardFooter>
    </Card>
  );
}
