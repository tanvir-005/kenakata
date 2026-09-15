import Link from "next/link";
import { Container } from "@/components/ui/container";

export default function ProductNotFound() {
  return (
    <main>
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-md text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
              Product not found
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight">
              We couldn&apos;t find that product.
            </h1>

            <p className="mt-4 text-sm leading-6 text-neutral-500">
              The product may have been removed or the link may be incorrect.
            </p>

            <Link
              href="/products"
              className="mt-7 inline-flex rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
            >
              Browse products
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}