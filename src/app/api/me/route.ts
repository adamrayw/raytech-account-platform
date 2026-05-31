import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { buildCorsHeaders } from "@/lib/cors";
import { checkRateLimit } from "@/lib/rate-limit";

export async function OPTIONS(request: NextRequest) {
  const headers = buildCorsHeaders(request.headers.get("origin"));
  return new NextResponse(null, { status: 204, headers });
}

export async function GET(request: NextRequest) {
  const corsHeaders = buildCorsHeaders(request.headers.get("origin"));
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  const rate = checkRateLimit(`api-me:${ip}`, 120, 60);

  if (!rate.allowed) {
    return NextResponse.json(
      { message: "Too many requests" },
      {
        status: 429,
        headers: {
          ...corsHeaders,
          "X-RateLimit-Remaining": String(rate.remaining),
          "Retry-After": String(rate.retryAfter),
        },
      },
    );
  }

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      {
        status: 401,
        headers: {
          ...corsHeaders,
          "X-RateLimit-Remaining": String(rate.remaining),
        },
      },
    );
  }

  return NextResponse.json(
    {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
    },
    {
      status: 200,
      headers: {
        ...corsHeaders,
        "X-RateLimit-Remaining": String(rate.remaining),
      },
    },
  );
}
