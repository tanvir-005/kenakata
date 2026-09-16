import { Container } from "@/components/ui/container";

export default function StoreLoading() {
  return (
    <main className="py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-6xl">
          <div className="h-8 w-48 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />

          <div className="mt-4 h-4 w-80 max-w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800"
              >
                <div className="aspect-square animate-pulse bg-neutral-200 dark:bg-neutral-800" />

                <div className="space-y-3 p-4">
                  <div className="h-4 w-3/4 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
                  <div className="h-5 w-1/3 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}