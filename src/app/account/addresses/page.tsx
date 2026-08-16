"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/utils/context/AuthContext";
import { toast } from "react-toastify";
import { getAddressesAction } from "../../../utils/actions/profile/getAddressesAction";
import { putAddressesAction } from "../../../utils/actions/profile/putAddressesAction";
import GlobalLoader from "@/components/home/GlobalLoader";

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
      return <GlobalLoader />;

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
