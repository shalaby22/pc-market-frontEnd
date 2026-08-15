import React from "react";
import Link from "next/link";
import { OrderType } from "@/app/order/[id]/page";

const statusStyles: Record<OrderType["status"], string> = {
  pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  paid: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  shipped: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  delivered: "bg-green-500/10 text-green-500 border-green-500/20",
  cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
};

type ExtendedOrderType = OrderType & {
  user?: {
    email?: string;
  };
};

const OrderCard = ({
  order,
  isAdmin = false,
}: {
  order: ExtendedOrderType;
  isAdmin?: boolean;
}) => {
  const currentStatus = order.status;



  return (
    <Link
      href={`/order/${order._id}`}
      className="block bg-neutral-900 border border-neutral-800 p-5 rounded-xl transition-all duration-200 hover:border-red-600 hover:shadow-[0_0_15px_rgba(220,38,38,0.1)] group"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-bold text-lg text-white group-hover:text-red-500 transition-colors">
              Order #{order._id.slice(-6).toUpperCase()}
            </h3>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border capitalize ${
                statusStyles[currentStatus] ||
                "bg-gray-500/10 text-gray-400 border-gray-500/20"
              }`}
            >
              {order.status}
            </span>
          </div>
          <p className="text-sm text-gray-400">
            Date: {new Date(order.createdAt).toLocaleDateString("en-US")}
          </p>

          {isAdmin && order.user?.email && (
            <p className="text-sm font-medium text-gray-300 mt-2 flex items-center gap-2">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              {order.user.email}
            </p>
          )}
        </div>

        <div className="text-right">
          <p className="text-xl font-bold text-white mb-1">
            {order.total.toLocaleString("en-US")} EGP
          </p>
          <p className="text-sm text-gray-400">
            {order.items?.length || 0} items
          </p>
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;
