// src/application/state/productStore.ts
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { Product, ProductVariant } from "../../domain/product";
import type { FetchProductBySlug } from "../usecases/fetchProductBySlug";

export interface ProductStoreState {
  product: Product | null;
  loading: boolean;
  error: string | null;
  selectedVariations: Record<string, string>;
  selectedVariant: ProductVariant | null;

  // Actions
  fetchProduct: (slug: string) => Promise<void>;
  setSelectedVariation: (type: string, value: string) => void;
  clearSelectedVariations: () => void;

  // Computed
  getCurrentPrice: () => number;
  getCurrentSalePrice: () => number;
  isVariantAvailable: () => boolean;
}

export const createProductStore = (fetchProductBySlug: FetchProductBySlug) =>
  create<ProductStoreState>()(
    immer((set, get) => ({
      product: null,
      loading: false,
      error: null,
      selectedVariations: {},
      selectedVariant: null,

      fetchProduct: async (slug: string) => {
        set((s) => {
          s.loading = true;
          s.error = null;
        });
        try {
          const product = await fetchProductBySlug.execute(slug);
          set((s) => {
            s.product = product;
            s.selectedVariations = {};
            s.selectedVariant = null;
          });
        } catch (e: unknown) {
          const message =
            e instanceof Error ? e.message : "Failed to load product";

          set((s) => {
            s.error = message;
          });
        } finally {
          set((s) => {
            s.loading = false;
          });
        }
      },

      setSelectedVariation: (type, value) => {
        set((s) => {
          s.selectedVariations[type] = value;

          const p = s.product;
          if (!p) {
            s.selectedVariant = null;
            return;
          }

          const match = p.variants.find((v) =>
            Object.entries(s.selectedVariations).every(
              ([k, val]) => v.attributes[k] === val
            )
          );
          s.selectedVariant = match ?? null;
        });
      },

      clearSelectedVariations: () => {
        set((s) => {
          s.selectedVariations = {};
          s.selectedVariant = null;
        });
      },

      getCurrentPrice: () => {
        const { product, selectedVariant } = get();
        if (selectedVariant) return selectedVariant.price;
        return product?.price ?? 0;
      },

      getCurrentSalePrice: () => {
        const { product, selectedVariant } = get();
        if (selectedVariant && selectedVariant.salePrice != null) {
          return selectedVariant.salePrice;
        }
        return product?.salePrice ?? 0;
      },

      isVariantAvailable: () => {
        const { selectedVariant } = get();
        return selectedVariant?.inStock ?? true;
      },
    }))
  );
