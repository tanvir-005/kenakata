"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

import { useWishlist } from "@/context/wishlist-context";

export function WishlistBadge() {
  const { itemCount } = useWishlist();

  return (
    <Link
      href="/wishlist"
      aria-label={`Wishlist${itemCount > 0 ? `, ${itemCount} items` : ""}`}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
    >
      <Heart className="h-4 w-4" />

      {itemCount > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-neutral-950 px-1 text-[10px] font-semibold leading-none text-white dark:bg-white dark:text-neutral-950">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </Link>
  );
}