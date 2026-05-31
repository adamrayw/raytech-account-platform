import Link from "next/link";
import { redirect } from "next/navigation";

import { RegisterForm } from "@/components/auth/register-form";
import { Card } from "@/components/ui/card";
import { getSessionOrNull } from "@/lib/session";

type RegisterPageProps = {
  searchParams: Promise<{ returnTo?: string }>;
};

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const session = await getSessionOrNull();

  if (session) {
    redirect("/dashboard");
  }

  const params = await searchParams;

  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 px-6 py-8 text-zinc-100 sm:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.22),transparent_42%),radial-gradient(circle_at_80%_0%,rgba(99,102,241,0.2),transparent_36%)]" />
      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-4xl items-center justify-center">
        <Card className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">RayTech Account</p>
            <h1 className="text-2xl font-semibold">Create your account</h1>
            <p className="text-sm text-zinc-400">One account for FlowNote, FlowPaste, and future RayTech products.</p>
          </div>

          <RegisterForm returnTo={params.returnTo} />

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
