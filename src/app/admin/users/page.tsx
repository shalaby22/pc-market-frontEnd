import UsersTableClient from "@/components/admin/UsersTableClient";
import { getAllUsersAction } from "@/utils/actions/admin/getAllUsersAction";

export default async function AdminUsersPage() {
  // Fetch users from the backend
  const response = await getAllUsersAction();
  const users = response.response || [];
  return (
    <div className="w-full">
      <UsersTableClient initialUsers={users} />
    </div>
  );
}
