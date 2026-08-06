"use server";
import axios from "axios";
import { AxiosApi } from "@/components/axiosApi";

export async function EditProfileAction(formData: unknown, userId: string) {
  try {
    const response = await AxiosApi.put(`/users/${userId}`, formData);

    // const token = response.data.data.user.token;
    // const cookiesInstance = await cookies();

    // cookiesInstance.set({
    //   name: "token",
    //   value: token,
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   maxAge: 60 * 60 * 24 * 7,
    //   path: "/",
    // });
    console.log(response.data);
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
