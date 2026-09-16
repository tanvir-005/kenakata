"use client";

import { useState } from "react";
import { ProductImage } from "./product-image";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export function ProductGallery({
  images,
  title,
}: ProductGalleryProps) {
  const validImages = images.filter(Boolean);

  const [selectedImage, setSelectedImage] = useState(
    validImages[0] ?? "",
  );

  if (validImages.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-3xl bg-neutral-100 text-sm text-neutral-500 dark:bg-neutral-900">
        Image unavailable
      </div>
    );
  }

  return (
    <div>
      {/* Main image */}
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-neutral-100 dark:bg-neutral-900">
        <ProductImage
          src={selectedImage}
          alt={title}
        />
      </div>

      {/* Thumbnails */}
      {validImages.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
          {validImages.map((image, index) => {
            const isSelected = selectedImage === image;

            return (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setSelectedImage(image)}
                aria-label={`View image ${index + 1}`}
                aria-pressed={isSelected}
                className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-colors sm:h-24 sm:w-24 ${
                  isSelected
                    ? "border-neutral-950 dark:border-white"
                    : "border-transparent"
                }`}
              >
                <ProductImage
                  src={image}
                  alt={`${title} image ${index + 1}`}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}