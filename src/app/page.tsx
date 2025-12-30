
import { getProducts } from "@/app/admin/products/actions";
import { HomePageClient } from "./home-page-client";

export default async function HomePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const searchTerm = (searchParams.search as string) || "";
  const selectedCategory = (searchParams.category as string) || null;
  const sortBy = (searchParams.sortBy as string) || "relevance";

  const { products, error } = await getProducts({
    searchTerm,
    category: selectedCategory,
    sortBy,
  });

  if (error) {
    // Handle error appropriately
    console.error(error);
  }

  // This is not efficient, but for now it's fine.
  // A better approach would be to have a separate query for categories.
  const { products: allProducts } = await getProducts();
  const categories = ["Semua", ...Array.from(new Set(allProducts.map(p => p.category)))];


  return (
    <HomePageClient
      products={products || []}
      categories={categories}
      initialSearchTerm={searchTerm}
      initialSelectedCategory={selectedCategory}
      initialSortBy={sortBy}
    />
  );
}

