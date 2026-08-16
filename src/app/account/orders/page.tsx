"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getOrdersForUserAction } from "@/utils/actions/order/getOrdersForUserAction";
import OrderCard from "@/components/orders/OrderCard";
import Pagination from "@/components/products/productPagination";
import { OrderType } from "@/app/order/[id]/page";
import GlobalLoader from "@/components/home/GlobalLoader";

const ITEMS_PER_PAGE = 5;

const MyOrdersPage = () => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const [orders, setOrders] = useState<OrderType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const res = await getOrdersForUserAction();
        const fetchedOrders = res.response.orders;
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (isLoading) {
      return <GlobalLoader />;

  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-24 h-24 bg-neutral-800 rounded-full flex items-center justify-center mb-6">
          <span className="text-4xl">📦</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          No orders placed yet!
        </h2>
        <p className="text-gray-400 mb-6">
          Browse our products and start building your dream PC now.
        </p>
        <Link
          href="/products"
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentOrders = orders.slice(startIndex, endIndex);

  const paginationData = {
    page: currentPage.toString(),
    limit: ITEMS_PER_PAGE.toString(),
    total: orders.length,
    pages: totalPages,
    hasPrev: currentPage > 1,
    hasNext: currentPage < totalPages,
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Order History</h1>
        <span className="text-gray-400">Total Orders: {orders.length}</span>
      </div>

      <div className="flex flex-col gap-4">
        {currentOrders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>

      {totalPages > 1 && <Pagination pagination={paginationData} />}
    </div>
  );
};

export default MyOrdersPage;
