# KenaKata

[<img src="./public/images/banner.png" alt="Banner">](https://kenakata-gules.vercel.app/)

KenaKata storefront is built with React + Next.js App Router and Platzi Fake APIs are used for data.

## Overview

- Home page with hero section, featured products and featured categories
- Products page with all products and search, filter and sorting option
- Product search requires hitting enter to search
- Products and Categories are fetched from the Fake APIs.
- Missing images are handled with 'image unavailable' placeholder.
- Suspenses are used while fetching data
- Wishlist option added to store products in local storage
- Add to Cart (using local storage) option facilitates storing data even when user is not logged in
- Checkout page is protected by middleware (proxy) to force user log in
- Add to cart and buy now button is implemented so that 'Buy now' adds that item to cart, deselect all other cart items, and shows cart where Cart visit selects all items in the cart for checkout
- Payment integration is not added (handled by facilitating COD)

## Architecture

The codebase is organized as follows:

- app/ contains the views with routing\
- parentheses (for example, (store)) is used to ommit from routing\
- Square / box brackets (for example, [id]) is used to facilitate slug\
- contents inside app/ are divided as layout, page, loading, and error\
- components/ contains reusable UI components and blocks\
- context/ stores client-side state for components\
- lib/ mainly contains API clients, and some validation helpers\
- reducers/ the logic to change cart and wishlist are contained inside this folder\
- types/ TS types are defined here\
- scripts/ contains some Bash scripts to run in terminal to test the project\
- public/images/ contains logo and hero section banner\
- next.config.ts has the logic to allow all image URL from any HTTP or HTTPS\

## Tradeoffs:

- Entire wishlist and cart is stored in local storage resulting same account from different browser experiencing different cart items and to maintain cart mixup of different accounts carts are cleared on logout.
- Order history is removed on logout as we will not store the order details for every user in the local storage forever

## Rendering Strategy Decisions

- Server components are used for page-level data fetching where possible.
- Client components are used for interactive experiences like cart updates, filtering, forms, theme toggling, and auth state management.
- Route groups are used to structure sections without affecting the final URL structure.
- Loading and error boundaries help create a cleaner experience when fetching data or handling failures.

This approach reduces unnecessary client-side hydration and keeps the UI responsive without overloading the browser. Interactive features are only marked as client-side where needed, which helps keep bundle size and runtime complexity under control.

The project also uses optimized images and graceful fallbacks for missing or invalid product images. That improves perceived quality and avoids broken UI states when external images fail to load.

## Challenges Faced

- Poor public API response
- suspenses and promises
- UI consistency throughout the project
- Handling data using local storage instead of database

## Future Improvements

- Admin Dashboard
- More features 
- Payment Integration
- Backend server

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

If you run the above commands correctly you should be able to see the website at: [http://localhost:3000](http://localhost:3000)

or you can see the live from here at: [https://kenakata-gules.vercel.app/](https://kenakata-gules.vercel.app/)