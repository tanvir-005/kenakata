import Link from "next/link";
import type { Product } from "@/types";
import { ProductImage } from "./product-image"; // to maintain the images we separated it

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const image = product.images[0];

  return (
    <article className="group">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900">
          <ProductImage
            src={image}
            alt={product.title}
          />
        </div>

        <div className="mt-4">
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
            {product.category.name}
          </p>

          <h2 className="mt-1 line-clamp-2 text-sm font-medium leading-5">
            {product.title}
          </h2>

          <p className="mt-2 text-sm font-semibold">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </Link>
    </article>
  );
}