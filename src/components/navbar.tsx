"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/cart-context";
import { useUI } from "@/components/ui-context";
import {
  BagIcon,
  HeartIcon,
  SearchIcon,
  UserIcon,
  SparkleIcon,
} from "@/components/icons";

const links = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "AI Assistant", href: "/assistant", sparkle: true },
];

export function Navbar() {
  const { count, wishlist } = useCart();
  const { openCart } = useUI();
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
    }
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-xl">
      {/* Announcement bar */}
      <div className="bg-ink text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-6 py-2 text-center text-[13px] font-medium tracking-wide">
          <SparkleIcon width={13} height={13} className="text-accent" />
          <span>Free shipping on orders over $50 · New arrivals every week</span>
        </div>
      </div>

      {/* Main nav */}
      <div className="border-b border-line/60">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-white">
              <BagIcon width={17} height={17} />
            </span>
            <span className="font-display text-xl font-bold tracking-tight">
              SoulMarket
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="ml-6 hidden items-center gap-1 lg:flex">
            {links.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-primary/8 text-primary"
                      : "text-muted hover:bg-background hover:text-ink"
                  }`}
                >
                  {link.sparkle && (
                    <SparkleIcon width={14} height={14} />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Search */}
          <form
            onSubmit={submitSearch}
            className="ml-auto hidden max-w-xs flex-1 items-center gap-2 rounded-full border border-line bg-background px-4 py-2 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 md:flex"
          >
            <SearchIcon width={16} height={16} className="shrink-0 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
            />
          </form>

          {/* Action icons */}
          <div className="ml-auto flex items-center gap-0.5 md:ml-0">
            <Link
              href="/dashboard"
              aria-label="Wishlist"
              className="relative grid h-10 w-10 place-items-center rounded-full text-ink transition hover:bg-background"
            >
              <HeartIcon width={19} height={19} />
              {wishlist.length > 0 && (
                <span className="absolute right-1.5 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <button
              onClick={openCart}
              aria-label="Cart"
              className="relative grid h-10 w-10 place-items-center rounded-full text-ink transition hover:bg-background"
            >
              <BagIcon width={19} height={19} />
              {count > 0 && (
                <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
                  {count}
                </span>
              )}
            </button>
            <Link
              href="/dashboard"
              aria-label="Account"
              className="hidden h-10 w-10 place-items-center rounded-full text-ink transition hover:bg-background sm:grid"
            >
              <UserIcon width={19} height={19} />
            </Link>

            {/* Mobile hamburger */}
            <button
              aria-label="Menu"
              onClick={() => setMobileOpen((o) => !o)}
              className="grid h-10 w-10 place-items-center rounded-full text-ink transition hover:bg-background lg:hidden"
            >
              <div className="space-y-1.5">
                <span
                  className={`block h-0.5 w-5 bg-current transition ${mobileOpen ? "translate-y-2 rotate-45" : ""}`}
                />
                <span
                  className={`block h-0.5 w-5 bg-current transition ${mobileOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`block h-0.5 w-5 bg-current transition ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-b border-line bg-surface px-6 py-4 lg:hidden">
          <form
            onSubmit={submitSearch}
            className="mb-4 flex items-center gap-2 rounded-full border border-line bg-background px-4 py-2.5"
          >
            <SearchIcon width={16} height={16} className="text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="w-full bg-transparent text-sm outline-none"
            />
          </form>
          <div className="grid gap-1">
            {[...links, { label: "Dashboard", href: "/dashboard", sparkle: false }].map(
              (link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3.5 py-3 text-sm font-medium text-ink hover:bg-background"
                >
                  {link.label}
                </Link>
              ),
            )}
          </div>
        </div>
      )}
    </header>
  );
}
