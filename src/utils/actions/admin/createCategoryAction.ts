"use server";

import axios from "axios";
import { AxiosApi } from "@/components/axiosApi";
import { revalidateTag } from "next/cache";

export async function createCategoryAction(category: {
  name: string;
  description: string;
  image: string;
}) {
  try {
    const response = await AxiosApi.post(`/categories`, category);
    const result = response.data.data;
    revalidateTag("categories", { expire: 0 });
    return { success: response.data.status === "success", response: result };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message:
          error.response.data.data || "wrong issue while adding category",
      };
    }
    return {
      success: false,
      message: "something went wrong please try again later",
    };
  }
}
