"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Heart, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProducts } from "@/hooks/use-products";
import type { Product } from "@/types";
import { ROUTES } from "@/constants/routes";
import { ProductCard } from "../products-view/product-card";

interface RelatedProductsProps {
  currentProduct: Product;
}

export function RelatedProducts({ currentProduct }: RelatedProductsProps) {
  const { allProducts } = useProducts();

  // Get related products from the same category, excluding current product
  const relatedProducts = allProducts
    .filter(
      (product) =>
        product.category === currentProduct.category &&
        product.id !== currentProduct.id
    )
    .slice(0, 4);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Related Products</h2>
        <Button variant="outline" asChild>
          <Link
            href={`${ROUTES.main.products}?category=${currentProduct.category}`}
          >
            View All in {currentProduct.category}
          </Link>
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
