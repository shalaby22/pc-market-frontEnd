"use server";

import axios from "axios";
import { AxiosApi } from "@/components/axiosApi";

export async function editProductQuantityFromCart(product: {
  productId: string;
  quantity: number;
}) {
  try {
    const response = await AxiosApi.put(`/cart/${product.productId}`, {
      quantity: product.quantity,
    });
    const result = response.data.data;
    return { success: response.data.status === "success", response: result };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message:
          error.response.data.data ||
          "wrong issue while editing this product in cart",
      };
    }
    return {
      success: false,
      message: "something went wrong please try again later",
    };
  }
}
