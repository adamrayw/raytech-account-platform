import { headers } from "next/headers";

import { ProductCard } from "@/components/dashboard/product-card";
import { ProfileMenu } from "@/components/dashboard/profile-menu";
import { Card } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { getProductUrl } from "@/lib/sso";
import { requireSession } from "@/lib/session";

function formatUserAgent(agent: string | null | undefined) {
  if (!agent) {
    return "Unknown device";
  }

  const compact = agent.replace(/\s+/g, " ").trim();
  return compact.length > 60 ? `${compact.slice(0, 57)}...` : compact;
}

export default async function DashboardPage() {
  const session = await requireSession("/login");

  const deviceSessions = await auth.api.listSessions({
    headers: await headers(),
  });

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-8 text-zinc-100 sm:px-8">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <header className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-gradient-to-r from-white/10 to-white/[0.02] p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">RayTech Account</p>
            <h1 className="mt-1 text-2xl font-semibold">Welcome back, {session.user.name}</h1>
            <p className="mt-1 text-sm text-zinc-400">Your account is active across the RayTech ecosystem.</p>
          </div>
          <ProfileMenu name={session.user.name} email={session.user.email} />
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Products</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ProductCard
              icon="📝"
              title="FlowNote"
              description="AI-powered notes for focused work."
              status="Live"
              href={getProductUrl("flownote")}
            />
            <ProductCard
              icon="📄"
              title="FlowPaste"
              description="Share code and text with secure links."
              status="Live"
              href={getProductUrl("flowpaste")}
            />
            <ProductCard
              icon="📋"
              title="FlowTask"
              description="Plan tasks and projects with your team."
              status="Coming Soon"
            />
            <ProductCard
              icon="👤"
              title="FlowCV"
              description="Build professional resumes and portfolios."
              status="Coming Soon"
            />
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <Card className="space-y-3">
            <h3 className="text-lg font-semibold">Profile</h3>
            <div className="space-y-2 text-sm text-zinc-300">
              <p>
                <span className="text-zinc-400">Name:</span> {session.user.name}
              </p>
              <p>
                <span className="text-zinc-400">Email:</span> {session.user.email}
              </p>
              <p>
                <span className="text-zinc-400">User ID:</span> {session.user.id}
              </p>
              <p>
                <span className="text-zinc-400">Joined:</span>{" "}
                {new Date(session.user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </Card>

          <Card className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Active Sessions</h3>
              <span className="rounded-full bg-cyan-400/15 px-2 py-1 text-xs text-cyan-200">
                {deviceSessions.length} device{deviceSessions.length === 1 ? "" : "s"}
              </span>
            </div>

            <ul className="space-y-2">
              {deviceSessions.slice(0, 4).map((device) => (
                <li key={device.id} className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm">
                  <p className="font-medium text-zinc-200">{formatUserAgent(device.userAgent)}</p>
                  <p className="text-xs text-zinc-400">
                    {device.ipAddress ?? "Unknown IP"} · Expires {new Date(device.expiresAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          </Card>
        </section>
      </div>
    </main>
  );
}
