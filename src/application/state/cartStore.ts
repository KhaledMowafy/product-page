import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem, CartTotals } from "../../domain/cart";
import type { Product, ProductVariant } from "../../domain/product";

interface CartState {
  items: CartItem[];

  addItem: (args: {
    product: Product;
    variant: ProductVariant | null;
    quantity: number;
  }) => void;

  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;

  getTotals: () => CartTotals;
}

export const useCartStore = create<CartState>()(
  persist(
    immer((set, get) => ({
      items: [],

      addItem: ({ product, variant, quantity }) => {
        const id = `${product.id}-${variant?.id ?? "default"}`;
        set((s) => {
          const existing = s.items.find((i) => i.id === id);
          const price = variant?.salePrice ?? variant?.price ?? product.salePrice ?? product.price;

          if (existing) {
            existing.quantity += quantity;
          } else {
            s.items.push({
              id,
              productId: product.id,
              productName: product.name,
              variantId: variant?.id ?? null,
              variantLabel: variant
                ? Object.values(variant.attributes).join(" / ")
                : undefined,
              unitPrice: price,
              quantity,
              imageUrl: product.images[0]?.url,
            });
          }
        });
      },

      removeItem: (id) => {
        set((s) => {
          s.items = s.items.filter((i) => i.id !== id);
        });
      },

      setQuantity: (id, quantity) => {
        set((s) => {
          const item = s.items.find((i) => i.id === id);
          if (!item) return;
          if (quantity <= 0) {
            s.items = s.items.filter((i) => i.id !== id);
          } else {
            item.quantity = quantity;
          }
        });
      },

      clear: () => {
        set((s) => {
          s.items = [];
        });
      },

      getTotals: () => {
        const { items } = get();
        return items.reduce<CartTotals>(
          (acc, item) => {
            acc.subtotal += item.unitPrice * item.quantity;
            acc.itemsCount += item.quantity;
            return acc;
          },
          { subtotal: 0, itemsCount: 0 }
        );
      },
    })),
    {
      name: "cart-store",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);
