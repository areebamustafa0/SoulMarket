import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { NewsletterForm } from "@/components/newsletter-form";
import { getTrending, getFeatured, getCategories, getNewArrivals } from "@/lib/queries";
import {
  SearchIcon,
  SparkleIcon,
  ChevronRight,
  TruckIcon,
  ShieldIcon,
  RefreshIcon,
  LeafIcon,
} from "@/components/icons";

export const dynamic = "force-dynamic";

const categoryImages: Record<string, string> = {
  Home: "https://images.pexels.com/photos/20557234/pexels-photo-20557234.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400",
  Fashion: "https://images.pexels.com/photos/8743972/pexels-photo-8743972.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400",
  Beauty: "https://images.pexels.com/photos/3750640/pexels-photo-3750640.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400",
  Electronics: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400",
  Accessories: "https://images.pexels.com/photos/3568521/pexels-photo-3568521.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400",
  Wellness: "https://images.pexels.com/photos/15528970/pexels-photo-15528970.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400",
  Gifts: "https://images.pexels.com/photos/29581125/pexels-photo-29581125.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400",
  "Eco Friendly": "https://images.pexels.com/photos/8842706/pexels-photo-8842706.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400",
};

export default async function HomePage() {
  const [trending, featured, categories, newArrivals] = await Promise.all([
    getTrending(4),
    getFeatured(1),
    getCategories(),
    getNewArrivals(4),
  ]);
  const collection = featured[0];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-6 pt-10 lg:pt-16">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-xs font-semibold text-muted shadow-soft">
                <SparkleIcon width={14} height={14} className="text-primary" />
                AI-powered recommendations
              </span>
              <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-[4.2rem]">
                Shopping Made{" "}
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Smarter
                </span>
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
                Find products faster through intelligent recommendations — curated,
                calm, and beautifully simple.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/shop"
                  className="rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-soft transition hover:bg-primary-dark active:scale-[0.98]"
                >
                  Explore Products
                </Link>
                <Link
                  href="/assistant"
                  className="flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition hover:border-muted"
                >
                  <SparkleIcon width={16} height={16} className="text-primary" />
                  AI Assistant
                </Link>
              </div>

              <form
                action="/shop"
                className="mt-8 flex max-w-md items-center gap-2 rounded-full bg-surface p-2 shadow-card"
              >
                <SearchIcon width={18} height={18} className="ml-3 text-muted" />
                <input
                  name="q"
                  placeholder="Search for products, categories…"
                  className="w-full bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted"
                />
                <button className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark">
                  Search
                </button>
              </form>
            </div>

            <div className="relative animate-fade-up" style={{ animationDelay: "0.15s" }}>
              <div className="absolute -right-6 -top-6 h-72 w-72 rounded-full bg-accent/12 blur-3xl" />
              <div className="absolute -bottom-8 -left-8 h-60 w-60 rounded-full bg-primary/8 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface shadow-card">
                <img
                  src="https://images.pexels.com/photos/7031875/pexels-photo-7031875.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                  alt="A calm, premium shopping experience"
                  className="h-[420px] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 -left-3 rounded-2xl border border-line bg-surface/95 px-5 py-4 shadow-card backdrop-blur sm:bottom-5 sm:left-5">
                <p className="text-xs font-medium text-muted">Trusted by</p>
                <p className="font-display text-xl font-bold">28,400+ shoppers</p>
              </div>
            </div>
          </div>

          {/* Trust row */}
          <div className="mt-16 grid gap-4 sm:grid-cols-3">
            {[
              { icon: TruckIcon, title: "Free Shipping", sub: "On orders over $50" },
              { icon: RefreshIcon, title: "30-Day Returns", sub: "Hassle-free & simple" },
              { icon: ShieldIcon, title: "Secure Payment", sub: "100% protected checkout" },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-4 rounded-2xl border border-line bg-surface px-5 py-5 shadow-soft"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/8 text-primary">
                  <item.icon width={22} height={22} />
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">{item.title}</p>
                  <p className="text-xs text-muted">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Categories — real photos */}
        <section className="mx-auto max-w-7xl px-6 pt-24">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold text-ink">
                Shop by Category
              </h2>
              <p className="mt-2 text-muted">
                Explore curated collections across your favourite spaces.
              </p>
            </div>
            <Link
              href="/shop"
              className="hidden items-center gap-1 text-sm font-semibold text-primary hover:gap-2 sm:flex"
            >
              View all <ChevronRight width={16} height={16} />
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/shop?category=${encodeURIComponent(cat)}`}
                className="group relative overflow-hidden rounded-3xl border border-line shadow-soft transition hover:-translate-y-1 hover:shadow-card"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={categoryImages[cat] ?? categoryImages.Home}
                    alt={cat}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 w-full p-4">
                  <p className="text-sm font-bold text-white drop-shadow">{cat}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Trending */}
        <section className="mx-auto max-w-7xl px-6 pt-24">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold text-ink">
                Trending Products
              </h2>
              <p className="mt-2 text-muted">
                The pieces everyone is loving right now.
              </p>
            </div>
            <Link
              href="/shop"
              className="hidden items-center gap-1 text-sm font-semibold text-primary hover:gap-2 sm:flex"
            >
              View all <ChevronRight width={16} height={16} />
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {trending.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* New Arrivals */}
        {newArrivals.length > 0 && (
          <section className="mx-auto max-w-7xl px-6 pt-24">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="font-display text-3xl font-bold text-ink">
                  New Arrivals
                </h2>
                <p className="mt-2 text-muted">
                  Fresh additions to the collection.
                </p>
              </div>
              <Link
                href="/shop?sort=newest"
                className="hidden items-center gap-1 text-sm font-semibold text-primary hover:gap-2 sm:flex"
              >
                View all <ChevronRight width={16} height={16} />
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Featured collection */}
        {collection && (
          <section className="mx-auto max-w-7xl px-6 pt-24">
            <div className="grid overflow-hidden rounded-[2rem] border border-line bg-surface shadow-card lg:grid-cols-2">
              <div className="flex flex-col justify-center p-10 lg:p-14">
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
                  <LeafIcon width={14} height={14} /> Featured Collection
                </span>
                <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-ink">
                  Sustainable. Ethical. Beautiful.
                </h2>
                <p className="mt-4 max-w-sm text-muted">
                  Products that are good for you and the planet. Every item is scored
                  for sustainability so you can shop with confidence.
                </p>
                <Link
                  href="/shop?category=Eco%20Friendly"
                  className="mt-8 w-fit rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-accent-dark active:scale-[0.98]"
                >
                  Shop Now
                </Link>
              </div>
              <div className="relative min-h-[320px]">
                <img
                  src="https://images.pexels.com/photos/8015890/pexels-photo-8015890.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                  alt="Sustainable collection"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </section>
        )}

        {/* How it works */}
        <section className="mx-auto max-w-7xl px-6 pt-24">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-xs font-semibold text-primary shadow-soft">
              <SparkleIcon width={14} height={14} /> Powered by intelligence
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold text-ink">
              Shopping in three simple steps
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted">
              We handle the noise so you can focus on what you love.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Tell us what you need",
                desc: "Describe a budget, an occasion, or a vibe — our AI assistant understands it all.",
              },
              {
                step: "02",
                title: "Get smart picks",
                desc: "Receive a short, curated list of the best matches, ranked for quality and value.",
              },
              {
                step: "03",
                title: "Checkout with ease",
                desc: "A clean, trustworthy checkout with free shipping over $50 and 30-day returns.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-3xl border border-line bg-surface p-8 shadow-soft transition hover:shadow-card"
              >
                <span className="font-display text-4xl font-bold text-accent/60">
                  {item.step}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/assistant"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-ink/90"
            >
              <SparkleIcon width={16} height={16} className="text-accent" />
              Try the AI Assistant
            </Link>
          </div>
        </section>

        {/* Newsletter */}
        <section className="mx-auto max-w-7xl px-6 pt-24">
          <div className="overflow-hidden rounded-[2rem] bg-primary px-8 py-12 text-white lg:px-16 lg:py-16">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div>
                <h2 className="font-display text-3xl font-bold lg:text-4xl">
                  Join our community
                </h2>
                <p className="mt-3 max-w-md text-white/70">
                  Get updates on new arrivals, exclusive offers, and smart picks
                  tailored to you.
                </p>
              </div>
              <div className="lg:w-full lg:max-w-md lg:justify-self-end">
                <NewsletterForm variant="dark" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
