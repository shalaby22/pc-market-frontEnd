"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/components/products/productPagination";

export type UserType = {
  _id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isAdmin: boolean;
};

const ITEMS_PER_PAGE = 10;

export default function UsersTableClient({
  initialUsers,
}: {
  initialUsers: UserType[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = !searchQuery.trim()
    ? initialUsers
    : initialUsers.filter((user) =>
        user.email.toLowerCase().includes(searchQuery.trim().toLowerCase()),
      );

  // Reset to page 1 when searching
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    router.replace(`?${params.toString()}`);
  };

  // Frontend Pagination Logic
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const paginationData = {
    page: currentPage.toString(),
    limit: ITEMS_PER_PAGE.toString(),
    total: filteredUsers.length,
    pages: totalPages,
    hasPrev: currentPage > 1,
    hasNext: currentPage < totalPages,
  };

  return (
    <div className="w-full">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">
            Users Management
          </h1>
          <p className="text-gray-400 text-sm">
            Manage your store customers and administrators.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by email..."
            className="w-full bg-neutral-900 border border-neutral-800 text-white rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-red-600 transition-colors text-sm"
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden mb-6 w-full">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-neutral-800/50 text-gray-300 border-b border-neutral-800 uppercase text-xs font-semibold">
              <tr>
                <th className="px-4 py-3 md:px-6 md:py-4">Full Name</th>
                <th className="px-4 py-3 md:px-6 md:py-4">Email</th>
                {/* Mobile hidden on small screens */}
                <th className="hidden md:table-cell px-4 py-3 md:px-6 md:py-4">
                  Mobile
                </th>
                <th className="hidden md:table-cell  px-4 py-3 md:px-6 md:py-4">
                  Role
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {currentUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No users found matching your search.
                  </td>
                </tr>
              ) : (
                currentUsers.map((user) => (
                  <tr
                    key={user._id}
                    onClick={() => router.push(`/admin/users/${user._id}`)}
                    className="hover:bg-neutral-800/30 transition-colors cursor-pointer group"
                    title="View User Details"
                  >
                    <td className="px-4 py-3 md:px-6 md:py-4">
                      <div className="flex items-center gap-3">
                        <div className="font-medium text-white group-hover:text-red-400 transition-colors capitalize">
                          {user.firstName} {user.lastName}
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3 md:px-6 md:py-4">{user.email}</td>

                    <td className="hidden md:table-cell px-4 py-3 md:px-6 md:py-4">
                      {user.phone || "N/A"}
                    </td>

                    <td className="hidden md:table-cell px-4 py-3 md:px-6 md:py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                          user.isAdmin
                            ? "bg-red-500/10 text-red-500 border-red-500/20"
                            : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                        }`}
                      >
                        {user.isAdmin ? "Admin" : "Customer"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination component (only show if there's more than 1 page) */}
      {totalPages > 1 && <Pagination pagination={paginationData} />}
    </div>
  );
}
