import { ProductGallery } from "@/components/product/product-gallery";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/api/products";
import { Container } from "@/components/ui/container";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";

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

  return (
    <main>
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

              <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                {product.title}
              </h1>

              <p className="mt-5 text-2xl font-semibold">
                ${product.price.toFixed(2)}
              </p>

              <div className="mt-8 border-t border-neutral-200 pt-8 dark:border-neutral-800">
                <h2 className="text-sm font-semibold">
                  Description
                </h2>

                <p className="mt-3 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                  {product.description}
                </p>
              </div>

              <AddToCartButton product={product} />
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}