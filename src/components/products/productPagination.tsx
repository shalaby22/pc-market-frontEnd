"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PaginationProps } from "@/utils/types/product";

const Pagination = ({ pagination }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!pagination || pagination.pages <= 1) return null;

  const currentPage = Number(pagination.page);
  const totalPages = pagination.pages;

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());

    window.scrollTo({ top: 0, behavior: "instant" });

    router.push(`?${params.toString()}`);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    let start = Math.max(1, currentPage - 1);
    let end = Math.min(totalPages, currentPage + 1);

    if (currentPage <= 2) {
      end = 4;
    } else if (currentPage >= totalPages - 1) {
      start = totalPages - 3;
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-10 mb-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={!pagination.hasPrev}
        className="px-4 py-2 bg-neutral-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-600 transition-colors border border-neutral-700"
      >
        Prev
      </button>

      <div className="flex items-center gap-1 sm:gap-2">
        {getPageNumbers().map((pageNum, index) => {
          if (pageNum === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="text-gray-400 font-bold px-1 sm:px-2"
              >
                ...
              </span>
            );
          }
          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum as number)}
              className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg font-bold transition-colors ${
                currentPage === pageNum
                  ? "bg-red-600 text-white border-red-600"
                  : "bg-neutral-800 text-gray-300 border border-neutral-700 hover:bg-neutral-700 hover:text-white"
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!pagination.hasNext}
        className="px-4 py-2 bg-neutral-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-600 transition-colors border border-neutral-700"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
