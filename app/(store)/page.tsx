import Link from "next/link";
import Image from "next/image";

import { getCategories } from "@/lib/api/categories";
import { getProducts } from "@/lib/api/products";

import { ProductGrid } from "@/components/product/product-grid";
import { ProductImage } from "@/components/product/product-image";
import { Container } from "@/components/ui/container";

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getProducts({ limit: 8 }),
    getCategories(),
  ]);

  return (
    <main>
      {/* Hero */}
      <section className="py-8 sm:py-12">
        <Container>
          <div className="relative h-[320px] overflow-hidden rounded-3xl bg-neutral-100 shadow-sm dark:bg-neutral-900 sm:h-[480px] lg:h-[560px]">
            <Image
              src="/images/banner.png"
              alt="KenaKata shopping with thoughtful delivery"
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 92vw, 1200px"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="pb-20">
        <Container>
            <div className="flex items-end justify-between gap-4">
            <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                Featured
                </p>

                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                Featured products
                </h2>
            </div>

            <Link
                href="/products"
                className="text-sm font-medium hover:underline"
            >
                View all products
            </Link>
            </div>

            <div className="mt-10">
            <ProductGrid products={products.slice(0, 12)} />
            </div>
        </Container>
      </section>

      {/* Categories */}
      <section className="border-t border-neutral-200 py-20 dark:border-neutral-800">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                Categories
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                Shop by category
              </h2>
            </div>

            <Link
              href="/categories"
              className="hidden text-sm font-medium hover:underline sm:block"
            >
              View all categories
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {categories.slice(0, 8).map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.id}`}
                className="group overflow-hidden rounded-2xl border border-neutral-200 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
              >
                <div className="aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                  <ProductImage
                    src={category.image}
                    alt={category.name}
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-medium transition-colors group-hover:text-neutral-500">
                    {category.name}
                  </h3>

                  <p className="mt-1 text-sm text-neutral-500">
                    View products
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <Link
            href="/categories"
            className="mt-6 block text-center text-sm font-medium hover:underline sm:hidden"
          >
            View all categories
          </Link>
        </Container>
      </section>
    </main>
  );
}