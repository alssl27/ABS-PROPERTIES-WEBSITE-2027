"use client";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { loginAdminAction } from "@/app/admin/login/actions";
function Submit() { const { pending } = useFormStatus(); return <button className="button" disabled={pending}>{pending ? "Signing in…" : "Sign in"}</button>; }
export function LoginForm({error}: {error?:string}) {
 const [show,setShow] = useState(false);
 return <form action={loginAdminAction} className="admin-form"><label>Email address<input name="email" type="email" autoComplete="username" required maxLength={254}/></label><label>Password<input name="password" type={show ? "text" : "password"} autoComplete="current-password" required maxLength={256}/></label><button type="button" className="text-link" onClick={() => setShow(!show)} aria-pressed={show}>{show ? "Hide password" : "Show password"}</button>{error && <p className="form-status error" role="alert">{error}</p>}<Submit/><p className="small">Forgotten your password? Contact your ABS account administrator to arrange a secure account recovery.</p></form>;
}
