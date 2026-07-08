import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { DashboardTabs } from "@/components/dashboard-tabs";
import { db } from "@/db";
import { orders as ordersTable } from "@/db/schema";
import { desc } from "drizzle-orm";
import { getProducts, getTrending } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [orderRows, products, trending] = await Promise.all([
    db.select().from(ordersTable).orderBy(desc(ordersTable.createdAt)).limit(10),
    getProducts(),
    getTrending(6),
  ]);

  const orders = orderRows.map((o) => ({
    ...o,
    createdAt: o.createdAt.toISOString(),
  }));

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <p className="text-sm font-medium text-primary">Account</p>
          <h1 className="mt-1 font-display text-4xl font-semibold text-ink">
            Welcome back, Areeba
          </h1>
          <p className="mt-2 text-muted">
            Manage your orders, wishlist, and personalised recommendations.
          </p>
        </div>
        <DashboardTabs
          orders={orders}
          products={products}
          recommendations={trending}
        />
      </main>
      <Footer />
    </>
  );
}
