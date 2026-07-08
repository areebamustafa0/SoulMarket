"use client";

import { useState } from "react";
import { SendIcon, CheckIcon } from "@/components/icons";

export function NewsletterForm({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const dark = variant === "dark";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!email) return;
        setDone(true);
        setEmail("");
        setTimeout(() => setDone(false), 2600);
      }}
      className={`flex items-center gap-2 rounded-full p-1.5 ${
        dark ? "bg-white/10" : "bg-white shadow-soft"
      }`}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address"
        className={`w-full bg-transparent px-4 py-2 text-sm outline-none ${
          dark ? "text-white placeholder:text-white/45" : "text-ink placeholder:text-muted"
        }`}
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-white transition hover:bg-primary-dark"
      >
        {done ? <CheckIcon width={16} height={16} /> : <SendIcon width={16} height={16} />}
      </button>
    </form>
  );
}
