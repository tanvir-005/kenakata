import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Container } from "@/components/ui/container";

export function EmptyCart() {
  return (
    <Container>
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-900">
          <ShoppingBag className="h-7 w-7 text-neutral-500" />
        </div>

        <h1 className="mt-6 text-2xl font-semibold tracking-tight">
          Your cart is empty
        </h1>

        <p className="mt-3 max-w-sm text-sm leading-6 text-neutral-500">
          Add some products to your cart and they will appear here.
        </p>

        <Link
          href="/products"
          className="mt-6 rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
        >
          Browse products
        </Link>
      </div>
    </Container>
  );
}