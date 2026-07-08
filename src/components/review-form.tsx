"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUI } from "@/components/ui-context";
import { StarIcon } from "@/components/icons";

export function ReviewForm({ productId }: { productId: number }) {
  const router = useRouter();
  const { notify } = useUI();
  const [open, setOpen] = useState(false);
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, author, comment, rating }),
      });
      if (!res.ok) throw new Error();
      notify({ title: "Review posted", description: "Thanks for sharing!" });
      setAuthor("");
      setComment("");
      setRating(5);
      setOpen(false);
      router.refresh();
    } catch {
      notify({ title: "Something went wrong", variant: "info" });
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-muted"
      >
        Write a Review
      </button>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-3xl border border-line bg-surface p-6 shadow-soft"
    >
      <h3 className="font-display text-lg font-semibold text-ink">Write a Review</h3>
      <div className="mt-4 flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setRating(i + 1)}
            onMouseEnter={() => setHover(i + 1)}
            onMouseLeave={() => setHover(0)}
            aria-label={`Rate ${i + 1}`}
          >
            <StarIcon
              filled={i < (hover || rating)}
              width={26}
              height={26}
              className={i < (hover || rating) ? "text-accent" : "text-line"}
            />
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-4">
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Your name"
          className="input"
          required
        />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts about this product…"
          rows={3}
          className="input resize-none"
          required
        />
      </div>
      <div className="mt-4 flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:opacity-50"
        >
          {submitting ? "Posting…" : "Post Review"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-full border border-line px-6 py-2.5 text-sm font-semibold text-ink transition hover:border-muted"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
