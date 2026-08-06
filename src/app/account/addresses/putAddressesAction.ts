"use server";

import axios from "axios";
import { AxiosApi } from "@/components/axiosApi";

export async function putAddressesAction(addresses: string[], userId: string) {
  try {
    const payload = { addresses };
    const response = await AxiosApi.put(`/users/${userId}`, payload);

    return { success: true, response: response.data.data };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(error.response.data);
      return {
        success: false,
        message: error.response.data.message || "Failed to update addresses",
      };
    }
    return {
      success: false,
      message: "Something went wrong please try again later",
    };
  }
}
