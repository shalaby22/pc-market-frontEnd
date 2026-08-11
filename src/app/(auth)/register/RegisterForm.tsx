"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterAction } from "./RegisterAction";
import {
  RegisterFormType,
  RegisterSchema,
} from "@/utils/validation/RegisterSchema";
import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/context/AuthContext";

export default function RegisterForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data: RegisterFormType) => {
    setIsLoading(true);
    setServerError(null);

    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      userName: data.userName,
      email: data.email,
      phone: data.phone,
      password: data.password,
      addresses: [data.address],
    };

    const result = await RegisterAction(payload);

    if (result.success) {
      login({
        _id: result.response._id,
        firstName: result.response.firstName,
        lastName: result.response.lastName,
        userName: result.response.userName,
        email: result.response.email,
        isAdmin: result.response.isAdmin,
        phone: result.response.phone,
      });
      router.push("/");
      router.refresh();
    } else {
      setServerError(result.message || "failed to Register");
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#2c2f33] p-8 rounded-2xl shadow-2xl w-full max-w-xl border border-neutral-800">
      <h2 className="text-3xl font-bold text-white mb-6 text-center tracking-wider">
        REGISTER
      </h2>

      {serverError && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded text-red-500 text-sm text-center">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              First Name
            </label>
            <input
              type="text"
              {...register("firstName")}
              className={`w-full p-3 rounded bg-neutral-800 text-white border focus:outline-none focus:ring-2 transition-colors ${
                errors.firstName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-neutral-600 focus:ring-gray-400"
              }`}
              placeholder="Mohamed"
            />
            {errors.firstName && (
              <p className="mt-1 text-xs text-red-500">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Last Name
            </label>
            <input
              type="text"
              {...register("lastName")}
              className={`w-full p-3 rounded bg-neutral-800 text-white border focus:outline-none focus:ring-2 transition-colors ${
                errors.lastName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-neutral-600 focus:ring-gray-400"
              }`}
              placeholder="Salah"
            />
            {errors.lastName && (
              <p className="mt-1 text-xs text-red-500">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Username
          </label>
          <input
            type="text"
            {...register("userName")}
            className={`w-full p-3 rounded bg-neutral-800 text-white border focus:outline-none focus:ring-2 transition-colors ${
              errors.userName
                ? "border-red-500 focus:ring-red-500"
                : "border-neutral-600 focus:ring-gray-400"
            }`}
            placeholder="mo_salah123"
          />
          {errors.userName && (
            <p className="mt-1 text-xs text-red-500">
              {errors.userName.message}
            </p>
          )}
        </div>

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
            Phone Number
          </label>
          <input
            type="tel"
            {...register("phone")}
            className={`w-full p-3 rounded bg-neutral-800 text-white border focus:outline-none focus:ring-2 transition-colors ${
              errors.phone
                ? "border-red-500 focus:ring-red-500"
                : "border-neutral-600 focus:ring-gray-400"
            }`}
            placeholder="0101234567"
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Address
          </label>
          <input
            type="text"
            {...register("address")}
            className={`w-full p-3 rounded bg-neutral-800 text-white border focus:outline-none focus:ring-2 transition-colors ${
              errors.address
                ? "border-red-500 focus:ring-red-500"
                : "border-neutral-600 focus:ring-gray-400"
            }`}
            placeholder="Cairo, Egypt"
          />
          {errors.address && (
            <p className="mt-1 text-xs text-red-500">
              {errors.address.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              className={`w-full p-3 rounded bg-neutral-800 text-white border focus:outline-none focus:ring-2 transition-colors ${
                errors.confirmPassword
                  ? "border-red-500 focus:ring-red-500"
                  : "border-neutral-600 focus:ring-gray-400"
              }`}
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-base transition-colors duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-6"
        >
          {isLoading ? "Registering..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}
