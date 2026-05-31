import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

export async function getSessionOrNull() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function requireSession(redirectTo = "/login") {
  const session = await getSessionOrNull();

  if (!session) {
    redirect(redirectTo);
  }

  return session;
}
