"use server";

import { CategoryType } from "@/utils/types/categories";

export async function getCategoryByIdAction(categoryId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${categoryId}`,
      {
        method: "GET",
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch category");
    }

    const result = await response.json();
    return { success: true, category: result.data.category as CategoryType };
  } catch (error) {
    console.error("Categories Fetch Error:", error);
    return { success: false, categories: [] };
  }
}
