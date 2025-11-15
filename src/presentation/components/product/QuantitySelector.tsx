// src/presentation/components/product/QuantitySelector.tsx
import React, { useState } from "react";

interface QuantitySelectorProps {
  disabled?: boolean;
  min?: number;
  max?: number;
  onAdd: (quantity: number) => void;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  disabled = false,
  min = 1,
  max = 10,
  onAdd,
}) => {
  const [qty, setQty] = useState(min);

  const decrease = () => {
    setQty((prev) => Math.max(min, prev - 1));
  };

  const increase = () => {
    setQty((prev) => Math.min(max, prev + 1));
  };

  const handleAdd = () => {
    if (disabled) return;
    onAdd(qty);
  };

  return (
    <section className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      {/* qty controls */}
      <div className="inline-flex items-center justify-between rounded-full border border-slate-300 bg-white px-2 py-1 sm:px-3 sm:py-1.5 w-full sm:w-auto">
        <button
          type="button"
          onClick={decrease}
          disabled={disabled || qty <= min}
          className="h-8 w-8 rounded-full text-lg font-medium flex items-center justify-center text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent"
        >
          −
        </button>
        <span className="px-3 text-sm font-semibold text-slate-900">
          {qty}
        </span>
        <button
          type="button"
          onClick={increase}
          disabled={disabled || qty >= max}
          className="h-8 w-8 rounded-full text-lg font-medium flex items-center justify-center text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent"
        >
          +
        </button>
      </div>

      {/* Add to cart */}
      <button
        type="button"
        disabled={disabled}
        onClick={handleAdd}
        className="flex-1 inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed"
      >
        Add to cart
      </button>
    </section>
  );
};
