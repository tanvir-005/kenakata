import Link from "next/link";
import { notFound } from "next/navigation";

import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { BuyNowButton } from "@/components/cart/buy-now-button";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductGrid } from "@/components/product/product-grid";
import { Container } from "@/components/ui/container";
import { ProductReviews } from "@/components/product/product-reviews";
import { WishlistButton } from "@/components/wishlist/wishlist-button";

import {
  getProduct,
  getRelatedProducts,
} from "@/lib/api/products";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { id } = await params;
  const productId = Number(id);

  if (!Number.isInteger(productId) || productId <= 0) {
    notFound();
  }

  let product;

  try {
    product = await getProduct(productId);
  } catch {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(productId);

  return (
    <main>
      {/* Product details */}
      <section className="py-10 sm:py-16">
        <Container>
          <Link
            href="/products"
            className="text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-950 dark:hover:text-white"
          >
            ← Back to products
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <ProductGallery
              images={product.images}
              title={product.title}
            />

            <div className="flex flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                {product.category.name}
              </p>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                    {product.title}
                  </h1>

                  <p className="mt-5 text-2xl font-semibold">
                    ${product.price.toFixed(2)}
                  </p>
                </div>

                <WishlistButton product={product} />
              </div>

              <div className="mt-8 border-t border-neutral-200 pt-8 dark:border-neutral-800">
                <h2 className="text-sm font-semibold">
                  Description
                </h2>

                <p className="mt-3 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                  {product.description}
                </p>
              </div>

              <div className="mt-8 space-y-3">
                <AddToCartButton product={product} />

                <BuyNowButton product={product} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ProductReviews productId={product.id} />

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-neutral-200 py-16 dark:border-neutral-800 sm:py-20">
          <Container>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                You may also like
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                Related products
              </h2>
            </div>

            <div className="mt-10">
              <ProductGrid
                products={relatedProducts.slice(0, 4)}
              />
            </div>
          </Container>
        </section>
      )}
    </main>
  );
}