import { getProducts } from "@/lib/queries";
import type { Product } from "@/db/schema";

export const dynamic = "force-dynamic";

const categoryKeywords: Record<string, string[]> = {
  Home: [
    "home", "decor", "vase", "living room", "interior", "blanket", "throw",
    "bedding", "linen", "bedroom", "cozy", "cosy", "apartment", "house",
  ],
  Fashion: [
    "fashion", "bag", "tote", "style", "wear", "outfit", "shirt", "scarf",
    "clothing", "clothes", "wardrobe", "dress",
  ],
  Beauty: [
    "beauty", "skincare", "skin", "cosmetic", "glow", "serum", "face roller",
    "facial", "self care", "self-care",
  ],
  Electronics: [
    "electronics", "tech", "headphone", "smartwatch", "smart watch", "gadget",
    "audio", "speaker", "music", "sound", "bluetooth",
  ],
  Accessories: ["accessory", "accessories", "sunglasses", "glasses", "shades"],
  Wellness: [
    "wellness", "calm", "calming", "relax", "aroma", "diffuser", "candle",
    "spa", "yoga", "meditation", "stress", "sleep", "unwind", "peaceful",
  ],
  Gifts: ["gift box", "coffee", "pour over", "pour-over", "hamper"],
  "Eco Friendly": [
    "eco", "sustainable", "green", "reusable", "planet", "bamboo",
    "zero waste", "plastic free", "plastic-free", "mug", "bottle",
  ],
};

const greetingRe =
  /^(hi|hii+|hello|hey|heyy+|yo|salam|assalam|hola|good\s*(morning|afternoon|evening))[\s!.,]*$/i;
const thanksRe = /\b(thank|thanks|thx|shukriya|appreciated?)\b/i;
const helpRe = /\b(help|what can you do|how (do|does) (you|this) work)\b/i;

export async function POST(req: Request) {
  let message = "";
  try {
    const body = await req.json();
    message = String(body.message ?? "").slice(0, 300);
  } catch {
    message = "";
  }
  const text = message.toLowerCase().trim();

  // ── Small talk ──────────────────────────────────────────────
  if (!text || greetingRe.test(text)) {
    return Response.json({
      reply:
        "Hello! Lovely to see you. Tell me who you're shopping for, your budget, or the mood you're going for — and I'll curate a shortlist just for you.",
      products: [],
      followUps: [
        "I need a gift under $50",
        "Something calming for my home",
        "Show me your bestsellers",
      ],
    });
  }

  if (thanksRe.test(text) && text.length < 40) {
    return Response.json({
      reply:
        "My pleasure! If you'd like more ideas — a different budget, style, or occasion — I'm right here.",
      products: [],
      followUps: ["Show me new arrivals", "Top rated under $100", "Eco-friendly picks"],
    });
  }

  if (helpRe.test(text)) {
    return Response.json({
      reply:
        "I help you find the perfect product, fast. Try telling me a budget (“under $50”), a category (“skincare”, “electronics”), an occasion (“anniversary gift”), or a feeling (“something calming”). I'll curate the best matches from our collection.",
      products: [],
      followUps: [
        "I need a gift under $50",
        "Best skincare for sensitive skin",
        "Something premium for my desk",
      ],
    });
  }

  // ── Price intent ────────────────────────────────────────────
  let maxPrice: number | undefined;
  let minPrice: number | undefined;

  const between = text.match(/between\s*\$?\s*(\d+)\s*(?:and|-|to)\s*\$?\s*(\d+)/);
  const range = text.match(/\$\s*(\d+)\s*(?:-|to)\s*\$?\s*(\d+)/);
  const under = text.match(
    /(?:under|below|less than|max|maximum|up to|budget of|around|about)\s*\$?\s*(\d+)/,
  );
  const over = text.match(/(?:over|above|more than|at least|minimum)\s*\$?\s*(\d+)/);
  const bare = text.match(/\$\s*(\d+)/);

  if (between) {
    minPrice = Number(between[1]) * 100;
    maxPrice = Number(between[2]) * 100;
  } else if (range) {
    minPrice = Number(range[1]) * 100;
    maxPrice = Number(range[2]) * 100;
  } else {
    if (under) maxPrice = Number(under[1]) * 100;
    if (over) minPrice = Number(over[1]) * 100;
    if (!maxPrice && !minPrice && bare) maxPrice = Number(bare[1]) * 100;
  }

  const wantsCheap = /\b(cheap|affordable|budget|inexpensive|low cost)\b/.test(text);
  if (wantsCheap && !maxPrice) maxPrice = 4000;

  const wantsPremium = /\b(premium|luxury|luxurious|high end|high-end|finest|elegant)\b/.test(text);

  // ── Quality intent ──────────────────────────────────────────
  const wantsBest = /\b(best|top|top rated|top-rated|highly rated|bestseller|popular|favourite|favorite)\b/.test(text);
  const minRating = wantsBest ? 4.5 : undefined;

  // ── Occasion / gift intent ──────────────────────────────────
  const isGift =
    /\b(gift|present|birthday|anniversary|wedding|surprise)\b/.test(text) ||
    /\bfor (my )?(mom|mum|dad|wife|husband|friend|sister|brother|girlfriend|boyfriend|partner|her|him)\b/.test(text);
  const occasion =
    text.match(/\b(birthday|anniversary|wedding|housewarming|graduation)\b/)?.[1];

  // ── Category detection (scored, best match wins) ───────────
  let category: string | undefined;
  let bestScore = 0;
  for (const [cat, words] of Object.entries(categoryKeywords)) {
    const score = words.reduce((s, w) => (text.includes(w) ? s + 1 : s), 0);
    if (score > bestScore) {
      bestScore = score;
      category = cat;
    }
  }

  const wantsNew = /\b(new|newest|latest|arrival)\b/.test(text);

  // ── Fetch & rank ────────────────────────────────────────────
  let items = await getProducts({
    category,
    maxPrice,
    minRating,
    sort: wantsPremium ? "price-desc" : wantsNew ? "newest" : "rating",
  });

  if (minPrice) items = items.filter((p) => p.price >= minPrice);

  // Relax filters gracefully if nothing matched
  let relaxed = false;
  if (items.length === 0 && category && maxPrice) {
    items = await getProducts({ maxPrice, sort: "rating" });
    relaxed = true;
  }
  if (items.length === 0 && maxPrice) {
    items = await getProducts({ sort: "price-asc" });
    relaxed = true;
  }
  if (items.length === 0) {
    items = await getProducts({ sort: "popular" });
    relaxed = true;
  }

  // For gifts without a clear category, prefer giftable spread
  if (isGift && !category) {
    items = [...items].sort((a, b) => b.rating - a.rating);
  }

  const picks = items.slice(0, 4);

  const reply = buildReply({
    picks,
    maxPrice,
    minPrice,
    category,
    isGift,
    occasion,
    wantsBest,
    wantsPremium,
    relaxed,
  });

  const followUps = buildFollowUps({ category, maxPrice, isGift });

  return Response.json({ reply, products: picks, followUps });
}

