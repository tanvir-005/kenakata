"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useCart } from "@/context/cart-context";
import type { Product } from "@/types";
import { ProductImage } from "./product-image";
import { WishlistButton } from "../wishlist/wishlist-button";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { addItem, buyNow } = useCart();
  const image = product.images[0];

  const handleBuyNow = () => {
    buyNow(product);
    router.push("/cart");
  };

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-neutral-200 p-3 transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700">
      <div className="relative">
        <Link href={`/product/${product.id}`} className="block">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900">
            <ProductImage
              src={image}
              alt={product.title}
            />
          </div>

          <div className="mt-4">
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              {product.category.name}
            </p>

            <h2 className="mt-1 line-clamp-2 text-sm font-medium leading-5">
              {product.title}
            </h2>

            <p className="mt-2 text-sm font-semibold">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </Link>

        <div className="absolute right-3 top-3">
          <WishlistButton
            product={product}
            size="sm"
          />
        </div>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => addItem(product)}
          className="inline-flex h-10 items-center justify-center rounded-full bg-neutral-950 px-3 text-xs font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
        >
          Add to cart
        </button>

        <button
          type="button"
          onClick={handleBuyNow}
          className="inline-flex h-10 items-center justify-center rounded-full border border-neutral-300 px-3 text-xs font-medium transition-colors hover:border-neutral-500 dark:border-neutral-700 dark:hover:border-neutral-500"
        >
          Buy now
        </button>
      </div>
    </article>
  );
}