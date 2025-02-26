"use client";
import { getProduct } from "@/lib/products";
import { ProductDetails } from "@/components/product-details";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: {
    handle: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.handle);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto py-8 px-4">
        <ProductDetails product={product} />
      </div>
    </div>
  );
}
