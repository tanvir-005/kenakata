import Link from "next/link";

interface ProductPaginationProps {
  currentPage: number;
  hasNextPage: boolean;
  searchParams: Record<string, string | undefined>;
}

export function ProductPagination({
  currentPage,
  hasNextPage,
  searchParams,
}: ProductPaginationProps) {
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();

    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });

    params.set("page", String(page));

    return `/products?${params.toString()}`;
  };

  return (
    <nav
      aria-label="Product pagination"
      className="mt-12 flex items-center justify-center gap-3"
    >
      {currentPage > 1 ? (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
        >
          Previous
        </Link>
      ) : (
        <span className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-300 dark:border-neutral-800 dark:text-neutral-700">
          Previous
        </span>
      )}

      <span className="px-3 text-sm font-medium">
        Page {currentPage}
      </span>

      {hasNextPage ? (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
        >
          Next
        </Link>
      ) : (
        <span className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-300 dark:border-neutral-800 dark:text-neutral-700">
          Next
        </span>
      )}
    </nav>
  );
}