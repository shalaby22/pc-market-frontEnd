"use server";

import axios from "axios";
import { AxiosApi } from "@/components/axiosApi";

export async function deleteProductAction(productId: string) {
  try {
    const response = await AxiosApi.delete(`/products/${productId}`);
    const result = response.data.data;
    return { success: response.data.status === "success", response: result };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message: error.response.data.data || "wrong issue while deleting product",
      };
    }
    return {
      success: false,
      message: "something went wrong please try again later",
    };
  }
}
