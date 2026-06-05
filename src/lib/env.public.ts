import { z } from "zod";

const publicEnvSchema = z.object({
  NEXT_PUBLIC_AUTH_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_FLOWNOTE_URL: z.string().url().default("https://flownote.raytech.cloud"),
  NEXT_PUBLIC_FLOWPASTE_URL: z.string().url().default("https://flowpaste.raytech.cloud"),
  NEXT_PUBLIC_FLOWSUMMARY_URL: z.string().url().default("https://flowsummary.raytech.cloud"),
  NEXT_PUBLIC_FLOWTASK_URL: z.string().url().default("https://flowtask.raytech.cloud"),
  NEXT_PUBLIC_FLOWCV_URL: z.string().url().default("https://flowcv.raytech.cloud"),
});

const parsed = publicEnvSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid public environment variables", parsed.error.flatten().fieldErrors);
  throw new Error("Invalid public environment variables");
}

export const publicEnv = parsed.data;
