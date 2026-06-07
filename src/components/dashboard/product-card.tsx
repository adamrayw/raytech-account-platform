import Link from "next/link";
import Image from "next/image";

import { Card } from "@/components/ui/card";

type ProductCardProps = {
  icon: string;
  iconSrc?: string;
  title: string;
  description: string;
  status: "Live";
  href: string;
};

export function ProductCard({ icon, iconSrc, title, description, status, href }: ProductCardProps) {
  return (
    <Card className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        {iconSrc ? (
          <Image src={iconSrc} alt={`${title} logo`} width={32} height={32} className="size-8 rounded-lg object-cover" />
        ) : (
          <div className="text-2xl" aria-hidden="true">
            {icon}
          </div>
        )}
        <span
          className="rounded-full bg-[#8B5CF6]/15 px-2 py-1 text-xs text-[#A855F7]"
        >
          {status}
        </span>
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-zinc-100">{title}</h3>
        <p className="text-sm text-zinc-400">{description}</p>
      </div>

      <Link
        href={href}
        className="mt-auto inline-flex h-10 items-center justify-center rounded-lg border border-[#A855F7]/30 bg-[#8B5CF6]/10 px-3 text-sm font-medium text-[#A855F7] transition hover:bg-[#A855F7]/20"
      >
        Open Product
      </Link>
    </Card>
  );
}


