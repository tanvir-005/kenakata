import { Container } from "@/components/ui/container";

export default function ProductLoading() {
  return (
    <main>
      <section className="py-10 sm:py-16">
        <Container>
          <div className="h-5 w-32 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="aspect-square animate-pulse rounded-3xl bg-neutral-200 dark:bg-neutral-800" />

            <div className="flex flex-col justify-center">
              <div className="h-3 w-20 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />

              <div className="mt-4 h-10 w-4/5 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />

              <div className="mt-5 h-8 w-24 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />

              <div className="mt-8 border-t border-neutral-200 pt-8 dark:border-neutral-800">
                <div className="h-4 w-24 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />

                <div className="mt-4 space-y-2">
                  <div className="h-4 w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
                  <div className="h-4 w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
                  <div className="h-4 w-3/4 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
                </div>
              </div>

              <div className="mt-8 h-12 w-full animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-800" />
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}