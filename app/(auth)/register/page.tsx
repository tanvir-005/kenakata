"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Container } from "@/components/ui/container";
import { useAuth } from "@/context/auth-context";

export default function RegisterPage() {
  const router = useRouter();
  const { refreshSession } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data: { message?: string } = await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Unable to create your account. Please try again.",
        );
        return;
      }

      await refreshSession();

      router.push("/");
      router.refresh();
    } catch {
      setError(
        "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-md">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
              Get started
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight">
              Create your KenaKata account
            </h1>

            <p className="mt-3 text-sm leading-6 text-neutral-500">
              Create an account to start shopping.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-5 rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800 sm:p-8"
          >
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium"
              >
                Full name
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                autoComplete="name"
                required
                minLength={2}
                placeholder="Your name"
                className="w-full rounded-xl border border-neutral-200 bg-transparent px-4 py-3 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-950 dark:border-neutral-800 dark:focus:border-white"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                autoComplete="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-neutral-200 bg-transparent px-4 py-3 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-950 dark:border-neutral-800 dark:focus:border-white"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                autoComplete="new-password"
                required
                minLength={6}
                placeholder="Create a password"
                className="w-full rounded-xl border border-neutral-200 bg-transparent px-4 py-3 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-950 dark:border-neutral-800 dark:focus:border-white"
              />
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-400"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-neutral-950 px-6 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
            >
              {isSubmitting
                ? "Creating account..."
                : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-neutral-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-neutral-950 hover:underline dark:text-white"
            >
              Sign in
            </Link>
          </p>
        </div>
      </Container>
    </main>
  );
}