import { QuantitySelector } from "@/components/quantity-selector/quantity-selector";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";
import { Product } from "@/types";
import { Heart, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const ProductListItem = ({ product }: { product: Product }) => (
  <CardContent className="group p-6 border border-gray-400 rounded-lg hover:shadow-lg transition-shadow">
    <div className="flex">
      <div className="relative w-48 h-48">
        <Link href={`${ROUTES.main.products}/${product.id}`}>
          <Image
            src={product.image}
            alt={product.title}
            width={200}
            height={200}
            className="w-full h-full object-contain rounded-l-lg group-hover:scale-105 transition-transform"
          />
        </Link>
      </div>
      <div className="flex-1 p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <Link href={`${ROUTES.main.products}/${product.id}`}>
              <h3 className="text-xl font-semibold mb-2 hover:text-blue-600">
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
                ({product.rating.count} reviews)
              </span>
            </div>
            <p className="text-gray-600 mb-4">{product.description}</p>
          </div>
          <Button size="icon" variant="ghost" className="ml-4">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">${product.price}</span>
          </div>
          <div>
            <QuantitySelector productId={product.id} />
          </div>
        </div>
      </div>
    </div>
  </CardContent>
);
