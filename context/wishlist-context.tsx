"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import type { ReactNode } from "react";

import type { Product, WishlistItem } from "@/types";
import {
  initialWishlistState,
  wishlistReducer,
} from "@/reducers/wishlist-reducer";

interface WishlistContextValue {
  items: WishlistItem[];
  itemCount: number;
  isHydrated: boolean;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  toggleWishlist: (product: Product) => void;
  isWishlisted: (productId: number) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<
  WishlistContextValue | undefined
>(undefined);

const STORAGE_KEY = "kenakata-wishlist";

function loadWishlist(): WishlistItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedWishlist = localStorage.getItem(STORAGE_KEY);

    if (!storedWishlist) {
      return [];
    }

    const parsedWishlist: unknown = JSON.parse(storedWishlist);

    if (!Array.isArray(parsedWishlist)) {
      return [];
    }

    return parsedWishlist;
  } catch {
    return [];
  }
}

export function WishlistProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(
    wishlistReducer,
    initialWishlistState,
  );
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const storedWishlist = loadWishlist();

    dispatch({
      type: "HYDRATE_WISHLIST",
      payload: { items: storedWishlist },
    });

    const frameId = window.requestAnimationFrame(() => {
      setIsHydrated(true);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(state.items),
    );
  }, [isHydrated, state.items]);

  const addToWishlist = useCallback((product: Product) => {
    dispatch({
      type: "ADD_TO_WISHLIST",
      payload: { product },
    });
  }, []);

  const removeFromWishlist = useCallback((productId: number) => {
    dispatch({
      type: "REMOVE_FROM_WISHLIST",
      payload: { productId },
    });
  }, []);

  const toggleWishlist = useCallback((product: Product) => {
    dispatch({
      type: "TOGGLE_WISHLIST",
      payload: { product },
    });
  }, []);

  const isWishlisted = useCallback(
    (productId: number) =>
      state.items.some(
        (item) => item.product.id === productId,
      ),
    [state.items],
  );

  const clearWishlist = useCallback(() => {
    dispatch({
      type: "CLEAR_WISHLIST",
    });
  }, []);

  const value = useMemo(
    () => ({
      items: state.items,
      itemCount: state.items.length,
      isHydrated,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      isWishlisted,
      clearWishlist,
    }),
    [
      state.items,
      isHydrated,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      isWishlisted,
      clearWishlist,
    ],
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used within a WishlistProvider",
    );
  }

  return context;
}