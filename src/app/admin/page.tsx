import Link from "next/link";
import { redirect } from "next/navigation";
import { requireRole } from "@/lib/admin/auth";
import { getListings } from "@/lib/admin/listings";
export default async function Dashboard() {
 if (!await requireRole("VIEWER")) redirect("/admin/login");
 const rows = await getListings();
 const stats = [["Active properties", rows.filter(p => ["Available","For Sale","Let Agreed","Sold STC"].includes(p.status)).length], ["To let",rows.filter(p => p.listing_type === "rent" && p.status === "Available").length],["For sale",rows.filter(p => p.status === "For Sale").length],...["Draft","Let Agreed","Sold STC"].map(s => [s,rows.filter(p => p.status === s).length])];
 return <div className="container section admin-shell"><h1>Staff dashboard</h1><div className="feature-grid">{stats.map(([label,count]) => <article className="admin-panel" key={label}><h2>{label}</h2><p>{count}</p></article>)}</div><div className="admin-form-actions"><Link href="/admin/properties/new" className="button">Add Property</Link><Link href="/admin/properties" className="button secondary">Manage Properties</Link><Link href="/admin/settings">Settings</Link></div><h2>Recently updated</h2><ul>{rows.slice(0,8).map(p => <li key={p.id}><Link href={"/admin/properties/"+p.id+"/edit"}>{p.reference} ? {p.title}</Link> ? {p.status}</li>)}</ul>{!rows.length && <p>Your portfolio is empty. Add your first property to get started.</p>}</div>;
}
