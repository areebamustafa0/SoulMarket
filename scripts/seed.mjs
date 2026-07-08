import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

const img = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=800&w=800`;

const products = [
  // ── Home ──
  {
    slug: "minimal-ceramic-vase",
    title: "Minimal Ceramic Vase",
    category: "Home",
    price: 4900,
    image: img(29904622),
    gallery: [img(29904622), img(15028227), img(32541183)],
    rating: 4.8,
    reviewCount: 100,
    sustainability: 92,
    badge: "Bestseller",
    trending: true,
    featured: false,
    description:
      "A handcrafted ceramic vase with a soft matte finish — perfect for minimalist homes. Each piece is thrown and glazed by hand, so no two are exactly alike.",
  },
  {
    slug: "cotton-throw-blanket",
    title: "Cotton Throw Blanket",
    category: "Home",
    price: 6900,
    image: img(16963369),
    gallery: [img(16963369)],
    rating: 4.7,
    reviewCount: 73,
    sustainability: 91,
    badge: null,
    trending: false,
    featured: false,
    description:
      "A cloud-soft knit throw woven from organic cotton. The perfect weight for cosy evenings and a beautiful layer for any sofa or bed.",
  },
  {
    slug: "linen-bedding-set",
    title: "Organic Linen Bedding Set",
    category: "Home",
    price: 12900,
    image: img(30761844),
    gallery: [img(30761844)],
    rating: 4.9,
    reviewCount: 87,
    sustainability: 96,
    badge: "New",
    trending: false,
    featured: false,
    description:
      "Stone-washed French linen duvet and pillow covers in warm beige. Breathable, naturally temperature-regulating, and softer after every wash.",
  },

  // ── Fashion ──
  {
    slug: "leather-tote-bag",
    title: "Leather Tote Bag",
    category: "Fashion",
    price: 8800,
    image: img(27127406),
    gallery: [img(27127406), img(27174572), img(27174571)],
    rating: 4.7,
    reviewCount: 98,
    sustainability: 74,
    badge: null,
    trending: true,
    featured: false,
    description:
      "Full-grain leather tote designed to age beautifully. Spacious, structured, and finished with hand-stitched detailing for everyday elegance.",
  },
  {
    slug: "cotton-shirt",
    title: "Organic Cotton Shirt",
    category: "Fashion",
    price: 5900,
    image: img(4295983),
    gallery: [img(4295983)],
    rating: 4.6,
    reviewCount: 88,
    sustainability: 90,
    badge: "Eco Friendly",
    trending: false,
    featured: false,
    description:
      "A breathable everyday shirt cut from GOTS-certified organic cotton. Soft, relaxed, and made to last through countless washes.",
  },
  {
    slug: "merino-wool-scarf",
    title: "Merino Wool Scarf",
    category: "Fashion",
    price: 4500,
    image: img(19087201),
    gallery: [img(19087201)],
    rating: 4.8,
    reviewCount: 56,
    sustainability: 82,
    badge: null,
    trending: false,
    featured: false,
    description:
      "Extra-fine merino wool, ultra-soft against the skin. A timeless neutral that layers effortlessly across every season.",
  },

  // ── Beauty ──
  {
    slug: "natural-skincare-set",
    title: "Natural Skincare Set",
    category: "Beauty",
    price: 4500,
    image: img(6634844),
    gallery: [img(6634844), img(3750640), img(18441533)],
    rating: 4.8,
    reviewCount: 121,
    sustainability: 94,
    badge: null,
    trending: false,
    featured: true,
    description:
      "A complete ritual of cleanser, serum, and moisturiser formulated with botanical actives. Cruelty-free, vegan, and kind to sensitive skin.",
  },
  {
    slug: "rose-quartz-roller",
    title: "Rose Quartz Face Roller",
    category: "Beauty",
    price: 2800,
    image: img(29877729),
    gallery: [img(29877729)],
    rating: 4.6,
    reviewCount: 94,
    sustainability: 78,
    badge: null,
    trending: false,
    featured: false,
    description:
      "Genuine rose quartz double-ended roller for gentle facial massage. Helps reduce puffiness and promotes natural glow when used with your favourite serum.",
  },

  // ── Electronics ──
  {
    slug: "wireless-headphones",
    title: "Wireless Headphones",
    category: "Electronics",
    price: 12900,
    image: img(3394650),
    gallery: [img(3394650), img(3394653), img(3394648)],
    rating: 4.8,
    reviewCount: 210,
    sustainability: 70,
    badge: "Bestseller",
    trending: true,
    featured: false,
    description:
      "Studio-grade wireless headphones with active noise cancellation, 40-hour battery life, and plush memory-foam ear cushions for all-day comfort.",
  },
  {
    slug: "smart-watch",
    title: "Smart Watch",
    category: "Electronics",
    price: 14900,
    image: img(12564670),
    gallery: [img(12564670)],
    rating: 4.8,
    reviewCount: 143,
    sustainability: 72,
    badge: null,
    trending: false,
    featured: false,
    description:
      "Track your day with elegance. Health sensors, always-on retina display, and a refined aluminium body in a slim, comfortable design.",
  },
  {
    slug: "portable-speaker",
    title: "Portable Bluetooth Speaker",
    category: "Electronics",
    price: 7900,
    image: img(29581125),
    gallery: [img(29581125)],
    rating: 4.7,
    reviewCount: 112,
    sustainability: 65,
    badge: "New",
    trending: true,
    featured: false,
    description:
      "360° immersive sound in a palm-sized design. IPX7 waterproof, 18-hour battery, and a premium aluminium finish that looks at home anywhere.",
  },

  // ── Accessories ──
  {
    slug: "classic-sunglasses",
    title: "Classic Sunglasses",
    category: "Accessories",
    price: 2500,
    image: img(32677231),
    gallery: [img(32677231)],
    rating: 4.5,
    reviewCount: 64,
    sustainability: 68,
    badge: null,
    trending: false,
    featured: false,
    description:
      "Timeless tortoiseshell frames with UV400 polarized lenses. Lightweight acetate build that feels barely there.",
  },

  // ── Wellness ──
  {
    slug: "aroma-diffuser",
    title: "Aroma Diffuser",
    category: "Wellness",
    price: 3900,
    image: img(17407135),
    gallery: [img(17407135), img(7020055), img(17596984)],
    rating: 4.6,
    reviewCount: 79,
    sustainability: 88,
    badge: null,
    trending: true,
    featured: true,
    description:
      "Fill your space with calm. This ultrasonic diffuser blends essential oils into a fine, quiet mist with an ambient warm-light glow.",
  },
  {
    slug: "scented-candle",
    title: "Hand-Poured Scented Candle",
    category: "Wellness",
    price: 2500,
    image: img(278664),
    gallery: [img(278664), img(9277080), img(30235391)],
    rating: 4.8,
    reviewCount: 156,
    sustainability: 86,
    badge: null,
    trending: false,
    featured: false,
    description:
      "Slow-burning soy wax candle with notes of cedar, amber, and vanilla. Hand-poured in small batches for a clean, even burn.",
  },
  {
    slug: "yoga-mat-premium",
    title: "Premium Yoga Mat",
    category: "Wellness",
    price: 5900,
    image: img(8436582),
    gallery: [img(8436582), img(8436580)],
    rating: 4.7,
    reviewCount: 68,
    sustainability: 84,
    badge: null,
    trending: false,
    featured: false,
    description:
      "Extra-thick, non-slip natural rubber mat with alignment guides. Eco-friendly, antimicrobial, and designed for every practice from yin to vinyasa.",
  },

  // ── Gifts ──
  {
    slug: "curated-gift-box",
    title: "Curated Gift Box",
    category: "Gifts",
    price: 5500,
    image: img(9277080),
    gallery: [img(9277080), img(278664)],
    rating: 4.9,
    reviewCount: 64,
    sustainability: 89,
    badge: "Bestseller",
    trending: false,
    featured: false,
    description:
      "A beautifully packaged set of our best-loved small goods — candle, skincare miniatures, and a keepsake card. Ready to gift, thoughtfully.",
  },
  {
    slug: "pour-over-coffee-set",
    title: "Pour-Over Coffee Set",
    category: "Gifts",
    price: 4200,
    image: img(33879021),
    gallery: [img(33879021), img(33879020)],
    rating: 4.8,
    reviewCount: 78,
    sustainability: 80,
    badge: null,
    trending: false,
    featured: false,
    description:
      "Ceramic dripper, borosilicate glass server, and a bamboo stand — everything for the perfect slow-brewed morning cup. A thoughtful gift for coffee lovers.",
  },

  // ── Eco Friendly ──
  {
    slug: "reusable-travel-mug",
    title: "Reusable Travel Mug",
    category: "Eco Friendly",
    price: 2800,
    image: img(4519473),
    gallery: [img(4519473)],
    rating: 4.7,
    reviewCount: 92,
    sustainability: 95,
    badge: "Eco Friendly",
    trending: false,
    featured: true,
    description:
      "Keep drinks hot for 12 hours and cold for 24. Double-walled stainless steel with a leak-proof lid — one bottle, endless single-use cups saved.",
  },
  {
    slug: "bamboo-toothbrush-pack",
    title: "Bamboo Toothbrush Pack",
    category: "Eco Friendly",
    price: 1200,
    image: img(8842706),
    gallery: [img(8842706), img(8103080)],
    rating: 4.5,
    reviewCount: 134,
    sustainability: 98,
    badge: "Eco Friendly",
    trending: false,
    featured: false,
    description:
      "Pack of 4 biodegradable bamboo toothbrushes with charcoal-infused bristles. A small switch with a big impact — plastic-free oral care.",
  },
];

const reviewTemplates = [
  ["Areeba K.", 5, "Absolutely beautiful — even better than the photos. The quality feels premium."],
  ["Daniel M.", 5, "Fast shipping and gorgeous packaging. Exactly what I hoped for."],
  ["Sofia R.", 4, "Really lovely piece. Would happily buy again as a gift."],
  ["James T.", 5, "Worth every penny. It has become an instant favourite at home."],
  ["Lina P.", 5, "The craftsmanship is incredible. You can tell it's made with care."],
  ["Marco S.", 4, "Great product, subtle design. Fits perfectly in my living space."],
  ["Priya N.", 5, "Bought this as a gift — the recipient was thrilled. Highly recommend."],
  ["Alex W.", 4, "Solid quality and arrived well-packaged. Very happy with this."],
];

async function main() {
  const pool = new Pool({
    connectionString:
      process.env.DATABASE_URL ||
      "postgresql://postgres:postgres@127.0.0.1:5432/app_db",
  });

  const { rows } = await pool.query("SELECT COUNT(*)::int AS count FROM products");
  if (rows[0].count > 0) {
    console.log(`Products already seeded (${rows[0].count}). Skipping.`);
    await pool.end();
    return;
  }

  for (const p of products) {
    const res = await pool.query(
      `INSERT INTO products
        (slug, title, category, price, image, gallery, rating, review_count, description, sustainability, badge, trending, featured)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
       RETURNING id`,
      [
        p.slug,
        p.title,
        p.category,
        p.price,
        p.image,
        p.gallery,
        p.rating,
        p.reviewCount,
        p.description,
        p.sustainability,
        p.badge,
        p.trending,
        p.featured,
      ],
    );
    const productId = res.rows[0].id;
    // add 3 reviews per product from rotating templates
    for (let i = 0; i < 3; i++) {
      const [author, rating, comment] =
        reviewTemplates[(productId + i) % reviewTemplates.length];
      await pool.query(
        `INSERT INTO reviews (product_id, author, rating, comment) VALUES ($1,$2,$3,$4)`,
        [productId, author, rating, comment],
      );
    }
  }

  console.log(`Seeded ${products.length} products with reviews.`);
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
