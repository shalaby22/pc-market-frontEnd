"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  CreateProductInput,
  createProductSchema,
} from "@/utils/validation/productValidation";
import { addProductAction } from "@/utils/actions/admin/products/addNewProductAction";
import { CategoryType } from "@/utils/types/categories";
import { toast } from "react-toastify";

export default function NewProductForm({
  categories,
}: {
  categories: CategoryType[];
}) {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState("");
  const [imageInputError, setImageInputError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<CreateProductInput>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      images: [],
    },
  });

  const imagesList =
    useWatch({
      control,
      name: "images",
    }) || [];

  const handleAddImage = () => {
    if (!imageUrl) return;

    const urlCheck = z.url().safeParse(imageUrl);

    if (!urlCheck.success) {
      setImageInputError("Please enter a valid URL (e.g., https://...)");
      return;
    }

    setImageInputError("");
    setValue("images", [...imagesList, imageUrl], { shouldValidate: true });
    setImageUrl("");
  };

  const handleRemoveImage = (index: number) => {
    const newImages = imagesList.filter((_, i) => i !== index);
    setValue("images", newImages, { shouldValidate: true });
  };

  const onSubmit = async (data: CreateProductInput) => {
    setIsSubmitting(true);
    try {
      const result = await addProductAction(data);

      if (result?.success) {
        toast.success("Product created successfully!");
        router.push("/admin/products");
      } else {
        toast.error("Failed to create product. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Product Name
          </label>
          <input
            {...register("name")}
            type="text"
            placeholder="e.g. RTX 4090"
            className="w-full bg-neutral-800 border border-neutral-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-red-600 transition-colors"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Category
          </label>
          <select
            {...register("category")}
            className="w-full bg-neutral-800 border border-neutral-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-red-600 transition-colors"
          >
            <option value="">Select a category...</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-xs mt-1">
              {errors.category.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Price (EGP)
          </label>
          <input
            {...register("price", { valueAsNumber: true })}
            type="number"
            step="1"
            placeholder="0.00"
            min={0}
            className="w-full bg-neutral-800 border border-neutral-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-red-600 transition-colors"
          />

          {errors.price && (
            <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Stock Quantity
          </label>
          <input
            {...register("stock", { valueAsNumber: true })}
            type="number"
            placeholder="1"
            step="1"
            min={0}
            className="w-full bg-neutral-800 border border-neutral-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-red-600 transition-colors"
          />
          {errors.stock && (
            <p className="text-red-500 text-xs mt-1">{errors.stock.message}</p>
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
          placeholder="Product specifications..."
          className="w-full bg-neutral-800 border border-neutral-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-red-600 transition-colors resize-y"
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="w-full overflow-hidden">
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Product Images (URLs)
        </label>

        <div className="flex gap-2 mb-1 w-full">
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => {
              setImageUrl(e.target.value);
              if (imageInputError) setImageInputError("");
            }}
            placeholder="https://example.com/image.webp"
            className="flex-1 min-w-0 bg-neutral-800 border border-neutral-700
             text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-red-600
            "
          />
          <button
            type="button"
            onClick={handleAddImage}
            className="shrink-0 bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2.5 rounded-lg transition-colors font-medium"
          >
            Add
          </button>
        </div>

        {imageInputError && (
          <p className="text-red-500 text-xs mb-2 mt-1">{imageInputError}</p>
        )}

        {errors.images && (
          <p className="text-red-500 text-xs mt-1 mb-2">
            {errors.images.message}
          </p>
        )}

        {imagesList.length > 0 && (
          <div className="flex flex-col gap-2 mt-2 w-full">
            {imagesList.map((url, index) => (
              <div
                key={index}
                className="flex items-start justify-between bg-neutral-800/50 border border-neutral-700 p-3 rounded-lg w-full gap-3"
              >
                <span className="text-sm text-gray-400 break-all flex-1">
                  {url}
                </span>

                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="shrink-0 text-red-500 hover:text-red-400 bg-red-500/10 p-1.5 rounded-md transition-colors mt-0.5"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-neutral-800 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSubmitting ? (
            <span className="animate-pulse">Creating...</span>
          ) : (
            <>
              <svg
                className="w-5 h-5"
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
              Save Product
            </>
          )}
        </button>
      </div>
    </form>
  );
}
