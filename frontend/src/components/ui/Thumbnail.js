import React, { useState } from "react";
import { cn } from "../../lib/cn";
import { Skeleton } from "./Skeleton";

/**
 * Lazy-loaded preview image with a skeleton placeholder and a graceful
 * fallback: when there is no image (or it fails to load) the monogram tile
 * keeps the card's rhythm instead of collapsing the layout.
 *
 * @param {object} props
 * @param {string} [props.src]
 * @param {string} props.alt
 * @param {string} props.monogram shown when no image is available
 */
export function Thumbnail({ src, alt, monogram, className, ...rest }) {
  const [status, setStatus] = useState(src ? "loading" : "empty");

  return (
    <div
      className={cn("thumb", `thumb--${status}`, className)}
      // The monogram fallback is decorative; the card heading names the item.
      aria-hidden={status === "empty" || status === "error" ? "true" : undefined}
      {...rest}
    >
      {status === "loading" && <Skeleton className="thumb__skeleton" />}

      {src && status !== "error" && (
        <img
          className="thumb__img"
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
        />
      )}

      {(status === "empty" || status === "error") && (
        <span className="thumb__monogram">{monogram}</span>
      )}
    </div>
  );
}

export default Thumbnail;
