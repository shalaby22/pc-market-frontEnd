import { cookies } from "next/headers";

async function getUserProfile(userId: string) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["token"] = token;
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`,
      {
        method: "GET",
        headers: headers,
        cache: "no-store",
      },
    );
    

    if (!response.ok) {
      return null;
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}

export default getUserProfile;
