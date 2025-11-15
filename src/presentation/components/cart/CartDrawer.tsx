import React, {useMemo} from "react";
import { useCartStore } from "../../../application/state/cartStore";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const items = useCartStore((state) => state.items);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const { subtotal, itemsCount } = useMemo(() => {
    return items.reduce(
      (acc, item) => {
        acc.subtotal += item.unitPrice * item.quantity;
        acc.itemsCount += item.quantity;
        return acc;
      },
      { subtotal: 0, itemsCount: 0 }
    );
  }, [items]);

  const wrapperClasses = open
    ? "pointer-events-auto"
    : "pointer-events-none";
  const overlayClasses = open ? "opacity-100" : "opacity-0";
  const panelClasses = open ? "translate-x-0" : "translate-x-full";

  return (
    <div className={`fixed inset-0 z-40 ${wrapperClasses}`}>
      <div
        className={`absolute inset-0 bg-black/30 transition-opacity duration-200 ${overlayClasses}`}
        onClick={onClose}
      />

      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-200 ${panelClasses}`}
      >
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="text-sm font-semibold">
            Cart ({itemsCount})
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-500 hover:text-black"
          >
            <span className="sr-only">Close</span>
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.7}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="flex h-[calc(100%-120px)] flex-col">
          <div className="flex-1 overflow-y-auto px-4 py-3">
            {items.length === 0 ? (
              <div className="flex h-full items-center justify-center text-sm text-slate-500">
                Your cart is empty.
              </div>
            ) : (
              <ul className="space-y-4">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex gap-3 border-b border-slate-100 pb-3 last:border-b-0"
                  >
                    {/* image */}
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-slate-100">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.productName}
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>

                    {/* info */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <p className="text-xs font-medium text-slate-800 line-clamp-2">
                          {item.productName}
                        </p>
                        {item.variantLabel && (
                          <p className="mt-0.5 text-[11px] text-slate-500">
                            {item.variantLabel}
                          </p>
                        )}
                      </div>

                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-900">
                          ${(item.unitPrice * item.quantity).toFixed(2)}
                        </span>

                        <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-1">
                          <button
                            type="button"
                            className="h-6 w-6 text-xs flex items-center justify-center hover:bg-slate-100"
                            onClick={() =>
                              setQuantity(item.id, item.quantity - 1)
                            }
                          >
                            −
                          </button>
                          <span className="px-2 text-xs font-medium">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            className="h-6 w-6 text-xs flex items-center justify-center hover:bg-slate-100"
                            onClick={() =>
                              setQuantity(item.id, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="self-start p-1 text-slate-400 hover:text-red-500"
                    >
                      <span className="sr-only">Remove</span>
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.6}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14H6L5 6" />
                        <path d="M10 11v6" />
                        <path d="M14 11v6" />
                        <path d="M9 6V4h6v2" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="border-t px-4 py-3 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Subtotal</span>
              <span className="font-semibold text-slate-900">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <button
              type="button"
              className="w-full rounded-full bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-slate-900"
            >
              Checkout
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};
