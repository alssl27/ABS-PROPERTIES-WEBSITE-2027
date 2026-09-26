import Link from "next/link";
import { redirect } from "next/navigation";
import { readAdminSession } from "@/lib/admin/auth";
import { LoginForm } from "@/components/admin/login-form";
export default async function Login({searchParams}: {searchParams:Promise<{error?:string}>}) {
 if (await readAdminSession()) redirect("/admin");
 const {error} = await searchParams;
 return <div className="container section admin-shell"><div className="admin-login-panel"><p className="overline">ABS Properties ? Staff portal</p><h1>Sign in</h1><LoginForm error={error}/><Link href="/">Back to website</Link></div></div>;
}
