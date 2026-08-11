"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CartItem, useCart } from "@/utils/context/CartContext";
import { toast } from "react-toastify";

interface CartItemRowProps {
  item: CartItem;
}

const CartItemRow = ({ item }: CartItemRowProps) => {
  const { updateCartQuantity, removeFromCart } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);

  const { product, quantity } = item;
  const itemTotal = (product.price || 0) * quantity;

  const handleIncrease = async () => {
    if (quantity >= product.stock) {
      toast.error("Maximum available stock reached!");
      return;
    }
    try {
      setIsUpdating(true);
      await updateCartQuantity(product._id, quantity + 1);
    } catch (error) {
      console.error("Error increasing quantity:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDecrease = async () => {
    if (quantity <= 1) return;
    try {
      setIsUpdating(true);
      await updateCartQuantity(product._id, quantity - 1);
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    try {
      setIsUpdating(true);
      await removeFromCart(product._id);
    } catch (error) {
      console.error("Failed to remove item", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div
      className={`bg-[#2c2f33] border border-neutral-700 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all hover:border-neutral-600 ${isUpdating ? "opacity-60 pointer-events-none" : ""}`}
    >
      <div className="flex items-center gap-4 w-full sm:w-1/2">
        <Link
          href={`/products/${product._id}`}
          className="relative w-20 h-20 sm:w-24 sm:h-24 bg-[#1e2124] rounded-xl shrink-0 p-2 overflow-hidden border border-neutral-700/50"
        >
          <Image
            src={product.images?.[0]}
            alt={product.name}
            fill
            className="object-contain"
            sizes="96px"
          />
        </Link>

        <div className="flex flex-col grow min-w-0">
          <Link
            href={`/products/${product._id}`}
            className="text-sm md:text-base font-bold text-white hover:text-red-500 transition-colors line-clamp-2"
          >
            {product.name}
          </Link>
          <span className="text-sm text-gray-400 mt-1">
            {product.price?.toLocaleString("en-US")} EGP / unit
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-1/2">
        <div className="flex items-center bg-neutral-800 border border-neutral-600 rounded-xl overflow-hidden h-10 shrink-0">
          <button
            onClick={handleDecrease}
            disabled={quantity <= 1 || isUpdating}
            className="px-3 h-full cursor-pointer text-white hover:bg-neutral-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-bold text-lg"
          >
            -
          </button>

          <span className="w-10 text-center text-white font-bold text-sm">
            {quantity}
          </span>

          <button
            onClick={handleIncrease}
            disabled={quantity >= product.stock || isUpdating}
            className="px-3 h-full cursor-pointer text-white hover:bg-neutral-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-bold text-lg"
          >
            +
          </button>
        </div>

        <div className="text-right min-w-25">
          <span className="block text-base md:text-lg font-bold text-white">
            {itemTotal.toLocaleString("en-US")} EGP
          </span>
        </div>

        <button
          onClick={handleRemove}
          disabled={isUpdating}
          title="Remove item"
          className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-neutral-800 cursor-pointer"
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CartItemRow;
