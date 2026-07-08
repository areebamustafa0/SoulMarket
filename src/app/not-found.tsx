import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BagIcon, SparkleIcon } from "@/components/icons";

export const metadata = { title: "Page not found · SoulMarket" };

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center">
        <span className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-card">
          <BagIcon width={32} height={32} />
        </span>
        <p className="mt-8 font-display text-7xl font-bold text-ink">404</p>
        <h1 className="mt-3 font-display text-3xl font-bold text-ink">
          This page wandered off
        </h1>
        <p className="mt-3 max-w-md text-muted">
          The page you&apos;re looking for doesn&apos;t exist or may have moved. Let&apos;s
          get you back to something beautiful.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            Back to Home
          </Link>
          <Link
            href="/shop"
            className="flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition hover:border-muted"
          >
            <SparkleIcon width={16} height={16} className="text-accent" />
            Browse Shop
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
