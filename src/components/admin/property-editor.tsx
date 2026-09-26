"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { propertySchema, statuses, type Listing } from "@/lib/properties/schema";
import { saveProperty } from "@/app/admin/properties/actions";
type Photo = { path: string; url: string };
export function PropertyEditor({ listing, initialPhotos = [] }: { listing?: Listing; initialPhotos?: Photo[] }) {
  const [id, setId] = useState(listing?.id);
  const [version, setVersion] = useState(listing?.updated_at);
  const [mode, setMode] = useState(listing?.listing_type || "rent");
  const [photos, setPhotos] = useState(initialPhotos);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const field = (name: keyof Listing, label: string, type = "text", required = false) => <label key={name}>{label}<input name={name} type={type} required={required} defaultValue={String(listing?.[name] ?? "")} step={type === "number" ? "any" : undefined} min={type === "number" && !["latitude", "longitude"].includes(name) ? 0 : undefined} maxLength={type === "text" ? 250 : undefined}/></label>;
  const select = (name: keyof Listing, label: string, options: readonly string[], fallback = "") => <label>{label}<select name={name} defaultValue={String(listing?.[name] ?? fallback)}>{options.map(v => <option key={v} value={v}>{v || "Not supplied"}</option>)}</select></label>;
  async function upload(files: FileList | null) {
    if (!files) return;
    setBusy(true); setError(""); setMessage("");
    try {
      if (files.length + photos.length > 30) throw new Error("A listing can contain up to 30 images.");
      for (const file of Array.from(files)) {
        if (file.size > 4 * 1024 * 1024) throw new Error(`${file.name}: choose an image under 4 MB.`);
        const form = new FormData(); form.set("image", file);
        const response = await fetch("/api/admin/images", { method: "POST", body: form });
        const result = await response.json();
        if (!response.ok || !result.url) throw new Error(result.error || "Upload failed.");
        setPhotos(current => [...current, { path: result.path, url: result.url }]);
      }
    } catch (e) { setError(e instanceof Error ? e.message : "Upload failed. Please try again."); }
    finally { setBusy(false); }
  }
  return <form className="admin-form property-editor" onSubmit={async event => {
    event.preventDefault(); if (busy) return;
    const form = new FormData(event.currentTarget);
    const intent = (event.nativeEvent as SubmitEvent).submitter?.getAttribute("value");
    const raw = { ...Object.fromEntries(form), listing_type: mode, price_unit: mode === "sale" ? "sale" : form.get("price_unit"), deposit: mode === "sale" ? null : form.get("deposit"), holding_deposit: mode === "sale" ? null : form.get("holding_deposit"), furnishing: String(form.get("furnishing") || ""), available_date: String(form.get("available_date") || ""), minimum_tenancy: String(form.get("minimum_tenancy") || ""), status: intent === "draft" ? "Draft" : intent === "publish" ? (mode === "sale" ? "For Sale" : "Available") : form.get("status"), features: String(form.get("features") || "").split("\n").map(s => s.trim()).filter(Boolean), images: photos.map(p => p.path), featured: form.get("featured") === "on" };
    const parsed = propertySchema.safeParse(raw);
    setError(""); setMessage("");
    if (!parsed.success) { setError(parsed.error.issues.map(i => `${i.path.join(" ")}: ${i.message}`).join(" · ")); return; }
    setBusy(true);
    try {
      const result = await saveProperty(parsed.data, id, version);
      if (result.error) setError(result.error);
      else { setId(result.id); setVersion(result.version); setMessage(`Property saved as ${parsed.data.status}.`); }
    } catch { setError("Unable to save. Your changes are still in this form; please try again."); }
    finally { setBusy(false); }
  }}>
    <fieldset disabled={busy}><legend>Basic details</legend><div className="admin-form-grid">
      {field("reference", "Property reference", "text", true)}{field("title", "Property title", "text", true)}
      <label>Listing type<select value={mode} onChange={e => setMode(e.target.value as "rent" | "sale")}><option value="rent">To let</option><option value="sale">For sale</option></select></label>
      {select("category", "Category", ["Residential", "Commercial"], "Residential")}{select("property_type", "Property type", ["House", "Flat", "Studio", "Bungalow", "Land", "Office", "Retail", "Industrial", "Other"], "House")}
      {field("bedrooms", "Bedrooms", "number", true)}{field("bathrooms", "Bathrooms", "number", true)}{field("reception_rooms", "Reception rooms", "number", true)}
    </div></fieldset>
    <fieldset disabled={busy}><legend>Address</legend><div className="admin-form-grid">
      {field("address_line1", "Address line 1", "text", true)}{field("address_line2", "Address line 2")}{field("area", "Area")}{field("town", "Town", "text", true)}{field("postcode", "Postcode", "text", true)}{field("latitude", "Latitude (optional)", "number")}{field("longitude", "Longitude (optional)", "number")}
    </div></fieldset>
    <fieldset disabled={busy}><legend>Price and property information</legend><div className="admin-form-grid">
      {field("price", mode === "sale" ? "Sale price (£)" : "Rent (£)", "number", true)}
      {mode === "rent" && <>{select("price_unit", "Rent period", ["pcm", "pw"], "pcm")}{field("deposit", "Deposit (£)", "number")}{field("holding_deposit", "Holding deposit (£)", "number")}{field("available_date", "Available from", "date")}{select("furnishing", "Furnishing", ["", "Furnished", "Unfurnished", "Part furnished"])}{field("minimum_tenancy", "Minimum tenancy")}</>}
      {field("price_qualifier", "Price qualifier (e.g. Guide price)")}{field("council_tax", "Council tax information")}{field("epc", "EPC information")}{field("floorplan", "Floorplan HTTPS link", "url")}{field("brochure", "Brochure HTTPS link", "url")}
    </div></fieldset>
    <fieldset disabled={busy}><legend>Description</legend>
      <label>Short summary<textarea name="summary" rows={3} maxLength={500} defaultValue={listing?.summary}/></label>
      <label>Full description<textarea name="description" rows={8} maxLength={20000} defaultValue={listing?.description}/></label>
      <label>Key features — one per line<textarea name="features" rows={5} defaultValue={listing?.features.join("\n")}/></label>
    </fieldset>
    <fieldset disabled={busy}><legend>Property images</legend><p>JPG, PNG or WebP, up to 4 MB each. The first image is the main image. Save the property to apply changes.</p>
      <label>Upload images<input type="file" multiple accept="image/jpeg,image/png,image/webp" onChange={e => { void upload(e.target.files); e.target.value = ""; }}/></label>
      <div className="editor-images">{photos.map((photo, index) => <div key={photo.path}><Image src={photo.url} width={240} height={160} unoptimized alt={`Property image ${index + 1}`}/><p>{index === 0 ? "Main image" : `Image ${index + 1}`}</p><div className="admin-actions">
        <button type="button" disabled={index === 0} onClick={() => setPhotos([photo, ...photos.filter(p => p.path !== photo.path)])}>Make main</button>
        <button type="button" disabled={index === 0} aria-label={`Move image ${index + 1} earlier`} onClick={() => setPhotos(current => { const next = [...current]; [next[index - 1], next[index]] = [next[index], next[index - 1]]; return next; })}>Move left</button>
        <button type="button" onClick={() => setPhotos(photos.filter(p => p.path !== photo.path))}>Remove</button>
      </div></div>)}</div>
    </fieldset>
    <fieldset disabled={busy}><legend>Publication</legend>{select("status", "Status", statuses, "Draft")}<label className="consent"><input name="featured" type="checkbox" defaultChecked={listing?.featured}/>Featured property</label></fieldset>
    {error && <p role="alert" className="form-status error">{error}</p>}{message && <p role="status" className="form-status">{message}</p>}
    <div className="admin-form-actions"><button disabled={busy} className="button secondary" value="draft">Save Draft</button><button disabled={busy} className="button" value="publish">Publish Property</button><button disabled={busy} className="button secondary" value="update">{busy ? "Please wait…" : "Save selected status"}</button>{id && <Link href={`/admin/properties/${id}`}>Preview saved property</Link>}<Link href="/admin/properties">Back to properties</Link></div>
  </form>;
}
