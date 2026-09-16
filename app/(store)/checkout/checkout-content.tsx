"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { CheckoutForm } from "@/components/checkout/checkout-form";
import { Container } from "@/components/ui/container";
import { useCart } from "@/context/cart-context";
import type { CheckoutFormData } from "@/lib/validations/checkout";

export function CheckoutContent() {
  const { items, itemCount, subtotal, clearCart } = useCart();

  const [deliveryData, setDeliveryData] =
    useState<CheckoutFormData | null>(null);

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (orderPlaced) {
    return (
      <main className="py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-900">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-neutral-500">
              Order confirmed
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Thank you for your order
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-neutral-500 sm:text-base">
              Your order has been placed successfully. Payment will be
              collected when your order is delivered.
            </p>

            <Link
              href="/products"
              className="mt-8 inline-flex rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-neutral-950"
            >
              Continue shopping
            </Link>
          </div>
        </Container>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="py-10 sm:py-16">
        <Container>
          <div className="mx-auto max-w-md py-20 text-center">
            <h1 className="text-2xl font-semibold">
              Your cart is empty
            </h1>

            <p className="mt-3 text-sm text-neutral-500">
              Add some products before proceeding to checkout.
            </p>

            <Link
              href="/products"
              className="mt-6 inline-flex rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white dark:bg-white dark:text-neutral-950"
            >
              Browse products
            </Link>
          </div>
        </Container>
      </main>
    );
  }

  const handleDeliverySubmit = (data: CheckoutFormData) => {
    setDeliveryData(data);
  };

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);

    // Simulate a successful mock checkout.
    await new Promise((resolve) => setTimeout(resolve, 800));

    clearCart();
    setIsPlacingOrder(false);
    setOrderPlaced(true);
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
              {deliveryData
                ? "Review your order before placing it."
                : "Enter your delivery information to continue."}
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800 sm:p-8">
              {!deliveryData ? (
                <CheckoutForm onSubmit={handleDeliverySubmit} />
              ) : (
                <div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                      Delivery information
                    </p>

                    <h2 className="mt-2 text-xl font-semibold">
                      {deliveryData.fullName}
                    </h2>
                  </div>

                  <div className="mt-6 space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <p>{deliveryData.email}</p>
                    <p>{deliveryData.phone}</p>
                    <p>{deliveryData.address}</p>
                    <p>
                      {deliveryData.city}, {deliveryData.postalCode}
                    </p>
                  </div>

                  <div className="mt-8 border-t border-neutral-200 pt-6 dark:border-neutral-800">
                    <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                      Payment
                    </p>

                    <div className="mt-4 rounded-xl border border-neutral-200 p-4 dark:border-neutral-800">
                      <p className="font-medium">
                        Cash on Delivery
                      </p>

                      <p className="mt-1 text-sm text-neutral-500">
                        Pay when your order is delivered.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    disabled={isPlacingOrder}
                    className="mt-8 w-full rounded-full bg-neutral-950 px-6 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-neutral-950"
                  >
                    {isPlacingOrder
                      ? "Placing order..."
                      : "Place Order — Cash on Delivery"}
                  </button>
                </div>
              )}
            </div>

            <aside className="h-fit rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800">
              <h2 className="text-lg font-semibold">
                Order summary
              </h2>

              <div className="mt-6 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex justify-between gap-4 text-sm"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium">
                        {item.product.title}
                      </p>

                      <p className="mt-1 text-neutral-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="shrink-0">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-neutral-200 pt-6 dark:border-neutral-800">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">
                    Items
                  </span>
                  <span>{itemCount}</span>
                </div>

                <div className="mt-3 flex justify-between text-base font-semibold">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}