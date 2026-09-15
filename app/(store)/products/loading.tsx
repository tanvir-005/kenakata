import { Container } from "@/components/ui/container";

function ProductSkeleton() {
  return (
    <div>
      <div className="aspect-square animate-pulse rounded-2xl bg-neutral-200 dark:bg-neutral-800" />

      <div className="mt-4">
        <div className="h-3 w-20 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />

        <div className="mt-2 h-4 w-4/5 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />

        <div className="mt-2 h-4 w-16 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
      </div>
    </div>
  );
}

export default function ProductsLoading() {
  return (
    <main>
      <section className="py-12 sm:py-16">
        <Container>
          <div className="max-w-2xl">
            <div className="h-3 w-16 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />

            <div className="mt-3 h-10 w-48 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />

            <div className="mt-4 h-5 w-80 max-w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
          </div>

          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}