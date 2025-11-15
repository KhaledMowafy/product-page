// src/presentation/components/product/VariationSelector.tsx
import React from "react";
import type { Product } from "../../../domain/product";

interface VariationSelectorProps {
  product: Product;
  selected: Record<string, string>;
  onSelect: (type: string, value: string) => void;
}

/**
 * Renders selectors for each variant attribute (color, size, etc.)
 * - Shows all options for each attribute
 * - Disables options that are impossible with current partial selection
 */
export const VariationSelector: React.FC<VariationSelectorProps> = ({
  product,
  selected,
  onSelect,
}) => {
  if (!product.variants || product.variants.length === 0) {
    return null;
  }

  const attributeNames = Array.from(
    new Set(
      product.variants.flatMap((v) => Object.keys(v.attributes ?? {}))
    )
  );

  const getOptionsFor = (attr: string): string[] => {
    const values = new Set<string>();
    product.variants.forEach((v) => {
      const val = v.attributes?.[attr];
      if (val) values.add(val);
    });
    return Array.from(values);
  };

  const isOptionDisabled = (attr: string, value: string): boolean => {
    // Combine current selection with this option
    const candidateSelection = {
      ...selected,
      [attr]: value,
    };

    // Check if there exists any variant matching all selected attrs
    const match = product.variants.some((v) =>
      Object.entries(candidateSelection).every(
        ([k, val]) => !val || v.attributes?.[k] === val
      )
    );

    return !match;
  };

  const prettyLabel = (attr: string) => {
    if (!attr) return "";
    return attr.charAt(0).toUpperCase() + attr.slice(1);
  };

  return (
    <section className="space-y-4">
      {attributeNames.map((attr) => {
        const options = getOptionsFor(attr);
        const isColor = /color/i.test(attr);

        return (
          <div key={attr} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-800">
                {prettyLabel(attr)}
              </span>
              {selected[attr] && (
                <span className="text-xs text-slate-500">
                  Selected: <span className="font-medium">{selected[attr]}</span>
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {options.map((option) => {
                const isSelected = selected[attr] === option;
                const disabled = isOptionDisabled(attr, option);

                if (isColor) {
                  // color swatch style – simple circle
                  return (
                    <button
                      key={option}
                      type="button"
                      disabled={disabled}
                      onClick={() => onSelect(attr, option)}
                      className={[
                        "relative h-8 w-8 rounded-full border-2 transition",
                        disabled
                          ? "border-slate-200 opacity-40 cursor-not-allowed"
                          : "cursor-pointer border-transparent hover:border-slate-300",
                        isSelected && !disabled && "ring-2 ring-slate-900 border-slate-900",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      aria-label={option}
                    >
                      <span
                        className="absolute inset-0 m-0.5 rounded-full"
                        style={{ backgroundColor: option.toLowerCase() }}
                      />
                    </button>
                  );
                }

                // default pill style (e.g. size)
                return (
                  <button
                    key={option}
                    type="button"
                    disabled={disabled}
                    onClick={() => onSelect(attr, option)}
                    className={[
                      "min-w-[2.5rem] rounded-full border px-3 py-1 text-xs font-medium transition",
                      disabled
                        ? "border-slate-200 text-slate-300 cursor-not-allowed"
                        : "border-slate-300 text-slate-700 hover:border-slate-900 hover:text-slate-900 bg-white",
                      isSelected && !disabled && "border-slate-900 bg-slate-900 text-white",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
};
