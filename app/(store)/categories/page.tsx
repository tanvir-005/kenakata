import Link from "next/link";

import { getCategories } from "@/lib/api/categories";
import { Container } from "@/components/ui/container";
import { ProductImage } from "@/components/product/product-image";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <main>
      <section className="py-10 sm:py-16">
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
              Categories
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Shop by category
            </h1>

            <p className="mt-4 text-sm leading-6 text-neutral-500 sm:text-base">
              Browse products by category and find what you are looking
              for.
            </p>
          </div>

          {categories.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-neutral-200 p-10 text-center dark:border-neutral-800">
              <p className="text-sm text-neutral-500">
                No categories available.
              </p>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {categories.map((category) => (
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
                    <h2 className="font-medium transition-colors group-hover:text-neutral-500">
                      {category.name}
                    </h2>

                    <p className="mt-1 text-sm text-neutral-500">
                      View products
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}