"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const loginSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean(),
});

type LoginValues = z.infer<typeof loginSchema>;

type LoginFormProps = {
  returnTo?: string;
};

export function LoginForm({ returnTo }: LoginFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = form.handleSubmit(async (values) => {
    setServerError(null);

    let error: { message?: string } | null = null;

    try {
      const response = await authClient.signIn.email({
        email: values.email,
        password: values.password,
        rememberMe: values.rememberMe,
        callbackURL: returnTo ?? "/dashboard",
      });
      error = response.error;
    } catch {
      setServerError("Network error. Please check your connection and try again.");
      return;
    }

    if (error) {
      setServerError(error.message || "Unable to sign in. Please try again.");
      return;
    }

    const target = returnTo ?? "/dashboard";
    if (/^https?:\/\//i.test(target)) {
      window.location.assign(target);
      return;
    }

    router.push(target);
    router.refresh();
  });

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm text-zinc-300">
          Email
        </label>
        <Input id="email" type="email" autoComplete="email" {...form.register("email")} />
        {form.formState.errors.email ? (
          <p className="text-xs text-rose-300">{form.formState.errors.email.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm text-zinc-300">
          Password
        </label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          {...form.register("password")}
        />
        {form.formState.errors.password ? (
          <p className="text-xs text-rose-300">{form.formState.errors.password.message}</p>
        ) : null}
      </div>

      <label className="flex items-center gap-2 text-sm text-zinc-300">
        <input
          type="checkbox"
          className="size-4 rounded border-white/20 bg-white/5"
          {...form.register("rememberMe")}
        />
        Remember this device
      </label>

      {serverError ? <p className="text-sm text-rose-300">{serverError}</p> : null}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Signing in..." : "Sign in"}
      </Button>

      <p className="text-center text-sm text-zinc-400">
        New to RayTech?{" "}
        <Link className="text-cyan-300 hover:text-cyan-200" href={returnTo ? `/register?returnTo=${encodeURIComponent(returnTo)}` : "/register"}>
          Create account
        </Link>
      </p>
    </form>
  );
}
