"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
const links = [
  ["Properties", "/properties"],
  ["Landlords", "/landlords"],
  ["Tenants", "/tenants"],
  ["About", "/about"],
  ["Contact", "/contact"],
];
export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return (
    <header className="site-header">
      <Link
        href="/"
        className="brand"
        aria-label="ABS Properties home"
        onClick={() => setOpen(false)}
      >
        <Image
          className="brand-logo"
          src="/images/abs-logo.png"
          alt="ABS"
          width={52}
          height={94}
          preload
        />
        <span>Properties</span>
      </Link>
      <button
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="main-nav"
        onClick={() => setOpen(!open)}
      >
        {open ? "Close" : "Menu"}
        <span aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      <nav
        id="main-nav"
        className={open ? "nav open" : "nav"}
        aria-label="Main navigation"
      >
        {links.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            aria-current={
              path === href || path.startsWith(href + "/") ? "page" : undefined
            }
            onClick={() => setOpen(false)}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
