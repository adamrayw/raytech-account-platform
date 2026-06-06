import Link from "next/link";
import { redirect } from "next/navigation";

import { RayTechAccountLogo } from "@/components/brand/raytech-account-logo";
import { LoginForm } from "@/components/auth/login-form";
import { Card } from "@/components/ui/card";
import { getSessionOrNull } from "@/lib/session";

type LoginPageProps = {
  searchParams: Promise<{ returnTo?: string }>;
};

function isSafeReturnTo(returnTo?: string) {
  if (!returnTo) {
    return false;
  }

  try {
    const target = new URL(returnTo);
    if (target.protocol !== "https:" && target.protocol !== "http:") {
      return false;
    }

    if (target.hostname === "localhost" || target.hostname === "127.0.0.1") {
      return true;
    }

    return target.hostname.endsWith(".raytech.cloud");
  } catch {
    return false;
  }
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const safeReturnTo = isSafeReturnTo(params.returnTo) ? params.returnTo : undefined;
  const session = await getSessionOrNull();

  if (session) {
    redirect(safeReturnTo ?? "/dashboard");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 px-6 py-8 text-zinc-100 sm:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.26),transparent_42%),radial-gradient(circle_at_80%_0%,rgba(168,85,247,0.22),transparent_36%)]" />
      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-4xl items-center justify-center">
        <Card className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <RayTechAccountLogo className="mx-auto h-14 w-auto" priority />
            <h1 className="text-2xl font-semibold">Welcome back</h1>
            <p className="text-sm text-zinc-400">Sign in once to access every RayTech product.</p>
          </div>

          <LoginForm returnTo={safeReturnTo} />

          <div className="text-center text-xs text-zinc-500">
            <Link className="hover:text-zinc-300" href="/">
              Back to home
            </Link>
          </div>
        </Card>
      </div>
    </main>
  );
}

