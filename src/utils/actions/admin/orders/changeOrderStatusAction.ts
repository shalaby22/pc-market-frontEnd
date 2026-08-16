"use server";

import axios from "axios";
import { AxiosApi } from "@/utils/actions/axiosApi";

export async function changeOrderStatusAction(
  orderId: string,
  selectedStatus: string,
) {
  try {
    const response = await AxiosApi.put(`/orders/${orderId}`, {
      status: selectedStatus,
    });
    const result = response.data.data;
    return { success: response.data.status === "success", response: result };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message:
          error.response.data.data || "wrong issue while updating category",
      };
    }
    return {
      success: false,
      message: "something went wrong please try again later",
    };
  }
}
