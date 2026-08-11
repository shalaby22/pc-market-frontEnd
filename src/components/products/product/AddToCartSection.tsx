"use client";

import React, { useState } from "react";
import { useCart } from "@/utils/context/CartContext";
import { ProductType } from "@/utils/types/product";
import { toast } from "react-toastify";

interface AddToCartProps {
  product: ProductType;
}

const AddToCartSection = ({ product }: AddToCartProps) => {
  const { cartItems, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const existingCartItem = cartItems.find(
    (item) => item.product._id === product._id,
  );
  const quantityInCart = existingCartItem ? existingCartItem.quantity : 0;

  const availableStock = Math.max(0, product.stock - quantityInCart);

  const handleIncrease = () => {
    if (quantity < availableStock) setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = async () => {
    if (availableStock === 0) {
      toast.error("Max limit reached in cart!");

      return;
    }

    try {
      setIsAdding(true);
      await addToCart(product, quantity);
      setQuantity(1);
    } catch (error) {
      toast.error("Failed to add to cart" + error);
    } finally {
      setIsAdding(false);
    }
  };

  if (product.stock === 0) {
    return (
      <div className="mt-8">
        <button
          disabled
          className="w-full py-4 rounded-xl font-bold text-lg bg-neutral-700 text-gray-400 cursor-not-allowed border border-neutral-600"
        >
          Out of Stock
        </button>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center bg-neutral-800 border border-neutral-600 rounded-xl overflow-hidden h-15 shrink-0">
          <button
            onClick={handleDecrease}
            disabled={quantity <= 1 || availableStock === 0}
            className="px-4 h-full cursor-pointer text-white hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-bold text-xl"
          >
            -
          </button>

          <span className="w-12 text-center text-white font-bold">
            {availableStock === 0 ? 0 : quantity}
          </span>

          <button
            onClick={handleIncrease}
            disabled={quantity >= availableStock || availableStock === 0}
            className="px-4 h-full cursor-pointer text-white hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-bold text-xl"
          >
            +
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`w-full py-4 text-white font-bold text-lg rounded-xl transition-colors shadow-lg shadow-red-600/20 ${
            isAdding
              ? "bg-red-800 cursor-wait opacity-75"
              : "bg-red-600 hover:bg-red-700 cursor-pointer"
          }`}
        >
          {isAdding ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default AddToCartSection;
