"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function AccountOverviewPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8 w-full">
      <div className="border-b border-neutral-700 pb-6">
        <h2 className="text-3xl font-bold text-white mb-2 tracking-wide">
          Account Overview
        </h2>
        <p className="text-gray-400 text-sm md:text-base">
          Welcome back,
          <span className="text-white font-semibold">
            {" "+user?.firstName} {user?.lastName}
          </span>
          ! Here you can manage your account details and view your recent
          activity.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-neutral-800/50 p-6 rounded-xl border border-neutral-700 hover:border-red-500/50 transition-colors duration-300 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">👤</span>
              <h3 className="text-xl font-bold text-white">Personal Info</h3>
            </div>
            <div className="space-y-2 text-gray-400 text-sm mb-6">
              <p>
                <strong className="text-gray-300">Name:</strong>
                {" "+user?.firstName} {user?.lastName}
              </p>
              <p>
                <strong className="text-gray-300">Email:</strong> {" "+user?.email}
              </p>
              <p>
                <strong className="text-gray-300">Phone:</strong>
                {" "+user?.phone}
              </p>
            </div>
          </div>
          <Link
            href="/account/profile"
            className="inline-block text-red-500 hover:text-red-400 font-semibold text-sm transition-colors"
          >
            Edit Profile &rarr;
          </Link>
        </div>

        <div className="bg-neutral-800/50 p-6 rounded-xl border border-neutral-700 hover:border-red-500/50 transition-colors duration-300 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">📦</span>
              <h3 className="text-xl font-bold text-white">My Orders</h3>
            </div>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Check the status of your recent orders, track shipments, and view
              your purchase history.
            </p>
          </div>
          <Link
            href="/account/orders"
            className="inline-block text-red-500 hover:text-red-400 font-semibold text-sm transition-colors"
          >
            View Orders &rarr;
          </Link>
        </div>
        <div className="bg-neutral-800/50 p-6 rounded-xl border border-neutral-700 hover:border-red-500/50 transition-colors duration-300 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">📍</span>
              <h3 className="text-xl font-bold text-white">My Addresses</h3>
            </div>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Manage your shipping and billing addresses for a faster and
              smoother checkout experience.
            </p>
          </div>
          <Link
            href="/account/addresses"
            className="inline-block text-red-500 hover:text-red-400 font-semibold text-sm transition-colors"
          >
            Manage Addresses &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
