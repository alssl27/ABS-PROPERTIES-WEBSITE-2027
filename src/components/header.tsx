"use client";
import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="brand-banner" aria-label="ABS Properties home">
        <Image
          className="brand-banner-image"
          src="/images/abs-properties-banne-new.png"
          alt="ABS Properties"
          width={2160}
          height={725}
          preload
        />
      </Link>
    </header>
  );
}
