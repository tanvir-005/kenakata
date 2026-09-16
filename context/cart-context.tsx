"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { CartItem, Product } from "@/types";
import {
  cartReducer,
  initialCartState,
} from "@/reducers/cart-reducer";

interface CartContextValue {
  items: typeof initialCartState.items;
  itemCount: number;
  subtotal: number;
  addItem: (product: Product) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(
  undefined,
);

const CART_STORAGE_KEY = "kenakata-cart";

function isStoredCartItem(value: unknown): value is CartItem {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  if (!("product" in value) || !("quantity" in value)) {
    return false;
  }

  const item = value as {
    product: unknown;
    quantity: unknown;
  };

  return (
    typeof item.product === "object" &&
    item.product !== null &&
    "id" in item.product &&
    typeof item.product.id === "number" &&
    Number.isInteger(item.product.id) &&
    typeof item.quantity === "number" &&
    Number.isInteger(item.quantity) &&
    item.quantity > 0
  );
}

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({
  children,
}: CartProviderProps) {
  const [state, dispatch] = useReducer(
    cartReducer,
    initialCartState,
  );
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);

    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);

        if (
          parsedCart &&
          Array.isArray(parsedCart.items)
        ) {
          const items = parsedCart.items.filter(
            isStoredCartItem,
          ) as CartItem[];

          dispatch({
            type: "HYDRATE_CART",
            payload: { items },
          });
        }
      } catch {
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    }

    const timeoutId = window.setTimeout(() => {
      setIsHydrated(true);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(state),
    );
  }, [state, isHydrated]);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = state.items.reduce(
      (total, item) => total + item.quantity,
      0,
    );

  const subtotal = state.items.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0,
  );

    return {
      items: state.items,
      itemCount,
      subtotal,
      addItem: (product) =>
        dispatch({
          type: "ADD_ITEM",
          payload: { product },
        }),
      increaseQuantity: (productId) =>
        dispatch({
          type: "INCREASE_QUANTITY",
          payload: { productId },
        }),
      decreaseQuantity: (productId) =>
        dispatch({
          type: "DECREASE_QUANTITY",
          payload: { productId },
        }),
      removeItem: (productId) =>
        dispatch({
          type: "REMOVE_ITEM",
          payload: { productId },
        }),
      clearCart: () =>
        dispatch({
          type: "CLEAR_CART",
        }),
    };
  }, [state]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used within a CartProvider",
    );
  }

  return context;
}