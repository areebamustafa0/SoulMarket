"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { StarRating } from "@/components/star-rating";
import { formatPrice } from "@/lib/format";

type ViewedItem = {
  id: number;
  slug: string;
  title: string;
  price: number;
  image: string;
  rating: number;
};

const KEY = "soulmarket.recentlyViewed";

export function RecentlyViewed({ current }: { current: ViewedItem }) {
  const [items, setItems] = useState<ViewedItem[]>([]);

  useEffect(() => {
    let existing: ViewedItem[] = [];
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) existing = JSON.parse(raw);
    } catch {
      existing = [];
    }

    // Show the list as it was before adding the current product.
    setItems(existing.filter((p) => p.id !== current.id).slice(0, 4));

    const next = [current, ...existing.filter((p) => p.id !== current.id)].slice(0, 8);
    localStorage.setItem(KEY, JSON.stringify(next));
  }, [current]);

  if (items.length === 0) return null;

  return (
    <section className="mt-20">
      <h2 className="font-display text-2xl font-semibold text-ink">
        Recently Viewed
      </h2>
      <div className="mt-6 grid grid-cols-2 gap-5 lg:grid-cols-4">
        {items.map((p) => (
          <Link
            key={p.id}
            href={`/product/${p.slug}`}
            className="group flex flex-col overflow-hidden rounded-3xl border border-line/70 bg-surface transition duration-300 hover:-translate-y-1 hover:shadow-card"
          >
            <div className="aspect-square overflow-hidden bg-background">
              <img
                src={p.image}
                alt={p.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <p className="line-clamp-1 font-medium text-ink group-hover:text-primary">
                {p.title}
              </p>
              <div className="mt-2">
                <StarRating rating={p.rating} showValue={false} />
              </div>
              <p className="mt-2 font-semibold text-ink">{formatPrice(p.price)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
