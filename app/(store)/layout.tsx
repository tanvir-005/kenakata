import type { ReactNode } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartProvider } from "@/context/cart-context";
import { ReviewProvider } from "@/context/review-context";
import { WishlistProvider } from "@/context/wishlist-context";

interface StoreLayoutProps {
  children: ReactNode;
}

export default function StoreLayout({
  children,
}: StoreLayoutProps) {
  return (
    <CartProvider>
      <ReviewProvider>
        <WishlistProvider>
          <Header />
            {children}
          <Footer />
        </WishlistProvider>
      </ReviewProvider>
    </CartProvider>
  );
}