"use server";
import axios from "axios";
import { AxiosApi } from "@/components/axiosApi";

export async function EditProfileAction(formData: unknown, userId: string) {
  try {
    const response = await AxiosApi.put(`/users/${userId}`, formData);

    return { success: true, response: response.data.data.user };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.log(error.response.data.data);
      return {
        success: false,
        message: error.response.data.data || "something went wrong",
      };
    }
    return {
      success: false,
      message: "something went wrong please try again later",
    };
  }
}
