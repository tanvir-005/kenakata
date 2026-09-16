# KenaKata

KenaKata is a modern storefront built with Next.js App Router and the Platzi Fake API. It showcases a real-world e-commerce flow with product browsing, filtering, cart management, protected checkout, and session-aware authentication.

## Project overview

The app is designed as a production-style storefront with a clean shopping flow:

- Home page with hero messaging, featured products, and category highlights
- Product listing page with search, sorting, filters, pagination, and empty/error states
- Product detail page with gallery and related items
- Cart experience with persistent local state and quantity controls
- Checkout flow protected by authentication and form validation
- Auth flow for login, registration, session refresh, and logout
- Responsive UI with dark mode support

## Architecture

The codebase is organized around a clear separation of responsibilities:

- app/ contains route-level pages and route groups for public and authenticated views
- components/ contains reusable storefront UI and form blocks
- context/ stores client-side state for auth and cart
- lib/ contains API clients and validation helpers
- reducers/ keeps cart transitions predictable and testable
- types/ centralizes shared TypeScript contracts

## Rendering strategy decisions

This project uses a hybrid server/client model that matches the assignment goals:

- Server components fetch products, categories, and session-protected data from the API
- Client components manage interactive behaviors such as filters, cart actions, and checkout form state
- Dynamic routes such as /product/[id] and protected route checks are handled with Next.js App Router patterns
- Loading and error boundaries are used on the products catalogue to provide graceful UX during failures

This balances performance and maintainability while keeping the storefront fast and responsive.

## Tradeoffs made

- Client-side cart persistence is implemented with localStorage to keep the experience smooth without server infrastructure
- Authentication is cookie-based and session-aware, which keeps the app lightweight and aligned with Next.js App Router patterns
- Product filtering is handled with URL search params so state is shareable and user-friendly for refreshes/bookmarks
- The checkout flow is intentionally mocked to demonstrate a secure UX without requiring a real payment provider

## Performance considerations

- Product and category data is loaded only as needed for each route
- Image rendering uses the framework’s image optimization patterns where appropriate
- Lists are limited and paginated to avoid large payloads from the API
- The cart and auth providers update only the necessary state rather than re-rendering the full app tree

## Challenges faced

- Matching server-side and client-side auth state across route transitions
- Supporting a real e-commerce workflow without introducing a backend service
- Keeping the UI responsive while working with remote product data and route-based filters
- Designing a simple but production-like architecture around a public fake API

## Future improvements

- Add a real admin dashboard for product/category CRUD
- Add unit or integration tests with Vitest or Playwright
- Add wishlist and product review features
- Implement a real payment integration and inventory checks
- Add caching and revalidation strategies for production deployment

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Copy the sample environment file and configure your settings:

```bash
cp .env.example .env.local
```

3. Start the app in development mode:

```bash
npm run dev
```

4. Open the app in your browser:

```bash
http://localhost:3000
```

## Environment variables

Create a .env.local file with values similar to the following:

```bash
NEXT_PUBLIC_API_URL=https://api.escuelajs.co/api/v1
TEST_BASE_URL=http://localhost:3000
TEST_EMAIL=
TEST_PASSWORD=
```

Notes:

- NEXT_PUBLIC_API_URL is the base URL for the storefront data API
- TEST_BASE_URL is used by the project smoke test script
- TEST_EMAIL and TEST_PASSWORD are used when running the shell-based auth checks

## Available scripts

```bash
npm run dev
npm run build
npm run lint
bash scripts/test.sh
```

## Deployment

This app is suitable for deployment on Vercel or any Node-compatible hosting provider. After deployment, set the same environment variables in the host dashboard and ensure your public domain points at the app.

## Submission notes

The project is structured to meet the capstone brief requirements for a modern storefront, including routed pages, authentication, cart state, validation, and a polished UI across mobile and desktop layouts.