"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";

import { toast } from "react-toastify";
import { getAddressesAction } from "./getAddressesAction";
import { putAddressesAction } from "./putAddressesAction";

export default function AddressesPage() {
  const { user } = useAuth();

  const [addresses, setAddresses] = useState<string[]>([]);
  const [newAddress, setNewAddress] = useState<string>("");

  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isAddressShort, setIsAddressShort] = useState<boolean>(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      if (!user?._id) return;

      const result = await getAddressesAction(user._id);

      if (result.success) {
        setAddresses(result.addresses);
      } else {
        toast.error("Failed to load addresses.");
      }
      setIsFetching(false);
    };

    fetchAddresses();
  }, [user?._id]);

  const handleAddAddress = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const trimmed = newAddress.trim();
    if (!trimmed) return;
    if (trimmed.length < 8) {
      setIsAddressShort(true);
      return;
    }
    setAddresses((prev) => [...prev, trimmed]);
    setNewAddress("");
  };

  const handleRemoveAddress = (indexToRemove: number) => {
    setAddresses((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSave = async () => {
    if (!user?._id) return;
    setIsSaving(true);

    try {
      const result = await putAddressesAction(addresses, user._id);

      if (result.success) {
        toast.success("Addresses updated successfully! 📍");
      } else {
        toast.error(result.message || "Failed to update addresses.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isFetching) {
    return (
      <div role="status" className="flex items-center justify-center h-full">
        <svg
          aria-hidden="true"
          className="w-8 h-8 text-neutral-quaternary animate-spin fill-brand"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full">
      <div className="border-b border-neutral-700 pb-4">
        <h2 className="text-3xl font-bold text-white tracking-wide">
          My Addresses
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Add or remove delivery addresses.
        </p>
      </div>

      <form onSubmit={handleAddAddress} className="flex gap-3">
        <div className="flex-1">
          <input
            type="text"
            value={newAddress}
            onChange={(e) => {
              if (e.target.value.length > 7) setIsAddressShort(false);
              return setNewAddress(e.target.value);
            }}
            placeholder="Enter new address (e.g., 123 Tech Street, Cairo)"
            className={` p-3 w-full rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:ring-red-500 
          ${
            isAddressShort
              ? "border-red-500 focus:ring-red-500"
              : "border-neutral-600 focus:ring-gray-400"
          }`}
          />
          {isAddressShort && (
            <p className="mt-1 ml-2 text-xs text-red-500">
              the address must be more than 8 characters
            </p>
          )}
        </div>

        <button
          type="submit"
          className="px-5 py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold rounded-lg border border-neutral-600 transition-colors flex items-center gap-2"
        >
          <span>➕</span> Add Address
        </button>
      </form>

      <div className="space-y-3 pt-2">
        {addresses.length === 0 ? (
          <div className="p-8 text-center text-gray-500 bg-neutral-800/30 rounded-xl border border-dashed border-neutral-700">
            No addresses added yet. Add your first address above!
          </div>
        ) : (
          addresses.map((address, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-neutral-800/60 rounded-xl border border-neutral-700 hover:border-neutral-600 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-red-500 text-xl">📍</span>
                <div>
                  <p className="text-white font-medium">{address}</p>
                  <span className="text-xs text-gray-400">
                    Address #{index + 1}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveAddress(index)}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>

      <div className="pt-4 border-t border-neutral-700 flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
