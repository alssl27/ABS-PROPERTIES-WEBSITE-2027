import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { requireRole } from "@/lib/admin/auth";
import { getListing } from "@/lib/admin/listings";
import { staffDatabase } from "@/lib/supabase";
import { money } from "@/lib/site";
export default async function Preview({params}: {params:Promise<{id:string}>}) {
 if (!await requireRole("VIEWER")) redirect("/admin/login");
 const {id} = await params; if (!/^[0-9a-f-]{36}$/.test(id)) notFound();
 const p = await getListing(id); if (!p) notFound();
 const {data} = await (await staffDatabase()).storage.from("property-images").createSignedUrls(p.images,3600);
 return <div className="container section admin-shell"><p className="overline">Staff preview ? {p.status}</p><h1>{p.title}</h1><p>{p.address_line1}, {p.town}, {p.postcode}</p><p>{money(p.price)} {p.price_unit === "sale" ? "" : p.price_unit}</p><div className="editor-images">{data?.filter(i => i.signedUrl).map(i => <Image key={i.path} src={i.signedUrl!} unoptimized width={500} height={330} alt={p.title}/>)}</div><p style={{whiteSpace:"pre-line"}}>{p.description}</p><ul>{p.features.map(f => <li key={f}>{f}</li>)}</ul><Link className="button" href={"/admin/properties/"+id+"/edit"}>Edit property</Link><Link className="button secondary" href="/admin/properties">All properties</Link></div>;
}
