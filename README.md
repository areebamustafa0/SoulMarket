<p align="center">
  <img src="public/og-image.png" alt="SoulMarket — Smart Shopping. Beautifully Simple." width="100%" />
</p>

<p align="center">
  <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js 16" /></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript" alt="TypeScript" /></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" /></a>
  <a href="https://orm.drizzle.team"><img src="https://img.shields.io/badge/Drizzle_ORM-0.45-3b82f6" alt="Drizzle ORM" /></a>
  <a href="https://www.postgresql.org"><img src="https://img.shields.io/badge/PostgreSQL-14+-4169E1?logo=postgresql&logoColor=white" alt="PostgreSQL" /></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/License-MIT-A47148" alt="MIT License" /></a>
</p>

<h3 align="center">Smart Shopping. Beautifully Simple.</h3>

<p align="center">
  A premium AI-powered e-commerce platform — designed like a funded startup,<br />
  built like a portfolio piece, shippable like production code.
</p>

---

## ✨ Highlights

- 🛍️ **19 curated products** across 8 categories with real editorial photography
- 🤖 **AI Shopping Curator** — understands budgets, ranges, occasions, and moods
- 🎨 **Premium design system** in a warm cognac & champagne palette (Playfair + Inter)
- 🛒 **Slide-over cart** with toast notifications and free-shipping progress
- 🧾 **3-step checkout** with order persistence to PostgreSQL
- ⭐ **Live reviews** that recompute product ratings on the fly
- 📊 **Admin dashboard** with revenue, orders, and SVG charts
- 👤 **User dashboard** with orders, wishlist, AI picks, and account settings
- 📱 **Fully responsive** — desktop-first, mobile-friendly, accessible
- 🌿 **Sustainability scores** on every product

## 🛠 Tech Stack

| Layer        | Technology                                                    |
| ------------ | ------------------------------------------------------------- |
| Framework    | [Next.js 16](https://nextjs.org) (App Router, Turbopack)      |
| Language     | [TypeScript](https://typescriptlang.org) (strict)             |
| Styling      | [Tailwind CSS 4](https://tailwindcss.com)                     |
| Fonts        | [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) + [Inter](https://fonts.google.com/specimen/Inter) |
| Database     | [PostgreSQL](https://www.postgresql.org)                      |
| ORM          | [Drizzle ORM](https://orm.drizzle.team)                       |
| Images       | [Pexels](https://www.pexels.com) stock photography            |

## 🚀 Quick Start

### Prerequisites

- Node.js **18+**
- PostgreSQL **14+**
- npm (comes with Node)

### 1. Clone & install

```bash
git clone https://github.com/<your-username>/soulmarket.git
cd soulmarket
npm install
```

### 2. Set up the database

```bash
# Create the database
createdb soulmarket

# Copy and edit the env template
cp .env.example .env
# Set DATABASE_URL=postgresql://user:pass@localhost:5432/soulmarket

# Push the schema and seed sample data
npx drizzle-kit push
node scripts/seed.mjs
```

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you're shopping. 🎉

### 4. Build for production

```bash
npm run build
npm start
```

## 📂 Project Structure

```
soulmarket/
├── public/                       # Static assets (OG image)
├── scripts/
│   └── seed.mjs                  # Database seeding script
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── page.tsx              # Home
│   │   ├── shop/page.tsx         # Shop with filters
│   │   ├── product/[slug]/       # Product detail
│   │   ├── assistant/page.tsx    # AI Shopping Curator
│   │   ├── cart/page.tsx         # Cart
│   │   ├── checkout/page.tsx     # 3-step checkout
│   │   ├── dashboard/page.tsx    # User dashboard
│   │   ├── admin/page.tsx        # Admin dashboard
│   │   ├── not-found.tsx         # Branded 404
│   │   ├── layout.tsx            # Root layout + metadata
│   │   ├── icon.tsx              # SVG favicon
│   │   └── api/                  # API routes
│   │       ├── assistant/        # AI recommendation engine
│   │       ├── orders/           # Create + list orders
│   │       ├── reviews/          # Submit reviews
│   │       └── health/           # Health check
│   ├── components/               # Reusable UI
│   ├── db/                       # Drizzle schema + client
│   └── lib/                      # Queries + formatting
├── .env.example
├── .gitignore
├── LICENSE
├── README.md
└── CONTRIBUTING.md
```

## 🎨 Design System

| Token          | Value     | Usage                            |
| -------------- | --------- | -------------------------------- |
| Primary        | `#A47148` | Brand actions, buttons, accents  |
| Primary Dark   | `#825A38` | Hover / pressed states           |
| Accent         | `#C9A86A` | Champagne gold highlights        |
| Background     | `#FAFAFA` | Page background                  |
| Surface        | `#FFFFFF` | Cards, inputs, panels            |
| Text (ink)     | `#111827` | Primary copy                     |
| Muted          | `#6B7280` | Secondary copy                   |
| Success        | `#22C55E` | Positive states, sustainability  |
| Headings       | Playfair Display                 |
| Body           | Inter                            |

All tokens live in `src/app/globals.css` as CSS variables and drive the entire UI — one edit rebrands the app.

## ☁️ Deploy

### Frontend — Vercel (recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/<your-username>/soulmarket&env=DATABASE_URL&envDescription=PostgreSQL%20connection%20string)

1. Push this repo to GitHub.
2. Import it in [Vercel](https://vercel.com/new).
3. Add the `DATABASE_URL` environment variable.
4. In **Build Command** use: `npx drizzle-kit push && node scripts/seed.mjs && next build` (first deploy only — revert to `next build` afterwards).

### Database — Railway / Neon / Supabase

Any managed PostgreSQL works. Set `DATABASE_URL` to the connection string and you're done.

## 📜 Scripts

| Command                | Purpose                              |
| ---------------------- | ------------------------------------ |
| `npm run dev`          | Start the dev server                 |
| `npm run build`        | Create a production build            |
| `npm start`            | Start the production server          |
| `npm run lint`         | Run ESLint                           |
| `npm run typecheck`    | Run TypeScript type checking         |
| `npx drizzle-kit push` | Push schema changes to the database  |
| `node scripts/seed.mjs`| Seed sample products + reviews       |

## 🤝 Contributing

Contributions are welcome — please read [CONTRIBUTING.md](./CONTRIBUTING.md) first. The short version: keep it minimal, keep it premium.

## 📄 License

Released under the [MIT License](./LICENSE). Free to use, modify, and learn from.

---

<p align="center">
  Designed &amp; built with care ✨
</p>
