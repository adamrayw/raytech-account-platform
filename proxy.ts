import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

const cookieName = process.env.COOKIE_NAME || "raytech_session";

const protectedPaths = ["/dashboard"];
const guestOnlyPaths = ["/login", "/register"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = getSessionCookie(request, { cookieName });

  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path));
  const isGuestOnlyPath = guestOnlyPaths.some((path) => pathname.startsWith(path));

  if (!sessionCookie && isProtectedPath) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("returnTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (sessionCookie && isGuestOnlyPath) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
