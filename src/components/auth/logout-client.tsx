"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { RayTechAccountLogo } from "@/components/brand/raytech-account-logo";
import { authClient } from "@/lib/auth-client";

type LogoutClientProps = {
  returnTo?: string;
};

export function LogoutClient({ returnTo }: LogoutClientProps) {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const run = async () => {
      try {
        const response = await authClient.signOut();
        if (response.error && active) {
          setError(response.error.message || "Unable to sign out cleanly.");
        }
      } catch {
        if (active) {
          setError("Unable to sign out cleanly.");
        }
      } finally {
        window.location.replace(returnTo ?? "/login");
      }
    };

    void run();

    return () => {
      active = false;
    };
  }, [returnTo]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 px-6 py-8 text-zinc-100 sm:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.26),transparent_42%),radial-gradient(circle_at_80%_0%,rgba(168,85,247,0.22),transparent_36%)]" />
      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-4xl items-center justify-center">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 text-center shadow-xl backdrop-blur">
          <RayTechAccountLogo className="mx-auto h-14 w-auto" priority />
          <h1 className="mt-3 text-xl font-semibold">Signing you out...</h1>
          <p className="mt-2 text-sm text-zinc-400">Please wait.</p>
          {error ? <p className="mt-4 text-xs text-rose-300">{error}</p> : null}
          <p className="mt-4 text-xs text-zinc-500">
            If this takes too long,{" "}
            <Link className="text-[#A855F7] hover:text-[#A855F7]" href={returnTo ?? "/login"}>
              continue
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}


