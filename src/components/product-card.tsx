"use client";

import Link from "next/link";
import type { Product } from "@/db/schema";
import { useCart } from "@/components/cart-context";
import { useUI } from "@/components/ui-context";
import { StarRating } from "@/components/star-rating";
import { HeartIcon, BagIcon } from "@/components/icons";
import { formatPrice } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  const { addItem, toggleWishlist, isWished } = useCart();
  const { notify, openCart } = useUI();
  const wished = isWished(product.id);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-line/60 bg-surface shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card">
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-background"
      >
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-[11px] font-bold text-white shadow-soft">
            {product.badge}
          </span>
        )}
        {/* Quick-view overlay */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-ink/80 to-transparent p-4 pt-10 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="line-clamp-2 text-xs leading-relaxed text-white/90">
            {product.description}
          </p>
        </div>
      </Link>

      <button
        onClick={() => {
          toggleWishlist(product.id);
          notify({
            title: wished ? "Removed from wishlist" : "Saved to wishlist",
            description: product.title,
            variant: "info",
          });
        }}
        aria-label="Toggle wishlist"
        className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full shadow-soft backdrop-blur transition ${
          wished
            ? "bg-white text-accent"
            : "bg-white/85 text-ink hover:bg-white"
        }`}
      >
        <HeartIcon filled={wished} width={16} height={16} />
      </button>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-primary/70">
          {product.category}
        </p>
        <Link
          href={`/product/${product.slug}`}
          className="mt-1.5 line-clamp-1 text-[15px] font-semibold text-ink transition hover:text-primary"
        >
          {product.title}
        </Link>
        <div className="mt-2">
          <StarRating rating={product.rating} count={product.reviewCount} />
        </div>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-lg font-bold text-ink">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={() => {
              addItem({
                id: product.id,
                slug: product.slug,
                title: product.title,
                price: product.price,
                image: product.image,
              });
              notify({
                title: "Added to cart",
                description: product.title,
                image: product.image,
              });
              openCart();
            }}
            aria-label="Add to cart"
            className="grid h-10 w-10 place-items-center rounded-full bg-primary text-white transition hover:bg-primary-dark active:scale-95"
          >
            <BagIcon width={16} height={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
