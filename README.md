# LaptopHub

## Overview
LaptopHub is a Next.js storefront for browsing laptops, viewing product details, and interacting with product listings. The frontend is located in `laptophub-frontend/` and is built with Next.js `16.2.2` and React.

## What was developed
- Fixed the homepage product listing to use actual laptop data from `lib/laptops.ts` instead of placeholder mock items.
- Resolved the product detail routing so clicking a product navigates to `/laptops/[productId]` and displays the correct sample product details.
- Fixed hydration issues caused by nested link/anchor markup in `components/ProductCard.tsx`.
- Implemented a dynamic product details page in `app/laptops/[productId]/page.tsx` with sample images, specs, features, reviews, and add-to-cart behavior.
- Ensured the frontend build passes successfully with `npm run build`.

## Project structure
- `laptophub-frontend/` - Next.js app directory.
  - `app/` - application route pages and layout.
  - `components/` - shared UI components, including `ProductCard` and `ProductShowcase`.
  - `lib/` - laptop product data and helpers (`laptops.ts`).
  - `store/` - cart store logic.
  - `types/` - shared TypeScript types.

## Key files changed
- `laptophub-frontend/app/page.tsx`
- `laptophub-frontend/components/ProductCard.tsx`
- `laptophub-frontend/components/ProductShowcase.tsx`
- `laptophub-frontend/app/laptops/[productId]/page.tsx`
- `laptophub-frontend/lib/laptops.ts`

## Run locally
```bash
cd laptophub-frontend
npm install
npm run dev
```
Open `http://localhost:3000`.

### Production build
```bash
cd laptophub-frontend
npm run build
```

## Notes
- Product detail pages are currently powered by sample laptop product data in `lib/laptops.ts`.
- The dynamic route uses `productId` from `/laptops/[productId]` to render the correct product.
- The README will be updated with every new development task going forward.
