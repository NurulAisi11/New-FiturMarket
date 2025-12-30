
import { getProductById, getProducts } from "@/app/admin/products/actions";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "./product-detail-client";

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const productId = params.id;
  const product = await getProductById(productId);

  if (!product) {
    notFound();
  }

  const { products: relatedProducts } = await getProducts({
    category: product.category,
    limit: 4,
    excludeId: product.id,
  });

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}