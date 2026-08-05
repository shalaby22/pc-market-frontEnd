"use server";

import { cookies } from "next/headers";
import axios from "axios";
import { AxiosApi } from "@/components/axiosApi";

export async function loginAction(formData: {
  email: string;
  password: string;
}) {
  try {
    const response = await AxiosApi.post("/auth/login", formData);

    const token = response.data.data.user.token;
    const cookiesInstance = await cookies();

    cookiesInstance.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return { success: true, response: response.data.data.user };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message: error.response.data.data || "wrong email or password",
      };
    }
    return {
      success: false,
      message: "something went wrong please try again later",
    };
  }
}
