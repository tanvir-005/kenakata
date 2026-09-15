import { getProducts } from "@/lib/api/products";
import { Container } from "@/components/ui/container";
import { ProductGrid } from "@/components/product/product-grid";

export default async function HomePage() {
    const products = await getProducts({ limit: 8 });

    return (
        <main>
        <section className="py-20">
            <Container>
            <div className="max-w-3xl">
                <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">KenaKata</p>
                <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
                Everything you need and even things you don&apos;t need
                <br />
                in one place.
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600 dark:text-neutral-400">Discover products and enjoy a simple, modern shopping experience.</p>
            </div>
            </Container>
        </section>

        <section className="pb-20">
            <Container>
            <div className="flex items-end justify-between gap-4">
                <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                    Featured
                </p>

                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                    Featured products
                </h2>
                </div>
            </div>

            <div className="mt-10">
                <ProductGrid products={products} />
            </div>
            </Container>
        </section>
        </main>
    );
}

