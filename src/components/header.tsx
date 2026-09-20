"use client";
import Link from "next/link";
import Image from "next/image";

const links = [
  ["Rent", "/properties"],
  ["Buy", "/properties"],
  ["Landlords", "/landlords"],
  ["Tenants", "/tenants"],
  ["Commercial", "/contact?topic=commercial"],
  ["Our Team", "/about"],
  ["Contact Us", "/contact"],
  ["Request Valuation", "/contact?topic=valuation"],
];

export function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="brand-banner" aria-label="ABS Properties home">
        <Image
          className="brand-banner-image"
          src="/images/abs-properties-banner.png"
          alt="ABS Properties"
          width={2000}
          height={500}
          preload
        />
      </Link>
      <div className="navigation-bar">
        <nav className="nav" aria-label="Main navigation">
          {links.map(([label, href]) => (
            <Link key={label} href={href}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
