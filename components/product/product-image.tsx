"use client";

import Image from "next/image";
import { ImageOff } from "lucide-react";
import { useState } from "react";

interface ProductImageProps {
  src: string;
  alt: string;
}

export function ProductImage({
  src,
  alt,
}: ProductImageProps) {
  const [hasError, setHasError] = useState(false);

// sometimes api gives broken link with no image - in that case we use this one
  if (!src || hasError) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-neutral-100 dark:bg-neutral-900">
        <div className="flex flex-col items-center gap-2 text-neutral-400">
          <ImageOff className="h-8 w-8" />
          <span className="text-xs">Image unavailable</span>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
      className="object-cover transition-transform duration-300 group-hover:scale-105"
      onError={() => setHasError(true)}
    />
  );
}