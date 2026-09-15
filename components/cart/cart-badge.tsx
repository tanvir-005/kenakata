"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cart-context";

export function CartBadge() {
  const { itemCount } = useCart();

  return (
    <Link
      href="/cart"
      aria-label={`Cart with ${itemCount} items`}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
    >
      <ShoppingBag className="h-4 w-4" />

      {itemCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-neutral-950 px-1 text-[10px] font-semibold leading-none text-white dark:bg-white dark:text-neutral-950">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </Link>
  );
}