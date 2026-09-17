"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Category } from "@/types";

interface ProductFiltersProps {
  categories: Category[];
}

export function ProductFilters({
  categories,
}: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") ?? "",
  );
  const [minPriceInput, setMinPriceInput] = useState(
    searchParams.get("minPrice") ?? "",
  );
  const [maxPriceInput, setMaxPriceInput] = useState(
    searchParams.get("maxPrice") ?? "",
  );

  const updateFilter = (
    key: string,
    value: string,
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.delete("page");

    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const nextMinPrice = minPriceInput.trim();
    const nextMaxPrice = maxPriceInput.trim();
    const currentMinPrice = searchParams.get("minPrice") ?? "";
    const currentMaxPrice = searchParams.get("maxPrice") ?? "";

    if (
      nextMinPrice === currentMinPrice &&
      nextMaxPrice === currentMaxPrice
    ) {
      return;
    }

    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (nextMinPrice) {
        params.set("minPrice", nextMinPrice);
      } else {
        params.delete("minPrice");
      }

      if (nextMaxPrice) {
        params.set("maxPrice", nextMaxPrice);
      } else {
        params.delete("maxPrice");
      }

      params.delete("page");
      router.push(`${pathname}?${params.toString()}`);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [maxPriceInput, minPriceInput, pathname, router, searchParams]);

  const clearFilters = () => {
    setSearch("");
    setMinPriceInput("");
    setMaxPriceInput("");
    router.push(pathname);
  };

  const hasFilters =
    searchParams.has("search") ||
    searchParams.has("category") ||
    searchParams.has("minPrice") ||
    searchParams.has("maxPrice");

  return (
    <div className="rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800">
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="h-4 w-4" />

        <h2 className="text-sm font-semibold">
          Filter products
        </h2>

        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-neutral-500 transition-colors hover:text-neutral-950 dark:hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
            Clear
          </button>
        )}
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <form
          className="sm:col-span-2"
          onSubmit={(event) => {
            event.preventDefault();
            updateFilter("search", search.trim());
          }}
        >
          <label
            htmlFor="product-search"
            className="mb-2 block text-xs font-medium text-neutral-600 dark:text-neutral-400"
          >
            Search
          </label>

          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />

            <input
              id="product-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products..."
              className="h-10 w-full rounded-xl border border-neutral-200 bg-transparent pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-500 dark:border-neutral-700"
            />
          </div>
        </form>

        <div>
          <label
            htmlFor="product-category"
            className="mb-2 block text-xs font-medium text-neutral-600 dark:text-neutral-400"
          >
            Category
          </label>

          <select
            id="product-category"
            value={searchParams.get("category") ?? ""}
            onChange={(event) =>
              updateFilter("category", event.target.value)
            }
            className="h-10 w-full rounded-xl border border-neutral-200 bg-transparent px-3 text-sm outline-none focus:border-neutral-500 dark:border-neutral-700"
          >
            <option value="">All categories</option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
            Price range
          </label>

          <div className="flex gap-2">
            <input
              type="number"
              min="0"
              placeholder="Min"
              value={minPriceInput}
              onChange={(event) =>
                setMinPriceInput(event.target.value)
              }
              className="h-10 min-w-0 w-full rounded-xl border border-neutral-200 bg-transparent px-3 text-sm outline-none focus:border-neutral-500 dark:border-neutral-700"
            />

            <input
              type="number"
              min="0"
              placeholder="Max"
              value={maxPriceInput}
              onChange={(event) =>
                setMaxPriceInput(event.target.value)
              }
              className="h-10 min-w-0 w-full rounded-xl border border-neutral-200 bg-transparent px-3 text-sm outline-none focus:border-neutral-500 dark:border-neutral-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
}