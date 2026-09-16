"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import type { ReactNode } from "react";
import type { CartItem, Product } from "@/types";
import {
  cartReducer,
  initialCartState,
} from "@/reducers/cart-reducer";

interface CartContextValue {
  items: CartItem[];
  isHydrated: boolean;
  selectedIds: number[];
  selectedItems: CartItem[];
  selectedItemCount: number;
  selectedSubtotal: number;
  itemCount: number;
  subtotal: number;
  addItem: (product: Product) => void;
  buyNow: (product: Product) => void;
  toggleSelect: (productId: number) => void;
  selectAll: () => void;
  clearSelection: () => void;
  removeSelectedItems: () => void;
  isSelected: (productId: number) => boolean;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(
  undefined,
);

const CART_STORAGE_KEY = "kenakata-cart";

interface SelectionState {
  selectedIds: number[];
}

type SelectionAction =
  | { type: "HYDRATE"; payload: number[] }
  | { type: "SET"; payload: number[] };

function selectionReducer(
  state: SelectionState,
  action: SelectionAction,
): SelectionState {
  return {
    selectedIds: action.payload,
  };
}

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
  const [selectionState, selectionDispatch] = useReducer(
    selectionReducer,
    { selectedIds: [] },
  );
  const { selectedIds } = selectionState;

  useEffect(() => {
    let items: CartItem[] = [];

    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);

      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);

        if (parsedCart && Array.isArray(parsedCart.items)) {
          items = parsedCart.items.filter(
            isStoredCartItem,
          ) as CartItem[];

          if (parsedCart.version !== 2) {
            items.reverse();
          }

          const selectedIds = Array.isArray(parsedCart.selectedIds)
            ? parsedCart.selectedIds.filter(
                (id: unknown): id is number =>
                  typeof id === "number" &&
                  Number.isInteger(id) &&
                  items.some((item) => item.product.id === id),
              )
            : items.map((item) => item.product.id);

          selectionDispatch({
            type: "HYDRATE",
            payload: selectedIds,
          });
        }
      }
    } catch {
      localStorage.removeItem(CART_STORAGE_KEY);
    }

    dispatch({
      type: "HYDRATE_CART",
      payload: { items },
    });
  }, []);

  useEffect(() => {
    if (!state.isHydrated) {
      return;
    }

    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify({
        version: 2,
        items: state.items,
        selectedIds,
      }),
    );
  }, [state, selectedIds]);

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

    const selectedItems = state.items.filter((item) =>
      selectedIds.includes(item.product.id),
    );

    const selectedItemCount = selectedItems.reduce(
      (total, item) => total + item.quantity,
      0,
    );

    const selectedSubtotal = selectedItems.reduce(
      (total, item) =>
        total + item.product.price * item.quantity,
      0,
    );

    return {
      items: state.items,
      isHydrated: state.isHydrated,
      selectedIds,
      selectedItems,
      selectedItemCount,
      selectedSubtotal,
      itemCount,
      subtotal,
      addItem: (product) => {
        dispatch({
          type: "ADD_ITEM",
          payload: { product },
        });

        selectionDispatch({
          type: "SET",
          payload:
            selectedIds.length === 0
              ? [
                  ...new Set([
                    ...state.items.map((item) => item.product.id),
                    product.id,
                  ]),
                ]
              : [...new Set([...selectedIds, product.id])],
        });
      },
      buyNow: (product) => {
        const alreadyInCart = state.items.some(
          (item) => item.product.id === product.id,
        );

        if (!alreadyInCart) {
          dispatch({
            type: "ADD_ITEM",
            payload: { product },
          });
        }

        selectionDispatch({
          type: "SET",
          payload: [product.id],
        });
        sessionStorage.setItem(
          "kenakata-buy-now-product",
          String(product.id),
        );
      },
      toggleSelect: (productId) => {
        selectionDispatch({
          type: "SET",
          payload: selectedIds.includes(productId)
            ? selectedIds.filter((id) => id !== productId)
            : [...selectedIds, productId],
        });
      },
      selectAll: () => {
        selectionDispatch({
          type: "SET",
          payload: state.items.map((item) => item.product.id),
        });
      },
      clearSelection: () => {
        selectionDispatch({ type: "SET", payload: [] });
      },
      removeSelectedItems: () => {
        if (selectedIds.length === 0) {
          return;
        }

        dispatch({
          type: "REMOVE_ITEM",
          payload: { productId: selectedIds[0] },
        });

        for (const productId of selectedIds.slice(1)) {
          dispatch({
            type: "REMOVE_ITEM",
            payload: { productId },
          });
        }

        selectionDispatch({ type: "SET", payload: [] });
      },
      isSelected: (productId) =>
        selectedIds.includes(productId),
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
      removeItem: (productId) => {
        dispatch({
          type: "REMOVE_ITEM",
          payload: { productId },
        });

        selectionDispatch({
          type: "SET",
          payload: selectedIds.filter((id) => id !== productId),
        });
      },
      clearCart: () => {
        dispatch({
          type: "CLEAR_CART",
        });
        selectionDispatch({ type: "SET", payload: [] });
      },
    };
  }, [state, selectedIds]);

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