"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  EditProfileFormType,
  EditProfileSchema,
} from "@/utils/validation/editProfileSchema";
import { toast } from "react-toastify";
import { useAuth } from "@/utils/context/AuthContext";
import { UserType } from "../admin/UsersTableClient";
import { EditProfileAction } from "@/utils/actions/profile/EditProfileAction";

type SharedUserFormProps = {
  targetUser: UserType;
  isEditingAsAdmin?: boolean;
};

export default function UserForm({
  targetUser,
  isEditingAsAdmin = false,
}: SharedUserFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { login, user: loggedInUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileFormType>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      firstName: targetUser?.firstName || "",
      lastName: targetUser?.lastName || "",
      userName: targetUser?.userName || "",
      email: targetUser?.email || "",
      phone: targetUser?.phone || "",
    },
  });

  const onSubmit = async (data: EditProfileFormType) => {
    setIsLoading(true);
    setServerError(null);

    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      userName: data.userName,
      email: data.email,
      phone: data.phone,
      password: data.password,
    };
    if (!payload.password) {
      delete payload.password;
    }
    try {
      const result = await EditProfileAction(payload, targetUser._id);

      if (result.success) {
        toast.success(
          isEditingAsAdmin
            ? "User updated successfully!"
            : "Profile updated successfully!",
        );

        if (!isEditingAsAdmin || loggedInUser?._id === targetUser._id) {
          login({
            _id: result.response._id,
            firstName: result.response.firstName,
            lastName: result.response.lastName,
            userName: result.response.userName,
            email: result.response.email,
            isAdmin: result.response.isAdmin,
            phone: result.response.phone,
          });
        }

        if (isEditingAsAdmin) {
          router.push("/admin/users");
        } else {
          router.push("/account");
        }
      } else {
        setServerError(result.message || "Failed to edit user profile.");
      }
    } catch (error) {
      setServerError("An unexpected error occurred." + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 w-full max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center tracking-wider">
        {isEditingAsAdmin
          ? `Edit User: ${targetUser.userName}`
          : "Edit Your Profile"}
      </h2>

      {serverError && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-sm text-center font-medium">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              First Name
            </label>
            <input
              type="text"
              {...register("firstName")}
              className={`w-full p-3 rounded-lg bg-neutral-800 text-white border focus:outline-none focus:ring-2 transition-colors ${
                errors.firstName
                  ? "border-red-500 focus:ring-red-500/50"
                  : "border-neutral-700 focus:ring-gray-500/50"
              }`}
            />
            {errors.firstName && (
              <p className="mt-1.5 text-xs text-red-500 font-medium">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Last Name
            </label>
            <input
              type="text"
              {...register("lastName")}
              className={`w-full p-3 rounded-lg bg-neutral-800 text-white border focus:outline-none focus:ring-2 transition-colors ${
                errors.lastName
                  ? "border-red-500 focus:ring-red-500/50"
                  : "border-neutral-700 focus:ring-gray-500/50"
              }`}
            />
            {errors.lastName && (
              <p className="mt-1.5 text-xs text-red-500 font-medium">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            Username
          </label>
          <input
            type="text"
            {...register("userName")}
            className={`w-full p-3 rounded-lg bg-neutral-800 text-white border focus:outline-none focus:ring-2 transition-colors ${
              errors.userName
                ? "border-red-500 focus:ring-red-500/50"
                : "border-neutral-700 focus:ring-gray-500/50"
            }`}
          />
          {errors.userName && (
            <p className="mt-1.5 text-xs text-red-500 font-medium">
              {errors.userName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            {...register("email")}
            className={`w-full p-3 rounded-lg bg-neutral-800 text-white border focus:outline-none focus:ring-2 transition-colors ${
              errors.email
                ? "border-red-500 focus:ring-red-500/50"
                : "border-neutral-700 focus:ring-gray-500/50"
            }`}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-500 font-medium">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            Phone Number
          </label>
          <input
            type="tel"
            {...register("phone")}
            className={`w-full p-3 rounded-lg bg-neutral-800 text-white border focus:outline-none focus:ring-2 transition-colors ${
              errors.phone
                ? "border-red-500 focus:ring-red-500/50"
                : "border-neutral-700 focus:ring-gray-500/50"
            }`}
          />
          {errors.phone && (
            <p className="mt-1.5 text-xs text-red-500 font-medium">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Password{" "}
              <span className="text-[11px] font-light text-gray-400">
                (leave empty to keep current)
              </span>
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="••••••••"
              className={`w-full p-3 rounded-lg bg-neutral-800 text-white border focus:outline-none focus:ring-2 transition-colors ${
                errors.password
                  ? "border-red-500 focus:ring-red-500/50"
                  : "border-neutral-700 focus:ring-gray-500/50"
              }`}
            />
            {errors.password && (
              <p className="mt-1.5 text-xs text-red-500 font-medium">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="••••••••"
              className={`w-full p-3 rounded-lg bg-neutral-800 text-white border focus:outline-none focus:ring-2 transition-colors ${
                errors.confirmPassword
                  ? "border-red-500 focus:ring-red-500/50"
                  : "border-neutral-700 focus:ring-gray-500/50"
              }`}
            />
            {errors.confirmPassword && (
              <p className="mt-1.5 text-xs text-red-500 font-medium">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-6 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg
                className="w-5 h-5 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Saving Changes...
            </>
          ) : isEditingAsAdmin ? (
            "Update User Account"
          ) : (
            "Save Profile Changes"
          )}
        </button>
      </form>
    </div>
  );
}
