import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const sessions = await auth.api.listSessions({
    headers: request.headers,
  });

  return NextResponse.json(
    sessions.map((entry) => ({
      id: entry.id,
      createdAt: entry.createdAt,
      expiresAt: entry.expiresAt,
      ipAddress: entry.ipAddress,
      userAgent: entry.userAgent,
    })),
  );
}
