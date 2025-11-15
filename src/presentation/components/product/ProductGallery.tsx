import React, { useState } from "react";

export interface GalleryImage {
  id: string;
  url: string;
  alt?: string;
}

interface ProductGalleryProps {
  images: GalleryImage[];
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const safeImages =
    images && images.length > 0
      ? images
      : [
          {
            id: "placeholder",
            url: "https://via.placeholder.com/800x1000?text=Product+Image",
            alt: "Placeholder image",
          },
        ];

  const activeImage = safeImages[Math.min(activeIndex, safeImages.length - 1)];

  return (
    <section aria-label="Product images" className="space-y-4">
      <div className="group relative w-full overflow-hidden rounded-2xl bg-white border aspect-[4/5] sm:aspect-[4/5]">
        <img
          src={activeImage.url}
          alt={activeImage.alt ?? "Product image"}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-1">
        {safeImages.map((img, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={img.id ?? index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={[
                "relative aspect-[3/4] w-16 sm:w-20 rounded-xl overflow-hidden border transition",
                isActive
                  ? "border-slate-900 ring-2 ring-slate-900/60"
                  : "border-slate-200 hover:border-slate-400",
              ].join(" ")}
            >
              <img
                src={img.url}
                alt={img.alt ?? `Thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          );
        })}
      </div>
    </section>
  );
};
