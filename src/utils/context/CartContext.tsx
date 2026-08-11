"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useAuth } from "./AuthContext";
import { ProductType } from "../types/product";
import { mergeCartAction } from "../actions/cart/mergeCartAction";
import { getCartAction } from "../actions/cart/getCartAction";
import { AddToCartAction } from "../actions/cart/addToCartAction";
import { deleteProductFromCart } from "../actions/cart/deleteProductFromCart";
import { editProductQuantityFromCart } from "../actions/cart/editProductQuantityFromCart";

export interface CartItem {
  product: ProductType;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  cartTotal: number;
  cartCount: number;
  isLoading: boolean;
  addToCart: (product: ProductType, quantity?: number) => Promise<void>;
  updateCartQuantity: (productId: string, newQuantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  fetchCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const calculateGuestTotals = (items: CartItem[]) => {
    const total = items.reduce(
      (acc, item) => acc + (item.product.price || 0) * item.quantity,
      0,
    );
    setCartTotal(total);
  };
  const removeFromCart = async (productId: string) => {
    if (isAuthenticated) {
      try {
        const res = await deleteProductFromCart({ productId });
        setCartItems(res.response.cart || []);
        setCartTotal(res.response.total || 0);
      } catch (error) {
        console.error("Error removing item from cart:", error);
        throw error;
      }
    } else {
      let guestCart: CartItem[] = JSON.parse(
        localStorage.getItem("guest_cart") || "[]",
      );
      guestCart = guestCart.filter((item) => item.product._id !== productId);

      localStorage.setItem("guest_cart", JSON.stringify(guestCart));
      setCartItems(guestCart);
      calculateGuestTotals(guestCart);
    }
  };
  const updateCartQuantity = async (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    if (isAuthenticated) {
      try {
        const res = await editProductQuantityFromCart({
          productId,
          quantity: newQuantity,
        });
        setCartItems(res.response.cart || []);
        setCartTotal(res.response.total || 0);
      } catch (error) {
        console.error("Error updating cart quantity:", error);
        throw error;
      }
    } else {
      const guestCart: CartItem[] = JSON.parse(
        localStorage.getItem("guest_cart") || "[]",
      );
      const index = guestCart.findIndex(
        (item) => item.product._id === productId,
      );

      if (index > -1) {
        const stock = guestCart[index].product.stock;
        guestCart[index].quantity = newQuantity > stock ? stock : newQuantity;
      }

      localStorage.setItem("guest_cart", JSON.stringify(guestCart));
      setCartItems(guestCart);
      calculateGuestTotals(guestCart);
    }
  };

  const fetchCart = useCallback(async () => {
    if (isAuthenticated) {
      try {
        const localGuestCart = localStorage.getItem("guest_cart");
        if (localGuestCart) {
          const parsedCart: CartItem[] = JSON.parse(localGuestCart);

          if (parsedCart.length > 0) {
            const formattedMergeData = parsedCart.map((item) => ({
              productId: item.product._id,
              quantity: item.quantity,
            }));

            const mergeRes = await mergeCartAction(formattedMergeData);
            setCartItems(mergeRes.response.cart);
            setCartTotal(mergeRes.response.total);

            localStorage.removeItem("guest_cart");
            setIsLoading(false);
            return;
          }
        }

        const res = await getCartAction();
        setCartItems(res.response.cart || []);
        setCartTotal(res.response.total || 0);
      } catch (error) {
        console.error("Error fetching server cart:", error);
      }
    } else {
      const localCart = localStorage.getItem("guest_cart");
      if (localCart) {
        const parsedCart: CartItem[] = JSON.parse(localCart);
        setCartItems(parsedCart);
        calculateGuestTotals(parsedCart);
      } else {
        setCartItems([]);
        setCartTotal(0);
      }
    }

    setIsLoading(false);
  }, [isAuthenticated]);

  const addToCart = async (product: ProductType, quantity: number = 1) => {
    if (isAuthenticated) {
      try {
        const res = await AddToCartAction({
          productId: product._id,
          quantity: quantity,
        });
        if (!res.success) throw res.message;
        setCartItems(res.response.cart);
        setCartTotal(res.response.total);
      } catch (error) {
        throw error;
      }
    } else {
      const guestCart: CartItem[] = JSON.parse(
        localStorage.getItem("guest_cart") || "[]",
      );

      const existingIndex = guestCart.findIndex(
        (item) => item.product._id === product._id,
      );

      if (existingIndex > -1) {
        const newQty = guestCart[existingIndex].quantity + quantity;
        guestCart[existingIndex].quantity =
          newQty > product.stock ? product.stock : newQty;
      } else {
        guestCart.push({ product, quantity });
      }

      localStorage.setItem("guest_cart", JSON.stringify(guestCart));
      setCartItems(guestCart);
      calculateGuestTotals(guestCart);
    }
  };

  useEffect(() => {
    const initCart = async () => {
      await Promise.resolve();
      fetchCart();
    };

    initCart();
  }, [fetchCart]);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartTotal,
        cartCount,
        isLoading,
        addToCart,
        fetchCart,
        removeFromCart,
        updateCartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
