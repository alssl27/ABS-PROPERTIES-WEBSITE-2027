import "server-only";
import { cookies } from "next/headers";
import { cache } from "react";
import { configured, database } from "@/lib/supabase";
import type { AdminRole, AdminSession } from "./types";
export const readAdminSession = cache(async (): Promise<AdminSession | null> => {
  if (!configured()) return null;
  const token = (await cookies()).get("abs_access_token")?.value;
  if (!token) return null;
  const db = database(token);
  const { data: { user }, error } = await db.auth.getUser(token);
  if (error || !user) return null;
  const { data: staff } = await db.from("staff").select("role").eq("id", user.id).eq("active", true).single();
  if (!staff || !["ADMIN", "MANAGER", "EDITOR", "VIEWER"].includes(staff.role)) return null;
  return { email: user.email || "", role: staff.role, name: user.email || "Staff", sessionId: user.id, expiresAt: 0 };
});
export async function requireRole(role: AdminRole) {
  const session = await readAdminSession();
  const roles: AdminRole[] = ["VIEWER", "EDITOR", "MANAGER", "ADMIN"];
  return session && roles.indexOf(session.role) >= roles.indexOf(role) ? session : null;
}
export async function clearAdminSession() {
  const jar = await cookies();
  const token = jar.get("abs_access_token")?.value;
  if (token && configured()) await database(token).auth.admin.signOut(token, "local");
  jar.delete("abs_access_token");
}
export const isAdminLoginConfigured = configured;
export async function loginAdmin(email: string, password: string) {
  if (!configured()) throw new Error("Staff sign-in is not available yet. Please contact your administrator.");
  const db = database();
  const { data, error } = await db.auth.signInWithPassword({ email, password });
  if (error || !data.session) throw new Error("Unable to sign in. Check your credentials or try again later.");
  const { data: staff } = await database(data.session.access_token).from("staff").select("id").eq("id", data.user.id).eq("active", true).single();
  if (!staff) throw new Error("This account is not authorised for staff access.");
  (await cookies()).set("abs_access_token", data.session.access_token, {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: data.session.expires_in,
  });
}
