import { NextRequest } from "next/server";
import { configured, database } from "@/lib/supabase";
export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path") || "";
  if (!configured() || !/^[0-9a-f-]{36}\/[0-9a-f-]{36}\.webp$/.test(path)) return new Response(null, { status: 404 });
  const { data, error } = await database().storage.from("property-images").download(path);
  if (error || !data) return new Response(null, { status: 404 });
  return new Response(data, { headers: { "Content-Type": "image/webp", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });
}
