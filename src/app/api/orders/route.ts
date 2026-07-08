import { db } from "@/db";
import { orders } from "@/db/schema";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const orderNumber = `SM-${Math.floor(100000 + Math.random() * 900000)}`;

    await db.insert(orders).values({
      orderNumber,
      customerName: String(body.customerName ?? "Guest"),
      email: String(body.email ?? ""),
      address: String(body.address ?? ""),
      city: String(body.city ?? ""),
      country: String(body.country ?? ""),
      postalCode: String(body.postalCode ?? ""),
      subtotal: Number(body.subtotal ?? 0),
      shipping: Number(body.shipping ?? 0),
      tax: Number(body.tax ?? 0),
      total: Number(body.total ?? 0),
      status: "processing",
      items: JSON.stringify(body.items ?? []),
    });

    return Response.json({ ok: true, orderNumber });
  } catch (error) {
    console.error(error);
    return Response.json({ ok: false }, { status: 500 });
  }
}

export async function GET() {
  const rows = await db.select().from(orders).orderBy(desc(orders.createdAt)).limit(20);
  return Response.json({ orders: rows });
}
