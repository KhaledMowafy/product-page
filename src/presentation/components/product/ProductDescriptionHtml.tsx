import React, { useState, useMemo } from "react";

interface Props {
  html: string;
  maxChars?: number; // optional limit for preview mode
}

export const ProductDescriptionHtml: React.FC<Props> = ({ html, maxChars = 300 }) => {
  const [expanded, setExpanded] = useState(false);

  // Extract plain text from HTML safely
  const plainText = useMemo(() => {
    const tempEl = document.createElement("div");
    tempEl.innerHTML = html;
    return tempEl.textContent || tempEl.innerText || "";
  }, [html]);

  const isLong = plainText.length > maxChars;
  const previewText = plainText.substring(0, maxChars);

  return (
    <div className="max-w-full overflow-x-hidden">
      {/* Render either preview (plain text) or full HTML */}
      {!expanded ? (
        <div
          className="text-sm leading-relaxed text-slate-700 break-words"
        >
          {isLong ? previewText + "..." : plainText}
        </div>
      ) : (
        <div
          className="text-sm leading-relaxed text-slate-700 space-y-2
             max-w-full break-words
             [&_p]:break-words
             [&_a]:break-words [&_a]:break-all [&_a]:underline [&_a]:text-slate-900
             [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1
             [&_strong]:font-semibold"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}

      {/* Toggle button */}
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 text-sm font-medium text-black underline"
        >
          {expanded ? "See less" : "See more"}
        </button>
      )}
    </div>
  );
};
