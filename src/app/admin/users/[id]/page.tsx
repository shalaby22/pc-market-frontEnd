import React from "react";
import { notFound } from "next/navigation";
import { getUserByIdAction } from "@/utils/actions/admin/users/getUserByIdAction";
import UserForm from "@/components/account/UserForm";
import Link from "next/link";

export default async function AdminEditUserPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const response = await getUserByIdAction(id);
  const user = response.response.user;
  if (!user) {
    notFound();
  }

  return (
    <div className="w-4xl mx-auto bg-[#2c2f33] p-8 rounded-2xl border border-neutral-800 shadow-xl">
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6  flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">
            User&apos;s Orders
          </h3>
          <p className="text-gray-400 text-sm">
            View all orders placed by {user.userName}.
          </p>
        </div>
        <Link
          href={`/admin/orders/user/${user._id}`}
          className="bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
        >
          <span>View Orders</span>
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
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </div>
      <div className="mt-10 border-4 border-neutral-800 rounded-xl p-6  flex items-center justify-between">
        <UserForm targetUser={user} isEditingAsAdmin={true} />
      </div>
    </div>
  );
}
