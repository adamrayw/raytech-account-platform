import * as React from "react";

import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, type = "text", ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        "h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-[#8B5CF6]/50 focus:ring-2 focus:ring-[#8B5CF6]/20",
        className,
      )}
      {...props}
    />
  );
}

