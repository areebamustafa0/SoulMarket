"use client";

import Link from "next/link";
import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useCart } from "@/components/cart-context";
import { formatPrice } from "@/lib/format";
import { CheckIcon, ShieldIcon } from "@/components/icons";

const steps = ["Shipping", "Payment", "Confirmation"] as const;

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const [step, setStep] = useState(0);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    card: "",
    expiry: "",
    cvc: "",
  });

  const shipping = subtotal > 5000 || subtotal === 0 ? 0 : 599;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;

  const update = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const placeOrder = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.name,
          email: form.email,
          address: form.address,
          city: form.city,
          country: form.country,
          postalCode: form.postalCode,
          items: items.map((i) => ({
            id: i.id,
            title: i.title,
            price: i.price,
            quantity: i.quantity,
            image: i.image,
          })),
          subtotal,
          shipping,
          tax,
          total,
        }),
      });
      const data = await res.json();
      setOrderNumber(data.orderNumber ?? "SM-000000");
      clear();
      setStep(2);
    } catch {
      setOrderNumber("SM-000000");
      setStep(2);
    } finally {
      setSubmitting(false);
    }
  };

  const shippingValid =
    form.name && form.email && form.address && form.city && form.country && form.postalCode;
  const paymentValid = form.card && form.expiry && form.cvc;

  if (items.length === 0 && step < 2) {
    return (
      <>
        <Navbar />
        <main className="mx-auto max-w-3xl px-6 py-24 text-center">
          <h1 className="font-display text-3xl font-semibold text-ink">
            Your cart is empty
          </h1>
          <p className="mt-3 text-muted">Add products before checking out.</p>
          <Link
            href="/shop"
            className="mt-6 inline-block rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            Browse Products
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-6 py-10">
        {/* Stepper */}
        <div className="mx-auto mb-10 flex max-w-xl items-center justify-between">
          {steps.map((label, i) => (
            <div key={label} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`grid h-10 w-10 place-items-center rounded-full text-sm font-semibold transition ${
                    i <= step
                      ? "bg-primary text-white"
                      : "border border-line bg-surface text-muted"
                  }`}
                >
                  {i < step ? <CheckIcon width={18} height={18} /> : i + 1}
                </div>
                <span
                  className={`text-xs font-medium ${
                    i <= step ? "text-ink" : "text-muted"
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`mx-2 h-0.5 flex-1 rounded-full ${
                    i < step ? "bg-primary" : "bg-line"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {step === 2 ? (
          <div className="mx-auto max-w-lg rounded-3xl border border-line bg-surface p-10 text-center shadow-card">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/12 text-success">
              <CheckIcon width={30} height={30} />
            </span>
            <h1 className="mt-6 font-display text-3xl font-semibold text-ink">
              Order Confirmed
            </h1>
            <p className="mt-3 text-muted">
              Thank you, {form.name || "friend"}! Your order{" "}
              <span className="font-semibold text-ink">{orderNumber}</span> is being
              prepared. A confirmation was sent to {form.email || "your email"}.
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <Link
                href="/dashboard"
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
              >
                View Orders
              </Link>
              <Link
                href="/shop"
                className="rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink transition hover:border-muted"
              >
                Keep Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
            <div className="rounded-3xl border border-line bg-surface p-6 shadow-soft sm:p-8">
              {step === 0 && (
                <>
                  <h2 className="font-display text-xl font-semibold text-ink">
                    Shipping Information
                  </h2>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <Field label="Full Name" className="sm:col-span-2">
                      <input
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder="Areeba Khan"
                        className="input"
                      />
                    </Field>
                    <Field label="Email" className="sm:col-span-2">
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="you@example.com"
                        className="input"
                      />
                    </Field>
                    <Field label="Address" className="sm:col-span-2">
                      <input
                        value={form.address}
                        onChange={(e) => update("address", e.target.value)}
                        placeholder="123 Market Street"
                        className="input"
                      />
                    </Field>
                    <Field label="City">
                      <input
                        value={form.city}
                        onChange={(e) => update("city", e.target.value)}
                        placeholder="Lahore"
                        className="input"
                      />
                    </Field>
                    <Field label="Postal Code">
                      <input
                        value={form.postalCode}
                        onChange={(e) => update("postalCode", e.target.value)}
                        placeholder="54000"
                        className="input"
                      />
                    </Field>
                    <Field label="Country" className="sm:col-span-2">
                      <input
                        value={form.country}
                        onChange={(e) => update("country", e.target.value)}
                        placeholder="Pakistan"
                        className="input"
                      />
                    </Field>
                  </div>
                  <button
                    disabled={!shippingValid}
                    onClick={() => setStep(1)}
                    className="mt-8 w-full rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Continue to Payment
                  </button>
                </>
              )}

              {step === 1 && (
                <>
                  <h2 className="font-display text-xl font-semibold text-ink">
                    Payment Details
                  </h2>
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-muted">
                    <ShieldIcon width={14} height={14} className="text-success" />
                    Encrypted & secure. This is a demo — no real charge is made.
                  </p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <Field label="Card Number" className="sm:col-span-2">
                      <input
                        value={form.card}
                        onChange={(e) => update("card", e.target.value)}
                        placeholder="4242 4242 4242 4242"
                        className="input"
                      />
                    </Field>
                    <Field label="Expiry">
                      <input
                        value={form.expiry}
                        onChange={(e) => update("expiry", e.target.value)}
                        placeholder="12/28"
                        className="input"
                      />
                    </Field>
                    <Field label="CVC">
                      <input
                        value={form.cvc}
                        onChange={(e) => update("cvc", e.target.value)}
                        placeholder="123"
                        className="input"
                      />
                    </Field>
                  </div>
                  <div className="mt-8 flex gap-3">
                    <button
                      onClick={() => setStep(0)}
                      className="rounded-full border border-line px-6 py-3.5 text-sm font-semibold text-ink transition hover:border-muted"
                    >
                      Back
                    </button>
                    <button
                      disabled={!paymentValid || submitting}
                      onClick={placeOrder}
                      className="flex-1 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {submitting ? "Placing order…" : `Pay ${formatPrice(total)}`}
                    </button>
                  </div>
                </>
              )}
            </div>

            <aside className="h-fit rounded-3xl border border-line bg-surface p-6 shadow-soft">
              <h2 className="font-display text-lg font-semibold text-ink">
                Order Summary
              </h2>
              <div className="mt-5 space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-background">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-1 text-sm font-medium text-ink">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted">Qty {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-ink">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
              <dl className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
                <Row label="Subtotal" value={formatPrice(subtotal)} />
                <Row
                  label="Shipping"
                  value={shipping === 0 ? "Free" : formatPrice(shipping)}
                />
                <Row label="Tax" value={formatPrice(tax)} />
                <div className="flex justify-between border-t border-line pt-3 text-base font-semibold text-ink">
                  <dt>Total</dt>
                  <dd>{formatPrice(total)}</dd>
                </div>
              </dl>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-semibold text-ink">{label}</span>
      {children}
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted">{label}</dt>
      <dd className="font-medium text-ink">{value}</dd>
    </div>
  );
}
