import { db } from "@/db";
import { reviews, products } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const productId = Number(body.productId);
    const author = String(body.author ?? "").trim();
    const rating = Math.min(5, Math.max(1, Number(body.rating ?? 5)));
    const comment = String(body.comment ?? "").trim();

    if (!productId || !author || !comment) {
      return Response.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    const [inserted] = await db
      .insert(reviews)
      .values({ productId, author, rating, comment })
      .returning();

    // Recompute product rating + count from all reviews.
    const stats = await db
      .select({
        avg: sql<number>`avg(${reviews.rating})`,
        count: sql<number>`count(*)`,
      })
      .from(reviews)
      .where(eq(reviews.productId, productId));

    const avg = Number(stats[0]?.avg ?? rating);
    const count = Number(stats[0]?.count ?? 1);

    await db
      .update(products)
      .set({ rating: Math.round(avg * 10) / 10, reviewCount: count })
      .where(eq(products.id, productId));

    return Response.json({ ok: true, review: inserted });
  } catch (error) {
    console.error(error);
    return Response.json({ ok: false }, { status: 500 });
  }
}
