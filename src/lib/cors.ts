import { serverEnv } from "@/lib/env.server";

const rootDomain = ".raytech.cloud";

export function resolveCorsOrigin(origin: string | null): string | null {
  if (!origin) {
    return null;
  }

  if (serverEnv.trustedOrigins.includes(origin)) {
    return origin;
  }

  try {
    const parsed = new URL(origin);
    if (parsed.hostname.endsWith(rootDomain)) {
      return origin;
    }
  } catch {
    return null;
  }

  return null;
}

export function buildCorsHeaders(origin: string | null): Record<string, string> {
  const allowedOrigin = resolveCorsOrigin(origin);

  const headers: Record<string, string> = {
    Vary: "Origin",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-RayTech-Origin",
  };

  if (allowedOrigin) {
    headers["Access-Control-Allow-Origin"] = allowedOrigin;
  }

  return headers;
}
