import { db } from "@/db";
import { products, reviews, orders, type Product } from "@/db/schema";
import { and, asc, desc, eq, ilike, inArray, ne, or, sql } from "drizzle-orm";

export type SortKey = "popular" | "price-asc" | "price-desc" | "rating" | "newest";

export async function getCategories(): Promise<string[]> {
  const rows = await db
    .select({ category: products.category })
    .from(products)
    .groupBy(products.category)
    .orderBy(asc(products.category));
  return rows.map((r) => r.category);
}

export async function getProducts(options: {
  q?: string;
  category?: string;
  sort?: SortKey;
  maxPrice?: number;
  minRating?: number;
} = {}): Promise<Product[]> {
  const conditions = [];
  if (options.q) {
    conditions.push(
      or(
        ilike(products.title, `%${options.q}%`),
        ilike(products.description, `%${options.q}%`),
        ilike(products.category, `%${options.q}%`),
      ),
    );
  }
  if (options.category && options.category !== "All") {
    conditions.push(eq(products.category, options.category));
  }
  if (options.maxPrice) {
    conditions.push(sql`${products.price} <= ${options.maxPrice}`);
  }
  if (options.minRating) {
    conditions.push(sql`${products.rating} >= ${options.minRating}`);
  }

  const orderBy = (() => {
    switch (options.sort) {
      case "price-asc":
        return asc(products.price);
      case "price-desc":
        return desc(products.price);
      case "rating":
        return desc(products.rating);
      case "newest":
        return desc(products.createdAt);
      default:
        return desc(products.reviewCount);
    }
  })();

  const query = db.select().from(products).orderBy(orderBy);
  if (conditions.length) {
    return query.where(and(...conditions));
  }
  return query;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const rows = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  return rows[0];
}

export async function getTrending(limit = 4): Promise<Product[]> {
  return db
    .select()
    .from(products)
    .where(eq(products.trending, true))
    .orderBy(desc(products.reviewCount))
    .limit(limit);
}

export async function getFeatured(limit = 3): Promise<Product[]> {
  return db.select().from(products).where(eq(products.featured, true)).limit(limit);
}

export async function getNewArrivals(limit = 4): Promise<Product[]> {
  return db
    .select()
    .from(products)
    .orderBy(desc(products.createdAt))
    .limit(limit);
}

export async function getReviews(productId: number) {
  return db
    .select()
    .from(reviews)
    .where(eq(reviews.productId, productId))
    .orderBy(desc(reviews.createdAt));
}

export async function getRecommended(product: Product, limit = 4): Promise<Product[]> {
  return db
    .select()
    .from(products)
    .where(and(eq(products.category, product.category), ne(products.id, product.id)))
    .orderBy(desc(products.rating))
    .limit(limit);
}

export async function getProductsByIds(ids: number[]): Promise<Product[]> {
  if (!ids.length) return [];
  return db.select().from(products).where(inArray(products.id, ids));
}

export async function getAdminStats() {
  const orderRows = await db.select().from(orders);
  const productRows = await db.select().from(products);
  const revenue = orderRows.reduce((sum, o) => sum + o.total, 0);
  return {
    revenue,
    orderCount: orderRows.length,
    productCount: productRows.length,
    recentOrders: orderRows
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 6),
  };
}
