"use client";

import UserForm from "@/components/account/UserForm";
import { useAuth } from "@/utils/context/AuthContext";

export default function EditProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="">
      <UserForm targetUser={user} />
    </div>
  );
}
