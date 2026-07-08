"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useCart } from "@/components/cart-context";
import { useUI } from "@/components/ui-context";
import { StarRating } from "@/components/star-rating";
import { formatPrice } from "@/lib/format";
import { SparkleIcon, SendIcon, BagIcon, UserIcon } from "@/components/icons";
import type { Product } from "@/db/schema";

type Message = {
  role: "user" | "assistant";
  text: string;
  products?: Product[];
  followUps?: string[];
};

const openingSuggestions = [
  "I need a gift under $50",
  "Something calming for my home",
  "Best skincare picks",
  "Premium electronics",
];

export default function AssistantPage() {
  const { addItem } = useCart();
  const { notify, openCart } = useUI();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Welcome to SoulMarket. I'm your personal shopping curator — tell me a budget, an occasion, or a mood, and I'll hand-pick something beautiful for you.",
      followUps: openingSuggestions,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Always keep the latest message in view
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [messages, loading]);

  const send = async (text: string) => {
    const clean = text.trim();
    if (!clean || loading) return;
    setMessages((m) => [...m, { role: "user", text: clean }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: clean }),
      });
      if (!res.ok) throw new Error("bad response");
      const data = await res.json();
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: data.reply,
          products: data.products,
          followUps: data.followUps,
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: "I hit a small snag — please try that again in a moment.",
          followUps: openingSuggestions,
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const lastIndex = messages.length - 1;

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-gradient-to-r from-accent/10 to-primary/10 px-4 py-1.5 text-xs font-semibold text-primary shadow-soft">
            <SparkleIcon width={14} height={14} className="text-accent" />
            Personal Shopping Curator
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold text-ink sm:text-5xl">
            What can I find for you?
          </h1>
          <p className="mx-auto mt-3 max-w-md text-muted">
            Describe a budget, an occasion, or a feeling — I&apos;ll curate the rest.
          </p>
        </div>

        {/* Chat card */}
        <div className="overflow-hidden rounded-[2rem] border border-line bg-surface shadow-card">
          {/* Chat header */}
          <div className="flex items-center gap-3 border-b border-line bg-gradient-to-r from-primary/5 via-transparent to-accent/5 px-6 py-4">
            <div className="relative">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-soft">
                <SparkleIcon width={18} height={18} />
              </span>
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-surface bg-success" />
            </div>
            <div>
              <p className="text-sm font-bold text-ink">Soul — your curator</p>
              <p className="text-xs text-muted">Online · replies instantly</p>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="max-h-[55vh] min-h-[380px] space-y-6 overflow-y-auto scroll-smooth p-6"
          >
            {messages.map((msg, i) => (
              <div key={i} className="animate-pop">
                <div
                  className={`flex items-end gap-2.5 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-white">
                      <SparkleIcon width={14} height={14} />
                    </span>
                  )}
                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "rounded-br-md bg-primary text-white"
                        : "rounded-bl-md border border-line/70 bg-background text-ink"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.role === "user" && (
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-white">
                      <UserIcon width={14} height={14} />
                    </span>
                  )}
                </div>

                {/* Product recommendations */}
                {msg.products && msg.products.length > 0 && (
                  <div className="ml-10 mt-4 grid gap-3 sm:grid-cols-2">
                    {msg.products.map((p) => (
                      <div
                        key={p.id}
                        className="group flex gap-3 rounded-2xl border border-line bg-surface p-3 shadow-soft transition hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-card"
                      >
                        <Link
                          href={`/product/${p.slug}`}
                          className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl bg-background"
                        >
                          <img
                            src={p.image}
                            alt={p.title}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        </Link>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <Link
                            href={`/product/${p.slug}`}
                            className="line-clamp-1 text-sm font-semibold text-ink transition hover:text-primary"
                          >
                            {p.title}
                          </Link>
                          <div className="mt-1">
                            <StarRating rating={p.rating} showValue={false} size={12} />
                          </div>
                          <div className="mt-auto flex items-center justify-between pt-1.5">
                            <span className="text-sm font-bold text-ink">
                              {formatPrice(p.price)}
                            </span>
                            <button
                              onClick={() => {
                                addItem({
                                  id: p.id,
                                  slug: p.slug,
                                  title: p.title,
                                  price: p.price,
                                  image: p.image,
                                });
                                notify({
                                  title: "Added to cart",
                                  description: p.title,
                                  image: p.image,
                                });
                                openCart();
                              }}
                              className="grid h-8 w-8 place-items-center rounded-full bg-primary text-white transition hover:bg-primary-dark active:scale-95"
                              aria-label={`Add ${p.title} to cart`}
                            >
                              <BagIcon width={14} height={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Contextual follow-ups under the latest assistant message */}
                {msg.role === "assistant" &&
                  i === lastIndex &&
                  !loading &&
                  msg.followUps &&
                  msg.followUps.length > 0 && (
                    <div className="ml-10 mt-4 flex flex-wrap gap-2">
                      {msg.followUps.map((s) => (
                        <button
                          key={s}
                          onClick={() => send(s)}
                          className="rounded-full border border-accent/30 bg-accent/5 px-3.5 py-1.5 text-xs font-semibold text-primary transition hover:border-accent hover:bg-accent/15"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex items-end gap-2.5">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-white">
                  <SparkleIcon width={14} height={14} />
                </span>
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-line/70 bg-background px-5 py-4">
                  <Dot />
                  <Dot delay="0.15s" />
                  <Dot delay="0.3s" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="border-t border-line p-4"
          >
            <div className="flex items-center gap-2 rounded-full border border-line bg-background p-1.5 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Try “an anniversary gift between $30 and $80”…"
                className="w-full bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-muted"
                aria-label="Message the assistant"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-35"
                aria-label="Send"
              >
                <SendIcon width={17} height={17} />
              </button>
            </div>
          </form>
        </div>

        {/* Reassurance row */}
        <p className="mt-5 text-center text-xs text-muted">
          Curated from {""}
          <Link href="/shop" className="font-semibold text-primary hover:underline">
            our full collection
          </Link>
          {""} · No account needed · Free shipping over $50
        </p>
      </main>
      <Footer />
    </>
  );
}

function Dot({ delay = "0s" }: { delay?: string }) {
  return (
    <span
      className="h-2 w-2 animate-bounce rounded-full bg-accent"
      style={{ animationDelay: delay }}
    />
  );
}
