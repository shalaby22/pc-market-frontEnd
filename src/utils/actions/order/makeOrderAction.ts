"use server";

import axios from "axios";
import { AxiosApi } from "@/utils/actions/axiosApi";

export async function makeOrderAction(selectedAddressIndex: number) {
  try {
    const response = await AxiosApi.post("/orders", {
      paymentIndex: 0,
      addressIndex: selectedAddressIndex,
    });
    const result = response.data.data;
    return { success: response.data.status === "success", response: result };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message: error.response.data.data || "wrong issue while making order",
      };
    }
    return {
      success: false,
      message: "something went wrong please try again later",
    };
  }
}
