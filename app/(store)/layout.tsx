import type { ReactNode } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer"

interface StoreLayoutProps {
  children: ReactNode;
}

export default function StoreLayout({
  children,
}: StoreLayoutProps) {
  return (
    <>
      <Header />

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </>
  );
}