import type { ReactNode } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartProvider } from "@/context/cart-context";
import { AuthProvider } from "@/context/auth-context";

interface StoreLayoutProps {
  children: ReactNode;
}

export default function StoreLayout({
  children,
}: StoreLayoutProps) {
  return (
    <CartProvider>
        <AuthProvider>
            <Header />

            <main className="flex-1">
                {children}
            </main>

            <Footer />
        </AuthProvider>
        </CartProvider>
  );
}