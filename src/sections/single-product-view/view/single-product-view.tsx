"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Share2,
  Star,
  Truck,
  Shield,
  RefreshCw,
  ChevronRight,
  Loader,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductReviews } from "../product-reviews";
import { RelatedProducts } from "../related-products";
import { ProductImageGallery } from "../product-image-gallery";
import { ROUTES } from "@/constants/routes";
import { toast } from "sonner";
import { useGetProduct } from "@/api/get-product";
import { QuantitySelector } from "@/components/quantity-selector/quantity-selector";

export default function SingleProductView({
  productId,
}: {
  productId: number;
}) {
  const router = useRouter();

  const { data: product, isLoading } = useGetProduct({ productId: productId });

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.title,
          text: product?.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("user canceled the share");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast("Product link has been copied to clipboard.");
    }
  };

  if (!product && !isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <p className="text-gray-600 mb-8">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link href={ROUTES.main.products}>Browse Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {product && !isLoading && (
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link href={ROUTES.main.home} className="hover:text-gray-900">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={ROUTES.main.products} className="hover:text-gray-900">
              Products
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium">{product.title}</span>
          </nav>

          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Product Images */}
            <div className="space-y-4">
              <ProductImageGallery
                images={[product.image, product.image, product.image]}
                productName={product.title}
              />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Product Title and Rating */}
              <div>
                <div className="flex items-start justify-between mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {product.title}
                  </h1>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={handleShare}>
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating.rate)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating.rate} ({product.rating.count} reviews)
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>
              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="bg-white p-6 rounded-lg border">
                <QuantitySelector productId={product.id} />
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                <div className="text-center space-y-2">
                  <Truck className="h-8 w-8 text-blue-600 mx-auto" />
                  <div>
                    <p className="font-medium text-sm">Free Shipping</p>
                    <p className="text-xs text-gray-600">On orders over $50</p>
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <Shield className="h-8 w-8 text-green-600 mx-auto" />
                  <div>
                    <p className="font-medium text-sm">Secure Payment</p>
                    <p className="text-xs text-gray-600">
                      256-bit SSL encryption
                    </p>
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <RefreshCw className="h-8 w-8 text-purple-600 mx-auto" />
                  <div>
                    <p className="font-medium text-sm">Easy Returns</p>
                    <p className="text-xs text-gray-600">
                      30-day return policy
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <Card className="mb-16">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">
                  Reviews ({product.rating.count})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="p-6">
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mb-4">
                    Product Description
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {product.description}
                  </p>

                  <h4 className="text-lg font-semibold mb-3">Key Features:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Premium quality materials and construction</li>
                    <li>Advanced technology for superior performance</li>
                    <li>Ergonomic design for maximum comfort</li>
                    <li>Durable and long-lasting build quality</li>
                    <li>Easy to use and maintain</li>
                  </ul>

                  <h4 className="text-lg font-semibold mb-3 mt-6">
                    What's in the Box:
                  </h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>1x {product.title}</li>
                    <li>User manual and quick start guide</li>
                    <li>Warranty card</li>
                    <li>Accessories (if applicable)</li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="specifications" className="p-6">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold">Specifications</h3>
                  <div className="grid gap-4">
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="font-medium text-gray-900">
                        Category
                      </span>
                      <span className="text-gray-700">{product.category}</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="p-6">
                <ProductReviews productId={product.id} />
              </TabsContent>
            </Tabs>
          </Card>

          {/* Related Products */}
          <RelatedProducts currentProduct={product} />
        </div>
      )}
    </div>
  );
}
