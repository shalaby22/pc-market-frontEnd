"use server";

import { ProductsResponse } from "@/utils/types/product";

export async function getProductsAction(queryString: string = "") {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/products${queryString ? `?${queryString}` : ""}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products. Status: ${response.status}`);
    }

    const result: ProductsResponse = await response.json();

    return {
      success: true,
      products: result.data.products,
      pagination: result.data.pagination,
    };
  } catch (error) {
    console.error("Error in getProductsAction:", error);
    return {
      success: false,
      products: [],
      pagination: null,
    };
  }
}

export async function getProductByIdAction(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`,
      {
        next: { revalidate: 60 },
      },
    );

    if (!response.ok) {
      return null;
    }

    const result = await response.json();
    return result.data.product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}
