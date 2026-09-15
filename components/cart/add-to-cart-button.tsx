"use client";

import { Check, ShoppingBag } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/types";
import { useCart } from "@/context/cart-context";

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({
  product,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product);
    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-neutral-950 px-6 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
    >
      {added ? (
        <>
          <Check className="h-4 w-4" />
          Added to cart
        </>
      ) : (
        <>
          <ShoppingBag className="h-4 w-4" />
          Add to cart
        </>
      )}
    </button>
  );
}