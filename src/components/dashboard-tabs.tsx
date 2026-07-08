"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product, Order } from "@/db/schema";
import { useCart } from "@/components/cart-context";
import { ProductCard } from "@/components/product-card";
import { formatPrice } from "@/lib/format";
import { BagIcon, HeartIcon, SparkleIcon, UserIcon, TruckIcon } from "@/components/icons";

type OrderView = Omit<Order, "createdAt"> & { createdAt: string };

const tabs = [
  { key: "orders", label: "Orders", icon: BagIcon },
  { key: "wishlist", label: "Wishlist", icon: HeartIcon },
  { key: "recommendations", label: "For You", icon: SparkleIcon },
  { key: "settings", label: "Account", icon: UserIcon },
] as const;

type TabKey = (typeof tabs)[number]["key"];

export function DashboardTabs({
  orders,
  products,
  recommendations,
}: {
  orders: OrderView[];
  products: Product[];
  recommendations: Product[];
}) {
  const [tab, setTab] = useState<TabKey>("orders");
  const { wishlist } = useCart();
  const wishedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
      <aside className="h-fit rounded-3xl border border-line bg-surface p-3 shadow-soft lg:sticky lg:top-24">
        <nav className="flex gap-2 overflow-x-auto lg:flex-col">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex shrink-0 items-center gap-2.5 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                tab === t.key
                  ? "bg-primary text-white"
                  : "text-muted hover:bg-background hover:text-ink"
              }`}
            >
              <t.icon width={18} height={18} />
              {t.label}
            </button>
          ))}
        </nav>
      </aside>

      <div>
        {tab === "orders" && (
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">Your Orders</h2>
            {orders.length === 0 ? (
              <Empty
                title="No orders yet"
                sub="When you place an order, it will appear here."
              />
            ) : (
              <div className="mt-6 space-y-4">
                {orders.map((order) => {
                  const items = safeItems(order.items);
                  return (
                    <div
                      key={order.id}
                      className="rounded-3xl border border-line bg-surface p-5 shadow-soft"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="font-semibold text-ink">{order.orderNumber}</p>
                          <p className="text-xs text-muted">
                            {new Date(order.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}{" "}
                            · {items.length} item{items.length === 1 ? "" : "s"}
                          </p>
                        </div>
                        <span className="flex items-center gap-1.5 rounded-full bg-primary/8 px-3 py-1 text-xs font-semibold capitalize text-primary">
                          <TruckIcon width={14} height={14} />
                          {order.status}
                        </span>
                        <p className="font-semibold text-ink">
                          {formatPrice(order.total)}
                        </p>
                      </div>
                      {items.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {items.map((it, idx) => (
                            <span
                              key={idx}
                              className="rounded-full bg-background px-3 py-1 text-xs text-muted"
                            >
                              {it.title} × {it.quantity}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {tab === "wishlist" && (
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">Wishlist</h2>
            {wishedProducts.length === 0 ? (
              <Empty
                title="Your wishlist is empty"
                sub="Tap the heart on any product to save it here."
              />
            ) : (
              <div className="mt-6 grid grid-cols-2 gap-5 lg:grid-cols-3">
                {wishedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </section>
        )}

        {tab === "recommendations" && (
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">
              Recommended for You
            </h2>
            <p className="mt-2 text-sm text-muted">
              Curated by our AI based on trends and top ratings.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-5 lg:grid-cols-3">
              {recommendations.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {tab === "settings" && (
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink">
              Account Settings
            </h2>
            <div className="mt-6 max-w-xl rounded-3xl border border-line bg-surface p-6 shadow-soft">
              <div className="flex items-center gap-4">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-primary/8 font-display text-2xl font-semibold text-primary">
                  A
                </span>
                <div>
                  <p className="font-semibold text-ink">Areeba </p>
                  <p className="text-sm text-muted">areeba@soulmarket.com</p>
                </div>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <SettingField label="Full Name" value="Areeba " />
                <SettingField label="Email" value="areeba@soulmarket.com" />
                <SettingField label="Phone" value="+92 300 1234567" />
                <SettingField label="Location" value="Lahore, Pakistan" />
              </div>
              <button className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark">
                Save Changes
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function SettingField({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-ink">{label}</span>
      <input defaultValue={value} className="input" />
    </label>
  );
}

function Empty({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mt-6 rounded-3xl border border-dashed border-line bg-surface p-14 text-center">
      <p className="font-display text-xl text-ink">{title}</p>
      <p className="mt-2 text-sm text-muted">{sub}</p>
      <Link
        href="/shop"
        className="mt-5 inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
      >
        Browse Products
      </Link>
    </div>
  );
}

function safeItems(
  raw: string,
): Array<{ title: string; quantity: number; price: number }> {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
