import React from "react";
import Link from "next/link";
import { getCategoriesAction } from "@/utils/actions/categories/getCategoriesAction";
import { CategoryType } from "@/utils/types/categories";
import Image from "next/image";
import DeleteCategoryButton from "@/components/admin/DeleteCategoryButton";

export default async function AdminCategoriesPage() {
  const response = await getCategoriesAction();
  const categories = response.categories;

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">
            Categories Management
          </h1>
          <p className="text-gray-400 text-sm">
            Manage your store categories, descriptions, and images.
          </p>
        </div>
        <Link
          href="/admin/categories/new"
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-5 rounded-lg transition-colors flex items-center gap-2 shrink-0 w-full sm:w-auto justify-center"
        >
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Category
        </Link>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden mb-6 w-full">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-neutral-800/50 text-gray-300 border-b border-neutral-800 uppercase text-xs font-semibold">
              <tr>
                <th className="px-4 py-3 md:px-6 md:py-4 min-w-50">Category</th>
                <th className="hidden md:table-cell px-4 py-3 md:px-6 md:py-4 min-w-75">
                  Description
                </th>
                <th className="px-4 py-3 md:px-6 md:py-4 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {categories.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No categories found.
                  </td>
                </tr>
              ) : (
                categories.map((category: CategoryType) => (
                  <tr
                    key={category._id}
                    className="hover:bg-neutral-800/30 transition-colors"
                  >
                    <td className="px-4 py-3 md:px-6 md:py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-lg overflow-hidden shrink-0 border border-neutral-700 p-1">
                          <Image
                            src={category.image}
                            alt={category.name}
                            height={50}
                            width={50}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="font-bold text-white capitalize text-sm md:text-base">
                          {category.name}
                        </div>
                      </div>
                    </td>

                    <td className="hidden md:table-cell px-4 py-3 md:px-6 md:py-4">
                      <p className="line-clamp-2 text-gray-400 text-sm">
                        {category.description}
                      </p>
                    </td>

                    <td className="px-4 py-3 md:px-6 md:py-4">
                      <div className="flex items-center justify-center gap-2 md:gap-3">
                        <Link
                          href={`/admin/categories/${category._id}`}
                          className="text-blue-500 hover:text-blue-400 bg-blue-500/10 p-2 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <svg
                            className="w-4 h-4 md:w-5 md:h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                        </Link>

                        {/* زرار الحذف */}
                        <DeleteCategoryButton
                          id={category._id}
                          categoryName={category.name}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
