import Link from "next/link";
import { redirect } from "next/navigation";
import { requireRole } from "@/lib/admin/auth";
import { getListings } from "@/lib/admin/listings";
import { statuses } from "@/lib/properties/schema";
import { money } from "@/lib/site";
export default async function AdminProperties({searchParams}: {searchParams:Promise<{q?:string;status?:string;type?:string;category?:string}>}) {
 if (!await requireRole("VIEWER")) redirect("/admin/login");
 const params = await searchParams;
 const rows = (await getListings()).filter(p => (!params.q || [p.reference,p.address_line1,p.postcode,p.town].join(" ").toLowerCase().includes(params.q.toLowerCase())) && (!params.status || p.status === params.status) && (!params.type || p.listing_type === params.type) && (!params.category || p.category === params.category));
 return <div className="container section admin-shell"><div className="admin-header-row"><h1>Property management</h1><Link className="button" href="/admin/properties/new">Add Property</Link></div>
 <form className="admin-form admin-form-grid"><label>Search address, postcode or reference<input name="q" defaultValue={params.q}/></label><label>Status<select name="status" defaultValue={params.status}><option value="">All statuses</option>{statuses.map(s => <option key={s}>{s}</option>)}</select></label><label>Listing type<select name="type" defaultValue={params.type}><option value="">All types</option><option value="rent">To let</option><option value="sale">For sale</option></select></label><label>Category<select name="category" defaultValue={params.category}><option value="">All categories</option><option>Residential</option><option>Commercial</option></select></label><button className="button">Filter properties</button></form>
 <p>{rows.length} properties. To remove a listing from the website, edit it and save the Archived status.</p><div className="admin-table-wrap"><table className="admin-table"><thead><tr>{["Reference","Address","Type","Bedrooms","Price","Status","Added","Updated","Actions"].map(h => <th key={h}>{h}</th>)}</tr></thead><tbody>{rows.map(p => <tr key={p.id}><td>{p.reference}</td><td>{p.address_line1}, {p.postcode}</td><td>{p.category} {p.listing_type}</td><td>{p.bedrooms}</td><td>{money(p.price)} {p.price_unit === "sale" ? "" : p.price_unit}</td><td>{p.status}</td><td>{new Date(p.created_at).toLocaleDateString("en-GB")}</td><td>{new Date(p.updated_at).toLocaleDateString("en-GB")}</td><td><Link href={"/admin/properties/"+p.id}>Preview</Link> ? <Link href={"/admin/properties/"+p.id+"/edit"}>Edit</Link></td></tr>)}</tbody></table></div>{!rows.length && <p>No properties match. Add a property or clear the filters.</p>}</div>;
}
