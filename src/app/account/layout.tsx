"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../../utils/context/AuthContext";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navigation = [
    { name: "Account overview", href: "/account" },
    { name: "Edit Profile", href: "/account/profile" },
    { name: "My Addresses", href: "/account/addresses" },
    { name: "My Orders", href: "/account/orders" },
  ];

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className=" p-6 rounded-2xl border border-neutral-800 shadow-xl space-y-6">
          <div className="border-b border-neutral-700 pb-4">
            <h3 className="text-xl font-bold text-white">
              {user?.firstName} {user?.lastName}
            </h3>
            <p className="text-sm text-gray-400">@{user?.userName}</p>

            {user?.isAdmin && (
              <span className="inline-block mt-2 px-2 py-1 bg-black text-red-500  text-xs font-bold rounded">
                Admin Account
              </span>
            )}
          </div>

          <nav className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-3 rounded-lg text-sm font-semibold transition-colors duration-200 ${
                    isActive
                      ? "bg-red-600 text-white"
                      : "text-gray-300 hover:bg-neutral-800 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}

            {user?.isAdmin && (
              <Link
                href="/admin"
                className="block px-4 py-3 rounded-lg text-sm font-semibold transition-colors duration-200 text-gray-300 hover:bg-neutral-800 hover:text-white"
              >
                Admin Dashboard
              </Link>
            )}

            <button
              onClick={logout}
              className="w-full text-left px-4 py-3 rounded-lg text-sm font-semibold text-gray-400 hover:bg-red-600/20 hover:text-red-500 transition-colors duration-200 mt-4"
            >
              Logout
            </button>
          </nav>
        </aside>

        {/* Dynamic Content Area */}
        <main className="md:col-span-3 bg-[#2c2f33] p-8 rounded-2xl border border-neutral-800 shadow-xl">
          {children}
        </main>
      </div>
    </div>
  );
}
