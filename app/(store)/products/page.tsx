import { getProducts } from "@/lib/api/products";
import { getCategories } from "@/lib/api/categories";
import { Container } from "@/components/ui/container";
import { ProductGrid } from "@/components/product/product-grid";
import { ProductFilters } from "@/components/product/product-filters";
import { ProductSort } from "@/components/product/product-sort";
import { ProductPagination } from "@/components/product/product-pagination";

interface ProductsPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;
  const currentPage = Math.max(
    1,
    Number(params.page) || 1,
    );

    const limit = 20;
    const offset = (currentPage - 1) * limit;
  const sort = params.sort ?? "";

  const search = params.search?.trim() || undefined;

  const categoryId = params.category
    ? Number(params.category)
    : undefined;

  const priceMin = params.minPrice
    ? Number(params.minPrice)
    : undefined;

  const priceMax = params.maxPrice
    ? Number(params.maxPrice)
    : undefined;

  const [products, categories] = await Promise.all([
    getProducts({
        offset,
        limit: 20,
        title: search,
        categoryId,
        priceMin,
        priceMax,
    }),
    getCategories(),
    ]);

    const sortedProducts = [...products];

    switch (sort) {
    case "price-asc":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;

    case "price-desc":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;

    case "name-asc":
        sortedProducts.sort((a, b) =>
        a.title.localeCompare(b.title),
        );
        break;

    case "name-desc":
        sortedProducts.sort((a, b) =>
        b.title.localeCompare(a.title),
        );
        break;
    }

    const hasNextPage = products.length === limit;

  return (
    <main>
      <section className="py-12 sm:py-16">
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
              Store
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              All products
            </h1>

            <p className="mt-4 text-sm leading-6 text-neutral-500 sm:text-base">
              Browse our collection and find something you like.
            </p>
          </div>

          <div className="mt-8">
            <ProductFilters categories={categories} />
          </div>

          <div className="mt-10">
            <div className="mb-6 flex items-center justify-between gap-4">
                <p className="text-sm text-neutral-500">
                {sortedProducts.length} products
                </p>

                <ProductSort />
            </div>

            <ProductGrid products={sortedProducts} />
            <ProductPagination
                currentPage={currentPage}
                hasNextPage={hasNextPage}
                searchParams={{
                    search: params.search,
                    category: params.category,
                    minPrice: params.minPrice,
                    maxPrice: params.maxPrice,
                    sort: params.sort,
                }}
            />
          </div>
        </Container>
      </section>
    </main>
  );
}