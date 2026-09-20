import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
export function Footer() {
  const socialLinks = Object.entries(site.social).filter(([, href]) => href);
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <Link href="/" className="brand">
            <Image
              className="brand-logo"
              src="/images/abs-logo.png"
              alt="ABS"
              width={52}
              height={94}
            />
            <span>Properties</span>
          </Link>
          <p>Homes, thoughtfully managed.</p>
          <p className="muted">UK lettings & property management.</p>
          {socialLinks.length > 0 && (
            <div className="social-links" aria-label="Social media">
              {socialLinks.map(([network, href]) => (
                <a key={network} href={href} target="_blank" rel="noreferrer">
                  {network}
                </a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h2>Find your way</h2>
          <Link href="/properties">Find a home</Link>
          <Link href="/landlords">For landlords</Link>
          <Link href="/tenants">For tenants</Link>
        </div>
        <div>
          <h2>Here to help</h2>
          <Link href="/about">About ABS</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/legal/complaints">Complaints & redress</Link>
          <Link href="/legal/fees">Fees & protection</Link>
        </div>
        <div className="footer-contact">
          <h2>Contact ABS</h2>
          {site.email ? <a href={`mailto:${site.email}`}>{site.email}</a> : <p className="muted">Verified contact details will be added before launch.</p>}
          {site.phone && <a href={`tel:${site.phone}`}>{site.phone}</a>}
          {site.officeHours && <p className="muted">{site.officeHours}</p>}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} ABS Properties</span>
        <div>
          <Link href="/legal/privacy">Privacy</Link>
          <Link href="/legal/cookies">Cookies</Link>
          <Link href="/legal/terms">Terms</Link>
          <Link href="/legal/accessibility">Accessibility</Link>
        </div>
      </div>
      <p className="small muted">
        Demonstration website. Business registration, contact details, fees and
        scheme memberships require verification before launch.
      </p>
    </footer>
  );
}
