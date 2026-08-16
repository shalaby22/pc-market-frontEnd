"use server";

import axios from "axios";
import { AxiosApi } from "@/utils/actions/axiosApi";
import { revalidateTag } from "next/cache";

export async function deleteCategoryAction(categoryId: string) {
  try {
    const response = await AxiosApi.delete(`/categories/${categoryId}`);
    const result = response.data.data;
    revalidateTag("categories", { expire: 0 });
    return { success: response.data.status === "success", response: result };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message:
          error.response.data.data || "wrong issue while deleting categoryId",
      };
    }
    return {
      success: false,
      message: "something went wrong please try again later",
    };
  }
}
