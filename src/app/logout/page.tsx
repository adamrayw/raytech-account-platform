import { LogoutClient } from "@/components/auth/logout-client";

type LogoutPageProps = {
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

export default async function LogoutPage({ searchParams }: LogoutPageProps) {
  const params = await searchParams;
  const safeReturnTo = isSafeReturnTo(params.returnTo) ? params.returnTo : undefined;

  return <LogoutClient returnTo={safeReturnTo} />;
}
