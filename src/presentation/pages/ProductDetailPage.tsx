// src/presentation/pages/ProductDetailPage.tsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "../../application/state/productStoreInstance";
import { useCartStore } from "../../application/state/cartStore";
import { ProductGallery } from "../components/product/ProductGallery";
import { ProductInfo } from "../components/product/ProductInfo";
import { VariationSelector } from "../components/product/VariationSelector";
import { QuantitySelector } from "../components/product/QuantitySelector";
import { ProductDescriptionHtml } from "../components/product/ProductDescriptionHtml";

export const ProductDetailPage: React.FC = () => {
  const { slug = "Sneakers12" } = useParams<{ slug: string }>();

  const {
    product,
    loading,
    error,
    fetchProduct,
    selectedVariations,
    selectedVariant,
    setSelectedVariation,
    getCurrentPrice,
    getCurrentSalePrice,
    isVariantAvailable,
  } = useProductStore();

  const { addItem } = useCartStore();

  useEffect(() => {
    fetchProduct(slug);
  }, [slug, fetchProduct]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <span className="text-sm text-slate-500">Loading product…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <span className="text-sm text-red-500">{error}</span>
      </div>
    );
  }

  if (!product) return null;

  const basePrice = getCurrentPrice();
  const salePrice = getCurrentSalePrice();
  const inStock = isVariantAvailable();

  const handleAddToCart = (qty: number) => {
    if (product.variants.length && !selectedVariant) {
      // you can replace alerts with a toast component
      alert("Please select all variations before adding to cart.");
      return;
    }
    if (!inStock) {
      alert("Selected variant is out of stock.");
      return;
    }
    addItem({ product, variant: selectedVariant, quantity: qty });
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        {/* Top section: gallery + info */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          <div className="lg:w-1/2">
            <ProductGallery images={product.images} />
          </div>

          <div className="lg:w-1/2 space-y-6 lg:space-y-8">
            <ProductInfo
              name={product.name}
              description={product.description}
              basePrice={basePrice}
              salePrice={salePrice || undefined}
              inStock={inStock}
              categories={product.categories}
              tags={product.tags}
              rating={product.reviews.length ? (
                product.reviews.reduce((acc, r) => acc + r.rating, 0) /
                product.reviews.length
              ) : null}
              reviewsCount={product.reviews.length}
            />

            <VariationSelector
              product={product}
              selected={selectedVariations}
              onSelect={setSelectedVariation}
            />

            <QuantitySelector disabled={!inStock} onAdd={handleAddToCart} />

            {/* placeholder for shipping / policy blocks as in Figma */}
            <section className="border rounded-xl bg-white px-4 py-3 sm:px-5 sm:py-4 space-y-2 text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <span>Free shipping over $50</span>
                <span className="text-xs text-slate-400">2–5 business days</span>
              </div>
              <div className="flex items-center justify-between">
                <span>30-day free returns</span>
                <span className="text-xs text-slate-400">No questions asked</span>
              </div>
            </section>
          </div>
        </div>

        {/* Below-the-fold sections (simple placeholders / layout) */}
        <section className="mt-10 lg:mt-14 grid gap-8 lg:grid-cols-[1.3fr,0.9fr]">
          {/* Left: description + details + reviews header */}
          <div className="space-y-6 w-full">
            <div className="bg-white rounded-xl border px-5 py-4 w-full">
              <h2 className="text-base font-semibold mb-3">Product details</h2>
                <ProductDescriptionHtml html={product.description}/>
            </div>

            <div className="bg-white rounded-xl border px-5 py-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold">Customer reviews</h2>
                <button className="text-xs font-medium text-slate-500 underline underline-offset-2">
                  View all
                </button>
              </div>

              {/* Rating summary placeholder – match Figma’s bar chart look later */}
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center justify-center rounded-lg border px-4 py-3">
                  <span className="text-2xl font-semibold">
                    {product.reviews.length
                      ? (
                          product.reviews.reduce((acc, r) => acc + r.rating, 0) /
                          product.reviews.length
                        ).toFixed(1)
                      : "0.0"}
                  </span>
                  <span className="text-xs text-slate-500">
                    {product.reviews.length} reviews
                  </span>
                </div>
                <div className="flex-1 space-y-1.5">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = product.reviews.filter(
                      (r) => r.rating === star
                    ).length;
                    const pct =
                      product.reviews.length === 0
                        ? 0
                        : (count / product.reviews.length) * 100;

                    return (
                      <div
                        key={star}
                        className="flex items-center gap-2 text-xs text-slate-500"
                      >
                        <span className="w-10">{star} star</span>
                        <div className="h-1.5 flex-1 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-slate-900/80 transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="w-6 text-right">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right: simple “you may also like” grid placeholder */}
          <div className="bg-white rounded-xl border px-5 py-4">
            <h2 className="text-base font-semibold mb-4">
              You may also like
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
              {/* In the real version you’ll map recommended products here */}
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex flex-col gap-2 rounded-lg border bg-slate-50/40 p-2"
                >
                  <div className="aspect-[3/4] rounded-md bg-slate-200" />
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-slate-700 truncate">
                      Sample item {i}
                    </p>
                    <p className="text-xs font-semibold text-slate-900">$89.00</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
