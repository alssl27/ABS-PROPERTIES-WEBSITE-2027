import { redirect } from "next/navigation";
import { requireRole } from "@/lib/admin/auth";
import { staffDatabase } from "@/lib/supabase";
export async function Enquiries({topic,title="Enquiries"}: {topic?:string;title?:string}) {
 if (!await requireRole("VIEWER")) redirect("/admin/login");
 let query = (await staffDatabase()).from("enquiries").select("*").order("created_at",{ascending:false}).limit(200);
 if (topic) query=query.eq("topic",topic);
 const {data,error}=await query;
 if (error) throw new Error("Enquiries could not be loaded. Please check database setup.");
 return <div className="container section admin-shell"><h1>{title}</h1><p>Latest 200 enquiries. Staff should review this inbox regularly; email notifications are not enabled.</p>{!data?.length && <p>No enquiries yet.</p>}{data?.map(e => <article key={e.id} className="admin-panel"><h2>{e.name} — {e.topic}</h2><p><a href={"mailto:"+e.email}>{e.email}</a> · {new Date(e.created_at).toLocaleString("en-GB")}</p><p>{e.property}</p><p style={{whiteSpace:"pre-line"}}>{e.message}</p></article>)}</div>;
}
