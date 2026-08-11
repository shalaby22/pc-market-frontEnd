"use server";

import axios from "axios";
import { AxiosApi } from "@/components/axiosApi";

export async function mergeCartAction(
  mergeData: {
    productId: string;
    quantity: number;
  }[],
) {
  try {
    const response = await AxiosApi.post("/cart/merge", mergeData);

    const result = response.data.data;

    return { success: true, response: result };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message:
          error.response.data.data ||
          "wrong issue while merging your cart with backend",
      };
    }
    return {
      success: false,
      message: "something went wrong please try again later",
    };
  }
}
