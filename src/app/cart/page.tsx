"use client";

import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useCart } from "@/components/cart-context";
import { formatPrice } from "@/lib/format";
import { TrashIcon, BagIcon, ChevronRight } from "@/components/icons";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  const shipping = subtotal > 5000 || subtotal === 0 ? 0 : 599;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-display text-4xl font-semibold text-ink">
            Your Cart{" "}
            <span className="text-muted">({items.length})</span>
          </h1>
          <Link
            href="/shop"
            className="flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2"
          >
            Continue Shopping <ChevronRight width={16} height={16} />
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-line bg-surface p-16 text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-background text-muted">
              <BagIcon width={26} height={26} />
            </span>
            <p className="mt-5 font-display text-2xl text-ink">Your cart is empty</p>
            <p className="mt-2 text-sm text-muted">
              Explore our collection and add something you love.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-block rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-3xl border border-line bg-surface p-4 shadow-soft"
                >
                  <Link
                    href={`/product/${item.slug}`}
                    className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-background"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/product/${item.slug}`}
                      className="line-clamp-1 font-medium text-ink hover:text-primary"
                    >
                      {item.title}
                    </Link>
                    <p className="mt-1 text-sm text-muted">
                      {formatPrice(item.price)} each
                    </p>
                  </div>
                  <div className="flex items-center rounded-full border border-line">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="grid h-9 w-9 place-items-center text-muted hover:text-ink"
                      aria-label="Decrease"
                    >
                      −
                    </button>
                    <span className="w-7 text-center text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="grid h-9 w-9 place-items-center text-muted hover:text-ink"
                      aria-label="Increase"
                    >
                      +
                    </button>
                  </div>
                  <p className="w-24 text-right font-semibold text-ink">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="grid h-9 w-9 place-items-center rounded-full text-muted transition hover:bg-background hover:text-ink"
                    aria-label="Remove"
                  >
                    <TrashIcon width={18} height={18} />
                  </button>
                </div>
              ))}
            </div>

            <aside className="h-fit rounded-3xl border border-line bg-surface p-6 shadow-soft lg:sticky lg:top-24">
              <h2 className="font-display text-xl font-semibold text-ink">
                Order Summary
              </h2>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted">Subtotal</dt>
                  <dd className="font-medium text-ink">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Shipping</dt>
                  <dd className="font-medium text-ink">
                    {shipping === 0 ? "Free" : formatPrice(shipping)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Tax (est.)</dt>
                  <dd className="font-medium text-ink">{formatPrice(tax)}</dd>
                </div>
                <div className="border-t border-line pt-3">
                  <div className="flex justify-between">
                    <dt className="text-base font-semibold text-ink">Total</dt>
                    <dd className="text-base font-semibold text-ink">
                      {formatPrice(total)}
                    </dd>
                  </div>
                </div>
              </dl>
              <Link
                href="/checkout"
                className="mt-6 block rounded-full bg-primary px-6 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-primary-dark active:scale-[0.98]"
              >
                Proceed to Checkout
              </Link>
              <p className="mt-3 text-center text-xs text-muted">
                Secure checkout · Free returns within 30 days
              </p>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
