"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/utils/context/AuthContext";
import { useCart } from "@/utils/context/CartContext";
import { getAddressesAction } from "../account/addresses/getAddressesAction";
import { putAddressesAction } from "../account/addresses/putAddressesAction";
import { toast } from "react-toastify";
import { makeOrderAction } from "@/utils/actions/order/makeOrderAction";

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { cartItems, cartTotal, isLoading: isCartLoading } = useCart();

  // States
  const [addresses, setAddresses] = useState<string[]>([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<
    number | null
  >(null);
  const [newAddress, setNewAddress] = useState("");
  const [isFetchingAddresses, setIsFetchingAddresses] = useState(true);
  const [isSavingAddress, setIsSavingAddress] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // 1. Auth Guard & Empty Cart Redirect
  useEffect(() => {
    if (!isCartLoading && cartItems.length === 0) {
      router.push("/cart");
    }
  }, [cartItems.length, isCartLoading, router]);

  // 2. Fetch User Addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      if (!user?._id) return;

      try {
        const result = await getAddressesAction(user._id);
        if (result.success) {
          setAddresses(result.addresses);
          if (result.addresses.length > 0) {
            setSelectedAddressIndex(0);
          }
        }
      } catch (error) {
        console.error("Failed to load addresses", error);
      } finally {
        setIsFetchingAddresses(false);
      }
    };

    fetchAddresses();
  }, [user]);

  // 3. Add New Address
  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newAddress.trim();
    if (trimmed.length < 8) {
      toast.error("The address must be more than 8 characters");
      return;
    }

    setIsSavingAddress(true);
    try {
      const updatedAddresses = [...addresses, trimmed];
      const result = await putAddressesAction(updatedAddresses, user!._id);

      if (result.success) {
        setAddresses(updatedAddresses);
        setNewAddress("");
        setSelectedAddressIndex(updatedAddresses.length - 1);
        toast.success("Address added successfully!");
      } else {
        toast.error(result.message || "Failed to add address");
      }
    } catch (error) {
      toast.error("Something went wrong" + error);
    } finally {
      setIsSavingAddress(false);
    }
  };

  // 4. Place Order Handler
  const handlePlaceOrder = async () => {
    if (selectedAddressIndex === null) {
      toast.error("Please select a shipping address");
      return;
    }

    setIsPlacingOrder(true);
    try {
      console.log("Placing order with address index:", selectedAddressIndex);

      const res = await makeOrderAction(selectedAddressIndex);
      if (res.success) {
        toast.success("Order placed successfully!");
        router.push(`/order/${res.response.order._id}`);
      }

    } catch (error) {
      toast.error("Failed to place order" + error);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (isCartLoading || cartItems.length === 0) return null;

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
      <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Contact Information */}
          <section className="bg-[#2c2f33] border border-neutral-700 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4 border-b border-neutral-700 pb-2">
              1. Contact Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Name</label>
                <div className="bg-neutral-800 p-3 rounded-lg border border-neutral-700">
                  {user?.firstName} {user?.lastName}
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Email
                </label>
                <div className="bg-neutral-800 p-3 rounded-lg border border-neutral-700">
                  {user?.email}
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Shipping Address */}
          <section className="bg-[#2c2f33] border border-neutral-700 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4 border-b border-neutral-700 pb-2">
              2. Shipping Address
            </h2>

            {isFetchingAddresses ? (
              <div className="text-gray-400">Loading your addresses...</div>
            ) : (
              <div className="space-y-4">
                {addresses.length > 0 ? (
                  <div className="grid grid-cols-1 gap-3">
                    {addresses.map((address, index) => (
                      <label
                        key={index}
                        className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                          selectedAddressIndex === index
                            ? "border-red-500 bg-red-500/10"
                            : "border-neutral-700 bg-neutral-800 hover:border-neutral-500"
                        }`}
                      >
                        <input
                          type="radio"
                          name="shipping_address"
                          className="w-5 h-5 accent-red-500"
                          checked={selectedAddressIndex === index}
                          onChange={() => setSelectedAddressIndex(index)}
                        />
                        <div className="flex flex-col">
                          <span className="text-white font-medium">
                            {address}
                          </span>
                          <span className="text-xs text-gray-400">
                            Address #{index + 1}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 mb-4">
                    You have no saved addresses.
                  </p>
                )}

                <div className="pt-4 border-t border-neutral-700 mt-4">
                  <h3 className="text-sm font-semibold text-gray-300 mb-3">
                    Add New Address
                  </h3>
                  <form
                    onSubmit={handleAddAddress}
                    className="flex flex-col sm:flex-row gap-3"
                  >
                    <input
                      type="text"
                      value={newAddress}
                      onChange={(e) => setNewAddress(e.target.value)}
                      placeholder="e.g., 123 Tech Street, Cairo"
                      className="flex-1 p-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:border-red-500 focus:outline-none transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={isSavingAddress || !newAddress.trim()}
                      className="px-6 py-3 bg-neutral-700 hover:bg-neutral-600 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors whitespace-nowrap"
                    >
                      {isSavingAddress ? "Saving..." : "➕ Add"}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </section>

          {/* Section 3: Payment Method */}
          <section className="bg-[#2c2f33] border border-neutral-700 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4 border-b border-neutral-700 pb-2">
              3. Payment Method
            </h2>
            <label className="flex items-center gap-4 p-4 rounded-xl border border-red-500 bg-red-500/10 cursor-pointer">
              <input
                type="radio"
                checked
                readOnly
                className="w-5 h-5 accent-red-500"
              />
              <div className="flex flex-col">
                <span className="text-white font-bold">
                  Cash on Delivery (COD)
                </span>
                <span className="text-sm text-gray-400">
                  Pay when you receive your order.
                </span>
              </div>
            </label>
          </section>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-[#2c2f33] border border-neutral-700 rounded-2xl p-6 shadow-xl sticky top-24 flex flex-col gap-6">
            <h3 className="text-xl font-bold text-white pb-4 border-b border-neutral-700">
              Order Summary
            </h3>

            <div className="max-h-60 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
              {cartItems.map((item) => (
                <div key={item.product._id} className="flex items-center gap-3">
                  <div className="relative w-12 h-12 bg-neutral-800 rounded-lg shrink-0 overflow-hidden border border-neutral-700">
                    <Image
                      src={item.product.images?.[0]}
                      alt={item.product.name}
                      fill
                      className="object-contain p-1"
                      sizes="48px"
                    />
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-sm text-gray-200 line-clamp-1">
                      {item.product.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      Qty: {item.quantity}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-white shrink-0">
                    {((item.product.price || 0) * item.quantity).toLocaleString(
                      "en-US",
                    )}{" "}
                    EGP
                  </span>
                </div>
              ))}
            </div>

            <hr className="border-neutral-700" />

            <div className="space-y-3 text-sm md:text-base">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span className="font-semibold text-white">
                  {cartTotal.toLocaleString("en-US")} EGP
                </span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Shipping Fee</span>
                <span className="text-green-400 font-semibold uppercase tracking-wider">
                  Free
                </span>
              </div>
              <hr className="border-neutral-700 my-2" />
              <div className="flex justify-between text-lg font-bold text-white pt-1">
                <span>Total Amount</span>
                <span className="text-red-500 text-xl font-black">
                  {cartTotal.toLocaleString("en-US")} EGP
                </span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isPlacingOrder || selectedAddressIndex === null}
              className="w-full py-4 bg-red-600 hover:bg-red-700 disabled:bg-neutral-600 disabled:cursor-not-allowed text-white font-bold text-lg rounded-xl transition-all shadow-lg shadow-red-600/20 active:scale-[0.98]"
            >
              {isPlacingOrder ? "Processing..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
