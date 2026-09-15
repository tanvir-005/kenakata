"use client";

import { CartItem } from "@/components/cart/cart-item";
import { CartSummary } from "@/components/cart/cart-summary";
import { EmptyCart } from "@/components/cart/empty-cart";
import { Container } from "@/components/ui/container";
import { useCart } from "@/context/cart-context";

export default function CartPage() {
  const { items } = useCart();

  if (items.length === 0) {
    return (
      <main className="py-10 sm:py-16">
        <EmptyCart />
      </main>
    );
  }

  return (
    <main>
      <section className="py-10 sm:py-16">
        <Container>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
              Shopping bag
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Your cart
            </h1>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
            <div>
              {items.map((item) => (
                <CartItem
                  key={item.product.id}
                  item={item}
                />
              ))}
            </div>

            <CartSummary />
          </div>
        </Container>
      </section>
    </main>
  );
}