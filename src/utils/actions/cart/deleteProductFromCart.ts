"use server";

import axios from "axios";
import { AxiosApi } from "@/components/axiosApi";

export async function deleteProductFromCart(product: {
  productId: string;
}) {
  try {
    const response = await AxiosApi.delete(`/cart/${product.productId}`);
    const result = response.data.data;
    return { success: response.data.status === "success", response: result };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message:
          error.response.data.data ||
          "wrong issue while deleting this product from cart",
      };
    }
    return {
      success: false,
      message: "something went wrong please try again later",
    };
  }
}
