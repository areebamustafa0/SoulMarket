# Contributing to SoulMarket

Thanks for your interest in contributing! SoulMarket is designed to stay minimal and premium — quality over quantity.

## Getting started

1. **Fork** the repository on GitHub.
2. **Clone** your fork:
   ```bash
   git clone https://github.com/<your-username>/soulmarket.git
   cd soulmarket
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Set up the database** — create a PostgreSQL database and copy the env template:
   ```bash
   cp .env.example .env
   # edit DATABASE_URL in .env
   npx drizzle-kit push
   node scripts/seed.mjs
   ```
5. **Run the dev server**:
   ```bash
   npm run dev
   ```

## Making changes

- Keep the design system intact. Colours live in `src/app/globals.css` as CSS variables — do not hardcode hex values in components.
- Use the existing icon set in `src/components/icons.tsx` before adding new ones.
- Follow the existing file structure (`app/` for routes, `components/` for UI, `lib/` for utilities and queries).
- Write readable, accessible markup. Test keyboard navigation on any interactive component you touch.

## Before submitting a PR

Run the full validation sequence:

```bash
npx next typegen
npm exec tsc -- --noEmit
npm run build
```

All three must pass cleanly.

## Code style

- TypeScript with strict mode.
- Tailwind utility classes, no inline styles unless necessary (gradients, dynamic widths).
- Semantic HTML. Use `<Link>` from `next/link` for internal navigation.
- Keep components focused — if a file grows past ~200 lines, consider splitting.

## Reporting bugs

Open an issue with:

- A clear description of what you expected vs. what happened.
- Steps to reproduce.
- Browser and OS information.
- Screenshots if relevant.

## Design philosophy

SoulMarket follows Apple/Stripe/Linear design principles:

- **Minimal** — every element earns its place.
- **Premium** — generous whitespace, strong typography, subtle shadows.
- **Calm** — avoid visual clutter and over-animation.
- **Accessible** — keyboard-friendly, sufficient contrast, meaningful alt text.

If your change makes the product feel heavier or noisier, it probably doesn't belong.

Thank you for contributing ✨
