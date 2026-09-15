import type { CartItem } from "@/types";

export interface CartState {
  items: CartItem[];
}

export type CartAction =
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
};

export function cartReducer(
  state: CartState,
  action: CartAction,
): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.product.id,
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.product.id === action.payload.product.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          ),
        };
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            product: action.payload.product,
            quantity: 1,
          },
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
      return initialCartState;

    default:
      return state;
  }
}