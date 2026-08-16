"use server";

import axios from "axios";
import { AxiosApi } from "@/utils/actions/axiosApi";

interface AddProductType {
  name: string;
  stock: number;
  price: number;
  category: string;
  images: string[];
  description: string;
}

export async function addProductAction(product: AddProductType) {
  try {
    const response = await AxiosApi.post(`/products`, product);
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
