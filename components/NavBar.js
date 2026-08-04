"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "./Icon";
import { SERVICES } from "@/data/services";
import { ROLES_WITH_PAGES } from "@/data/roles";
import { INDUSTRIES } from "@/data/industries";

// Document 3, Section 2 — primary navigation, exactly as specified:
// Home / Solutions / Industries / Services / Hire Developers / Portfolio
// / Pricing / About / Contact-Get Started.
//
// Document 8, Section 4: "sticky header, functional hamburger + slide-down
// menu on mobile — a functional mobile menu was a specific earlier UX fix,
// this is now the baseline requirement, not optional polish." Desktop
// dropdowns are CSS-only (:hover/:focus-within); mobile uses a real
// hamburger toggle with React state, per that requirement.

const MENUS = [
  {
    label: "Solutions",
    items: [
      { href: "/solutions/project-development", label: "Full Project Development" },
      { href: "/solutions/dedicated-teams", label: "Dedicated Team Staffing" },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    items: INDUSTRIES.map((i) => ({ href: `/industries/${i.slug}`, label: i.name })),
  },
  {
    label: "Services",
    href: "/services",
    items: SERVICES.map((s) => ({ href: `/services/${s.slug}`, label: s.name })),
  },
  {
    label: "Hire Developers",
    href: "/hire",
    items: ROLES_WITH_PAGES.map((r) => ({ href: `/hire/${r.slug}`, label: r.name })),
  },
];

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="nav-links nav-desktop">
        {MENUS.map((m) => (
          <div key={m.label} className="nav-dropdown">
            <Link href={m.href || "#"}>{m.label} <Icon name="ChevronDown" size={14} /></Link>
            <div className="nav-dropdown-menu">
              {m.items.map((item) => (
                <Link key={item.href} href={item.href}>{item.label}</Link>
              ))}
            </div>
          </div>
        ))}
        <Link href="/portfolio">Portfolio</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/about">About</Link>
      </nav>

      <button
        className="hamburger-btn"
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        onClick={() => setMobileOpen((o) => !o)}
      >
        <Icon name={mobileOpen ? "X" : "Menu"} size={24} />
      </button>

      {mobileOpen && (
        <div className="mobile-menu">
          {MENUS.map((m) => (
            <div key={m.label} className="mobile-menu-group">
              <div className="mobile-menu-heading">{m.label}</div>
              {m.items.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>{item.label}</Link>
              ))}
            </div>
          ))}
          <Link href="/portfolio" onClick={() => setMobileOpen(false)}>Portfolio</Link>
          <Link href="/pricing" onClick={() => setMobileOpen(false)}>Pricing</Link>
          <Link href="/about" onClick={() => setMobileOpen(false)}>About</Link>
          <Link href="/contact" onClick={() => setMobileOpen(false)}>Contact</Link>
          <Link href="/get-started" className="btn btn-primary btn-block" onClick={() => setMobileOpen(false)}>Get Started</Link>
        </div>
      )}
    </>
  );
}
