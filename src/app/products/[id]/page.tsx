import SingleProductView from "@/sections/single-product-view/view/single-product-view";

export default function Page({ params }: { params: { id: number } }) {
  const productId = params.id;
  return <SingleProductView productId={productId} />;
}
