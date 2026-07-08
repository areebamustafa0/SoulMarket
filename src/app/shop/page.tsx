import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { ShopControls, ShopSidebar } from "@/components/shop-controls";
import { getProducts, getCategories, type SortKey } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const get = (k: string) => (Array.isArray(sp[k]) ? sp[k][0] : sp[k]) as string | undefined;

  const q = get("q");
  const category = get("category");
  const sort = (get("sort") as SortKey) ?? "popular";
  const maxPrice = get("maxPrice") ? Number(get("maxPrice")) * 100 : undefined;
  const minRating = get("minRating") ? Number(get("minRating")) : undefined;

  const [categories, items] = await Promise.all([
    getCategories(),
    getProducts({ q, category, sort, maxPrice, minRating }),
  ]);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <p className="text-sm font-medium text-primary">Shop</p>
          <h1 className="mt-1 font-display text-4xl font-semibold text-ink">
            {category && category !== "All" ? category : "All Products"}
          </h1>
          <p className="mt-2 text-muted">
            {q
              ? `Showing results for “${q}”`
              : "Discover thoughtfully curated products, intelligently sorted."}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <div className="hidden lg:block">
            <ShopSidebar categories={categories} />
          </div>

          <div>
            <ShopControls categories={categories} total={items.length} />

            {items.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-line bg-surface p-16 text-center">
                <p className="font-display text-xl text-ink">No products found</p>
                <p className="mt-2 text-sm text-muted">
                  Try adjusting your search or filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-5 xl:grid-cols-3">
                {items.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
