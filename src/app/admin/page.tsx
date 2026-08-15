import React from "react";
import Link from "next/link";

const adminModules = [
  {
    title: "Products Management",
    description: "Add, edit, or remove PC products, update stock levels, and set prices.",
    href: "/admin/products",
    icon: (
      <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    title: "Categories Management",
    description: "Organize categories.",
    href: "/admin/categories",
    icon: (
      <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
  },
  {
    title: "Orders Management",
    description: "Track customer orders, review details, and update shipping statuses.",
    href: "/admin/orders",
    icon: (
      <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
  },
  {
    title: "Users Management",
    description: "View registered users, manage permissions, and update user accounts.",
    href: "/admin/users",
    icon: (
      <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
];

export default function AdminHomePage() {
  return (
    <div className="py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome to Admin Dashboard</h1>
        <p className="text-gray-400">Select a module below to manage your store components.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {adminModules.map((module) => (
          <Link
            key={module.href}
            href={module.href}
            className="group relative bg-neutral-900 border border-neutral-800 hover:border-red-600/80 p-6 rounded-2xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(220,38,38,0.15)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-neutral-800 rounded-xl group-hover:bg-red-600/10 group-hover:scale-110 transition-all duration-300">
                  {module.icon}
                </div>
              </div>

              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors">
                {module.title}
              </h2>

              <p className="text-gray-400 text-sm leading-relaxed">
                {module.description}
              </p>
            </div>

            
          </Link>
        ))}
      </div>
    </div>
  );
}