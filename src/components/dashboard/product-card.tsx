import Link from "next/link";

import { Card } from "@/components/ui/card";

type ProductCardProps = {
  icon: string;
  title: string;
  description: string;
  status: "Live" | "Coming Soon";
  href?: string;
};

export function ProductCard({ icon, title, description, status, href }: ProductCardProps) {
  return (
    <Card className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="text-2xl" aria-hidden="true">
          {icon}
        </div>
        <span
          className={
            status === "Live"
              ? "rounded-full bg-emerald-400/15 px-2 py-1 text-xs text-emerald-300"
              : "rounded-full bg-amber-400/15 px-2 py-1 text-xs text-amber-300"
          }
        >
          {status}
        </span>
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-zinc-100">{title}</h3>
        <p className="text-sm text-zinc-400">{description}</p>
      </div>

      {href ? (
        <Link
          href={href}
          className="mt-auto inline-flex h-10 items-center justify-center rounded-lg border border-cyan-300/30 bg-cyan-300/10 px-3 text-sm font-medium text-cyan-200 transition hover:bg-cyan-300/20"
        >
          Open Product
        </Link>
      ) : (
        <button
          type="button"
          disabled
          className="mt-auto inline-flex h-10 items-center justify-center rounded-lg border border-white/10 px-3 text-sm font-medium text-zinc-500"
        >
          Coming Soon
        </button>
      )}
    </Card>
  );
}