function buildReply({
  picks,
  maxPrice,
  minPrice,
  category,
  isGift,
  occasion,
  wantsBest,
  wantsPremium,
  relaxed,
}: {
  picks: Product[];
  maxPrice?: number;
  minPrice?: number;
  category?: string;
  isGift?: boolean;
  occasion?: string;
  wantsBest?: boolean;
  wantsPremium?: boolean;
  relaxed?: boolean;
}): string {
  if (picks.length === 0) {
    return "I couldn't find a perfect match. Try a different budget or category and I'll curate again.";
  }

  const top = picks[0];
  const price = (c: number) => `$${Math.round(c / 100)}`;

  let opener: string;
  if (isGift && occasion) {
    opener = `Beautiful choice — here are my favourite ${occasion} gift ideas`;
  } else if (isGift) {
    opener = "Here are some gifts I think they'll treasure";
  } else if (wantsPremium) {
    opener = `The finest of our ${category ?? "collection"}, hand-picked`;
  } else if (wantsBest) {
    opener = `Our highest-rated ${category ?? "pieces"}, loved by the community`;
  } else if (category) {
    opener = `Here are my top ${category} picks for you`;
  } else {
    opener = "Here's what I'd recommend";
  }

  const constraints: string[] = [];
  if (minPrice && maxPrice) {
    constraints.push(`between ${price(minPrice)} and ${price(maxPrice)}`);
  } else if (maxPrice) {
    constraints.push(`all under ${price(maxPrice)}`);
  } else if (minPrice) {
    constraints.push(`from ${price(minPrice)} up`);
  }

  const constraintText = constraints.length ? `, ${constraints.join(", ")}` : "";
  const highlight = ` The ${top.title} (${top.rating.toFixed(1)}★) is especially loved.`;
  const relaxNote = relaxed
    ? " I broadened the search slightly to find you the best options."
    : "";

  return `${opener}${constraintText}.${highlight}${relaxNote}`;
}

function buildFollowUps({
  category,
  maxPrice,
  isGift,
}: {
  category?: string;
  maxPrice?: number;
  isGift?: boolean;
}): string[] {
  const ups: string[] = [];
  if (!maxPrice) ups.push(isGift ? "Keep it under $50" : "Show options under $50");
  if (category !== "Eco Friendly") ups.push("Only eco-friendly options");
  if (category !== "Wellness") ups.push("Something more calming");
  ups.push("Show me something premium");
  return ups.slice(0, 3);
}
