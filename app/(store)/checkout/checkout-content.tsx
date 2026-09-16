"use client";

import { useState } from "react";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { Container } from "@/components/ui/container";
import { useCart } from "@/context/cart-context";
import type { CheckoutFormData } from "@/lib/validations/checkout";

export function CheckoutContent() {
  const { items } = useCart();

  const [formData, setFormData] =
    useState<CheckoutFormData | null>(null);

  if (items.length === 0) {
    return (
      <main className="py-10 sm:py-16">
        <Container>
          <div className="mx-auto max-w-md py-20 text-center">
            <h1 className="text-2xl font-semibold">
              Your cart is empty
            </h1>
          </div>
        </Container>
      </main>
    );
  }

  const handleSubmit = (data: CheckoutFormData) => {
    setFormData(data);
  };

  return (
    <main>
      <section className="py-10 sm:py-16">
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
              Checkout
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Complete your order
            </h1>

            <p className="mt-4 text-sm leading-6 text-neutral-500 sm:text-base">
              Enter your information to continue with your order.
            </p>
          </div>

          <div className="mt-10 max-w-2xl rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800 sm:p-8">
            {formData ? (
              <div>
                <h2 className="text-lg font-semibold">
                  Information submitted
                </h2>

                <p className="mt-2 text-sm text-neutral-500">
                  We&apos;ll use this information for your order.
                </p>
              </div>
            ) : (
              <CheckoutForm onSubmit={handleSubmit} />
            )}
          </div>
        </Container>
      </section>
    </main>
  );
}