"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/data/site";

const navigation = [
  { href: "/recent/", label: "Recent" },
  { href: "/archive/", label: "Archive" },
  { href: "/about/", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/recent/"
      ? pathname.includes("/recent")
      : pathname.endsWith(href.slice(0, -1));

  return (
    <header className="site-header">
      <Link href="/" className="site-name" aria-label={`${site.name}, home`}>
        {site.name}
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={isActive(item.href) ? "active" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <button
        type="button"
        className="menu-button"
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? "Close" : "Menu"}
      </button>

      <nav
        id="mobile-navigation"
        className={`mobile-nav ${menuOpen ? "open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            tabIndex={menuOpen ? 0 : -1}
            className={isActive(item.href) ? "active" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
