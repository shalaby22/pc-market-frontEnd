"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CategoryInput,
  categorySchema,
} from "@/utils/validation/categoryValidation";
import { toast } from "react-toastify";
import { updateCategoryAction } from "@/utils/actions/admin/categories/updateCategoryAction";
import { createCategoryAction } from "@/utils/actions/admin/categories/createCategoryAction";
import { CategoryType } from "@/utils/types/categories";

export default function CategoryForm({
  initialData,
}: {
  initialData?: CategoryType;
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = !!initialData;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      image: initialData?.image || "",
    },
  });

  const onSubmit = async (data: CategoryInput) => {
    setIsSubmitting(true);
    try {
      if (isEditMode) {
        const result = await updateCategoryAction(initialData._id, data);
        if (result?.success) {
          toast.success("Category updated successfully!");
          router.push("/admin/categories");
        } else {
          toast.error("Failed to update category.");
        }
      } else {
        const result = await createCategoryAction(data);
        if (result?.success) {
          toast.success("Category created successfully!");
          router.push("/admin/categories");
        } else {
          toast.error("Failed to create category.");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Category Name
          </label>
          <input
            {...register("name")}
            type="text"
            placeholder="e.g. Laptops"
            className="w-full bg-neutral-800 border border-neutral-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-red-600 transition-colors"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Image URL
          </label>
          <input
            {...register("image")}
            type="text"
            placeholder="https://example.com/image.webp"
            className="w-full bg-neutral-800 border border-neutral-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-red-600 transition-colors"
          />
          {errors.image && (
            <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Description
        </label>
        <textarea
          {...register("description")}
          rows={4}
          placeholder="Brief description of the category..."
          className="w-full bg-neutral-800 border border-neutral-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-red-600 transition-colors resize-y"
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="pt-4 border-t border-neutral-800 flex flex-wrap justify-end gap-3 w-full">
        <button
          type="button"
          onClick={() => router.push("/admin/categories")}
          className="flex-1 sm:flex-none bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-3 px-6 rounded-lg transition-colors whitespace-nowrap text-center"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 sm:flex-none bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
        >
          {isSubmitting ? (
            <span className="animate-pulse">Saving...</span>
          ) : (
            <>
              <svg
                className="w-5 h-5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{isEditMode ? "Update Category" : "Save Category"}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
