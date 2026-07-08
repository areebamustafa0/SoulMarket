"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/components/cart-context";
import { useUI } from "@/components/ui-context";
import { formatPrice } from "@/lib/format";
import { BagIcon, TrashIcon } from "@/components/icons";

export function CartDrawer() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  const { cartOpen, closeCart } = useUI();

  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen]);

  // Close on Esc for accessibility
  useEffect(() => {
    if (!cartOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cartOpen, closeCart]);

  const freeShippingGap = Math.max(0, 5000 - subtotal);
  const progress = Math.min(100, (subtotal / 5000) * 100);

  return (
    <>
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-[60] bg-ink/40 backdrop-blur-sm transition-opacity duration-300 ${
          cartOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed right-0 top-0 z-[65] flex h-full w-full max-w-md flex-col bg-surface shadow-card transition-transform duration-300 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!cartOpen}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="font-display text-xl font-semibold text-ink">
            Your Cart{" "}
            <span className="text-muted">({items.length})</span>
          </h2>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="grid h-9 w-9 place-items-center rounded-full text-muted transition hover:bg-background hover:text-ink"
          >
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-background text-muted">
              <BagIcon width={26} height={26} />
            </span>
            <p className="mt-5 font-display text-xl text-ink">Your cart is empty</p>
            <p className="mt-2 text-sm text-muted">
              Add something you love to get started.
            </p>
            <button
              onClick={closeCart}
              className="mt-6 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Free shipping progress */}
            <div className="border-b border-line px-6 py-4">
              {freeShippingGap > 0 ? (
                <p className="text-xs text-muted">
                  Add{" "}
                  <span className="font-semibold text-ink">
                    {formatPrice(freeShippingGap)}
                  </span>{" "}
                  more for free shipping
                </p>
              ) : (
                <p className="text-xs font-medium text-success">
                  🎉 You&apos;ve unlocked free shipping!
                </p>
              )}
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-background">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <Link
                    href={`/product/${item.slug}`}
                    onClick={closeCart}
                    className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-background"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={closeCart}
                        className="line-clamp-1 text-sm font-medium text-ink hover:text-primary"
                      >
                        {item.title}
                      </Link>
                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label="Remove"
                        className="shrink-0 text-muted transition hover:text-ink"
                      >
                        <TrashIcon width={16} height={16} />
                      </button>
                    </div>
                    <p className="mt-1 text-sm text-muted">
                      {formatPrice(item.price)}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-line">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="grid h-8 w-8 place-items-center text-muted hover:text-ink"
                          aria-label="Decrease"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="grid h-8 w-8 place-items-center text-muted hover:text-ink"
                          aria-label="Increase"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-sm font-semibold text-ink">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-line px-6 py-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted">Subtotal</span>
                <span className="font-display text-xl font-semibold text-ink">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted">
                Shipping &amp; taxes calculated at checkout.
              </p>
              <div className="mt-4 grid gap-2">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="rounded-full bg-primary px-6 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-primary-dark active:scale-[0.98]"
                >
                  Checkout
                </Link>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="rounded-full border border-line px-6 py-3 text-center text-sm font-semibold text-ink transition hover:border-muted"
                >
                  View Cart
                </Link>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
