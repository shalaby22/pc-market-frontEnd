"use server";

import { cookies } from "next/headers";

export async function getUserByIdAction(userId: string) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { token: token } : {}),
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    const result = await response.json();
    return { success: true, response: result.data };
  } catch (error) {
    console.error("Fetch Error:", error);
    return { success: false, response: [] };
  }
}
