"use client";

import Link from "next/link";
import { useCart } from "@/context/cart-context";

export function CartSummary() {
  const {
    itemCount,
    subtotal,
    selectedItemCount,
    selectedSubtotal,
    clearCart,
    selectAll,
    clearSelection,
  } = useCart();

  return (
    <aside className="rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold">Order summary</h2>

        <button
          type="button"
          onClick={clearCart}
          className="text-xs font-medium text-neutral-500 transition-colors hover:text-neutral-950 dark:hover:text-white"
        >
          Clear cart
        </button>
      </div>

      <div className="mt-6 space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-neutral-500">Items in cart</span>
          <span>{itemCount}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-neutral-500">Selected for checkout</span>
          <span>{selectedItemCount}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-neutral-500">Cart subtotal</span>
          <span className="font-medium">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-neutral-500">Selected total</span>
          <span className="font-medium">
            ${selectedSubtotal.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="mt-6 flex gap-2">
        <button
          type="button"
          onClick={selectAll}
          className="flex-1 rounded-full border border-neutral-300 px-3 py-2 text-xs font-medium transition-colors hover:border-neutral-500 dark:border-neutral-700 dark:hover:border-neutral-500"
        >
          Select all
        </button>

        <button
          type="button"
          onClick={clearSelection}
          className="flex-1 rounded-full border border-neutral-300 px-3 py-2 text-xs font-medium transition-colors hover:border-neutral-500 dark:border-neutral-700 dark:hover:border-neutral-500"
        >
          Clear selection
        </button>
      </div>

      <div className="my-6 border-t border-neutral-200 dark:border-neutral-800" />

      <div className="flex items-center justify-between">
        <span className="font-medium">Total due</span>
        <span className="text-lg font-semibold">
          ${selectedSubtotal.toFixed(2)}
        </span>
      </div>

      <Link
        href="/checkout"
        className="mt-6 flex h-11 w-full items-center justify-center rounded-full bg-neutral-950 px-5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
      >
        Proceed to checkout
      </Link>
    </aside>
  );
}