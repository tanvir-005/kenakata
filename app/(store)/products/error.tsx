"use client";

import { Container } from "@/components/ui/container";

interface ProductsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ProductsError({
  reset,
}: ProductsErrorProps) {
  return (
    <main>
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-md text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
              Something went wrong
            </p>

            <h1 className="mt-3 text-2xl font-semibold tracking-tight">
              We couldn&apos;t load the products.
            </h1>

            <p className="mt-3 text-sm leading-6 text-neutral-500">
              There was a problem while loading the product catalogue.
              Please try again.
            </p>

            <button
              type="button"
              onClick={reset}
              className="mt-6 rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
            >
              Try again
            </button>
          </div>
        </Container>
      </section>
    </main>
  );
}