// src/presentation/layouts/Layout.tsx
import React, { useState, useMemo } from "react";
import { CartDrawer } from "../components/cart/CartDrawer";
import { useCartStore } from "../../application/state/cartStore";
interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
   const [isCartOpen, setIsCartOpen] = useState(false);

  const items = useCartStore((state) => state.items);

  const itemsCount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
      <div className="w-full bg-black text-white text-[11px] sm:text-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-3 px-4 py-2">
          <span className="text-center">
            New season coming! Discount 10% for all product! Checkout Now!
          </span>
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-2 py-[2px] text-[10px]">
            20:40
          </span>
        </div>
      </div>

      <header className="w-full bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex flex-col leading-tight">
            <span className="text-[11px] tracking-[0.35em] font-semibold">
              JOHN LEWIS
            </span>
            <span className="text-[9px] tracking-[0.28em] text-slate-500">
              & PARTNERS
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-700">
            <button
              type="button"
              className="p-1 hover:text-black"
              aria-label="Search"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="6" />
                <line x1="16.5" y1="16.5" x2="21" y2="21" />
              </svg>
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-1 hover:text-black"
            >
              <span>Categories</span>
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.7}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            <button type="button" className="hover:text-black">
              Sign in
            </button>

            <button
              type="button"
              className="p-1 hover:text-black"
              aria-label="Wishlist"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8l1 1 6.8 6.5a1.1 1.1 0 0 0 1.6 0l6.8-6.5 1-1a5.5 5.5 0 0 0 0-7.8z" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative p-1 hover:text-black"
              aria-label="Cart"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="20" r="1.5" />
                <circle cx="18" cy="20" r="1.5" />
                <path d="M4 4h2l2.2 11h10l1.3-7.5H7.1" />
              </svg>

              {itemsCount > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-black text-[10px] font-semibold text-white">
                  {itemsCount}
                </span>
              )}
            </button>
          </nav>

          {/* Mobile nav: search + cart + burger */}
          <nav className="flex items-center gap-4 md:hidden">
            <button
              type="button"
              className="p-1 hover:text-black"
              aria-label="Search"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="6" />
                <line x1="16.5" y1="16.5" x2="21" y2="21" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative p-1 hover:text-black"
              aria-label="Cart"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="20" r="1.5" />
                <circle cx="18" cy="20" r="1.5" />
                <path d="M4 4h2l2.2 11h10l1.3-7.5H7.1" />
              </svg>

              {itemsCount > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-black text-[10px] font-semibold text-white">
                  {itemsCount}
                </span>
              )}
            </button>

            <button
              type="button"
              className="p-1 hover:text-black"
              aria-label="Menu"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};
