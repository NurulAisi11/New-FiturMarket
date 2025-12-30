
"use server";

import { cookies } from "next/headers";
import { getProducts } from "@/app/admin/products/actions";

export async function getAiRecommendations() {
  const viewedProductsCookie = cookies().get("viewed_products");
  if (!viewedProductsCookie) {
    return { products: [], reason: "No viewing history." };
  }

  try {
    const viewedProducts = JSON.parse(viewedProductsCookie.value);
    if (!Array.isArray(viewedProducts) || viewedProducts.length === 0) {
      return { products: [], reason: "No viewing history." };
    }

    // Get the category of the last viewed product
    const lastViewedProductCategory = viewedProducts[viewedProducts.length - 1].category;

    const { products, error } = await getProducts({
      category: lastViewedProductCategory,
      limit: 5,
    });

    if (error) {
      console.error("Error fetching recommendations:", error);
      return { products: [], reason: "Error fetching products." };
    }

    // Filter out already viewed products
    const recommendedProducts = products.filter(
      (p) => !viewedProducts.some((vp: any) => vp.id === p.id)
    );

    return {
      products: recommendedProducts,
      reason: `Karena Anda melihat produk dalam kategori ${lastViewedProductCategory}.`,
    };
  } catch (error) {
    console.error("Error parsing viewed products cookie:", error);
    return { products: [], reason: "Error processing viewing history." };
  }
}

export async function addViewedProduct(product: { id: string; category: string }) {
    const viewedProductsCookie = cookies().get("viewed_products");
    let viewedProducts = [];

    if (viewedProductsCookie) {
        try {
            viewedProducts = JSON.parse(viewedProductsCookie.value);
        } catch (error) {
            console.error("Error parsing viewed products cookie:", error);
        }
    }

    // Add the new product and keep the list size to a max of 10
    viewedProducts.push(product);
    if (viewedProducts.length > 10) {
        viewedProducts.shift();
    }

    cookies().set("viewed_products", JSON.stringify(viewedProducts));
}
