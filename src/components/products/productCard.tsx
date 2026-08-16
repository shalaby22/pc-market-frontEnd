"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductType } from "@/utils/types/product";
import { useCart } from "@/utils/context/CartContext";
import { toast } from "react-toastify";

const ProductCard = ({ product }: { product: ProductType }) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (product.stock === 0) return;

    try {
      setIsAdding(true);
      await addToCart(product, 1);
    } catch (error) {
      const err = error as { response: { data: string } };
      toast.error(
        (err.response?.data as string) || "Max limit reached in cart!",
      );
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="border border-neutral-700 bg-[#2c2f33] w-full flex flex-col p-3 rounded-2xl transition-all duration-300 hover:shadow-xl hover:border-red-500/50 group relative">
      <Link
        href={`/products/${product._id}`}
        className="relative w-full aspect-square flex items-center justify-center p-2 rounded-lg bg-[#1e2124] overflow-hidden mb-3"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className={`object-contain transition-transform duration-300 ${
            product.stock === 0
              ? "opacity-70 grayscale"
              : "group-hover:scale-105"
          }`}
          sizes="(max-width: 768px) 50vw, 25vw"
        />

        {product.stock === 0 && (
          <div className="absolute top-2 right-2 bg-neutral-800/90 backdrop-blur-sm border border-neutral-600 text-red-500 text-xs font-bold px-2 py-1 rounded-md z-10">
            Out of Stock
          </div>
        )}
      </Link>

      <div className="flex flex-col grow">
        <Link href={`/products/${product._id}`}>
          <h5 className="text-sm md:text-base font-bold text-gray-200 line-clamp-3 hover:text-red-500 transition-colors">
            {product.name}
          </h5>
        </Link>

        <div className="mt-auto">
          <hr className="border-neutral-700 my-3" />
          <span className="block pl-2 text-lg md:text-xl font-bold text-white mb-3">
            {product.price.toLocaleString("en-US")} EGP
          </span>

          {product.stock === 0 ? (
            <button
              type="button"
              disabled
              className="w-full text-gray-400 bg-neutral-700 cursor-not-allowed font-bold rounded-lg text-sm px-4 py-2.5 border border-neutral-600 flex items-center justify-center gap-2"
            >
              Out of stock
            </button>
          ) : (
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`w-full text-white font-bold rounded-lg text-sm px-4 py-2.5 transition-colors shadow-lg flex items-center justify-center gap-2 ${
                isAdding
                  ? "bg-red-800 cursor-wait opacity-75"
                  : "bg-red-600 hover:bg-red-700 cursor-pointer"
              }`}
            >
              {isAdding ? "Adding..." : "Add to cart"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
