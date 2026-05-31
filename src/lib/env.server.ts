import { z } from "zod";

const serverEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  BETTER_AUTH_SECRET: z.string().min(32, "BETTER_AUTH_SECRET must be at least 32 chars"),
  BETTER_AUTH_URL: z.string().url("BETTER_AUTH_URL must be a valid URL"),
  TRUSTED_ORIGINS: z.string().optional(),
  COOKIE_DOMAIN: z.string().default(".raytech.cloud"),
  COOKIE_NAME: z.string().default("raytech_session"),
});

const defaultDevEnv = {
  NODE_ENV: "development" as const,
  DATABASE_URL: "postgresql://postgres:postgres@localhost:5432/raytech_account?schema=public",
  BETTER_AUTH_SECRET: "replace-with-32-plus-char-secret-for-local-dev",
  BETTER_AUTH_URL: "http://localhost:3000",
  TRUSTED_ORIGINS: "http://localhost:3000,http://localhost:3001,http://localhost:3002",
  COOKIE_DOMAIN: ".raytech.cloud",
  COOKIE_NAME: "raytech_session",
};

const parsed = serverEnvSchema.safeParse({
  ...defaultDevEnv,
  ...process.env,
});

if (!parsed.success) {
  const errors = parsed.error.flatten().fieldErrors;
  const envMode = process.env.NODE_ENV ?? "development";

  if (envMode === "production") {
    console.error("Invalid server environment variables", errors);
    throw new Error("Invalid server environment variables");
  }

  console.warn("Invalid server environment variables (dev mode fallback enabled)", errors);
}

const envData = parsed.success
  ? parsed.data
  : serverEnvSchema.parse(defaultDevEnv);

export const serverEnv = {
  ...envData,
  trustedOrigins: [
    envData.BETTER_AUTH_URL,
    ...(envData.TRUSTED_ORIGINS
      ? envData.TRUSTED_ORIGINS.split(",").map((origin) => origin.trim()).filter(Boolean)
      : []),
  ],
} as const;
