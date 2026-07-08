import Link from "next/link";
import { BagIcon } from "@/components/icons";
import { NewsletterForm } from "@/components/newsletter-form";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "New Arrivals", href: "/shop?sort=newest" },
      { label: "Trending", href: "/shop?sort=popular" },
      { label: "Eco Friendly", href: "/shop?category=Eco%20Friendly" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/" },
      { label: "Sustainability", href: "/shop?category=Eco%20Friendly" },
      { label: "AI Assistant", href: "/assistant" },
      { label: "Admin Panel", href: "/admin" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "My Orders", href: "/dashboard" },
      { label: "Shipping Info", href: "/" },
      { label: "Returns", href: "/" },
      { label: "Contact", href: "/" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-5">
        {/* Brand */}
        <div className="lg:col-span-2">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-white">
              <BagIcon width={17} height={17} />
            </span>
            <span className="font-display text-xl font-bold">SoulMarket</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
            Smart Shopping. Beautifully Simple. Premium products curated through
            AI-powered recommendations.
          </p>
          <div className="mt-6">
            <p className="mb-2 text-xs font-semibold text-white/70">Newsletter</p>
            <NewsletterForm variant="dark" />
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-bold tracking-wide text-white">
              {col.title}
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-white/50">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} SoulMarket. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
