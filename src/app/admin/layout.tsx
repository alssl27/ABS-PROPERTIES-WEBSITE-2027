import Link from "next/link";
import { readAdminSession } from "@/lib/admin/auth";
import { signOutAdminAction } from "@/app/admin/logout/actions";

export const metadata = { title: "Staff portal", robots: { index: false, follow: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await readAdminSession();
  if (!session) {
    return <>{children}</>;
  }

  return (
    <>
      <header className="admin-topbar">
        <div className="container admin-topbar-inner">
          <Link href="/admin" className="admin-brand-link">
            ABS Properties Admin
          </Link>
          <nav className="admin-nav" aria-label="Admin navigation">
            <Link href="/admin">Dashboard</Link><Link href="/admin/properties/new">Add Property</Link><Link href="/">View Website</Link>
            <Link href="/admin/properties">Properties</Link>
            <Link href="/admin/enquiries">Enquiries</Link>
            <Link href="/admin/viewings">Viewings</Link>
            <Link href="/admin/valuations">Valuations</Link>
            <Link href="/admin/repairs">Repairs</Link>
            <Link href="/admin/settings">Settings</Link>
          </nav>
          <div className="admin-user-row">
            <span>{session.email}</span>
            <form action={signOutAdminAction}>
              <button type="submit" className="button secondary narrow">Sign out</button>
            </form>
          </div>
        </div>
      </header>
      {children}
    </>
  );
}
