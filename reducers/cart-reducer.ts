import type { CartItem } from "@/types";

export interface CartState {
  items: CartItem[];
  isHydrated: boolean;
}

export type CartAction =
  | {
      type: "HYDRATE_CART";
      payload: {
        items: CartItem[];
      };
    }
  | {
      type: "ADD_ITEM";
      payload: {
        product: CartItem["product"];
      };
    }
  | {
      type: "INCREASE_QUANTITY";
      payload: {
        productId: number;
      };
    }
  | {
      type: "DECREASE_QUANTITY";
      payload: {
        productId: number;
      };
    }
  | {
      type: "REMOVE_ITEM";
      payload: {
        productId: number;
      };
    }
  | {
      type: "CLEAR_CART";
    };

export const initialCartState: CartState = {
  items: [],
  isHydrated: false,
};

export function cartReducer(
  state: CartState,
  action: CartAction,
): CartState {
  switch (action.type) {
    case "HYDRATE_CART":
      return {
        items: action.payload.items,
        isHydrated: true,
      };

    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.product.id,
      );

      if (existingItem) {
        return {
          ...state,
          items: [
            {
              ...existingItem,
              quantity: existingItem.quantity + 1,
            },
            ...state.items.filter(
              (item) => item.product.id !== action.payload.product.id,
            ),
          ],
        };
      }

      return {
        ...state,
        items: [
          {
            product: action.payload.product,
            quantity: 1,
          },
          ...state.items,
        ],
      };
    }

    case "INCREASE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.payload.productId
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        ),
      };

    case "DECREASE_QUANTITY":
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.product.id === action.payload.productId
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                }
              : item,
          )
          .filter((item) => item.quantity > 0),
      };

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (item) => item.product.id !== action.payload.productId,
        ),
      };

    case "CLEAR_CART":
      return {
        items: [],
        isHydrated: state.isHydrated,
      };

    default:
      return state;
  }
}