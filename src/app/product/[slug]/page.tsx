import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { AddToCart } from "@/components/add-to-cart";
import { ReviewForm } from "@/components/review-form";
import { RecentlyViewed } from "@/components/recently-viewed";
import { StarRating } from "@/components/star-rating";
import {
  getProductBySlug,
  getReviews,
  getRecommended,
} from "@/lib/queries";
import { formatPrice } from "@/lib/format";
import {
  LeafIcon,
  TruckIcon,
  RefreshIcon,
  ShieldIcon,
  CheckIcon,
} from "@/components/icons";

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [reviews, recommended] = await Promise.all([
    getReviews(product.id),
    getRecommended(product, 4),
  ]);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-10">
        <nav className="mb-8 flex items-center gap-2 text-sm text-muted">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-ink">
            Shop
          </Link>
          <span>/</span>
          <span className="text-ink">{product.title}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2">
          <ProductGallery images={product.gallery} title={product.title} />

          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-primary">
              {product.category}
            </p>
            <h1 className="mt-2 font-display text-4xl font-semibold leading-tight text-ink">
              {product.title}
            </h1>
            <div className="mt-4 flex items-center gap-3">
              <StarRating rating={product.rating} size={18} showValue={false} />
              <span className="text-sm text-muted">
                {product.rating.toFixed(1)} · {reviews.length} reviews
              </span>
            </div>

            <p className="mt-6 text-3xl font-semibold text-ink">
              {formatPrice(product.price)}
            </p>

            <p className="mt-5 leading-relaxed text-muted">{product.description}</p>

            {/* Sustainability */}
            <div className="mt-6 rounded-2xl border border-success/20 bg-success/5 p-5">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <LeafIcon width={18} height={18} className="text-success" />
                  Sustainability Score
                </span>
                <span className="text-sm font-semibold text-success">
                  {product.sustainability}/100
                </span>
              </div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-success/15">
                <div
                  className="h-full rounded-full bg-success"
                  style={{ width: `${product.sustainability}%` }}
                />
              </div>
              <p className="mt-3 flex items-center gap-1.5 text-xs text-muted">
                <CheckIcon width={14} height={14} className="text-success" />
                In stock — ships within 24 hours
              </p>
            </div>

            <div className="mt-7">
              <AddToCart product={product} />
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { icon: TruckIcon, label: "Free Shipping", sub: "Over $50" },
                { icon: RefreshIcon, label: "Easy Returns", sub: "30 days" },
                { icon: ShieldIcon, label: "Secure", sub: "100% safe" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-line bg-surface p-4 text-center"
                >
                  <item.icon width={20} height={20} className="mx-auto text-primary" />
                  <p className="mt-2 text-xs font-semibold text-ink">{item.label}</p>
                  <p className="text-[11px] text-muted">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <section className="mt-20">
          <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink">
                Reviews ({reviews.length})
              </h2>
              {reviews.length === 0 ? (
                <p className="mt-4 text-muted">
                  No reviews yet — be the first to share your thoughts.
                </p>
              ) : (
                <div className="mt-6 space-y-4">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="rounded-2xl border border-line bg-surface p-6 shadow-soft"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/8 font-semibold text-primary">
                            {review.author.charAt(0)}
                          </span>
                          <p className="font-medium text-ink">{review.author}</p>
                        </div>
                        <StarRating rating={review.rating} showValue={false} />
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-muted">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:sticky lg:top-24 lg:h-fit">
              <div className="rounded-3xl border border-line bg-background p-6">
                <div className="flex items-center gap-4">
                  <span className="font-display text-4xl font-semibold text-ink">
                    {product.rating.toFixed(1)}
                  </span>
                  <div>
                    <StarRating rating={product.rating} showValue={false} />
                    <p className="mt-1 text-xs text-muted">
                      Based on {reviews.length} review{reviews.length === 1 ? "" : "s"}
                    </p>
                  </div>
                </div>
                <div className="mt-5">
                  <ReviewForm productId={product.id} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recently viewed */}
        <RecentlyViewed
          current={{
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            image: product.image,
            rating: product.rating,
          }}
        />

        {/* Recommended */}
        {recommended.length > 0 && (
          <section className="mt-20">
            <h2 className="font-display text-2xl font-semibold text-ink">
              You may also like
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-5 lg:grid-cols-4">
              {recommended.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
