"use server";

import axios from "axios";
import { AxiosApi } from "@/components/axiosApi";

interface updateProductType {
  name: string;
  stock: number;
  price: number;
  category: string;
  images: string[];
  description: string;
}

export async function updateProductAction(
  productId: string,
  product: updateProductType,
) {
  try {
    const response = await AxiosApi.put(`/products/${productId}`, product);
    const result = response.data.data;
    return { success: response.data.status === "success", response: result };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message: error.response.data.data || "wrong issue while adding product",
      };
    }
    return {
      success: false,
      message: "something went wrong please try again later",
    };
  }
}
