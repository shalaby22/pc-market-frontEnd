"use server";

export async function getCategoriesAction() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
      {
        method: "GET",
        next: { revalidate: 3600, tags: ["categories"] }, //todo
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const result = await response.json();
    return { success: true, categories: result.data.categories || [] };
  } catch (error) {
    console.error("Categories Fetch Error:", error);
    return { success: false, categories: [] };
  }
}
