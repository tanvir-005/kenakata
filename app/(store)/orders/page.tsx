"use client";

import Link from "next/link";
import { useState } from "react";

import { ProductImage } from "@/components/product/product-image";
import { Container } from "@/components/ui/container";

interface StoredOrderItem {
  product: {
    id: number;
    title: string;
    price: number;
    images?: string[];
  };
  quantity: number;
}

interface StoredOrder {
  id: string;
  orderNumber: string;
  paymentMethod: string;
  total: number;
  placedAt: string;
  date: string;
  time: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  items: StoredOrderItem[];
}

export default function OrdersPage() {
  const [orders] = useState<StoredOrder[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const saved = localStorage.getItem("kenakata-orders");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  if (orders.length === 0) {
    return (
      <main className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-neutral-300 p-10 text-center dark:border-neutral-700">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Orders
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">
              No orders yet
            </h1>
            <p className="mt-3 text-sm text-neutral-500">
              Your placed orders will appear here after checkout.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white dark:bg-white dark:text-neutral-950"
            >
              Continue shopping
            </Link>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="py-12 sm:py-16">
      <Container>
        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            My orders
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Recent purchases
          </h1>
        </div>

        <div className="mt-8 space-y-6">
          {orders.map((order) => (
            <article
              key={order.id}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950"
            >
              <div className="flex flex-col gap-4 border-b border-neutral-200 pb-5 dark:border-neutral-800 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    Order {order.orderNumber}
                  </p>
                  <h2 className="mt-2 text-xl font-semibold">
                    {order.customer.fullName}
                  </h2>
                </div>

                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  <p>{order.date}</p>
                  <p>{order.time}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center justify-between gap-4 rounded-xl border border-neutral-200 p-3 dark:border-neutral-800"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative h-14 w-14 overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-900">
                          {item.product.images?.[0] ? (
                            <ProductImage
                              src={item.product.images[0]}
                              alt={item.product.title}
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs text-neutral-500">
                              Item
                            </div>
                          )}
                        </div>

                        <div>
                          <p className="font-medium">{item.product.title}</p>
                          <p className="mt-1 text-sm text-neutral-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>

                      <p className="font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-neutral-200 p-4 dark:border-neutral-800">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    Order details
                  </p>

                  <dl className="mt-4 space-y-3 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-neutral-500">Payment</dt>
                      <dd className="font-medium">{order.paymentMethod}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-neutral-500">Email</dt>
                      <dd className="text-right">{order.customer.email}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-neutral-500">Phone</dt>
                      <dd className="text-right">{order.customer.phone}</dd>
                    </div>
                    <div className="border-t border-neutral-200 pt-3 dark:border-neutral-800">
                      <div className="flex justify-between gap-4 text-base font-semibold">
                        <dt>Total</dt>
                        <dd>${order.total.toFixed(2)}</dd>
                      </div>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-neutral-100 p-4 text-sm text-neutral-600 dark:bg-neutral-900 dark:text-neutral-300">
                <p className="font-medium text-neutral-900 dark:text-white">
                  Delivery address
                </p>
                <p className="mt-2">{order.customer.address}</p>
                <p>
                  {order.customer.city}, {order.customer.postalCode}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </main>
  );
}
