"use client";

import { ArrowUpDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function ProductSort() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sort = searchParams.get("sort") ?? "";

  const updateSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }

    params.delete("page");

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="h-4 w-4 text-neutral-500" />

      <label
        htmlFor="product-sort"
        className="sr-only"
      >
        Sort products
      </label>

      <select
        id="product-sort"
        value={sort}
        onChange={(event) => updateSort(event.target.value)}
        className="h-10 rounded-xl border border-neutral-200 bg-transparent px-3 text-sm outline-none focus:border-neutral-500 dark:border-neutral-700"
      >
        <option value="">Default</option>
        <option value="price-asc">
          Price: Low to High
        </option>
        <option value="price-desc">
          Price: High to Low
        </option>
        <option value="name-asc">
          Name: A to Z
        </option>
        <option value="name-desc">
          Name: Z to A
        </option>
      </select>
    </div>
  );
}