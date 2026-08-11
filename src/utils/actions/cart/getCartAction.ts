"use server";

import { cookies } from "next/headers";

export async function getCartAction() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const response = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/api/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { token: token } : {}),
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch cart");
    }

    const result = await response.json();
    return { success: true, response: result.data };
  } catch (error) {
    console.error("Fetch Error:", error);
    return { success: false, response: [] };
  }
}
