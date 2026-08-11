"use server";

import axios from "axios";
import { AxiosApi } from "@/components/axiosApi";

export async function AddToCartAction(product: {
  productId: string;
  quantity: number;
}) {
  try {
    const response = await AxiosApi.post("/cart/add", product);
    const result = response.data.data;
    return { success: response.data.status === "success", response: result };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message:
          error.response.data.data ||
          "wrong issue while adding this product to cart",
      };
    }
    return {
      success: false,
      message: "something went wrong please try again later",
    };
  }
}
