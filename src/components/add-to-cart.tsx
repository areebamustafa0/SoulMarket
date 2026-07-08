"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/db/schema";
import { useCart } from "@/components/cart-context";
import { useUI } from "@/components/ui-context";
import { CheckIcon, HeartIcon } from "@/components/icons";

export function AddToCart({ product }: { product: Product }) {
  const { addItem, toggleWishlist, isWished } = useCart();
  const { notify, openCart } = useUI();
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const wished = isWished(product.id);

  const snapshot = {
    id: product.id,
    slug: product.slug,
    title: product.title,
    price: product.price,
    image: product.image,
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-full border border-line bg-surface">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="grid h-11 w-11 place-items-center text-lg text-muted transition hover:text-ink"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-8 text-center text-sm font-semibold">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="grid h-11 w-11 place-items-center text-lg text-muted transition hover:text-ink"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <button
          onClick={() => {
            toggleWishlist(product.id);
            notify({
              title: wished ? "Removed from wishlist" : "Saved to wishlist",
              description: product.title,
              variant: "info",
            });
          }}
          className={`grid h-11 w-11 place-items-center rounded-full border transition ${
            wished
              ? "border-accent bg-accent/10 text-accent"
              : "border-line text-ink hover:border-muted"
          }`}
          aria-label="Toggle wishlist"
        >
          <HeartIcon filled={wished} width={19} height={19} />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          onClick={() => {
            addItem(snapshot, qty);
            setAdded(true);
            notify({
              title: `Added ${qty} to cart`,
              description: product.title,
              image: product.image,
            });
            openCart();
            setTimeout(() => setAdded(false), 1800);
          }}
          className="flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-primary-dark active:scale-[0.98]"
        >
          {added ? (
            <>
              <CheckIcon width={17} height={17} /> Added to cart
            </>
          ) : (
            "Add to Cart"
          )}
        </button>
        <button
          onClick={() => {
            addItem(snapshot, qty);
            router.push("/cart");
          }}
          className="rounded-full border border-ink bg-ink px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-ink/90 active:scale-[0.98]"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
