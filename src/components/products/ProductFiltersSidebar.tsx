"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CategoryType } from "@/utils/types/categories";
import SortComponent from "./sortComponent";
import LimitComponent from "./LimitComponent";

interface ProductFiltersSidebarProps {
  categories: CategoryType[];
}

const ProductFiltersSidebar = ({ categories }: ProductFiltersSidebarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isOpenMobile, setIsOpenMobile] = useState(false);

  const selectedCategory = searchParams.get("category") || "";
  const initialMin = searchParams.get("minPrice") || "";
  const initialMax = searchParams.get("maxPrice") || "";

  const [minPrice, setMinPrice] = useState(initialMin);
  const [maxPrice, setMaxPrice] = useState(initialMax);

  const closeDrawer = () => setIsOpenMobile(false);

  const updateQueryParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page");
    router.push(`?${params.toString()}`);
    closeDrawer();
  };

  const handleApplyPrice = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (minPrice) params.set("minPrice", minPrice);
    else params.delete("minPrice");

    if (maxPrice) params.set("maxPrice", maxPrice);
    else params.delete("maxPrice");

    params.delete("page");
    router.push(`?${params.toString()}`);
    closeDrawer();
  };

  const handleResetFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    router.push(window.location.pathname);
    closeDrawer();
  };

  return (
    <>
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsOpenMobile(true)}
          className="w-full py-3 px-4 bg-[#2c2f33] hover:bg-neutral-700 text-white font-bold rounded-xl border border-neutral-700 flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-colors"
        >
          <svg
            className="w-5 h-5 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          <span>Filters & Sorting</span>
        </button>
      </div>

      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={closeDrawer}
        />
      )}

      <aside
        className={`
    bg-[#2c2f33] p-6 border-neutral-700 space-y-6
    lg:block lg:relative lg:w-full lg:rounded-2xl lg:border lg:translate-x-0 lg:z-auto
    fixed top-0 left-0 h-full w-[85%] max-w-xs z-50 overflow-y-auto transition-transform duration-300 ease-in-out
    ${isOpenMobile ? "translate-x-0 border-r shadow-2xl" : "-translate-x-full lg:translate-x-0"}
  `}
      >
        <div className="flex items-center justify-between border-b border-neutral-700 pb-4">
          <h3 className="text-lg font-bold text-white tracking-wide">
            Filters {isOpenMobile ? "& Sorting" : ""}
          </h3>
          <div className="flex items-center gap-3">
            <button
              onClick={handleResetFilters}
              className="text-xs text-red-500 hover:underline font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
            <button
              onClick={closeDrawer}
              className="lg:hidden text-gray-400 hover:text-white text-xl p-1"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="lg:hidden space-y-4 border-b border-neutral-700 pb-6">
          <SortComponent onClose={closeDrawer} />
          <LimitComponent onClose={closeDrawer} />
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider">
            Category
          </h4>
          <div className="space-y-2">
            <button
              onClick={() => updateQueryParams("category", "")}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
                selectedCategory === ""
                  ? "bg-red-600 text-white font-bold"
                  : "text-gray-400 hover:bg-neutral-800 hover:text-white"
              }`}
            >
              All Categories
            </button>

            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => updateQueryParams("category", cat._id)}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
                  selectedCategory === cat._id
                    ? "bg-red-600 text-white font-bold"
                    : "text-gray-400 hover:bg-neutral-800 hover:text-white"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3 border-t border-neutral-700 pt-4">
          <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider">
            Price Range (EGP)
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-gray-400 block mb-1">Min</label>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="0"
                className="w-full p-2 bg-neutral-800 border border-neutral-600 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Max</label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="100000"
                className="w-full p-2 bg-neutral-800 border border-neutral-600 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>
          </div>
          <button
            onClick={handleApplyPrice}
            className="w-full py-2 mt-2 bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-semibold rounded transition-colors border border-neutral-600 cursor-pointer"
          >
            Apply Price
          </button>
        </div>
      </aside>
    </>
  );
};

export default ProductFiltersSidebar;
