import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { randomUUID } from "node:crypto";
import { requireRole } from "@/lib/admin/auth";
import { staffDatabase } from "@/lib/supabase";
export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  if (request.headers.get("origin") !== request.nextUrl.origin) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const session = await requireRole("EDITOR");
  if (!session) return NextResponse.json({ error: "Please sign in again." }, { status: 401 });
  if (Number(request.headers.get("content-length")) > 4 * 1024 * 1024) return NextResponse.json({ error: "Images must be under 4 MB." }, { status: 413 });
  try {
    const file = (await request.formData()).get("image");
    if (!(file instanceof File) || file.size > 4 * 1024 * 1024 || !["image/jpeg", "image/png", "image/webp"].includes(file.type)) return NextResponse.json({ error: "Choose a JPG, PNG or WebP under 4 MB." }, { status: 400 });
    const source = sharp(Buffer.from(await file.arrayBuffer()), { limitInputPixels: 40000000 });
    const meta = await source.metadata();
    if (!meta.format || !["jpeg", "png", "webp"].includes(meta.format)) return NextResponse.json({ error: "Invalid image format." }, { status: 400 });
    const bytes = await source.rotate().resize(2000, 2000, { fit: "inside", withoutEnlargement: true }).webp({ quality: 85 }).toBuffer();
    const path = `${session.sessionId}/${randomUUID()}.webp`;
    const db = await staffDatabase();
    const { error } = await db.storage.from("property-images").upload(path, bytes, { contentType: "image/webp", upsert: false });
    if (error) return NextResponse.json({ error: "Image storage is unavailable. Please try again." }, { status: 503 });
    const { data } = await db.storage.from("property-images").createSignedUrl(path, 3600);
    return NextResponse.json({ path, url: data?.signedUrl });
  } catch {
    return NextResponse.json({ error: "This image could not be processed. Try a smaller JPG, PNG or WebP." }, { status: 400 });
  }
}
