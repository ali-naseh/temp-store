import SingleProductView from "@/sections/single-product-view/view/single-product-view";


interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  const productId = params.id;
  return <SingleProductView productId={Number(productId)} />;
}
