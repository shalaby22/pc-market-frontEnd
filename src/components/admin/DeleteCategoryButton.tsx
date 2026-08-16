"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { deleteCategoryAction } from "@/utils/actions/admin/categories/deleteCategoryAction";

export default function DeleteCategoryButton({
  id,
  categoryName, 
}: {
  id: string;
  categoryName: string;
}) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false); 

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteCategoryAction(id);
      
      toast.success("Category deleted successfully!");
      
      setShowModal(false); 
      setIsDeleting(false); 
      router.refresh(); 
    } catch (error) {
      setIsDeleting(false); 
      toast.error("Error deleting Category. " + error);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)} 
        disabled={isDeleting}
        className="text-red-500 hover:text-red-400 bg-red-500/10 p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title="Delete Category"
      >
        {isDeleting ? (
          <svg
            className="w-4 h-4 md:w-5 md:h-5 animate-spin"
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
        ) : (
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        )}
      </button>

      {showModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => !isDeleting && setShowModal(false)}
          ></div>

          <div className="relative bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-md p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-5 border border-red-500/20">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Delete Category?
              </h3>
              <p className="text-gray-400 mb-8 text-sm sm:text-base leading-relaxed">
                Are you sure you want to delete{" "}
                {categoryName ? (
                  <span className="text-white font-bold">&quot;{categoryName}&quot;</span>
                ) : (
                  "this category"
                )}
                ? <br className="hidden sm:block" />
                This action cannot be undone.
              </p>

              <div className="flex w-full gap-3 sm:gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  disabled={isDeleting}
                  className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDeleting ? (
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
                      Deleting...
                    </>
                  ) : (
                    "Yes, Delete"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}