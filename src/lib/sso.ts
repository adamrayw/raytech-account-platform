import { publicEnv } from "@/lib/env.public";

export type RayTechProduct =
  | "flownote"
  | "flowpaste"
  | "flowsummary"
  | "flowtask"
  | "flowcv";

const productMap: Record<RayTechProduct, string> = {
  flownote: publicEnv.NEXT_PUBLIC_FLOWNOTE_URL,
  flowpaste: publicEnv.NEXT_PUBLIC_FLOWPASTE_URL,
  flowsummary: publicEnv.NEXT_PUBLIC_FLOWSUMMARY_URL,
  flowtask: publicEnv.NEXT_PUBLIC_FLOWTASK_URL,
  flowcv: publicEnv.NEXT_PUBLIC_FLOWCV_URL,
};

export function getProductUrl(product: RayTechProduct): string {
  return productMap[product];
}

export function buildLoginUrl(returnTo?: string): string {
  const loginUrl = new URL("/login", publicEnv.NEXT_PUBLIC_AUTH_URL);

  if (returnTo) {
    loginUrl.searchParams.set("returnTo", returnTo);
  }

  return loginUrl.toString();
}

export function buildMeEndpoint(): string {
  return new URL("/api/me", publicEnv.NEXT_PUBLIC_AUTH_URL).toString();
}

export function buildSSOHeaders(origin: string) {
  return {
    "x-raytech-origin": origin,
  };
}
