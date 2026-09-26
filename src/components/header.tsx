"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import logo from "../../public/images/abs-logo.webp";

const menuGroups = [
  {
    label: "Buying",
    links: [
      { href: "/properties?mode=buy", label: "Properties for Sale" },
      { href: "/about", label: "Buying Guide" },
      { href: "/contact", label: "Request a Viewing" },
    ],
  },
  {
    label: "Renting",
    links: [
      { href: "/properties?mode=rent", label: "Properties to Rent" },
      { href: "/tenants", label: "Renting Guide" },
      { href: "/tenants", label: "Tenant Information" },
      { href: "/contact", label: "Report a Repair" },
    ],
  },
  {
    label: "Landlords",
    links: [
      { href: "/landlords", label: "Letting Your Property" },
      { href: "/landlords", label: "Fully Managed Service" },
      { href: "/landlords", label: "Landlord Services" },
      { href: "/valuation", label: "Landlord Valuation" },
    ],
  },
  {
    label: "Property Management",
    links: [
      { href: "/landlords", label: "Management Services" },
      { href: "/landlords", label: "Repairs" },
      { href: "/landlords", label: "Compliance" },
      { href: "/contact", label: "Landlord Support" },
    ],
  },
  {
    label: "Commercial",
    links: [
      { href: "/properties?mode=commercial", label: "Commercial Property" },
      { href: "/properties?mode=commercial", label: "Commercial Lettings" },
      { href: "/properties?mode=commercial", label: "Commercial Sales" },
    ],
  },
  {
    label: "Investments",
    links: [
      { href: "/properties?mode=buy", label: "Investment Property" },
      { href: "/about", label: "Investor Services" },
    ],
  },
  {
    label: "About Us",
    links: [
      { href: "/about", label: "About ABS Properties" },
      { href: "/contact", label: "Contact" },
      { href: "/about", label: "Branch / Office" },
    ],
  },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 18);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setOpenMobileSection(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleSection = (label: string) => {
    setOpenMobileSection((current) => (current === label ? null : label));
  };

  return (
    <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>
      <div className="header-inner">
        <Link className="brand-lockup" href="/" aria-label="ABS Properties home">
          <Image
            src={logo}
            alt="ABS Properties"
            width={1672}
            height={941}
            sizes="(max-width: 840px) 108px, 144px"
            className="header-site-logo"
          />
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {menuGroups.map((group) => (
            <div key={group.label} className="nav-item has-dropdown">
              <button type="button" className="nav-button" >
                {group.label}
                <span aria-hidden="true" className="nav-chevron">
                  ▾
                </span>
              </button>
              <div className="dropdown-panel">
                {group.links.map((link) => (
                  <Link
                    key={`${group.label}-${link.label}`}
                    href={link.href}
                    
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="mobile-navigation" className={`mobile-panel ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen} inert={!menuOpen}>
        <div className="mobile-panel-header">
          <Link href="/" className="mobile-brand" onClick={() => setMenuOpen(false)}>
            <Image
              src={logo}
              alt="ABS Properties"
              width={1672}
              height={941}
              className="mobile-brand-mark"
            />
          </Link>
          <button
            type="button"
            className="mobile-close"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            ×
          </button>
        </div>

        <nav className="mobile-nav" aria-label="Mobile navigation">
          {menuGroups.map((group) => (
            <div key={group.label} className="mobile-group">
              <button
                type="button"
                className="mobile-group-toggle"
                aria-expanded={openMobileSection === group.label}
                onClick={() => toggleSection(group.label)}
              >
                <span>{group.label}</span>
                <span className="mobile-chevron">+</span>
              </button>
              {openMobileSection === group.label && (
                <div className="mobile-links">
                  {group.links.map((link) => (
                    <Link key={`${group.label}-mobile-${link.label}`} href={link.href} onClick={() => setMenuOpen(false)}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link href="/contact" className="mobile-link-action" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
          <Link href="/valuation" className="mobile-link-action primary" onClick={() => setMenuOpen(false)}>
            Book a Valuation
          </Link>
        </nav>
      </div>
    </header>
  );
}
