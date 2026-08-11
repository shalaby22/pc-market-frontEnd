"use client";

import Link from "next/link";
import { useCart } from "@/utils/context/CartContext";

const OrderSummary = () => {
  const { cartTotal, cartCount } = useCart();

  return (
    <div className="bg-[#2c2f33] border border-neutral-700 rounded-2xl p-6 shadow-xl sticky top-24 flex flex-col gap-6">
      <h3 className="text-xl font-bold text-white pb-4 border-b border-neutral-700">
        Order Summary
      </h3>

      <div className="space-y-3 text-sm md:text-base">
        <div className="flex justify-between text-gray-300">
          <span>Subtotal ({cartCount} {cartCount === 1 ? "item" : "items"})</span>
          <span className="font-semibold text-white">
            {cartTotal.toLocaleString("en-US")} EGP
          </span>
        </div>

        <div className="flex justify-between text-gray-300">
          <span>Shipping Fee</span>
          <span className="text-green-400 font-semibold">Calculated at Checkout</span>
        </div>

        <hr className="border-neutral-700 my-2" />

        <div className="flex justify-between text-lg font-bold text-white pt-1">
          <span>Total Amount</span>
          <span className="text-red-500 text-xl font-black">
            {cartTotal.toLocaleString("en-US")} EGP
          </span>
        </div>
      </div>

      <Link
        href="/checkout"
        className="w-full text-center py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-xl transition-all shadow-lg shadow-red-600/20 active:scale-[0.98]"
      >
        Proceed to Checkout
      </Link>

    </div>
  );
};

export default OrderSummary;