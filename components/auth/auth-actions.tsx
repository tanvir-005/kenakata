"use client";

import Link from "next/link";
import { LogOut, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

export function AuthActions() {
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="h-9 w-20 animate-pulse rounded-full bg-neutral-100 dark:bg-neutral-900" />
    );
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="inline-flex h-9 items-center rounded-full px-4 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
      >
        Login
      </Link>
    );
  }

  const handleLogout = async () => {
    await logout();
    router.push("/");
    router.refresh();
  };

  return (
    <div className="flex items-center gap-2">
      <div className="hidden items-center gap-2 text-sm sm:flex">
        <UserRound className="h-4 w-4 text-neutral-500" />
        <span className="max-w-28 truncate">
          {user.name}
        </span>
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
      >
        <LogOut className="h-4 w-4" />
        <span>Logout</span>
      </button>
    </div>
  );
}