import React from "react";
import { getAllOrdersAction } from "@/utils/actions/admin/orders/getAllOrdersAction";
import AdminOrders from "@/components/admin/AdminOrders";

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: { page?: string; status?: string };
}) {
  const resolvedSearchParams = await searchParams;

  const res = await getAllOrdersAction();
  const allOrders = res.response 

  return (
    <AdminOrders
      initialOrders={allOrders}
      searchParams={resolvedSearchParams}
      title="Orders Management"
      subtitle="View and manage all customer orders in your store."
      baseUrl="/admin/orders"
    />
  );
}
