import Link from "next/link";
import OrderCard from "@/components/orders/OrderCard";
import Pagination from "@/components/products/productPagination";
import { OrderType } from "@/app/order/[id]/page";

const ITEMS_PER_PAGE = 10;

type AdminOrdersProps = {
  initialOrders: OrderType[];
  searchParams: { page?: string; status?: string };
  title: string;
  subtitle: string;
  baseUrl: string;
  backLink?: { href: string; text: string };
};

export default function AdminOrders({
  initialOrders,
  searchParams,
  title,
  subtitle,
  baseUrl,
  backLink,
}: AdminOrdersProps) {
  const currentPage = Number(searchParams.page) || 1;
  const currentStatus = searchParams.status?.toLowerCase() || "all";

  let filteredOrders = initialOrders;
  if (currentStatus !== "all") {
    filteredOrders = filteredOrders.filter(
      (order: OrderType) => order.status.toLowerCase() === currentStatus,
    );
  }

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  const paginationData = {
    page: currentPage.toString(),
    limit: ITEMS_PER_PAGE.toString(),
    total: filteredOrders.length,
    pages: totalPages,
    hasPrev: currentPage > 1,
    hasNext: currentPage < totalPages,
  };

  const tabs = ["all", "pending", "paid", "shipped", "delivered", "cancelled"];

  return (
    <div className="w-full">
      {backLink && (
        <div className="mb-4">
          <Link
            href={backLink.href}
            className="inline-flex items-center text-sm font-semibold text-gray-400 hover:text-red-500 transition-colors"
          >
            {backLink.text}
          </Link>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">{title}</h1>
          <p className="text-gray-400 text-sm">{subtitle}</p>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-lg flex items-center gap-2">
          <span className="text-sm text-gray-400">Total Orders: </span>
          <span className="text-lg font-bold text-white">
            {filteredOrders.length}
          </span>
        </div>
      </div>

      <div className="mb-6 bg-neutral-900 border border-neutral-800 rounded-xl p-2">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-nowrap w-full gap-2">
          {tabs.map((tab) => {
            const isActive = currentStatus === tab;
            return (
              <Link
                key={tab}
                href={`${baseUrl}?status=${tab}&page=1`}
                className={`flex-1 flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-colors ${
                  isActive
                    ? "bg-red-600 text-white"
                    : "bg-neutral-800 text-gray-400 hover:bg-neutral-700 hover:text-white"
                }`}
              >
                {tab}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-4 mb-8">
        {currentOrders.length === 0 ? (
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-12 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-neutral-800 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">📦</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">
              No Orders Found
            </h2>
            <p className="text-gray-400">
              There are no orders matching the status &quot;{currentStatus}
              &quot;.
            </p>
          </div>
        ) : (
          currentOrders.map((order: OrderType) => (
            <OrderCard key={order._id} order={order} isAdmin={true} />
          ))
        )}
      </div>

      {totalPages > 1 && <Pagination pagination={paginationData} />}
    </div>
  );
}
