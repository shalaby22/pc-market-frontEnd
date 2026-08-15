"use client";

import { useAuth } from "@/utils/context/AuthContext";
import Link from "next/link";

export default function AdminEditButton({ productId }: { productId: string }) {
  const { user } = useAuth();

  if (!user || !user.isAdmin) return null;

  return (
    <Link
      href={`/admin/products/${productId}`}
      className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs md:text-sm font-bold px-4 py-1.5 rounded-lg border border-neutral-700 transition-colors"
      title="Edit this product in Admin Panel"
    >
      <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
      <span>Edit Product</span>
    </Link>
  );
}