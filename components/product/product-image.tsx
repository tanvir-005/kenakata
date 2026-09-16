"use client";

import Image from "next/image";
import { ImageOff } from "lucide-react";
import { useEffect, useState } from "react";

interface ProductImageProps {
  src: string;
  alt: string;
}

function isValidImageSrc(src: string) {
  if (!src) return false;

  if (src.startsWith("/")) return true;

  try {
    const url = new URL(src);

    return (
      url.protocol === "http:" ||
      url.protocol === "https:"
    );
  } catch {
    return false;
  }
}

export function ProductImage({
  src,
  alt,
}: ProductImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const validSrc = isValidImageSrc(src);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    if (!validSrc) {
      setIsLoading(false);
      return;
    }

    const timeout = setTimeout(() => {
      setHasError(true);
      setIsLoading(false);
    }, 10000);

    return () => clearTimeout(timeout);
  }, [src, validSrc]);

  if (!validSrc || hasError) {
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
    <div className="relative h-full w-full">
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-neutral-200 dark:bg-neutral-800" />
      )}

      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className={`object-cover transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => {
          setIsLoading(false);
        }}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />
    </div>
  );
}