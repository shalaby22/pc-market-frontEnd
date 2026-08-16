import AdminOrders from "@/components/admin/AdminOrders";
import { getOrdersByUserIdAction } from "@/utils/actions/admin/orders/getOrdersByUserIdAction";

export default async function AdminUserOrdersPage({
  params,
  searchParams,
}: {
  params: { userId: string };
  searchParams: { page?: string; status?: string };
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const { userId } = resolvedParams;

  const res = await getOrdersByUserIdAction(userId);
  const userOrders = res.response;
  return (
    <AdminOrders
      initialOrders={userOrders}
      searchParams={resolvedSearchParams}
      title={`User ${userId} Orders`}
      subtitle="Manage all orders for this specific customer."
      baseUrl={`/admin/orders/user/${userId}`}
      backLink={{
        href: `/admin/users/${userId}`,
        text: "Back to User Profile",
      }}
    />
  );
}
