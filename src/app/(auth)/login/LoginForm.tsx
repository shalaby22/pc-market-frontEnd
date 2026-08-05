"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  LoginFormType,
  loginSchema,
} from "@/components/validation/loginSchema";
import { loginAction } from "./LoginAction";
import { useAuth } from "@/app/context/AuthContext";

export default function LoginForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormType) => {
    setIsLoading(true);
    setServerError(null);

    const result = await loginAction(data);
    if (result.success) {
      login({
        _id: result.response._id,
        firstName: result.response.firstName,
        lastName: result.response.lastName,
        userName: result.response.userName,
        email: result.response.email,
        isAdmin: result.response.isAdmin,
      });
      router.push("/");
      router.refresh();
    } else {
      setServerError(result.message || "failed to login");
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#2c2f33] p-8 rounded-2xl shadow-2xl w-full max-w-md border border-neutral-800">
      <h2 className="text-3xl font-bold text-white mb-6 text-center tracking-wider">
        LOGIN
      </h2>

      {serverError && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded text-red-500 text-sm text-center">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Email Address
          </label>
          <input
            type="email"
            {...register("email")}
            className={`w-full p-3 rounded bg-neutral-800 text-white border focus:outline-none focus:ring-2 transition-colors ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-neutral-600 focus:ring-gray-400"
            }`}
            placeholder="example@gmail.com"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            className={`w-full p-3 rounded bg-neutral-800 text-white border focus:outline-none focus:ring-2 transition-colors ${
              errors.password
                ? "border-red-500 focus:ring-red-500"
                : "border-neutral-600 focus:ring-gray-400"
            }`}
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-base transition-colors duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-4"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
