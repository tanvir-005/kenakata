"use client";

import { useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

interface StoreErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function StoreError({
  error,
  reset,
}: StoreErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="py-20 sm:py-28">
      <Container>
        <div className="mx-auto flex max-w-lg flex-col items-center text-center">
          <div className="mb-6 rounded-full bg-neutral-100 p-4 dark:bg-neutral-900">
            <RefreshCw className="h-8 w-8" />
          </div>

          <p className="text-sm font-medium text-neutral-500">
            Something went wrong
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            We couldn&apos;t load this page
          </h1>

          <p className="mt-4 text-sm leading-6 text-neutral-500">
            There was a problem loading the requested content. Please try
            again.
          </p>

          <div className="mt-8">
            <Button onClick={() => reset()}>
              Try again
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}