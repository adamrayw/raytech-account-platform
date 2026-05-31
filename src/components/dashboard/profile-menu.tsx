"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { authClient } from "@/lib/auth-client";

type ProfileMenuProps = {
  name: string;
  email: string;
};

export function ProfileMenu({ name, email }: ProfileMenuProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleSignOut = async () => {
    setIsLoading(true);

    const { error } = await authClient.signOut();

    setIsLoading(false);

    if (error) {
      return;
    }

    router.push("/login");
    router.refresh();
  };

  return (
    <details className="relative">
      <summary className="flex cursor-pointer list-none items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-left text-sm text-zinc-200 transition hover:bg-white/10">
        <span className="flex size-8 items-center justify-center rounded-full bg-cyan-400/20 text-xs font-semibold text-cyan-200">
          {initials}
        </span>
        <span className="hidden sm:block">
          <span className="block text-xs text-zinc-400">Signed in as</span>
          <span className="block max-w-40 truncate text-sm">{email}</span>
        </span>
      </summary>

      <div className="absolute right-0 z-20 mt-2 w-64 rounded-xl border border-white/10 bg-zinc-950/95 p-3 shadow-2xl shadow-black/40 backdrop-blur">
        <p className="text-sm font-medium text-zinc-100">{name}</p>
        <p className="mb-3 text-xs text-zinc-400">{email}</p>
        <button
          type="button"
          onClick={handleSignOut}
          disabled={isLoading}
          className="inline-flex w-full items-center justify-center rounded-lg border border-rose-400/30 bg-rose-400/10 px-3 py-2 text-sm text-rose-200 transition hover:bg-rose-400/20 disabled:opacity-60"
        >
          {isLoading ? "Signing out..." : "Sign out"}
        </button>
      </div>
    </details>
  );
}
