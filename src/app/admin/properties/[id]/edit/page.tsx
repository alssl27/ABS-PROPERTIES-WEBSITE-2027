import { notFound, redirect } from "next/navigation";
import { requireRole } from "@/lib/admin/auth";
import { getListing } from "@/lib/admin/listings";
import { staffDatabase } from "@/lib/supabase";
import { PropertyEditor } from "@/components/admin/property-editor";
export default async function EditProperty({params}: {params: Promise<{id:string}>}) {
 if (!await requireRole("EDITOR")) redirect("/admin/login");
 const {id} = await params;
 if (!/^[0-9a-f-]{36}$/.test(id)) notFound();
 const listing = await getListing(id); if (!listing) notFound();
 const {data,error} = await (await staffDatabase()).storage.from("property-images").createSignedUrls(listing.images,3600);
 if (error || data?.some(p => !p.signedUrl || !p.path)) throw new Error("Images could not be loaded. Please retry before editing this property.");
 const photos = (data || []).map(p => ({path: p.path!,url:p.signedUrl!}));
 return <div className="container section admin-shell"><h1>Edit property</h1><PropertyEditor listing={listing} initialPhotos={photos}/></div>;
}
