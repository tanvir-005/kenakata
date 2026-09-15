"use client";

import Link from "next/link";
import { useCart } from "@/context/cart-context";

export function CartSummary() {
  const { itemCount, subtotal, clearCart } = useCart();

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
          <span className="text-neutral-500">Items</span>
          <span>{itemCount}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-neutral-500">Subtotal</span>
          <span className="font-medium">
            ${subtotal.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="my-6 border-t border-neutral-200 dark:border-neutral-800" />

      <div className="flex items-center justify-between">
        <span className="font-medium">Total</span>
        <span className="text-lg font-semibold">
          ${subtotal.toFixed(2)}
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