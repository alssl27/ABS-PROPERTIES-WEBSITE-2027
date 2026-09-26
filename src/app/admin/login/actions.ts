"use server";

import { redirect } from "next/navigation";
import { loginAdmin } from "@/lib/admin/auth";

export async function loginAdminAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  try {
    await loginAdmin(email, password);

  } catch (error) {
    redirect(`/admin/login?error=${encodeURIComponent(error instanceof Error ? error.message : "Invalid email or password.")}`);
  }
  redirect("/admin");
}
