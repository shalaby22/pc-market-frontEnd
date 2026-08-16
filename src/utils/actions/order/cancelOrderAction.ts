"use server";

import axios from "axios";
import { AxiosApi } from "@/utils/actions/axiosApi";

export async function cancelOrderAction(orderId: string) {
  try {
    const response = await AxiosApi.post(`/orders/${orderId}/cancel`);
    const result = response.data.data;
    return { success: response.data.status === "success", response: result };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message:
          error.response.data.data || "wrong issue while cancelling order",
      };
    }
    return {
      success: false,
      message: "something went wrong please try again later",
    };
  }
}
