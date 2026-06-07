import Link from "next/link";
import Image from "next/image";

import { RayTechAccountLogo } from "@/components/brand/raytech-account-logo";
import { Card } from "@/components/ui/card";

const features = [
  "One account for all RayTech products",
  "Secure session and device tracking",
  "Ready for OAuth, teams, and billing expansion",
];

const connectedProducts = [
  { name: "FlowNote", iconSrc: "/products/flownote-logo.png" },
  { name: "FlowPaste", iconSrc: "/products/flowpaste-logo.png" },
  { name: "FlowSummary", iconSrc: "/products/flowsummary-logo.png" },
  { name: "FlowSign", iconSrc: "/products/flowsign-logo.png" },
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.26),transparent_42%),radial-gradient(circle_at_80%_0%,rgba(168,85,247,0.22),transparent_36%)]" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8 sm:px-8">
        <header className="flex items-center justify-between">
          <RayTechAccountLogo className="h-14 w-auto" priority />
          <div className="flex items-center gap-3">
            <Link href="/login" className="rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-white/5">
              Sign in
            </Link>
            <Link
              href="/register"
              className="rounded-lg border border-[#A855F7]/30 bg-[#8B5CF6]/10 px-3 py-2 text-sm font-medium text-[#F5F3FF] hover:bg-[#A855F7]/20"
            >
              Create account
            </Link>
          </div>
        </header>

        <section className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">Single Sign-On Platform</p>
            <h2 className="max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl">
              One RayTech account. Every product unlocked.
            </h2>
            <p className="max-w-xl text-lg text-zinc-300/90">
              RayTech Account powers secure authentication across FlowNote, FlowPaste, FlowSummary, FlowSign, and every product in the ecosystem.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/register"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-[#8B5CF6] px-5 text-sm font-medium text-white hover:bg-[#A855F7]"
              >
                Start with RayTech Account
              </Link>
              <Link
                href="/login"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-white/15 px-5 text-sm font-medium text-zinc-200 hover:bg-white/5"
              >
                I already have an account
              </Link>
            </div>
          </div>

          <Card className="space-y-4">
            <h3 className="text-lg font-semibold">Connected products</h3>
            <div className="grid grid-cols-2 gap-3">
              {connectedProducts.map((product) => (
                <div key={product.name} className="rounded-xl border border-[#A855F7]/30 bg-[#8B5CF6]/10 p-3">
                  <Image
                    src={product.iconSrc}
                    alt={`${product.name} logo`}
                    width={40}
                    height={40}
                    className="mb-3 size-10 rounded-xl object-cover"
                  />
                  <p className="font-medium">{product.name}</p>
                  <p className="text-xs text-[#A855F7]">Live</p>
                </div>
              ))}
            </div>
            <ul className="space-y-2 pt-2 text-sm text-zinc-300">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[#A855F7]" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </Card>
        </section>
      </div>
    </main>
  );
}

