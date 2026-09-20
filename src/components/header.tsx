"use client";
import Link from "next/link";

export function Header() {
  return (
    <header className="site-header">
      <nav className="navigation-bar" aria-label="Primary navigation">
        <div className="nav">
          <Link href="/properties">Rent</Link>
          <Link href="/properties">Buy</Link>
          <Link href="/landlords">Landlords</Link>
          <Link href="/tenants">Tenants</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link className="nav-cta" href="/contact?topic=valuation">
            Book valuation
          </Link>
        </div>
      </nav>
    </header>
  );
}
