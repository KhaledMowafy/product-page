import React from "react";
import { ProductDescriptionHtml } from "./ProductDescriptionHtml";
interface ProductInfoProps {
  name: string;
  description: string;
  basePrice: number;
  salePrice?: number;
  inStock: boolean;
  categories: string[];
  tags: string[];
  rating: number | null;
  reviewsCount: number;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
  name,
  description,
  basePrice,
  salePrice,
  inStock,
  categories,
  tags,
  rating,
  reviewsCount,
}) => {
  const showSale = salePrice !== undefined && salePrice < basePrice;

  return (
    <section className="space-y-4">
      {/* Title + rating */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
          {name}
        </h1>

        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-500">
          <div className="flex items-center gap-1.5">
            {/* simple star icon */}
            <span className="text-yellow-500">★</span>
            <span className="font-medium">
              {rating ? rating.toFixed(1) : "No ratings"}
            </span>
            <span className="text-slate-400">({reviewsCount} reviews)</span>
          </div>

          {categories.length > 0 && (
            <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-slate-300" />
          )}

          <div className="flex flex-wrap gap-1.5">
            {categories.map((c) => (
              <span
                key={c}
                className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Price + stock */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-baseline gap-2">
          {showSale ? (
            <>
              <span className="text-2xl sm:text-3xl font-semibold text-slate-900">
                ${salePrice!.toFixed(2)}
              </span>
              <span className="text-base sm:text-lg text-slate-400 line-through">
                ${basePrice.toFixed(2)}
              </span>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                -{Math.round(((basePrice - salePrice!) / basePrice) * 100)}%
              </span>
            </>
          ) : (
            <span className="text-2xl sm:text-3xl font-semibold text-slate-900">
              ${basePrice.toFixed(2)}
            </span>
          )}
        </div>

        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
            inStock
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-600"
          }`}
        >
          {inStock ? "In stock" : "Out of stock"}
        </span>
      </div>

      {/* Short description */}
         <ProductDescriptionHtml html={description} maxChars={300}/>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-[11px] font-medium text-slate-600"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </section>
  );
};
