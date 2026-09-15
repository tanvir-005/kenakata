import { Container } from "@/components/ui/container";

export default function HomePage() {
  return (
    <section className="py-20">
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
            Welcome to KenaKata
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
            Everything you want.
            <br />
            In one place.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600 dark:text-neutral-400">
            Discover products, explore categories, and enjoy a
            modern shopping experience built with Next.js.
          </p>
        </div>
      </Container>
    </section>
  );
}