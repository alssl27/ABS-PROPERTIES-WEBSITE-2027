"use client";
import Link from "next/link";
import Script from "next/script";
import { useRef, useState } from "react";
type Turnstile = {render:(element:HTMLElement,options:{sitekey:string;callback:(token:string)=>void;"expired-callback":()=>void})=>string;reset:(id:string)=>void};
export function ContactForm({property="",topic=""}: {property?:string;topic?:string;email?:string}) {
 const [busy,setBusy]=useState(false),[error,setError]=useState(""),[message,setMessage]=useState(""),[token,setToken]=useState("");
 const holder=useRef<HTMLDivElement>(null),widget=useRef<string|undefined>(undefined);
 const key=process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
 const turnstile=()=> (window as Window & {turnstile?:Turnstile}).turnstile;
 return <form className="contact-form" onSubmit={async event=>{
  event.preventDefault();if(busy)return;setBusy(true);setError("");setMessage("");const form=event.currentTarget;
  const data=new FormData(form);
  try {const response=await fetch("/api/enquiries",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...Object.fromEntries(data),property,token})});const result=await response.json();if(!response.ok)setError(result.error);else{setMessage("Thank you. Your enquiry has been received. A viewing or valuation is only confirmed when our team contacts you.");form.reset();}}
  catch{setError("Unable to send. Please try again or contact the office.");}
  finally{setBusy(false);setToken("");if(widget.current)turnstile()?.reset(widget.current);}
 }}>
 <label>Your name<input name="name" autoComplete="name" required minLength={2} maxLength={100}/></label><label>Email address<input name="email" type="email" autoComplete="email" required maxLength={254}/></label>
 <label>How can we help?<select name="topic" defaultValue={property ? "viewing" : ["valuation","management","repair"].includes(topic) ? topic : "general"}><option value="general">General enquiry</option><option value="property">Property enquiry</option><option value="viewing">Request a viewing</option><option value="valuation">Request a valuation</option><option value="management">Property management</option><option value="repair">Report a repair</option></select></label>
 {property && <p>Property: {property}</p>}<label>Your message<textarea name="message" rows={5} required minLength={10} maxLength={2000}/></label><div className="honeypot" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
 <label className="consent"><input name="consent" type="checkbox" required/><span>I have read the <Link href="/legal/privacy">privacy notice</Link> and agree to be contacted about this enquiry.</span></label>
 {key ? <><div ref={holder}/><Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" onReady={()=>{if(holder.current && !widget.current)widget.current=turnstile()?.render(holder.current,{sitekey:key,callback:setToken,"expired-callback":()=>setToken("")});}}/></> : <p className="notice">Online enquiries are not available yet. Please use the contact details on this page.</p>}
 <button className="button" disabled={busy || !token}>{busy ? "Sending?" : "Send enquiry"}</button>{error && <p role="alert" className="form-status error">{error}</p>}{message && <p role="status" className="form-status">{message}</p>}
 </form>;
}
