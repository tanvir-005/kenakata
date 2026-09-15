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
import type { Product } from "@/types";
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

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(
    cartReducer,
    initialCartState,
  );

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);

      if (storedCart) {
        const parsedCart: unknown = JSON.parse(storedCart);

        if (
          typeof parsedCart === "object" &&
          parsedCart !== null &&
          "items" in parsedCart &&
          Array.isArray(parsedCart.items)
        ) {
          parsedCart.items.forEach((item: unknown) => {
            if (
              typeof item !== "object" ||
              item === null ||
              !("product" in item) ||
              !("quantity" in item)
            ) {
              return;
            }

            const cartItem = item as {
              product: Product;
              quantity: number;
            };

            if (
              !cartItem.product ||
              typeof cartItem.quantity !== "number" ||
              !Number.isInteger(cartItem.quantity) ||
              cartItem.quantity <= 0
            ) {
              return;
            }

            dispatch({
              type: "ADD_ITEM",
              payload: {
                product: cartItem.product,
              },
            });

            for (let i = 1; i < cartItem.quantity; i += 1) {
              dispatch({
                type: "INCREASE_QUANTITY",
                payload: {
                  productId: cartItem.product.id,
                },
              });
            }
          });
        }
      }
    } catch {
      localStorage.removeItem(CART_STORAGE_KEY);
    } finally {
      setIsHydrated(true);
    }
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