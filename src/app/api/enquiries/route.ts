import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
const enquiry = z.object({ name: z.string().trim().min(2).max(100), email: z.email().max(254), topic: z.enum(["general","property","viewing","valuation","management","repair"]), property: z.string().max(200), message: z.string().trim().min(10).max(2000), consent: z.literal("on"), website: z.literal(""), token: z.string().min(1).max(2048) });
export async function POST(request: NextRequest) {
 if (request.headers.get("origin") !== request.nextUrl.origin) return NextResponse.json({error:"Invalid request origin."},{status:403});
 if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY || !process.env.TURNSTILE_SECRET_KEY) return NextResponse.json({error:"Online enquiries are not available yet. Please use the contact details shown on this page."},{status:503});
 if (Number(request.headers.get("content-length")) > 16000) return NextResponse.json({error:"Message too long."},{status:413});
 try {
  const input = enquiry.safeParse(await request.json());
  if (!input.success) return NextResponse.json({error:"Check your details, consent and security check, then try again."},{status:400});
  const verify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify",{method:"POST",body:new URLSearchParams({secret:process.env.TURNSTILE_SECRET_KEY,response:input.data.token}),signal:AbortSignal.timeout(10000)});
  const proof = await verify.json();
  if (!proof.success || proof.hostname !== request.nextUrl.hostname) return NextResponse.json({error:"The security check expired. Please complete it again."},{status:400});
  const db = createClient(process.env.SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY,{auth:{persistSession:false,autoRefreshToken:false}});
  const {name,email,topic,property,message} = input.data;
  const {error} = await db.from("enquiries").insert({name,email,topic,property,message});
  if (error) return NextResponse.json({error:"We could not save your enquiry. Please try again or contact the office."},{status:503});
  return NextResponse.json({ok:true});
 } catch { return NextResponse.json({error:"Unable to submit your enquiry. Please try again."},{status:400}); }
}
