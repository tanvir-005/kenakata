import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/api/products";
import { Container } from "@/components/ui/container";

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

  const image = product.images[0];

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
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-neutral-100 dark:bg-neutral-900">
              {image ? (
                <Image
                  src={image}
                  alt={product.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-neutral-500">
                  Image unavailable
                </div>
              )}
            </div>

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

              <button
                type="button"
                className="mt-8 h-12 rounded-full bg-neutral-950 px-6 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
              >
                Add to cart
              </button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}