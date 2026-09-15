import Link from "next/link";
import { Container } from "@/components/ui/container";

const footerLinks = [
  { href: "/products", label: "Shop" },
  { href: "/categories", label: "Categories" },
  { href: "/login", label: "Account" },
];

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950">
      <Container>
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight"
            >
              KenaKata
            </Link>

            <p className="mt-3 max-w-sm text-sm leading-6 text-neutral-500">
              A modern shopping experience built for discovering
              products you love.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold">Explore</h2>

            <nav className="mt-4 flex flex-col gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="w-fit text-sm text-neutral-500 transition-colors hover:text-neutral-950 dark:hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-semibold">KenaKata</h2>

            <p className="mt-4 text-sm leading-6 text-neutral-500">
              Quality products. Simple shopping. Thoughtful
              experience.
            </p>
          </div>
        </div>

        <div className="border-t border-neutral-200 py-5 text-sm text-neutral-500 dark:border-neutral-800">
          © {new Date().getFullYear()} KenaKata. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}