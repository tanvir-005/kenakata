import Link from "next/link";
import { Search, ShoppingBag, User } from "lucide-react";
import { Container } from "@/components/ui/container";
import { MobileNavigation } from "./mobile-navigation";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { CartBadge } from "@/components/cart/cart-badge";
import { AuthActions } from "@/components/auth/auth-actions";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/90 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/90">
      <Container>
        <div className="relative flex h-16 items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <MobileNavigation />

            <Link
              href="/"
              className="text-xl font-bold tracking-tight"
            >
              KenaKata
            </Link>

            <nav
              aria-label="Main navigation"
              className="hidden items-center gap-8 md:flex"
            >
              <Link
                href="/products"
                className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
              >
                Shop
              </Link>

              <Link
                href="/categories"
                className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
              >
                Categories
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-1">
            <Link
              href="/products"
              aria-label="Search products"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
            >
              <Search className="h-4 w-4" />
            </Link>

            <ThemeToggle />
            <AuthActions />

            <CartBadge />
          </div>
        </div>
      </Container>
    </header>
  );
}