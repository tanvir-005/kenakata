import { Suspense } from "react";
import LoginForm from "./login-form";

function LoginLoading() {
  return (
    <main className="py-16 sm:py-24">
      <div className="mx-auto max-w-md px-4">
        <div className="h-96 animate-pulse rounded-2xl bg-neutral-100 dark:bg-neutral-900" />
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginForm />
    </Suspense>
  );
}