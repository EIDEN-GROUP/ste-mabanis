/**
 * Supabase client factory — server only.
 *
 * The application never talks to Supabase from the browser. All data access
 * happens inside server functions through a single service-role client, so
 * business logic stays on the backend and the service-role key never leaves
 * the server. Postgres Row Level Security stays enabled as defense in depth
 * (policies in supabase/migrations/0002_rls.sql and 0003_*).
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env } from "../env";

let client: SupabaseClient | undefined;

export function getSupabase(): SupabaseClient {
  if (!client) {
    const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = env();
    client = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        // Server-side service client: no browser storage, no token refresh.
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
      global: {
        headers: { "x-application": "ste-mabanis-admin" },
      },
    });
  }
  return client;
}
