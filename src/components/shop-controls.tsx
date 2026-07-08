"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { SearchIcon } from "@/components/icons";
import { formatPrice } from "@/lib/format";

const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export function ShopControls({
  categories,
  total,
}: {
  categories: string[];
  total: number;
}) {
  const router = useRouter();
  const params = useSearchParams();

  const current = {
    q: params.get("q") ?? "",
    category: params.get("category") ?? "All",
    sort: params.get("sort") ?? "popular",
    maxPrice: Number(params.get("maxPrice") ?? 500),
    minRating: Number(params.get("minRating") ?? 0),
  };

  const setParam = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      if (!value || value === "All" || value === "0") {
        next.delete(key);
      } else {
        next.set(key, value);
      }
      router.push(`/shop?${next.toString()}`);
    },
    [params, router],
  );

  return (
    <>
      <ActiveFilters />
      {/* Top bar: search + sort */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const value = (e.currentTarget.elements.namedItem("q") as HTMLInputElement).value;
            setParam("q", value);
          }}
          className="flex flex-1 items-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5 sm:max-w-sm"
        >
          <SearchIcon width={17} height={17} className="text-muted" />
          <input
            name="q"
            defaultValue={current.q}
            placeholder="Search products…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
          />
        </form>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-muted sm:inline">
            {total} result{total === 1 ? "" : "s"}
          </span>
          <label className="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5 text-sm">
            <span className="text-muted">Sort by</span>
            <select
              value={current.sort}
              onChange={(e) => setParam("sort", e.target.value)}
              className="bg-transparent font-medium text-ink outline-none"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </>
  );
}

function ActiveFilters() {
  const router = useRouter();
  const params = useSearchParams();

  const chips: Array<{ key: string; label: string }> = [];
  const q = params.get("q");
  const category = params.get("category");
  const maxPrice = params.get("maxPrice");
  const minRating = params.get("minRating");

  if (q) chips.push({ key: "q", label: `Search: “${q}”` });
  if (category && category !== "All")
    chips.push({ key: "category", label: category });
  if (maxPrice) chips.push({ key: "maxPrice", label: `Under $${maxPrice}` });
  if (minRating && minRating !== "0")
    chips.push({ key: "minRating", label: `${minRating}★ & up` });

  if (chips.length === 0) return null;

  const remove = (key: string) => {
    const next = new URLSearchParams(params.toString());
    next.delete(key);
    router.push(`/shop?${next.toString()}`);
  };

  return (
    <div className="mb-5 flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium text-muted">Active:</span>
      {chips.map((chip) => (
        <button
          key={chip.key}
          onClick={() => remove(chip.key)}
          className="flex items-center gap-1.5 rounded-full bg-primary/8 px-3 py-1.5 text-xs font-medium text-primary transition hover:bg-primary/15"
        >
          {chip.label}
          <span className="text-primary/70">✕</span>
        </button>
      ))}
      <button
        onClick={() => router.push("/shop")}
        className="rounded-full px-3 py-1.5 text-xs font-medium text-muted transition hover:text-ink"
      >
        Clear all
      </button>
    </div>
  );
}

export function ShopSidebar({ categories }: { categories: string[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const current = {
    category: params.get("category") ?? "All",
    maxPrice: Number(params.get("maxPrice") ?? 500),
    minRating: Number(params.get("minRating") ?? 0),
  };

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (!value || value === "All" || value === "0") next.delete(key);
    else next.set(key, value);
    router.push(`/shop?${next.toString()}`);
  };

  const allCats = ["All", ...categories];

  return (
    <aside className="space-y-8 rounded-3xl border border-line bg-surface p-6 shadow-soft">
      <div>
        <h3 className="font-display text-lg font-semibold">Filters</h3>
      </div>

      <div>
        <p className="mb-3 text-sm font-semibold text-ink">Category</p>
        <div className="space-y-1">
          {allCats.map((cat) => (
            <button
              key={cat}
              onClick={() => setParam("category", cat)}
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                current.category === cat
                  ? "bg-primary/8 font-medium text-primary"
                  : "text-muted hover:bg-background hover:text-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-ink">Max Price</p>
          <span className="text-sm text-muted">{formatPrice(current.maxPrice * 100)}</span>
        </div>
        <input
          type="range"
          min={20}
          max={500}
          step={10}
          value={current.maxPrice}
          onChange={(e) => setParam("maxPrice", e.target.value)}
          className="w-full accent-primary"
        />
      </div>

      <div>
        <p className="mb-3 text-sm font-semibold text-ink">Rating</p>
        <div className="space-y-1">
          {[0, 3, 4, 4.5].map((r) => (
            <button
              key={r}
              onClick={() => setParam("minRating", String(r))}
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                current.minRating === r
                  ? "bg-primary/8 font-medium text-primary"
                  : "text-muted hover:bg-background hover:text-ink"
              }`}
            >
              {r === 0 ? "All ratings" : `${r}★ & up`}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
