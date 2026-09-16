"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { useCart } from "@/context/cart-context";
import type { Product } from "@/types";

interface BuyNowButtonProps {
  product: Product;
}

export function BuyNowButton({ product }: BuyNowButtonProps) {
  const router = useRouter();
  const { buyNow } = useCart();

  const handleBuyNow = () => {
    buyNow(product);
    router.push("/cart");
  };

  return (
    <button
      type="button"
      onClick={handleBuyNow}
      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-neutral-300 px-6 text-sm font-medium transition-colors hover:border-neutral-500 dark:border-neutral-700 dark:hover:border-neutral-500"
    >
      Buy now
      <ArrowRight className="h-4 w-4" />
    </button>
  );
}