"use client";

import Link from "next/link";
import { Heart, Trash2 } from "lucide-react";

import { useWishlist } from "@/context/wishlist-context";
import { ProductImage } from "@/components/product/product-image";
import { Container } from "@/components/ui/container";

export function WishlistContent() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();

  if (items.length === 0) {
    return (
      <main>
        <section className="py-16 sm:py-24">
          <Container>
            <div className="mx-auto max-w-lg text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-900">
                <Heart className="h-7 w-7 text-neutral-500" />
              </div>

              <h1 className="mt-6 text-2xl font-semibold tracking-tight">
                Your wishlist is empty
              </h1>

              <p className="mt-3 text-sm leading-6 text-neutral-500">
                Save products you like and come back to them later.
              </p>

              <Link
                href="/products"
                className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-neutral-950 px-6 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
              >
                Browse products
              </Link>
            </div>
          </Container>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="py-10 sm:py-16">
        <Container>
          <div className="flex flex-col gap-4 border-b border-neutral-200 pb-8 dark:border-neutral-800 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                Saved products
              </p>

              <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                My Wishlist
              </h1>

              <p className="mt-2 text-sm text-neutral-500">
                {items.length} {items.length === 1 ? "product" : "products"} saved
              </p>
            </div>

            <button
              type="button"
              onClick={clearWishlist}
              className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-full border border-neutral-300 px-4 text-sm font-medium transition-colors hover:border-neutral-500 dark:border-neutral-700 dark:hover:border-neutral-500 sm:self-auto"
            >
              <Trash2 className="h-4 w-4" />
              Clear wishlist
            </button>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => {
              const product = item.product;

              return (
                <article
                  key={product.id}
                  className="group flex h-full flex-col rounded-2xl border border-neutral-200 p-3 dark:border-neutral-800"
                >
                  <Link
                    href={`/product/${product.id}`}
                    className="block"
                  >
                    <div className="aspect-square overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900">
                      <ProductImage
                        src={product.images[0]}
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

                  <button
                    type="button"
                    onClick={() => removeFromWishlist(product.id)}
                    className="mt-4 inline-flex h-10 items-center justify-center gap-2 rounded-full border border-neutral-300 px-4 text-xs font-medium transition-colors hover:border-neutral-950 hover:text-neutral-950 dark:border-neutral-700 dark:hover:border-white dark:hover:text-white"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </button>
                </article>
              );
            })}
          </div>
        </Container>
      </section>
    </main>
  );
}