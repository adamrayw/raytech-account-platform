import { prismaAdapter } from "better-auth/adapters/prisma";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";

import { serverEnv } from "@/lib/env.server";
import { prisma } from "@/lib/prisma";

const isProduction = serverEnv.NODE_ENV === "production";
const localOriginPattern = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i;

const cookieAttributes = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "lax" as const,
  path: "/",
  ...(isProduction ? { domain: serverEnv.COOKIE_DOMAIN } : {}),
};

export const auth = betterAuth({
  appName: "RayTech Account",
  baseURL: serverEnv.BETTER_AUTH_URL,
  basePath: "/api/auth",
  secret: serverEnv.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
    usePlural: false,
  }),
  trustedOrigins: async (request) => {
    const origins = [...serverEnv.trustedOrigins];

    if (!isProduction) {
      origins.push(
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3001",
        "http://localhost:3002",
        "http://127.0.0.1:3002",
      );

      const requestOrigin = request?.headers.get("origin");
      if (requestOrigin && localOriginPattern.test(requestOrigin)) {
        origins.push(requestOrigin);
      }
    }

    return [...new Set(origins)];
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    autoSignIn: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 14,
    updateAge: 60 * 60 * 12,
    freshAge: 60 * 30,
  },
  rateLimit: {
    enabled: true,
    storage: "database",
    window: 60,
    max: 120,
    customRules: {
      "/sign-in/email": {
        window: 60,
        max: 6,
      },
      "/sign-up/email": {
        window: 60,
        max: 4,
      },
    },
  },
  advanced: {
    useSecureCookies: isProduction,
    crossSubDomainCookies: {
      enabled: isProduction,
      domain: serverEnv.COOKIE_DOMAIN,
    },
    defaultCookieAttributes: cookieAttributes,
    cookies: {
      session_token: {
        name: serverEnv.COOKIE_NAME,
        attributes: cookieAttributes,
      },
      session_data: {
        attributes: cookieAttributes,
      },
      account_data: {
        attributes: cookieAttributes,
      },
      dont_remember: {
        attributes: cookieAttributes,
      },
    },
  },
  databaseHooks: {
    account: {
      create: {
        after: async (account) => {
          const isCredentialProvider =
            account.providerId === "credential" || account.providerId === "email-password";

          if (!isCredentialProvider || !account.password) {
            return;
          }

          await prisma.user.update({
            where: { id: account.userId },
            data: { passwordHash: account.password },
          });
        },
      },
      update: {
        after: async (account) => {
          if (!account.password) {
            return;
          }

          await prisma.user.update({
            where: { id: account.userId },
            data: { passwordHash: account.password },
          });
        },
      },
    },
  },
  plugins: [nextCookies()],
});
