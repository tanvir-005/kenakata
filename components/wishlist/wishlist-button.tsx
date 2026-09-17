"use client";

import { Heart } from "lucide-react";

import { useWishlist } from "@/context/wishlist-context";
import type { Product } from "@/types";

interface WishlistButtonProps {
  product: Product;
  size?: "sm" | "md";
}

export function WishlistButton({
  product,
  size = "md",
}: WishlistButtonProps) {
  const { toggleWishlist, isWishlisted } = useWishlist();

  const wishlisted = isWishlisted(product.id);

  return (
    <button
      type="button"
      onClick={() => toggleWishlist(product)}
      aria-label={
        wishlisted
          ? `Remove ${product.title} from wishlist`
          : `Add ${product.title} to wishlist`
      }
      aria-pressed={wishlisted}
      className={`flex items-center justify-center rounded-full border transition-colors ${
        size === "sm"
          ? "h-9 w-9"
          : "h-11 w-11"
      } ${
        wishlisted
          ? "border-neutral-950 bg-neutral-950 text-white dark:border-white dark:bg-white dark:text-neutral-950"
          : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-950 hover:text-neutral-950 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400 dark:hover:border-white dark:hover:text-white"
      }`}
    >
      <Heart
        className={size === "sm" ? "h-4 w-4" : "h-5 w-5"}
        fill={wishlisted ? "currentColor" : "none"}
      />
    </button>
  );
}