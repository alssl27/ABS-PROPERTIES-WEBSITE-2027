import "server-only";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
export const configured = () => Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY);
export function database(token?: string) {
  if (!configured()) throw new Error("Database is not configured.");
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: token ? { Authorization: `Bearer ${token}` } : {}, fetch: (url, init) => fetch(url, { ...init, cache: "no-store" }) },
  });
}
export async function staffDatabase() {
  return database((await cookies()).get("abs_access_token")?.value);
}
