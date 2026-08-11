"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams} from "next/navigation";

import { toast } from "react-toastify";
import { getOrderByIdAction } from "@/utils/actions/order/getOrderByIdAction";
import { cancelOrderAction } from "@/utils/actions/order/cancelOrderAction";
export interface OrderItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    images: string[];
    price?: number;
  };
  price: number;
  quantity: number;
}

export interface OrderType {
  _id: string;
  user: string;
  items: OrderItem[];
  shippingAddress: string;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  total: number;
  createdAt: string;
  updatedAt: string;
}
export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = params.id as string;

  const [order, setOrder] = useState<OrderType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await getOrderByIdAction(orderId);
        if (res.success) setOrder(res.response.order);
      } catch (error) {
        console.error("Failed to load order" + error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleCancelOrder = async () => {
    setIsCancelling(true);
    try {
      await cancelOrderAction(order?._id as string);
      setOrder((prevOrder) =>
        prevOrder ? { ...prevOrder, status: "cancelled" } : null,
      );
      setIsCancelModalOpen(false);
      toast.success("Order cancelled successfully");
    } catch (error) {
      toast.error("Failed to cancel order" + error);
    } finally {
      setIsCancelling(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading order details...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Order not found.
      </div>
    );
  }

  const statusConfig: Record<
    string,
    { color: string; label: string; bg: string }
  > = {
    pending: {
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
      label: "Pending",
    },
    paid: { color: "text-blue-500", bg: "bg-blue-500/10", label: "Paid" },
    shipped: {
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      label: "Shipped",
    },
    delivered: {
      color: "text-green-500",
      bg: "bg-green-500/10",
      label: "Delivered",
    },
    cancelled: {
      color: "text-red-500",
      bg: "bg-red-500/10",
      label: "Cancelled",
    },
  };

  const currentStatus = statusConfig[order.status] || statusConfig.pending;

  const flow = ["pending", "paid", "shipped", "delivered"];
  const currentStepIndex = flow.indexOf(order.status);
  const steps = [
    { title: "Order Placed", description: "We have received your order" },
    { title: "Payment Confirmed", description: "Your payment was successful" },
    { title: "Shipped", description: "Order is on the way" },
    { title: "Delivered", description: "Order delivered successfully" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            Order Details
            <span
              className={`text-sm px-3 py-1 rounded-full border border-current ${currentStatus.bg} ${currentStatus.color}`}
            >
              {currentStatus.label}
            </span>
          </h1>
          <div className="flex items-center gap-2 mt-2 text-gray-400 text-sm">
            <span>Order #{order._id}</span>

            <span className="mx-2">•</span>
            <span>
              {new Date(order.createdAt).toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </span>
          </div>
        </div>

        <Link
          href="/products"
          className="text-sm font-semibold text-red-500 hover:text-red-400 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>

      {/* 2. Timeline Tracker OR Cancelled Warning */}
      <div className="bg-[#2c2f33] border border-neutral-700 rounded-2xl p-6 md:p-10 mb-8 shadow-xl">
        {order.status === "cancelled" ? (
          <div className="flex items-center justify-center flex-col text-center py-6">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">
              This Order Has Been Cancelled
            </h2>
            <p className="text-gray-400">
              If you have any questions, please contact our support team.
            </p>
          </div>
        ) : (
          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-5 left-[10%] right-[10%] h-1 bg-neutral-700 rounded-full">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-500"
                style={{
                  width: `${(Math.max(0, currentStepIndex) / (steps.length - 1)) * 100}%`,
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-0 relative z-10">
              {steps.map((step, index) => {
                const isActive = index <= currentStepIndex;
                return (
                  <div
                    key={index}
                    className="flex md:flex-col items-center md:text-center gap-4 md:gap-3"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-[#2c2f33] transition-colors duration-300 ${
                        isActive
                          ? "bg-green-500 text-[#1e2124]"
                          : "bg-neutral-700 text-gray-500"
                      }`}
                    >
                      {isActive ? (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <span className="text-sm font-bold">{index + 1}</span>
                      )}
                    </div>
                    <div>
                      <h3
                        className={`font-bold ${isActive ? "text-white" : "text-gray-500"}`}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`text-xs mt-1 ${isActive ? "text-gray-400" : "text-neutral-600"}`}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 bg-[#2c2f33] border border-neutral-700 rounded-2xl p-6 shadow-xl">
          <h2 className="text-lg font-bold text-white mb-4 border-b border-neutral-700 pb-3">
            Items in this Order
          </h2>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between gap-4 py-2"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 bg-neutral-800 rounded-xl border border-neutral-700 p-2 overflow-hidden shrink-0">
                    <Image
                      src={item.product.images?.[0] || "/placeholder.png"}
                      alt={item.product.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Link
                      href={`/products/${item.product._id}`}
                      className="font-bold text-white hover:text-red-500 transition-colors line-clamp-1"
                    >
                      {item.product.name}
                    </Link>
                    <span className="text-sm text-gray-400">
                      Qty: {item.quantity}
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="block font-bold text-white">
                    {(item.price * item.quantity).toLocaleString("en-US")} EGP
                  </span>
                  {item.quantity > 1 && (
                    <span className="text-xs text-gray-500">
                      {item.price.toLocaleString("en-US")} EGP / unit
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#2c2f33] border border-neutral-700 rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-bold text-white mb-4 border-b border-neutral-700 pb-3">
              Order Summary
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>{order.total.toLocaleString("en-US")} EGP</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Shipping</span>
                <span className="text-green-400">Free</span>
              </div>
              <hr className="border-neutral-700 my-2" />
              <div className="flex justify-between text-lg font-bold text-white pt-1">
                <span>Total</span>
                <span className="text-red-500">
                  {order.total.toLocaleString("en-US")} EGP
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[#2c2f33] border border-neutral-700 rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-bold text-white mb-3">
              Shipping Address
            </h2>
            <div className="flex items-start gap-3 text-gray-300 bg-neutral-800 p-4 rounded-xl border border-neutral-700">
              <span className="text-xl">📍</span>
              <p className="text-sm leading-relaxed">{order.shippingAddress}</p>
            </div>
          </div>

          {(order.status === "pending" || order.status === "paid") && (
            <button
              onClick={() => setIsCancelModalOpen(true)}
              className="w-full py-4 bg-transparent border border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bold rounded-xl transition-all"
            >
              Cancel Order
            </button>
          )}
        </div>
      </div>

      {isCancelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#2c2f33] border border-neutral-700 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl transform transition-all">
            <h3 className="text-2xl font-bold text-white mb-2">
              Cancel Order?
            </h3>
            <p className="text-gray-400 mb-8">
              Are you sure you want to cancel this order? This action cannot be
              undone.
            </p>
            <div className="flex flex-col-reverse sm:flex-row gap-3">
              <button
                onClick={() => setIsCancelModalOpen(false)}
                disabled={isCancelling}
                className="flex-1 py-3 bg-neutral-700 hover:bg-neutral-600 text-white font-bold rounded-xl transition-colors disabled:opacity-50"
              >
                No, Keep Order
              </button>
              <button
                onClick={handleCancelOrder}
                disabled={isCancelling}
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-red-600/20 disabled:opacity-50"
              >
                {isCancelling ? "Cancelling..." : "Yes, Cancel Order"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
