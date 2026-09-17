import type { Product, WishlistItem } from "@/types";

export interface WishlistState {
  items: WishlistItem[];
}

export type WishlistAction =
  | {
      type: "ADD_TO_WISHLIST";
      payload: {
        product: Product;
      };
    }
  | {
      type: "REMOVE_FROM_WISHLIST";
      payload: {
        productId: number;
      };
    }
  | {
      type: "TOGGLE_WISHLIST";
      payload: {
        product: Product;
      };
    }
  | {
      type: "HYDRATE_WISHLIST";
      payload: {
        items: WishlistItem[];
      };
    }
  | {
      type: "CLEAR_WISHLIST";
    };

export const initialWishlistState: WishlistState = {
  items: [],
};

export function wishlistReducer(
  state: WishlistState,
  action: WishlistAction,
): WishlistState {
  switch (action.type) {
    case "HYDRATE_WISHLIST":
      return {
        items: action.payload.items,
      };

    case "ADD_TO_WISHLIST": {
      const exists = state.items.some(
        (item) => item.product.id === action.payload.product.id,
      );

      if (exists) {
        return state;
      }

      return {
        items: [
          ...state.items,
          {
            product: action.payload.product,
            addedAt: new Date().toISOString(),
          },
        ],
      };
    }

    case "REMOVE_FROM_WISHLIST":
      return {
        items: state.items.filter(
          (item) => item.product.id !== action.payload.productId,
        ),
      };

    case "TOGGLE_WISHLIST": {
      const exists = state.items.some(
        (item) => item.product.id === action.payload.product.id,
      );

      if (exists) {
        return {
          items: state.items.filter(
            (item) => item.product.id !== action.payload.product.id,
          ),
        };
      }

      return {
        items: [
          ...state.items,
          {
            product: action.payload.product,
            addedAt: new Date().toISOString(),
          },
        ],
      };
    }

    case "CLEAR_WISHLIST":
      return initialWishlistState;

    default:
      return state;
  }
}