"use client";
import Link from "next/link";
import { useCart } from "@/utils/context/CartContext";
import CartItemRow from "@/components/cart/CartItemRow";
import OrderSummary from "@/components/cart/OrderSummary";

export default function CartPage() {
  const { cartItems, isLoading, cartCount } = useCart();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-28 bg-[#2c2f33] rounded-2xl animate-pulse border border-neutral-700"
              />
            ))}
          </div>
          <div className="h-64 bg-[#2c2f33] rounded-2xl animate-pulse border border-neutral-700" />
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-4xl text-center">
        <div className="bg-[#2c2f33] border border-neutral-700 rounded-3xl p-10 md:p-16 flex flex-col items-center shadow-xl">
          <div className="w-20 h-20 bg-neutral-800 rounded-full flex items-center justify-center mb-6 text-gray-400">
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Your Cart is Empty
          </h2>
          <p className="text-gray-400 mb-8 max-w-md">
            Looks like you haven&apos;t added any PC components to your cart
            yet.
          </p>
          <Link
            href="/products"
            className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-600/20"
          >
            Explore Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl md:text-4xl font-bold text-white">
          Shopping Cart{" "}
          <span className="text-sm md:text-base font-normal text-gray-400">
            ({cartCount} {cartCount === 1 ? "item" : "items"})
          </span>
        </h1>

        <Link
          href="/products"
          className="text-sm font-semibold text-red-500 hover:text-red-400 transition-colors flex items-center gap-1"
        >
          Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <CartItemRow key={item.product._id} item={item} />
          ))}
        </div>

        <div className="lg:col-span-1 sticky top-28">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
