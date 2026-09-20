"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

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
        <button
          ref={menuButtonRef}
          className="menu-toggle"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((current) => !current)}
        >
          Menu
          <span aria-hidden="true">{open ? "−" : "+"}</span>
        </button>
        <nav
          id="main-nav"
          className={open ? "nav open" : "nav"}
          aria-label="Main navigation"
        >
          {links.map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
