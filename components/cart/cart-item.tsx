"use client";

import { ProductImage } from "@/components/product/product-image";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem as CartItemType } from "@/types";
import { useCart } from "@/context/cart-context";
import Link from "next/link";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const {
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  } = useCart();

  const image = item.product.images[0];

  return (
    <article className="flex gap-4 border-b border-neutral-200 py-6 dark:border-neutral-800">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900">
        <ProductImage
          src={image ?? ""}
          alt={item.product.title}
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-neutral-500">
              {item.product.category.name}
            </p>

            <h2 className="mt-1 text-sm font-medium">
              <Link
                href={`/product/${item.product.id}`}
                className="transition-colors hover:text-neutral-500"
              >
                {item.product.title}
              </Link>
            </h2>
          </div>

          <p className="shrink-0 text-sm font-semibold">
            $
            {(item.product.price * item.quantity).toFixed(2)}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="inline-flex items-center rounded-full border border-neutral-200 dark:border-neutral-700">
            <button
              type="button"
              onClick={() =>
                decreaseQuantity(item.product.id)
              }
              aria-label={`Decrease quantity of ${item.product.title}`}
              className="inline-flex h-8 w-8 items-center justify-center text-neutral-500 transition-colors hover:text-neutral-950 dark:hover:text-white"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>

            <span className="w-8 text-center text-sm">
              {item.quantity}
            </span>

            <button
              type="button"
              onClick={() =>
                increaseQuantity(item.product.id)
              }
              aria-label={`Increase quantity of ${item.product.title}`}
              className="inline-flex h-8 w-8 items-center justify-center text-neutral-500 transition-colors hover:text-neutral-950 dark:hover:text-white"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={() =>
              removeItem(item.product.id)
            }
            aria-label={`Remove ${item.product.title} from cart`}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 transition-colors hover:text-red-600"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Remove
          </button>
        </div>
      </div>
    </article>
  );
}