/**
 * Typed server environment.
 *
 * Server-only module: it reads `process.env` and is validated with Zod so a
 * misconfigured deployment fails fast with an explicit message instead of a
 * confusing runtime error somewhere in a query. Never import this from client
 * code — the TanStack import-protection plugin enforces that.
 */
import { z } from "zod";

const envSchema = z.object({
  SUPABASE_URL: z.string().url("SUPABASE_URL must be a full URL, e.g. https://xxxx.supabase.co"),
  SUPABASE_SERVICE_ROLE_KEY: z
    .string()
    .min(20, "SUPABASE_SERVICE_ROLE_KEY looks invalid — copy it from the Supabase dashboard"),

  SMTP_HOST: z.string().optional().default(""),
  SMTP_PORT: z.coerce.number().int().positive().optional().default(587),
  SMTP_USER: z.string().optional().default(""),
  SMTP_PASS: z.string().optional().default(""),
  SMTP_FROM: z.string().optional().default("STE MABANIS <contact@mabanis.com>"),

  JWT_SECRET: z
    .string()
    .min(32, "JWT_SECRET must be at least 32 characters — generate one with `openssl rand -base64 48`"),

  PUBLIC_URL: z
    .string()
    .url("PUBLIC_URL must be a full URL")
    .optional()
    .default("http://localhost:3000"),
  SITE_DOMAIN: z.string().min(1).optional().default("mabanis.com"),
  DEPLOY_TARGET: z
    .enum(["node-server", "vercel", "cloudflare-module"])
    .optional()
    .default("node-server"),

  SEED_STAFF_PASSWORD: z.string().optional().default(""),
});

export type ServerEnv = z.infer<typeof envSchema>;

let cached: ServerEnv | undefined;

/** Validated environment, parsed once per process. */
export function env(): ServerEnv {
  if (cached) return cached;
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    const details = parsed.error.issues
      .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(
      `Invalid server environment.\n` +
        `Copy .env.example to .env and set every required value:\n${details}`,
    );
  }
  cached = parsed.data;
  return parsed.data;
}

/** True when the Supabase credentials are configured in this environment. */
export function isSupabaseConfigured(): boolean {
  const raw = process.env;
  return Boolean(raw["SUPABASE_URL"] && raw["SUPABASE_SERVICE_ROLE_KEY"]);
}
